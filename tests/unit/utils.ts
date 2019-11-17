import { GiphyResponseItem } from '@/models/GiphyResponseItem';

export function createImages(ids: Array<number>): Array<GiphyResponseItem> {
  return ids.map(id => ({
    id: String(id),
    images: {
      downsized_large: {
        url: `google.com/images/${id}`,
        width: 100,
        height: 100,
      },
    },
  }));
}
