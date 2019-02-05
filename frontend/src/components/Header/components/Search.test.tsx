import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Search from './Search';
import {mount} from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

test("...", () => {
  let mockFn = jest.fn(() => 'pokemon');
  const props = {searchValue:'poke',setSearchValue:mockFn }
  let SearchEl = mount(<Search {...props} />);

  SearchEl.find('input').simulate('change');
  console.log(SearchEl.find('input').debug())

  
});


