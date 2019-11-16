import 'reflect-metadata';
import axios from 'axios';

import {GiphyService} from '@/services/GiphyService';
import {createImages} from '../utils';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GiphyService', () => {
  describe('buildSearchResultPageUri', () => {
    it('should build trending API URI when empty search text', () => {
      expect(new GiphyService().buildSearchResultPageUri('', 0, 10)).toMatch(
        'https://api.giphy.com/v1/gifs/trending?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&lang=en&q=&limit=10&offset=0&rating=G'
      );
    });

    it('should build search API URI when non empty search text', () => {
      expect(new GiphyService().buildSearchResultPageUri('word', 0, 10)).toMatch(
        'https://api.giphy.com/v1/gifs/search?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&lang=en&q=word&limit=10&offset=0&rating=G'
      );
    });

    it('should do pagination', () => {
      expect(new GiphyService().buildSearchResultPageUri('word', 3, 30)).toMatch(
        'https://api.giphy.com/v1/gifs/search?api_key=CdRKiCMbTnt9CkZTZ0lGukSczk6iT4Z6&lang=en&q=word&limit=30&offset=90&rating=G'
      );
    });
  });

  describe('fetchSearchResultPage', () => {
    it('should makes proper HTTP get call', () => {
      const axiosResponse = {
        data: {
          data: createImages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
          pagination: {
            total_count: 21,
          },
        },
      };

      mockedAxios.get.mockResolvedValue(axiosResponse);

      return (new GiphyService()).fetchSearchResultPage('', 0, 10).then(
        response => expect(response).toEqual(axiosResponse.data)
      );
    });
  });
});
