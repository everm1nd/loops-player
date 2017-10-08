import React from 'react';
import { shallow } from 'enzyme';
import App from 'App';

describe('App', () => {
  const wrapper = shallow(<App />);

  it('renders an app', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('._handleClipClick', () => {
    it('change playbackStatus of selected clip', () => {
      wrapper.instance()._handleClipClick(0,0)
      expect(wrapper.state().tracks[0].clips[0].playbackState).toEqual('started')
    })

    it('change playbackStatus of selected clip', () => {
      const state = Object.assign({}, wrapper.state())
      state.tracks[0].clips[0].playbackState = 'started'
      wrapper.setState(state)
      wrapper.instance()._handleClipClick(0,0)
      expect(wrapper.state().tracks[0].clips[0].playbackState).toEqual('stopped')
    })
  })
})
