export interface ShortcutsTypes {
  Child: ShortcutChildTypes[];
  Title: string;
}

export interface ShortcutChildTypes {
  Sort: string | number;
  Title: string;
  Url: string;
  Badge?: string;
  Label?: string;
  Icons: { LinkCloud: string; LinkCloudMedium: string; LinkCloudSmall: string };
}
