import { dynamicAgentFallback, dynamicPropertyFallback } from "@/data/fallback-dynamics";
import { fallbackStatic } from "@/data/fallback-static";

export function getSmartFallbackMeta(path: string) {
  const segments = path.replace(/\/+$/, "").split("/").filter(Boolean);

  // 1. Static page fallback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const staticEntry = (fallbackStatic.static as Record<string, any>)[path];
  if (staticEntry) {
    return staticEntry;
  }

  // 2. Agent dynamic: /agent/{slug}
  if (segments[0] === "agent" && segments[1]) {
    return dynamicAgentFallback(segments[1]);
  }

  // 3. Property dynamic: /dijual/properti/{city}/{area}
  if (["dijual", "disewa"].includes(segments[0]) && segments[1] && segments[2]) {
    return dynamicPropertyFallback({
      typeTransaction: segments[0],
      typeProperty: "properti",
      city: segments[2],
      area: segments[3],
    });
  }

  // 4. Pattern fallback (optional)
  for (const prefix of Object.keys(fallbackStatic.patterns) as Array<keyof typeof fallbackStatic.patterns>) {
    if (path.startsWith(prefix)) {
      return fallbackStatic.patterns[prefix];
    }
  }

  // 5. Global fallback
  return fallbackStatic.global;
}
