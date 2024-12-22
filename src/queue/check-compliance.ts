import Queue from 'bee-queue';
import { checkCompliance } from 'utils/index.js';


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
    console.log("processing compliance check job", job.data.data)
    if (job.data.type === 'check-compliance') {
        const { url, policyId } = job.data.data;
        console.log("processing compliance check job", job.data.data,)
        const complianceCheck = await checkCompliance(url, policyId);
        console.log("compliance check completed: for url", url, "and policyId", policyId, "with complianceCheck", complianceCheck)
        // await updateComplianceCheck(complianceCheck.id, complianceCheck.status, complianceCheck.report);
    }
}

export const startQueue = async () => {
    console.log("starting compliance check queue")
    checkComplianceQueue.process(processComplianceCheckJob);
}