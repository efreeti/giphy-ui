import { mount } from '@vue/test-utils';

import '../config';

import SearchField from '@/components/SearchField.vue';

Math.random = () => 0.12345;

describe('SearchField', () => {
  it('should render correctly', () => {
    expect(mount(SearchField)).toMatchSnapshot();
  });

  it('should render label correctly', () => {
    expect(mount(SearchField, {
      slots: {
        label: 'some label',
      },
    }))
      .toMatchSnapshot();
  });

  it('should render initial value correctly', () => {
    expect(mount(SearchField, {
      propsData: {
        value: 'word',
      },
    }))
      .toMatchSnapshot();
  });

  it('should trigger "input" event on edit', () => {
    const element = mount(SearchField);

    element.find('input').vm.$emit('input', 'some text');

    expect(element.emitted().input.length).toEqual(1);
    expect(element.emitted().input[0]).toEqual(['some text']);
  });

  it('should trigger "search" event on enter key', () => {
    const element = mount(SearchField);

    element.find('input').trigger('keyup.enter');

    expect(element.emitted().search.length).toEqual(1);
  });

  it('should trigger "search" event on icon click', () => {
    const element = mount(SearchField);

    element.find('.md-icon').trigger('click');

    expect(element.emitted().search.length).toEqual(1);
  });
});
