import { convert } from "html-to-text";

export const checkCompliance = async (url: string) => {
  return 0.5
}



export const parseHTML = async (url: string) => {
  const response = await fetch(url)
  const html = await response.text()
  if (html.length === 0) {
    return null
  }
  // if html is present then parse it to a text
  const text = convert(html)

  return text
}