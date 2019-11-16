import { GiphyResponseItem } from "@/models/GiphyResponseItem";

export interface GiphyResponse {
  data: Array<GiphyResponseItem>,
  pagination: {
    total_count: number,
  },
}
