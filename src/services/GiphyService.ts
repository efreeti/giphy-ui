import axios from 'axios';
import { injectable } from 'inversify-props';

import { GiphyResponse } from "@/models/GiphyResponse";
import { IGiphyService } from "@/services/IGiphyService";

const baseGiphyUri = 'https://api.giphy.com/v1/gifs';
const giphyApiKey = 'CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6';

@injectable()
export class GiphyService implements IGiphyService {
  fetchSearchResultPage(searchText: string, page: number, pageSize: number): Promise<GiphyResponse> {
    return axios.get<GiphyResponse>(this.buildSearchResultPageUri(searchText, page, pageSize)).then(
      response => response.data
    );
  }

  buildSearchResultPageUri(searchText: string, page: number, pageSize: number): string {
    const searchUri = `${baseGiphyUri}/${searchText ? 'search' : 'trending'}?api_key=${giphyApiKey}&lang=en`;

    return `${searchUri}&q=${searchText}&limit=${pageSize}&offset=${page * pageSize}&rating=G`;
  }
}

