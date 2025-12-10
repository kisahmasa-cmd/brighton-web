let lastSent = 0;

export async function sendErrorToDiscord(
  message: string,
  {
    site,
    endpoint,
    url,
    status,
    response,
    request,
    latency,
    lateResponse,
  }: {
    site?: string;
    endpoint?: string;
    url?: string;
    status?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    response?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request?: any;
    latency?: number;
    lateResponse?: boolean;
  } = {}
) {
  try {
    const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "https://discord.com/api/webhooks/1443424714880974878/VylYCP2MWALWvZnI0NwTBoOyKhSrFRpiYcKCzaNLljAHOzjojsY5bH10AgL189P09hzc";
    const WEBHOOK_LATE_RESPONSE = "https://discord.com/api/webhooks/1447756377400414268/b7TWJxS_iM9bjONBOP5ZbrYiuJ128StUBW9XFpDQhn2dkrEDAYrdRri1yB2r5MSR2iSR";
    const NODE_ENV = process.env.NODE_ENV;

    if (!WEBHOOK_URL) return;
    if (!WEBHOOK_LATE_RESPONSE) return;
    // if (NODE_ENV === "development") return;

    // Small rate limiting (1 log / 1.5 detik)
    if (Date.now() - lastSent < 1500) return;
    lastSent = Date.now();

    // -- helper untuk truncate data besar --
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const truncate = (obj: any) => {
      const json = JSON.stringify(obj, null, 2);
      return json.length > 1500 ? json.slice(0, 1500) + "...\n(TRUNCATED)" : json;
    };

    await fetch(lateResponse ? WEBHOOK_LATE_RESPONSE : WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "Next API Logger",
        embeds: [
          {
            title: "API Error",
            color: 16711680, // red
            description: message,
            fields: [
              site && { name: "Site", value: site },
              endpoint && { name: "Endpoint", value: `\`${endpoint}\`` },
              url && { name: "Full URL", value: url },
              status && { name: "Status", value: `\`${status}\`` },
              latency && { name: "Latency", value: `${latency} ms` },
              request && {
                name: "Request",
                value: "```json\n" + truncate(request) + "\n```",
              },
              response && {
                name: "Response",
                value: "```json\n" + truncate(response) + "\n```",
              },
            ].filter(Boolean),
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch (error) {
    console.error("Failed to send Discord log:", error);
  }
}
