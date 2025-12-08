import { Photo } from "./api-types";

export interface AdsData {
  ID: number;
  ClassName: string;
  Created: string;
  LastEdited: string;
  Kode: string;
  Tipe: string;
  SourceURL: string;
  LinkURL: string;
  FlashVarLinkName: string;
  FlashVarName: string;
  FlashVarValue: string;
  TanggalMulai: string;
  TanggalSelesai: string;
  CustomScript: string | null;
  ImageID: number;
  Image: Photo;
}
