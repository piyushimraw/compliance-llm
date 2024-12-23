import Queue from 'bee-queue';
import { updatePolicy } from '../services/db/policy/index.js';
import { getHTML, parseHTML } from '../utils/index.js';


const parsePolicyQueue = new Queue('parse-policy', {
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

export const createParsePolicyJob = async (source: string, policyId: string, selectors: string[]) => {
    console.log("creating parse policy job", source, policyId, selectors)
    const job = await parsePolicyQueue.createJob({
        type: 'parse-policy',
        data: {
            source,
            policyId,
            selectors,
        }
    }).save();
    console.log("parse policy job created", job.id)
}

export const processParsePolicyJob = async (job: Queue.Job<{ type: string, data: { policyId: string, selectors: string[], source: string } }>) => {
    if (job.data.type === 'parse-policy') {
        const { policyId, selectors, source } = job.data.data;
        console.log("processing parse policy job", job.data.data,)
        const html = await getHTML(source)
        if (!html) {
            console.error("failed to get html for url", source)
            return {
                status: 'error',
                message: 'Failed to get HTML'
            }
        }
        const text = await parseHTML(html, selectors)
        try {
            await updatePolicy(policyId, "completed", text)
        } catch (error) {
            console.error("error checking compliance", error)
        }
    }
}

export const startParsePolicyQueue = async () => {
    console.log("starting parse policy queue")
    parsePolicyQueue.process(processParsePolicyJob);
}