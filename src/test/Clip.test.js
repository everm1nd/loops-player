import React from 'react';
import { shallow } from 'enzyme';
import Clip from 'components/Clip';

describe("Clip", () => {
  it('renders a clip', () => {
    shallow(<Clip />);
  });
})
