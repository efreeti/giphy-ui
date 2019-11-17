import 'reflect-metadata';
import { container, injectable } from 'inversify-props';

import AppStore from '@/store/AppStore';
import { GiphyResponse } from '@/models/GiphyResponse';
import { SearchResultPageData } from '@/models/SearchResultPageData';
import { IGiphyService } from '@/services/IGiphyService';
import { createImages } from '../utils';

function mockGiphyService(response: Promise<GiphyResponse>) {
  @injectable()
  class GiphyService implements IGiphyService {
    fetchSearchResultPage(searchText: string, page: number, pageSize: number): Promise<GiphyResponse> {
      return response;
    }
  }

  container.addSingleton<IGiphyService>(GiphyService);
}

describe('AppStore', () => {
  describe('getters', () => {
    describe('hasMoreSearchResultPages', () => {
      it('should give false when there is no more pages', () => {
        const store = new AppStore(AppStore);

        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
          false, [], null
        )});
        store.updateTotalSearchResultPages(1);

        expect(store.hasMoreSearchResultPages).toEqual(false);
      });

      it('should give true when there are more pages', () => {
        const store = new AppStore(AppStore);

        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
            false, [], null
          )});
        store.updateTotalSearchResultPages(2);

        expect(store.hasMoreSearchResultPages).toEqual(true);
      });
    });
  });

  describe('mutations', () => {
    describe('updateSearchText', () => {
      it('should update search text', () => {
        const store = new AppStore(AppStore);

        store.updateSearchText('search text');

        expect(store.searchText).toEqual('search text');
      });
    });

    describe('updateSearchResultPage', () => {
      it('should add new page', () => {
        const store = new AppStore(AppStore);

        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
          false, [], null
        )});

        expect(store.searchResultPages).toEqual([
          new SearchResultPageData(false, [], null)
        ]);
      });

      it('should update existing page', () => {
        const store = new AppStore(AppStore);

        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
          false, [], null
        )});
        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
          true, [], new Error('Some error')
        )});

        expect(store.searchResultPages).toEqual([
          new SearchResultPageData(true, [], new Error('Some error'))
        ]);
      });
    });

    describe('removeAllSearchResultPages', () => {
      it('should remove after adding page', () => {
        const store = new AppStore(AppStore);

        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
            false, [], null
          )});
        store.removeAllSearchResultPages();

        expect(store.searchResultPages).toEqual([]);
      });
    });

    describe('updateTotalSearchResultPages', () => {
      it('should update total search result pages', () => {
        const store = new AppStore(AppStore);

        store.updateTotalSearchResultPages(10);

        expect(store.totalSearchResultPages).toEqual(10);
      });
    });
  });

  describe('actions', () => {
    afterEach(() => container.unbindAll());

    describe('refreshSearchResultPage', () => {
      it('should refresh new', () => {
        const images = createImages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        mockGiphyService(Promise.resolve({
          data: images,
          pagination: {
            total_count: 21,
          },
        }));

        const store = new AppStore(AppStore);

        const resultPromise = store.refreshSearchResultPage(0);

        expect(store.searchResultPages).toEqual([
          new SearchResultPageData(false, [], null)
        ]);

        return resultPromise.then(() => {
          expect(store.totalSearchResultPages).toEqual(21);
          expect(store.searchResultPages).toEqual([
            new SearchResultPageData(true, images, null)
          ]);
        });
      });

      it('should handle failure', () => {
        mockGiphyService(Promise.reject(new Error('Some error')));

        const store = new AppStore(AppStore);

        const resultPromise = store.refreshSearchResultPage(0);

        expect(store.searchResultPages).toEqual([
          new SearchResultPageData(false, [], null)
        ]);

        return resultPromise.then(() => {
          expect(store.totalSearchResultPages).toEqual(0);
          expect(store.searchResultPages).toEqual([
            new SearchResultPageData(true, [], new Error('Some error'))
          ]);
        });
      });

      it('should refresh existing', () => {
        const images1 = createImages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const images2 = createImages([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

        mockGiphyService(Promise.resolve({
          data: images2,
          pagination: {
            total_count: 21,
          },
        }));

        const store = new AppStore(AppStore);

        store.updateTotalSearchResultPages(2);
        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
          true, images1, null
        )});
        store.updateSearchResultPage({pageNumber: 1, page: new SearchResultPageData(
          true, [], new Error('Some error')
        )});

        const resultPromise = store.refreshSearchResultPage(1);

        expect(store.searchResultPages).toEqual([
          new SearchResultPageData(true, images1, null),
          new SearchResultPageData(false, [], null),
        ]);

        return resultPromise.then(() => {
          expect(store.totalSearchResultPages).toEqual(21);
          expect(store.searchResultPages).toEqual([
            new SearchResultPageData(true, images1, null),
            new SearchResultPageData(true, images2, null),
          ]);
        });
      });
    });

    describe('updateSearchResults', () => {
      it('should update empty', () => {
        const images = createImages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        mockGiphyService(Promise.resolve({
          data: images,
          pagination: {
            total_count: 21,
          },
        }));

        const store = new AppStore(AppStore);

        const resultPromise = store.updateSearchResults();

        expect(store.searchResultPages).toEqual([
          new SearchResultPageData(false, [], null),
        ]);

        return resultPromise.then(() => {
          expect(store.totalSearchResultPages).toEqual(21);
          expect(store.searchResultPages).toEqual([
            new SearchResultPageData(true, images, null),
          ]);
        });
      });

      it('should update existing', () => {
        const images1 = createImages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const images2 = createImages([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

        mockGiphyService(Promise.resolve({
          data: images1,
          pagination: {
            total_count: 21,
          },
        }));

        const store = new AppStore(AppStore);

        store.updateTotalSearchResultPages(2);
        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
          true, images1, null
        )});
        store.updateSearchResultPage({pageNumber: 1, page: new SearchResultPageData(
          true, images2, null
        )});

        const resultPromise = store.updateSearchResults();

        expect(store.searchResultPages).toEqual([
          new SearchResultPageData(false, [], null),
        ]);

        return resultPromise.then(() => {
          expect(store.totalSearchResultPages).toEqual(21);
          expect(store.searchResultPages).toEqual([
            new SearchResultPageData(true, images1, null),
          ]);
        });
      });
    });

    describe('showOneMorePage', () => {
      it('should show more when has more pages', () => {
        const images1 = createImages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const images2 = createImages([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);

        mockGiphyService(Promise.resolve({
          data: images2,
          pagination: {
            total_count: 2,
          },
        }));

        const store = new AppStore(AppStore);

        store.updateTotalSearchResultPages(2);
        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
          true, images1, null
        )});

        const resultPromise = store.showOneMorePage();

        expect(store.searchResultPages).toEqual([
          new SearchResultPageData(true, images1, null),
          new SearchResultPageData(false, [], null),
        ]);

        return resultPromise.then(() => {
          expect(store.totalSearchResultPages).toEqual(2);
          expect(store.searchResultPages).toEqual([
            new SearchResultPageData(true, images1, null),
            new SearchResultPageData(true, images2, null),
          ]);
        });
      });

      it('should not show more when has no more pages', () => {
        const images1 = createImages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        const store = new AppStore(AppStore);

        store.updateTotalSearchResultPages(1);
        store.updateSearchResultPage({pageNumber: 0, page: new SearchResultPageData(
          true, images1, null
        )});

        const resultPromise = store.showOneMorePage();

        expect(store.searchResultPages).toEqual([
          new SearchResultPageData(true, images1, null),
        ]);

        return resultPromise.then(() => {
          expect(store.totalSearchResultPages).toEqual(1);
          expect(store.searchResultPages).toEqual([
            new SearchResultPageData(true, images1, null),
          ]);
        });
      });
    });
  });
});
