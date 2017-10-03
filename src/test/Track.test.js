import React from 'react';
import { shallow } from 'enzyme';
import Track from 'components/Track';

describe("Track", () => {
  const wrapper = shallow(<Track name="Track 1"/>);

  it('renders a track', () => {
    wrapper
  });

  it("renders name", () => {
    expect(wrapper.find(".title").text()).toEqual('Track 1')
  })

  it("renders clips for this track", () => {
    expect(wrapper.find('Clip').length).toBe(2)
  });
})
