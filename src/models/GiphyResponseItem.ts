import { GiphyImageInfo } from "@/models/GiphyImageInfo";

export interface GiphyResponseItem {
  id: string,
  images: {
    downsized_large: GiphyImageInfo,
  },
}
