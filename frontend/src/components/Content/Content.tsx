import * as React from 'react';
import Pokemons from './components/Pokemons'

interface IPropTypes {
    pokemons?: any[],
    viewType?: any,

}

const Content = ({pokemons, viewType}: IPropTypes) => {
  
    return (
        <div >
            <Pokemons pokemons = {pokemons} viewType = {viewType}/>
        </div>
    );
}

export default Content;