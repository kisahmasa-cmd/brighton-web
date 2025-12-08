export interface BannerPhoto {
  ID: number;
  Title: string;
  Small: string;
  Medium: string;
  Original: string;
  SmallWebP: string;
  MediumWebP: string;
  OriginalWebP: string;
}

export interface BannerData {
  ID: number;
  Title: string | null;
  Keterangan: string | null;
  NoUrut: string;
  Link: string;
  OnlyApp: string;
  Target: string | null;
  Photo: BannerPhoto;
  PhotoMobile: BannerPhoto;
}
