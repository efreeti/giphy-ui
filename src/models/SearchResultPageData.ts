import { GiphyResponseItem } from "@/models/GiphyResponseItem";

export class SearchResultPageData {
  constructor(
    public loaded: boolean,
    public images: Array<GiphyResponseItem>,
    public error: any,
  ) {}
}
