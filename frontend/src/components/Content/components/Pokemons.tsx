import * as React from 'react';
import styled from 'styled-components';
import Pokemon from './Pokemon';

interface IPropTypes {
    pokemons?: any[],
    searchTabType: string | null,
    viewType?: any,

}

const Wrapper = styled.div`

    display: grid;
    grid-column-gap: 5px;
    grid-row-gap: 5px;



    justify-content: center;	
    

    /*row view*/

    ${props => props.viewType === 'list' && `
        grid-template-columns: repeat(1, 100%);
        grid-auto-rows: 120px;
    `||`
        grid-template-columns: repeat(auto-fit, 300px);
        grid-auto-rows: 460px;
    `}



`;

const Pokemons = ({pokemons, searchTabType, viewType}: IPropTypes) => {
    if(!pokemons){return null;}
    return (
        <Wrapper viewType = {viewType}>
            {
                pokemons.map((pokemon, index) =>
                    <Pokemon 
                        key = {index} 
                        name = {pokemon.name} 
                        types = {pokemon.types} 
                        image = {pokemon.image} 
                        searchTabType = {searchTabType}
                        viewType = {viewType}
                    />
            )
        }
        </Wrapper>
    );
}

export default Pokemons;