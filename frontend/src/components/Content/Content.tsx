import * as React from 'react';
import Pokemons from './components/Pokemons'

interface IPropTypes {
    pokemons?: any[],
    loadMorePokemons?: any,
    searchTabType?: string | null,
    viewType?: any,

}

const Content = ({pokemons, loadMorePokemons, searchTabType, viewType}: IPropTypes) => {
  
    return (
        <div >
            <Pokemons pokemons = {pokemons} searchTabType = {searchTabType} viewType = {viewType}/>
            <div onClick = {()=>loadMorePokemons()}>load more</div>
            <hr />
        </div>
    );
}

export default Content;