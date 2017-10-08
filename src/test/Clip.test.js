import React from 'react';
import { shallow } from 'enzyme';
import Clip from 'components/Clip';
import Tone from 'tone';

describe("Clip", () => {
  const wrapper = shallow(<Clip id={0} url="something.wav" onClick={jest.fn()} />);

  it('renders a clip', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("plays when props.playbackState == started", () => {
    wrapper.setProps({ playbackState: "started" })
    expect(wrapper.instance().player.start).toHaveBeenCalled();
  })

  it("stops when props.playbackState == stopped", () => {
    wrapper.setProps({ playbackState: "stopped" })
    expect(wrapper.instance().player.stop).toHaveBeenCalled();
  })
})
