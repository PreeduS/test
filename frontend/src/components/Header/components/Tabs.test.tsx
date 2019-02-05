import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Tabs from './Tabs';
import {mount} from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

test("First Tab should be selected", () => {
  const props = {searchTabType: 'all', setSearchTabType:()=>{}}
  let TabsEl = mount(<Tabs {...props} />);

  expect(TabsEl.find('Tab').at(0).props().selected).toBe(true)
  expect(TabsEl.find('Tab').at(1).props().selected).toBe(false)
  
});

test("Second Tab should be selected", () => {
  const props = {searchTabType: 'favorite', setSearchTabType:()=>{}}
  let TabsEl = mount(<Tabs {...props} />);

  expect(TabsEl.find('Tab').at(0).props().selected).toBe(false)
  expect(TabsEl.find('Tab').at(1).props().selected).toBe(true)

});