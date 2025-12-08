import { fallbackStatic } from "@/data/fallback-static";
import { parseUrlSegments } from "./parseUrlSegments";
import { dynamicAgentFallback, dynamicPropertyFallback } from "@/data/fallback-dynamics";

export function getFallbackMeta(url: string) {
  const pathname = new URL(url).pathname.toLowerCase();
  const segments = parseUrlSegments(pathname);

  // 1. Static page fallback
  if (pathname in fallbackStatic.static) {
    const key = pathname as keyof typeof fallbackStatic.static;
    return fallbackStatic.static[key];
  }

  // 2. Agent dynamic (/agent/{slug})
  if (segments[0] === "agent" && segments[1]) {
    return dynamicAgentFallback(segments[1]);
  }

  // 3. Property dynamic (/dijual/properti/{city}/{area})
  if (["dijual", "disewa"].includes(segments[0]) && segments[1] === "properti" && segments[2] && segments[3]) {
    return dynamicPropertyFallback({
      typeTransaction: segments[0],
      typeProperty: "properti",
      city: segments[2],
      area: segments[3],
    });
  }

  // 4. Pattern match (optional wildcards)
  for (const prefix of Object.keys(fallbackStatic.patterns) as Array<keyof typeof fallbackStatic.patterns>) {
    if (pathname.startsWith(prefix)) return fallbackStatic.patterns[prefix];
  }

  // 5. Global fallback
  return fallbackStatic.global;
}
