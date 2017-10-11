import React from 'react';

import togglePlayback from 'playbackStateMachine'
togglePlayback.onClick = jest.fn().mockReturnValue({ result:'magicstate' })

import App from 'App';
import Tone from 'tone';

describe('App', () => {
  const wrapper = shallow(<App />);

  it('renders an app', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it('sets BPM to 110', () => {
    expect(Tone.Transport.bpm.value).toEqual(110)
  })

  describe('._handleClipClick', () => {
    it('assigns state from playbackStateMachine to clip state', () => {
      wrapper.instance()._handleClipClick(0,0)
      expect(wrapper.state().tracks[0].clips[0].playbackState).toEqual('magicstate')
    })
  })

  describe('._tick', () => {
    it('changes state of staring clips to started', () => {
      const state = wrapper.state()
      state.tracks[0].clips[0].playbackState = "starting"
      wrapper.setState(state)

      wrapper.instance()._tick(0)
      expect(wrapper.state().tracks[0].clips[0].playbackState).toEqual("started")
    });

    it('changes state of stopping clips to stopped', () => {
      const state = wrapper.state()
      state.tracks[0].clips[0].playbackState = "stopping"
      wrapper.setState(state)

      wrapper.instance()._tick(0)
      expect(wrapper.state().tracks[0].clips[0].playbackState).toEqual("stopped")
    });
  });

  describe('componentDidMount', () => {
    beforeEach(() => {
      Tone.Transport.scheduleRepeat.mockReset();
      const wrapper = shallow(<App />);
    })

    it('sets a scheduleRepeat loop on global transport', () => {
      expect(Tone.Transport.scheduleRepeat).toHaveBeenCalled();
    })
  });
})
