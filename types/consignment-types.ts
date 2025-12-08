import {City} from "./location-types";

interface FormData {
  // Data Diri
  name: string;
  phone: string;

  // Titip Properti
  ownershipStatus: string;
  propertyType: string;
  address: string;
  city: string;
  area: string;
  specifications: string;
  price: string;
  transactionType: string;
  bankGuaranteed: string;
  bankName: string;

  // Cari Properti
  propertyUsage: string;
  searchPropertyType: string;
  searchCity: string;
  searchArea: string;
  budget: string;
  requirements: string;
}

export interface Consignment {
  ID: string;
  ClassName: string;
  RecordClassName: string;
  url: string;
  Type: string;
  OwnershipStatus: string;
  PropertyOnBank: string;
  LocationDataID: string;
  Phone: string;
  PropertyPrice: string;
  PropertyDescription: string;
  ClientID: string;
  PropertyType: string;
  PropertyAddress: string;
  PropertyTransaction: string;
  PropertyBankName: string;
  LocationArea: string;
  AccessToken: string;
  Name: string;
  PHPSESSID: string;
  PublicMemberID: number;
  SourceInput: null;
  Status: string;
  IPAddress: string;
  UserAgent: string;
  ChangeValue: number;
  IsNew: number;
  Created: Date;
  LastEdited: Date;
  LocationData: City;
}

export interface ConsignmentParams {
  Type?: string;
  OwnershipStatus?: string;
  PropertyOnBank?: number;
  LocationDataID?: number;
  Phone?: string;
  PropertyPrice?: string;
  PropertyDescription?: string;
  ClientID?: string;
  PropertyType?: string;
  PropertyAddress?: string;
  PropertyTransaction?: string;
  PropertyBankName?: string;
  LocationArea?: string;
  AccessToken?: string;
  Name?: string;
  Language?: string;
}

export interface Area {
  ID: string;
  Title: string;
}