import { sendErrorToDiscord } from "@/lib/discord-logger";

const isDev = process.env.NODE_ENV === "development";

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL!;
const OLD_URL = process.env.NEXT_PUBLIC_OLD_URL || process.env.OLD_URL!;
const NODE_URL = process.env.NODE_URL!;
const TEMP_URL = process.env.NEXT_PUBLIC_TEMP_URL || process.env.TEMP_URL!;

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "88250c1a024f2034e1dc5c8c3ea372b3" || process.env.ACCESS_TOKEN!;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || process.env.CLIENT_ID!;
const CLIENT_ID_NODE = process.env.NEXT_PUBLIC_CLIENT_ID_NODE || process.env.CLIENT_ID_NODE!;

type ApiFetchOptions = RequestInit & {
  base?: "api" | "old" | "node" | "temp"// pilih base URL
  dynamic?: boolean;
  revalidate?: number;
  withClientId?: boolean; // bisa disable client_id
  withAccessToken?: boolean; // bisa disable access_token
  formData?: boolean; // bisa disable content type json
  formDataBody?: FormData;
  formEncoded?: boolean; // pakai application/x-www-form-urlencoded
  params?: Record<string, string | number | boolean | null | undefined>;
};

export async function apiFetch<T>(endpoint: string, options?: ApiFetchOptions): Promise<T> {
  const start = Date.now();
  const isDynamic = options?.dynamic || false;
  let baseURL = "";

  // Tentukan base URL sesuai base

  switch (options?.base) {
    case "old":
      baseURL = OLD_URL;
      break;
    case "node":
      baseURL = NODE_URL;
      break;
    case "temp":
      baseURL = TEMP_URL;
      break;
    default:
      baseURL = API_URL;
      break;
  }

  // Buat URL object
  const urlObj = new URL(`${baseURL}${endpoint}`);

  // Tentukan ClientID sesuai base
  const clientId = options?.base === "node" ? CLIENT_ID_NODE : CLIENT_ID;

  // collect semua body default
  let bodyToSend = options?.body;

  // Tambahkan client_id (kecuali dinonaktifkan)
  if (options?.withClientId !== false && baseURL !== "node" && !options?.formData) {
    urlObj.searchParams.set("ClientID", clientId);
  }

  // Tambahkan access_token (kecuali dinonaktifkan)
  if (options?.withAccessToken && baseURL !== "node" && !options?.formData) {
    urlObj.searchParams.set("AccessToken", ACCESS_TOKEN);
  }

  // Tambahkan params tambahan (kalau ada)
  if (options?.params) {
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.set(key, String(value));
      }
    }
  }

  if (options?.formData) {
    if (options?.formDataBody) {
      bodyToSend = options?.formDataBody;
    } else {
      // Kalau user minta pakai formData, ubah object menjadi FormData
      let parsed = [];

      if (typeof bodyToSend === "string") {
        parsed = bodyToSend ? JSON.parse(bodyToSend) : [];
      }

      const formData = new FormData();
      Object.entries(parsed).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      // Tambahkan client_id (kecuali dinonaktifkan)
      if (options?.withClientId !== false && baseURL !== "node") {
        formData.append("ClientID", clientId);
      }

      // Tambahkan access_token (kecuali dinonaktifkan)
      if (options?.withAccessToken && baseURL !== "node") {
        formData.append("AccessToken", ACCESS_TOKEN);
      }

      bodyToSend = formData;
    }
  } else if (options?.formEncoded) {
    let parsed = {};

    if (typeof bodyToSend === "string") {
      parsed = bodyToSend ? JSON.parse(bodyToSend) : {};
    } else if (typeof bodyToSend === "object" && bodyToSend !== null) {
      parsed = bodyToSend;
    }

    const urlEncoded = new URLSearchParams();
    Object.entries(parsed).forEach(([key, value]) => {
      if (value !== undefined && value !== null) urlEncoded.append(key, String(value));
    });

    // Tambahkan client_id (kecuali dinonaktifkan)
    if (options?.withClientId !== false && baseURL !== "node") {
      urlEncoded.append("ClientID", clientId);
    }

    // Tambahkan access_token (kecuali dinonaktifkan)
    if (options?.withAccessToken && baseURL !== "node") {
      urlEncoded.append("AccessToken", ACCESS_TOKEN);
    }

    bodyToSend = urlEncoded.toString();
  }
  // uncomment this to debug api request
  // console.log("Fetching API:", urlObj.toString());
  // console.log("body:", { body: bodyToSend });
  // console.log("header:", options?.headers);

  //check cache
  // console.log("FETCH MODE:", {
  //   dynamic: options?.dynamic,
  //   cache: isDynamic ? "no-store" : "force-cache",
  //   revalidate: options?.revalidate,
  // });

  const res = await fetch(urlObj.toString(), {
    ...options,
    headers: {
      ...(options?.formData ? {} : { "Content-Type": "application/json" }),
      ...(options?.headers || {}),
    },
    body: bodyToSend,
    cache: isDynamic ? "no-store" : "force-cache",
    next: !isDynamic ? { revalidate: options?.revalidate ?? 3600 } : undefined,
  });
  const latency = Date.now() - start;

  if (latency > 3000) {
    const site = process.env.NEXT_PUBLIC_BASE_URL || "Unknown Site";

    await sendErrorToDiscord(`[WARNING] Slow API response (>3s)`, {
      lateResponse: true,
      site: site,
      endpoint,
      url: urlObj.toString(),
      latency,
      request: {
        method: options?.method,
        params: options?.params,
        base: options?.base ?? "api",
      },
    });
  }

  if (!res.ok) {
    let result = null;
    result = await res.json();

    const errorMessage = result && "Message" in result ? result?.Message?.Text : `API error: ${res.status} ${res.statusText}`;
    const site = process.env.NEXT_PUBLIC_BASE_URL || "Unknown Site";

    // KIRIM LOG KE DISCORD (PRODUCTION ONLY)
    await sendErrorToDiscord(errorMessage, {
      site: site,
      endpoint,
      url: urlObj.toString(),
      status: res.status,
      response: result,
      request: {
        method: options?.method,
        body: bodyToSend instanceof FormData ? "(FormData)" : bodyToSend,
        params: options?.params,
      },
      latency,
    });

    console.error("API ERROR", errorMessage, result);

    throw errorMessage;
  }

  return res.json() as Promise<T>;
}
