interface MessageItem {
  Type: "property" | "agent" | "page" | string;
  Code: number;
  Title: string;
  Description: string;
  Link?: string;
}

const message: MessageItem[] = [
  {
    Type: "property",
    Code: 404,
    Title: "Data Tidak Ditemukan",
    Description: "Maaf, kami tidak dapat menemukan properti yang Anda cari. Silakan coba dengan kriteria pencarian yang berbeda.",
  },
  {
    Type: "agent",
    Code: 404,
    Title: "Data Tidak Ditemukan",
    Description: "Maaf, kami tidak dapat menemukan agen yang Anda cari. Silakan coba dengan kriteria pencarian yang berbeda.",
  },
  {
    Type: "page",
    Code: 404,
    Title: "Halaman Tidak Ditemukan",
    Description: "Maaf, kami tidak dapat menemukan halaman yang Anda cari.",
    Link: "/",
  },
  {
    Type: "News",
    Code: 404,
    Title: "Halaman Tidak Ditemukan",
    Description: "Maaf, kami tidak dapat menemukan Article yang Anda cari.",
    Link: "/",
  },
];

export function getMessage(type: string = "property", code: number = 404): MessageItem | undefined {
  return message.find((msg) => msg.Type === type && msg.Code === code);
}
