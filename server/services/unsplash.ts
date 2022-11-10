import { createApi } from 'unsplash-js';
import crossFetch from 'cross-fetch';
import { IUnsplash } from '../interfaces';

export default class UnsplashService {
  protected unsplash: any;

  constructor() {
    this.unsplash = createApi({
      accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
      fetch: crossFetch,
    });
  }

  searchImages = async (query: string, page: number, perPage: number = 9): Promise<IUnsplash> => {
    const res = await this.unsplash.search.getPhotos({
      query,
      page,
      perPage,
    });

    return res.response;
  }
}
