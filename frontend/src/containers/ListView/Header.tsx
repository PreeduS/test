import * as React from 'react';

import gql from "graphql-tag";
import {Query, Mutation, ApolloConsumer } from 'react-apollo';

import Header from '../../components/Header';


const getPokemonsTypes = gql`
    query getPokemonsTypes {
        pokemonTypes 
  }
`;


const fetchLimit = 10;

import {IGetPokemonQueryParams, TabType} from '../../Types'

const ContentContainer = ({
    searchValue, searchPokemonType, searchTabType, viewType, 
    setViewType,
    setSearchValue: _setSearchValue, 
    setScrollOffset,
    setSearchPokemonType: _setSearchPokemonType,
    setSearchTabType: _setSearchTabType,

    reloadPokemons
}) => {


    const getCommonQueryParams = (extend:Object = {}) => {
        const queryParams: IGetPokemonQueryParams = {
            PokemonsQueryInput:{
                limit: fetchLimit,
                offset: 0,
                search: searchValue ? searchValue : undefined,
                filter:{
                    type: searchPokemonType.value === 'All' ? undefined : searchPokemonType.value,
                    isFavorite: searchTabType === 'favorite'
                },
                ...extend

            }
        }
        return queryParams;
    }


    const setSearchValue = async (value) => {         
        setScrollOffset(0)
        _setSearchValue(value);

        const queryParams = getCommonQueryParams({search: value});
        reloadPokemons(queryParams);

    }

    const setSearchPokemonType = (type) => {   
       setScrollOffset(0)
        _setSearchPokemonType(type);
        
        const queryParams = getCommonQueryParams(
            {filter:{
                type: type.value === 'All' ? undefined : type.value,
                isFavorite: searchTabType === 'favorite'
            }}
        );
        reloadPokemons(queryParams);
    }
    
    const setSearchTabType = (type:TabType) => {  // all/favorite  
        setScrollOffset(0)
        _setSearchTabType(type);
        const queryParams = getCommonQueryParams(
            {filter:{
                type: searchPokemonType.value === 'All' ? undefined : searchPokemonType.value,
                isFavorite: type === 'favorite'
            }}
        );

        reloadPokemons(queryParams);
    }

    return (

         <Query query = {getPokemonsTypes}>
            { ({loading, error, data}) => {
                
                if(loading){ return <div>loading</div> }
                if(error){ return <div>error</div> }
                let {pokemonTypes} = data;
                pokemonTypes = ['All', ...pokemonTypes]
                const pokemonTypesList = pokemonTypes.map( pokemon => ({value: pokemon, label:pokemon}) )

            return <Header 
                searchValue = {searchValue}
                searchPokemonType = {searchPokemonType}
                searchTabType = {searchTabType}
                viewType = {viewType}

                setSearchValue = {setSearchValue}
                setSearchPokemonType = {setSearchPokemonType}
                pokemonTypesList = {pokemonTypesList}
                setViewType = {setViewType}
                setSearchTabType = {setSearchTabType}
                
            />             
        }}
        </Query>
        
    )
}

export default ContentContainer;