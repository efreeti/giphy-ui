import { mount } from '@vue/test-utils';

import '../config';

import ErrorMessage from '@/components/ErrorMessage.vue';

describe('ErrorMessage', () => {
  it('should render correctly', () => {
    expect(mount(ErrorMessage, {
      slots: {
        default: '<span>error message</span>',
      },
    }))
        .toMatchSnapshot();
  });
});
