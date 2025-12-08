export interface DataItem {
  label: string;
}

export interface Section {
  title: string;
  items: DataItem[];
}

export interface ChecklistData {
  title: string;
  sections: Section[];
}

export const kprData = {
  title: "Data Pengajuan KPR",
  sections: [
    {
      title: "Data Pengajuan",
      items: [
        { label: "KTP Klien Dan Pasangan Suami / Istri" },
        { label: "No Telpon Klien Dan Pasangan" },
        { label: "NPWP Klien" },
        { label: "Akta Nikah" },
        { label: "Kartu Keluarga" },
        { label: "Perjanjian Pisah Harta (Kalau Ada)" },
        { label: "Surat Keterangan Belum Menikah (Jika Single)" },
      ],
    },
    {
      title: "Jika Karyawan:",
      items: [{ label: "Surat Keterangan Kerja" }, { label: "Mutasi Rekening Gaji Min 3 Bulan Terakhir" }, { label: "Slip Gaji Terakhir" }],
    },
    {
      title: "Data Usaha:",
      items: [
        { label: "NPWP Usaha" },
        { label: "Akta Pendirian" },
        { label: "SIUP" },
        { label: "Akta Perubahan Terbaru" },
        { label: "TDP" },
        { label: "SK Menkeh (Jika Berbentuk PT)" },
        { label: "SK Domisili Usaha (Jika Ada)" },
        { label: "Bidang Usaha" },
        { label: "Usaha Berdiri Sejak Kapan" },
        { label: "Mutasi Rekening Gaji Min 6 Bulan Terakhir" },
      ],
    },
  ] as Section[],
};

export const tambahanData = {
  title: "Data Tambahan",
  sections: [
    {
      title: "Data Relasi (Keluarga Terdekat Yang Tidak Tinggal Serumah):",
      items: [{ label: "Nama Lengkap Relasi" }, { label: "Alamat Lengkap Relasi" }, { label: "Nomer Handphone Relasi" }],
    },
    {
      title: "Data Jaminan:",
      items: [
        { label: "PBB (Distempel Agen Properti)" },
        { label: "IMB (Distempel Agen Properti)" },
        { label: "Sertifikat Rumah (Distempel Agen Properti)" },
        { label: "Bukti Bayar Appraisal (Rp.1 juta untuk plafon < 1M, Rp.1,5 juta untuk plafon > 1M)" },
        { label: "No Telpon Penjual dan Hubungannya Dengan Nama Di Sertifikat" },
      ],
    },
    {
      title: "Data Agen Properti:",
      items: [{ label: "Surat Pengantar Agen Properti" }, { label: "Kartu Nama Agen Properti" }],
    },
    {
      title: "Data Pengajuan:",
      items: [{ label: "Plafon Yang Diajukan" }, { label: "Jangka Waktu Yang Diajukan" }, { label: "Program Bunga Yang Diajukan" }],
    },
  ] as Section[],
};
