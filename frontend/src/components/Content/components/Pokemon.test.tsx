import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Pokemon from './Pokemon';
import {shallow} from 'enzyme';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

it("test", () => {
  const props = {id: "002", name: "Ivysaur", isFavorite: false, image: "https://img.pokemondb.net/artwork/ivysaur.jpg", types: ["Grass", "Poison"]}
  let PokemonEl = shallow(<Pokemon {...props} />);

  //expect(PokemonEl.childAt(2).find('div').text()).toContain('Ivysaur')
  expect(
    PokemonEl
    .children().get(1).style
    .props.children).toEqual('Ivysaur')
 
;


});