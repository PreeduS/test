import * as React from 'react';
import * as ReactDOM from 'react-dom';
import  Description,{LineLabel, BoxLabel}  from './Description';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
import {mount} from 'enzyme';
import { enzymeFind } from 'styled-components/test-utils';


const props = {name:'pokename', maxCP:100, maxHP:150, height:{minimum:50,maximum:60}, weight:{minimum:30,maximum:60}, type:'typename'}

test("Pokemon description should match HP and CP", () => {
  let DescriptionEl = mount(<Description {...props}/>);

  const Lines = DescriptionEl.find('Line');
  const FirstLine = Lines.at(0);
  const SecondLine = Lines.at(1);
  
  expect(enzymeFind(FirstLine,LineLabel).text()).toEqual('CP: 100')
  expect(enzymeFind(SecondLine,LineLabel).text()).toEqual('HP: 150')
  
  
});



test("Pokemon description should match Weight and Height", () => {
  let DescriptionEl = mount(<Description {...props}/>);

  const DetailBoxes = DescriptionEl.find('DetailBox');
  const FirstBox = DetailBoxes.at(0);
  const SecondBox = DetailBoxes.at(1);
 
  expect(enzymeFind(FirstBox,BoxLabel).text()).toEqual('30 - 60')
  expect(enzymeFind(SecondBox,BoxLabel).text()).toEqual('50 - 60')
  
  
});

