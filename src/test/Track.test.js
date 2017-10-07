import React from 'react';
import { shallow } from 'enzyme';
import Track from 'components/Track';
import tracksData from "components/Track/data";

describe("Track", () => {
  const clips = [
    { name: "Funky Clip 1", url: 'funk.mp3' },
    { name: "Funky Clip 2", url: 'funk2.mp3' }
  ];
  const wrapper = shallow(<Track name="Track 1" clips={clips}/>);

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
