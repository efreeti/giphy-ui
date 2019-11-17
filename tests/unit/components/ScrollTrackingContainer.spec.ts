import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { intersectionObserver } from '@shopify/jest-dom-mocks';

import '../config';

import ScrollTrackingContainer from '@/components/ScrollTrackingContainer.vue';


describe('ScrollTrackingContainer', () => {
  beforeEach(() => {
    intersectionObserver.mock();
  });

  afterEach(() => {
    intersectionObserver.restore();
  });

  it('should render content correctly', () => {
    expect(mount(ScrollTrackingContainer, {
      slots: {
        default: '<div>some content</div>',
      },
    }))
        .toMatchSnapshot();
  });

  it('should render tracker correctly', () => {
    expect(mount(ScrollTrackingContainer, {
      propsData: {
        trackScrollEnd: true,
      },
    }))
        .toMatchSnapshot();
  });

  it('should emit "scroll-end" when tracked and visible', async () => {
    const wrapper = mount(ScrollTrackingContainer, {
      propsData: {
        trackScrollEnd: true,
      },
    });

    await Vue.nextTick();

		intersectionObserver.simulate({
			target: wrapper.find('[role=scroll-end-tracker]').element,
			isIntersecting: true,
		});

		expect(wrapper.emitted()['scroll-end'].length).toEqual(1);
  });

  it('should not emit "scroll-end" when not tracked and visible', async () => {
    const wrapper = mount(ScrollTrackingContainer, {
      propsData: {
        trackScrollEnd: false,
      },
    });

    await Vue.nextTick();

		intersectionObserver.simulate({
			target: wrapper.find('[role=scroll-end-tracker]').element,
			isIntersecting: true,
		});

		expect(wrapper.emitted()['scroll-end']).toBeUndefined();
  });
});
