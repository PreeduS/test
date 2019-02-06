import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ViewType ,{ButtonWrapper}from './ViewType'; 
import {mount} from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import { enzymeFind } from 'styled-components/test-utils';
import 'jest-styled-components'

test("ViewType should be selected as a list", () => {

  const props = {viewType:'list', setViewType: ()=>{}}
  const ViewTypeEl = mount(<ViewType {...props}/>)


  expect(enzymeFind(ViewTypeEl,ButtonWrapper).at(0).props().selected).toBe(true)
  expect(enzymeFind(ViewTypeEl,ButtonWrapper).at(0)).toHaveStyleRule('background','rgb(132,190,163)')

});


