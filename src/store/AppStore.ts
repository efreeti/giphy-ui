import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Inject } from 'inversify-props';

import { SearchResultPageData } from "@/models/SearchResultPageData";
import { IGiphyService } from "@/services/IGiphyService";
import store from '@/store'

interface SearchResultPageUpdate {
  page: SearchResultPageData,
  pageNumber: number,
}

@Module({ store: store, dynamic: true, name: 'app', namespaced: true })
export default class AppStore extends VuexModule {
  @Inject('IGiphyService')
  private giphyService!: IGiphyService;

  searchText = '';
  searchResultPages = new Array<SearchResultPageData>();
  searchResultPageSize = 10;
  totalSearchResultPages = 0;

  get hasMoreSearchResultPages() {
    return this.searchResultPages.length < this.totalSearchResultPages;
  }

  @Mutation
  updateSearchText(searchText: string) {
    this.searchText = searchText;
  }

  @Mutation
  removeAllSearchResultPages() {
    this.searchResultPages = [];
  }

  @Mutation
  updateSearchResultPage(update: SearchResultPageUpdate) {
    this.searchResultPages.splice(update.pageNumber, 1, update.page);
  }

  @Mutation
  updateTotalSearchResultPages(totalPages: number) {
    this.totalSearchResultPages = totalPages;
  }

  @Action
  async refreshSearchResultPage(pageNumber: number) {
    this.updateSearchResultPage({pageNumber, page: new SearchResultPageData(
      false, [], null
    )});

    try {
      const response = await this.giphyService.fetchSearchResultPage(
        this.searchText, pageNumber, this.searchResultPageSize
      );

      this.updateTotalSearchResultPages(response.pagination.total_count);
      this.updateSearchResultPage({
        pageNumber, page: new SearchResultPageData(
          true, response.data, null
        )
      });
    } catch (error) {
			this.updateSearchResultPage({pageNumber, page: new SearchResultPageData(
				true, [], error
			)});
		}
  }

  @Action
  async updateSearchResults() {
    this.removeAllSearchResultPages();
    this.updateTotalSearchResultPages(0);

    await this.refreshSearchResultPage(0);
  }

  @Action
  async showOneMorePage() {
    if (this.searchResultPages.length < this.totalSearchResultPages) {
      await this.refreshSearchResultPage(this.searchResultPages.length);
    }
  }
}
