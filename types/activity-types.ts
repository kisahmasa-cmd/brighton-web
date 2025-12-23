export interface ActivityData {
  Action: "View" | "Contact" | "Share";
  UserContact?: string;
  UserID?: string;
  UserType?: "Agent" | "Visitor";
  IPAddress?: string;
  UserName?: string;
  Response?: string;
  RefURL: string;
  RefID: string;
  UserLabel?: string;
  ContactType: string;
  Source: string;
  UserRecord?: string;
  ContactID?: string;
  Contact?: string;
  RefType: "PropertyData" | "AgentData" | string;
}
