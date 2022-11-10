export interface IUnsplash {
  total: number;
  total_pages: number;
  results: [];
}

export interface IPexels {
  total_results: number;
  page: number;
  per_page: number;
  photos: [];
  next_page: string;
}

export interface IPhoto {
  id: string;
  url: string;
  alt: string;
  photographer: string;
}

export interface IResult {
  totalCount: number;
  perPage: number;
  page: number;
  photos: IPhoto[];
}