import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from '@vue/test-utils';
import { intersectionObserver } from '@shopify/jest-dom-mocks';

import './config';
import { createImages } from "./utils";

import { SearchResultPageData } from "@/models/SearchResultPageData";
import App from '@/App.vue';
import SearchField from "@/components/SearchField.vue";
import ScrollTrackingContainer from "@/components/ScrollTrackingContainer.vue";

Vue.use(Vuex);

Math.random = () => 0.12345;

const defaultState = {
  searchText: '',
  searchResultPages: [],
  totalSearchResultPages: 0,
};

function createMockedStore(state: any) {
  return {
    modules: {
      app: {
        namespaced: true,
        state,
        getters: {
          hasMoreSearchResultPages: () => state.searchResultPages.length < state.totalSearchResultPages,
        },
        mutations: {
          updateSearchText: jest.fn(),
        },
        actions: {
          updateSearchResults: jest.fn(),
          showOneMorePage: jest.fn(),
        },
      },
    },
  };
}

describe('App', () => {
  beforeEach(() => {
    intersectionObserver.mock();
  });

  afterEach(() => {
    intersectionObserver.restore();
  });

  it('should render correctly', () => {
    const store = new Vuex.Store(createMockedStore({
      searchText: 'text',
      searchResultPages: [
        new SearchResultPageData(true, createImages([1, 2, 3, 4, 5]), null),
        new SearchResultPageData(true, [], new Error('some error')),
        new SearchResultPageData(false, [], null),
      ],
      searchResultPageSize: 10,
      totalSearchResultPages: 4,
    }));

    expect(mount(App, { store })).toMatchSnapshot();
  });

  it('should updateSearchText when editing search field', async () => {
    const store = createMockedStore(defaultState);
    const app = mount(App, { store: new Vuex.Store(store) });

    app.find(SearchField).vm.$emit('input', 'text');

    expect(store.modules.app.mutations.updateSearchText).toHaveBeenCalledWith(defaultState, 'text');
  });

  it('should updateSearchResults when mounted', async () => {
    const store = createMockedStore(defaultState);

    mount(App, { store: new Vuex.Store(store) });

    expect(store.modules.app.actions.updateSearchResults).toHaveBeenCalledWith(
      expect.anything(), undefined, undefined
    );
  });

  it('should updateSearchResults again when submitting search field', async () => {
    const store = createMockedStore(defaultState);
    const app = mount(App, { store: new Vuex.Store(store) });

    store.modules.app.actions.updateSearchResults.mockClear();

    app.find(SearchField).vm.$emit('search');

    expect(store.modules.app.actions.updateSearchResults).toHaveBeenCalledWith(
      expect.anything(), undefined, undefined
    );
  });

  it('should showOneMorePage when scroll end', async () => {
    const store = createMockedStore(defaultState);
    const app = mount(App, { store: new Vuex.Store(store) });

    app.find(ScrollTrackingContainer).vm.$emit('scroll-end');

    expect(store.modules.app.actions.showOneMorePage).toHaveBeenCalledWith(
      expect.anything(), undefined, undefined
    );
  });
});
