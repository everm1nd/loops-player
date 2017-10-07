import React from 'react';
import { shallow } from 'enzyme';
import Clip from 'components/Clip';

describe("Clip", () => {
  const wrapper = shallow(<Clip />);

  it('renders a clip', () => {
    expect(wrapper).toMatchSnapshot();
  });
})
