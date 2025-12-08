import { Photo } from "./api-types";

type TestimoniType = "AGEN" | "UMUM" | "";

export interface TestimoniData {
  ID: number;
  Nama: string;
  Type: TestimoniType;
  Testimoni: string;
  Star?: number;
  Created?: string;
  LastEdited?: string;
  Office?: TestimoniOffice;
  Location?: TestimoniLocation;
  Photo: Photo;
}

interface TestimoniOffice {
  ID: number;
  Name: string;
}

interface TestimoniLocation {
  ID: number;
  Title: string;
}

export interface TestimoniesParams {
  Type?: TestimoniType;
  Count: number;
  Page: number;
}
