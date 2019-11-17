import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { intersectionObserver } from '@shopify/jest-dom-mocks';

import '../config';

import GiphyImage from '@/components/GiphyImage.vue';


describe('GiphyImage', () => {
  beforeEach(() => {
    intersectionObserver.mock();
  });

  afterEach(() => {
    intersectionObserver.restore();
  });

  it('should render uninitialized correctly', () => {
    expect(mount(GiphyImage, {
      propsData: {
        imageInfo: {
          url: 'some-image.gif',
          width: 100,
          height: 100,
        },
      },
    }))
        .toMatchSnapshot();
  });

  it('should render initialized correctly', async () => {
    const wrapper = mount(GiphyImage, {
      propsData: {
        imageInfo: {
          url: 'some-image.gif',
          width: 100,
          height: 100,
        },
      },
    });

    await Vue.nextTick();

		intersectionObserver.simulate({
			target: wrapper.find('[role=placeholder]').element,
			isIntersecting: true,
		});

		expect(wrapper).toMatchSnapshot();
  });
});
