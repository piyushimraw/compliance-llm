import { convert } from "html-to-text";

export const checkCompliance = async (url: string, policyId: string) => {
  return 0.5
}



export const getHTML = async (url: string) => {
  const response = await fetch(url)
  const html = await response.text()
  if (html.length === 0) {
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