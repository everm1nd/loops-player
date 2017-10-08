import React from 'react';
import { shallow } from 'enzyme';
import Clip from 'components/Clip';
import Tone from 'tone';

describe("Clip", () => {
  const wrapper = shallow(<Clip url="something.wav" />);

  it('renders a clip', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('when clicked', () => {
    describe('when clip is stopped', () => {
      it('plays the sound', () => {
        wrapper.find('button').simulate('click')
        expect(wrapper.instance().player.start).toHaveBeenCalled();
      })
    })

    describe('when clip is playing', () => {
      it('stops the sound', () => {
        wrapper.instance().player.state = 'started'
        wrapper.find('button').simulate('click')
        expect(wrapper.instance().player.stop).toHaveBeenCalled();
      })
    })
  })
})
