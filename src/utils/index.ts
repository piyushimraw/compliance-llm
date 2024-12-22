import { convert } from "html-to-text";
import { checkComplianceUsingOpenAI } from "services/openai/index.js";

export const checkCompliance = async (html: string, content: string) => {
    try {
        const complianceCheck = await checkComplianceUsingOpenAI(html, content)
        console.log("complianceCheck", complianceCheck)
        return complianceCheck
    } catch (error: any) {
        console.error("error checking compliance", error.message)
        return {
            status: 'error',
            message: 'Failed to check compliance'
        }
    }
}



export const getHTML = async (url: string) => {
  const response = await fetch(url)
  const html = await response.text()
  if (html.length === 0) {
    console.error("failed to get html for url", url)
    return ""
  }
  return html
}

export const parseHTML = async (html: string, selectors: string[] = []) => {
  const text = convert(html, {
    baseElements: {
      selectors: selectors
    }
  })
  return text
}