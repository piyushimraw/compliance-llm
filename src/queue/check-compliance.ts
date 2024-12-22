import Queue from 'bee-queue';
import { getPolicyById } from 'services/db/policy/index.js';
import { checkCompliance, getHTML, parseHTML } from 'utils/index.js';


const checkComplianceQueue = new Queue('check-compliance');

export const createComplianceCheckJob = async (url: string, policyId: string, name: string) => {
    console.log("creating compliance check job", url, policyId, name)
    const job = await checkComplianceQueue.createJob({
        type: 'check-compliance',
        data: {
            url,
            policyId,
            name
        }
    }).save();
    console.log("compliance check job created", job.id)
}

export const processComplianceCheckJob = async (job: Queue.Job<{ type: string, data: { url: string, policyId: string } }>) => {
    if (job.data.type === 'check-compliance') {
        const { url, policyId } = job.data.data;
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
        const complianceCheck = await checkCompliance(text, policy.content);
        console.log("compliance check completed: for url", url, "and policyId", policyId, "with complianceCheck", complianceCheck)
    }
}

export const startQueue = async () => {
    console.log("starting compliance check queue")
    checkComplianceQueue.process(processComplianceCheckJob);
}