import React from 'react';
import { shallow } from 'enzyme';
import Track from 'components/Track';
import tracksData from "appData";

describe("Track", () => {
  const clips = [
    { id: 0, name: "Funky Clip 1", url: 'funk.mp3', duration: '2m' },
    { id: 1, name: "Funky Clip 2", url: 'funk2.mp3', duration: '2m' }
  ];
  const wrapper = shallow(<Track id={0} name="Track 1" clips={clips} onClick={jest.fn()}/>);

  it('renders a track', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("renders name", () => {
    expect(wrapper.find(".title").text()).toEqual('Track 1')
  })

  it("renders clips for this track", () => {
    expect(wrapper.find('Clip').length).toBe(2)
  });
})
