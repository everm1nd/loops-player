import React from 'react';
import { shallow } from 'enzyme';
import Clip from 'components/Clip';
import Tone from 'tone';

describe("Clip", () => {
  const wrapper = shallow(<Clip url="something.wav" />);

  it('renders a clip', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('plays the sound when clicked', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.instance().player.start).toHaveBeenCalled();
  })
})
