import { extractInnerText } from "@mipong/utils/string";
import cheerio from "cheerio";

export function extractForm<T extends Record<string, string>>(
  html: string,
  left: string[],
  right: string
): T {
  const form = extractInnerText(html, left, right);

  const $ = cheerio.load(form);
  const inputs = Array.from($("input"));

  return inputs.reduce((acc, cv) => {
    const name = $(cv)?.attr("name");
    const value = $(cv)?.val();

    return name
      ? {
          ...acc,
          [name]: value ?? "",
        }
      : acc;
  }, {} as T);
}
