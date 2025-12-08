"use server"; // <-- Ini sangat penting! Menandakan file ini hanya berjalan di server.

import {getPropertyPrimaryDetail as fetchPropertyPrimaryDetail} from "@/services/property-service";

// Action ini akan dipanggil oleh client, tapi dieksekusi di server.
export async function getPropertyPrimaryDetailAction(slug: string) {
  try {
    // Karena ini berjalan di server, dia bisa mengakses `getPropertyPrimaryDetail`
    // yang menggunakan environment variable rahasia (API_URL, CLIENT_ID, dll).
    return await fetchPropertyPrimaryDetail(slug);
  } catch (error) {
    console.error("Server Action Error:", error);
    // Return struktur data yang konsisten atau throw error
    return { Data: null, Error: "Gagal mengambil data" };
  }
}
