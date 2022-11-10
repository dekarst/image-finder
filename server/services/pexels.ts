import { createClient } from 'pexels';
import { IPexels } from '../interfaces';

export default class PexelsService {
  protected pexels: any;

  constructor() {
    this.pexels = createClient(process.env.PEXELS_API_KEY || '');
  }

  searchImages = (query: string, page: number, perPage: number = 9): IPexels =>
    this.pexels.photos.search({
      query,
      page,
      per_page: perPage,
    });
}
