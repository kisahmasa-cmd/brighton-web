export interface FooterTypes {
  Sort: string;
  Title: string;
  Url: string;
}
export interface TabsFooterData {
  TabHeader: TabHeaderItem[];
  Tabs: TabItem[];
}

export interface TabHeaderItem {
  Title: string;
}

export interface TabItem {
  Title: string;
  CustomTitle: string;
  URL: string;
  Sort: number;
}
