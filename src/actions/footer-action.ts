// src/actions/footer-actions.ts
"use server"; // <-- Ini sangat penting! Menandakan file ini hanya berjalan di server.

import { getFooterTabs as fetchFooterTabs } from "@/services/homepage-service/homepage-service";

// Action ini akan dipanggil oleh client, tapi dieksekusi di server.
export async function getFooterTabsAction(Category: number = 1, Province: string = "", City: string = "", TypeProperty: string = "", TypeTransaction: string = "", Area: string = "") {
  try {
    // Karena ini berjalan di server, dia bisa mengakses `getFooterTabs`
    // yang menggunakan environment variable rahasia (API_URL, CLIENT_ID, dll).
    const data = await fetchFooterTabs(Category, Province, City, TypeProperty, TypeTransaction, Area);
    return data;
  } catch (error) {
    console.error("Server Action Error:", error);
    // Return struktur data yang konsisten atau throw error
    return { Data: null, Error: "Gagal mengambil data" };
  }
}
