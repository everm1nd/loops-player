import React from 'react';
import { shallow } from 'enzyme';
import App from 'App';

it('renders an app', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});
