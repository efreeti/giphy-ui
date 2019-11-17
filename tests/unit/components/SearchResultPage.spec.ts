import { mount } from '@vue/test-utils';
import { intersectionObserver } from '@shopify/jest-dom-mocks';

import '../config';

import { SearchResultPageData } from '@/models/SearchResultPageData';
import SearchResultPage from '@/components/SearchResultPage.vue';
import { createImages } from '../utils';

describe('SearchResultPage', () => {
  beforeEach(() => {
    intersectionObserver.mock();
  });

  afterEach(() => {
    intersectionObserver.restore();
  });

  it('should render loading state correctly', () => {
    expect(mount(SearchResultPage, {
      propsData: {
        pageData: new SearchResultPageData(false, [], null),
        pageMaxSize: 12,
      },
    }))
        .toMatchSnapshot();
  });

  it('should render success state correctly', () => {
    expect(mount(SearchResultPage, {
      propsData: {
        pageData: new SearchResultPageData(
          true, createImages([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), null
        ),
        pageMaxSize: 12,
      },
    }))
        .toMatchSnapshot();
  });

  it('should render error state correctly', () => {
    expect(mount(SearchResultPage, {
      propsData: {
        pageData: new SearchResultPageData(true, [], new Error('Some error')),
        pageMaxSize: 12,
      },
    }))
        .toMatchSnapshot();
  });
});
