import 'dotenv/config';
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ComplianceCheckSchema = z.object({
    non_complaint_sections: z.array(
        z.object({
            content: z.string(),
            policy_violated: z.string(),
            confidence_score: z.number(),
        })
    ),
})

export const checkComplianceUsingOpenAI = async (html: string, content: string) => {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini-2024-07-18",
        messages: [
            { role: "system", content: "You are an expert compliance auditor." },
            { role: "user", content: `Analyze this website content against the provided policy.` },
            { role: "user", content: `Website Content: ${html}` },
            { role: "user", content: `Compliance Policy: ${content}` }

        ],
        response_format: zodResponseFormat(ComplianceCheckSchema, "result"),
    });

    const result = completion.choices[0].message.parsed;
    return result;
}