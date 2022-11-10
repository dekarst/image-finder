import { IUnsplash, IPexels, IPhoto } from '../interfaces';

export const mapping = (response: []): IPhoto[] => {
  return response.map((photo: any) => ({
    id: photo.id,
    url: photo.src?.original || photo.urls?.thumb,
    alt: photo.alt || photo.description,
    photographer: photo.photographer || photo.user?.name,
  }))
}