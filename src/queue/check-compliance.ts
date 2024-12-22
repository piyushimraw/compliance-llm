import Queue from 'bee-queue';
import { updateComplianceCheck } from '../services/db/compliance/index.js';
import { getPolicyById } from '../services/db/policy/index.js';
import { getHTML, parseHTML, checkCompliance } from '../utils/index.js';


const checkComplianceQueue = new Queue('check-compliance', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

export const createComplianceCheckJob = async (url: string, policyId: string, name: string, complianceCheckId: string) => {
    console.log("creating compliance check job", url, policyId, name)
    const job = await checkComplianceQueue.createJob({
        type: 'check-compliance',
        data: {
            url,
            policyId,
            name,
            complianceCheckId,
        }
    }).save();
    console.log("compliance check job created", job.id)
}

export const processComplianceCheckJob = async (job: Queue.Job<{ type: string, data: { url: string, policyId: string, complianceCheckId: string } }>) => {
    if (job.data.type === 'check-compliance') {
        const { url, policyId, complianceCheckId } = job.data.data;
        console.log("processing compliance check job", job.data.data,)
        const policy = await getPolicyById(policyId)
        const html = await getHTML(url)
        if (!html) {
            console.error("failed to get html for url", url)
            return {
                status: 'error',
                message: 'Failed to get HTML'
            }
        }
        const text = await parseHTML(html)
        try {
            const complianceCheck = await checkCompliance(text, policy.content);
            await updateComplianceCheck(Number.parseInt(complianceCheckId, 10), "completed", complianceCheck)
        } catch (error) {
            console.error("error checking compliance", error)
            await updateComplianceCheck(Number.parseInt(complianceCheckId, 10), "error", error)
        }

    }
}

export const startQueue = async () => {
    console.log("starting compliance check queue")
    checkComplianceQueue.process(processComplianceCheckJob);
}