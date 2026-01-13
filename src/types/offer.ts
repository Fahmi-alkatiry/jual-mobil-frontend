export type OfferStatus = "BARU" | "DIPROSES" | "SELESAI" | "BATAL";

export interface Offer {
  id: number;
  fullName: string;
  whatsapp: string;
  brand: string;
  model: string;
  year: number;
  location: string;
  status: OfferStatus;
  createdAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
