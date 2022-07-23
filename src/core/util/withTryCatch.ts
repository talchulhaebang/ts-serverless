import { ScrapingError } from "../error/ScrapingError";

export function withTryCatch<T>(
  trier: (...args: any[]) => T,
  catcher: (e: Error) => T
) {
  return async function (...args: any[]) {
    try {
      return await trier(args);
    } catch (e) {
      if (e instanceof ScrapingError) {
        return await catcher(e);
      }
      throw e;
    }
  };
}
