import express, { Request, Response } from 'express';
import UnsplashService from '../services/unsplash';
import PexelsService from '../services/pexels';
import { mapping } from '../utils/helpers';
import { IResult, IPhoto } from '../interfaces';

export const searchImages = async (req: Request, res: Response) => {
  const term: string = req.body.search || '';
  const page: number = req.body.page || 1;
  const perPage: number = req.body.perPage || 9;

  if (term.length < 3)
    return res.status(401).json({
      success: false,
      message: 'At least 3 characters required.',
    });

  try {
    const unsplash = new UnsplashService();
    const unsplashResponse = await unsplash.searchImages(term, 1);

    const pexels = new PexelsService();
    const pexelsResponse = await pexels.searchImages(term, 1);

    const totalCount = unsplashResponse.total + pexelsResponse.total_results;

    let result: IResult = {
      totalCount,
      perPage,
      page,
      photos: [],
    };

    if (totalCount) {
      const pageCount = Math.ceil(totalCount / perPage);
      let unsplashPerPage = Math.round(unsplashResponse.total * perPage / totalCount);
      let pexelsPerPage = perPage - unsplashPerPage;

      // On last page, no need to call Unsplash, will get all images from pexels
      if (page >= unsplashResponse.total_pages) {
        let unsplashPerPage = 0;
        let pexelsPerPage = perPage;
      }

      if (unsplashPerPage && unsplashResponse.total) {
        const unsplashRes = await unsplash.searchImages(term, page, unsplashPerPage);
        result.photos = result.photos.concat(mapping(unsplashRes.results));
      }
      if (pexelsPerPage && pexelsResponse.total_results) {
        const pexelsRes = await pexels.searchImages(term, page, pexelsPerPage);
        result.photos = result.photos.concat(mapping(pexelsRes.photos));
      }
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong.',
    });
  }
}
