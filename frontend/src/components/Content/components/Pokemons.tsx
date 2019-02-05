import * as React from 'react';
import styled from 'styled-components';
import Pokemon from './Pokemon';

interface IPropTypes {
    pokemons?: any[],
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
    `}


    ${props => props.viewType === 'grid' && `
        grid-template-columns: repeat(auto-fit, 300px);
        grid-auto-rows: 460px;
    `}

    ${props => props.viewType === 'grid-small' && `
        grid-template-columns: repeat(auto-fit, 180px);
        grid-auto-rows: 240px;
        justify-content: left;	
    `}

`;

const Pokemons = ({pokemons, viewType}: IPropTypes) => {
    if(!pokemons){return null;}

    return (
        <Wrapper viewType = {viewType}>
            {
                pokemons.map((pokemon) =>
                    <Pokemon 
                        key = {pokemon.id} 
                        name = {pokemon.name} 
                        isFavorite = {pokemon.isFavorite} 
                        types = {pokemon.types} 
                        image = {pokemon.image} 
                        id = {pokemon.id} 
                        viewType = {viewType}
                    />
            )
        }
        </Wrapper>
    );
}

export default Pokemons;