import React from 'react';
import { shallow } from 'enzyme';
import Clip from 'components/Clip';
import Tone from 'tone';

describe("Clip", () => {
  const onClickSpy = jest.fn()
  const wrapper = shallow(<Clip id={0} url="something.wav" onClick={onClickSpy} duration='2m' />);

  it('renders a clip', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("plays when props.playbackState == started", () => {
    wrapper.setProps({ playbackState: "started" })
    expect(wrapper.instance().player.start).toHaveBeenCalledWith('@0.01');
  })

  it("stops when props.playbackState == stopped", () => {
    wrapper.setProps({ playbackState: "stopped" })
    expect(wrapper.instance().player.stop).toHaveBeenCalled();
  })

  it("calls onClick with id of clip", () => {
    wrapper.find('button').simulate('click')
    expect(onClickSpy).toHaveBeenCalledWith(0)
  })

  describe('when playing', () => {
    it('sets animation-time to value calculated from duration prop', () => {
      Tone.Time = jest.fn(() => ({
        toSeconds: jest.fn().mockReturnValue('4')
      }))
      const wrapper = shallow(<Clip
        id={0}
        url="something.wav"
        onClick={onClickSpy}
        duration='2m'
        playbackState="started"
      />);
      expect(wrapper.find('.progress').props().duration).toEqual('4')
    });
  });
})
