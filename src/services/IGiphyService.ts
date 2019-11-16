import { GiphyResponse } from "@/models/GiphyResponse";

export interface IGiphyService {
  fetchSearchResultPage(searchText: string, page: number, pageSize: number): Promise<GiphyResponse>;
}
