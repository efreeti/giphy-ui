import { mount } from '@vue/test-utils';

import '../config';

import ImagePlaceholder from '@/components/ImagePlaceholder.vue';

describe('ImagePlaceholder', () => {
  it('should render correctly', () => {
    expect(mount(ImagePlaceholder, {
      slots: {
        default: '<span>some content</span>',
      },
    }))
        .toMatchSnapshot();
  });
});
