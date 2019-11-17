import { mount } from '@vue/test-utils';

import '../config';

import ImageCard from '@/components/ImageCard.vue';

describe('ImageCard', () => {
  it('should render correctly', () => {
    expect(mount(ImageCard, {
      slots: {
        default: '<div></div>',
      },
    }))
        .toMatchSnapshot();
  });
});
