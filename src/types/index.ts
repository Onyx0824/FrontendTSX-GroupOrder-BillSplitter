// src/types/index.ts

export type Language = 'en' | 'zh-TW';
export type ThemeMode = 'light' | 'dark';

export interface MenuItem {
  nameEn: string;
  nameZh: string;
  price: number;
}

export interface DashboardOrder {
  nameEn: string;
  nameZh: string;
  items: string;
  price: number;
  status: 'confirmed' | 'pending';
}

export interface InvoiceItem {
  nameEn: string;
  nameZh: string;
  qty: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SplitRule {
  nameEn: string;
  nameZh: string;
  amount: number | null;
  ruleEn: string;
  ruleZh: string;
}

export interface SplitMember {
  nameEn: string;
  nameZh: string;
  total: number;
  detailsEn: string;
  detailsZh: string;
}

export interface PaymentPerson {
  nameEn: string;
  nameZh: string;
  amount: number;
}

export interface DraftItem {
  nameEn: string;
  nameZh: string;
  price: number;
  detailsEn: string;
  detailsZh: string;
  needsInput: boolean;
  warningEn?: string;
  warningZh?: string;
}

export interface OrderHistoryItem {
  nameEn: string;
  nameZh: string;
  date: string;
  price: number;
  statusEn?: string;
  statusZh?: string;
}