export interface SocialMediaPhoto {
  ID: number;
  Title: string;
  Small: string;
  Medium: string;
  Original: string;
  SmallWebP: string | null;
  MediumWebP: string | null;
  OriginalWebP: string | null;
}

export interface SocialMediaData {
  Sort: number;
  Title: string;
  URL: string;
  Photo: SocialMediaPhoto;
}
