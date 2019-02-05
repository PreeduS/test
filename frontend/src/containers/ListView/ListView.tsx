import * as React from 'react';
import { useState, useEffect } from 'react';
import gql from "graphql-tag";
import {Query, Mutation, ApolloConsumer } from 'react-apollo';

import HeaderContainer from './Header'
import ContentContainer from './Content'

import {TabType, IGetPokemonQueryParams} from '../../Types';
const getPokemonsQuery = gql`
  query getPokemonsQuery($PokemonsQueryInput: PokemonsQueryInput!) {
      pokemons(query: $PokemonsQueryInput) {
          limit
          edges{
            id
            name
            isFavorite
            types
            image
          }
      }
  }
`;

const pokemonsFetchStatusType = {
    pending: 'pending',   
    fulfilled: 'fulfilled',
}
let scrollOffset = 0;
const fetchLimit = 10;


const ListView = () => {

    const [pokemons, setPokemons] = useState<Object[]>([]);
    const [pokemonsFetchStatus, setPokemonsFetchStatus] = useState<string|null>(null);
    const [searchValue, _setSearchValue] = useState<string>('');
    const [searchPokemonType, _setSearchPokemonType] = useState<{value:String, label:String}>({value:'All',label:'All'});
    const [searchTabType, _setSearchTabType] = useState<TabType>('all');
    const [viewType, _setViewType] = useState<'grid'|'list'>('grid');

    const setScrollOffset = (value) => scrollOffset = value;
    const getScrollOffset = () => scrollOffset;


    return <ApolloConsumer>
        {client => {

            //shared
            const getPokemons = async (variables: IGetPokemonQueryParams) => { 
                const { data, ...rest } = await client.query({
                    query: getPokemonsQuery,
                    variables,
                    fetchPolicy: 'network-only'
                });
                return data.pokemons.edges;
            }

            //content logic
            //on scroll end
            const loadMorePokemons = async() => {
                if(
                    pokemonsFetchStatus === pokemonsFetchStatusType.pending ||
                    pokemonsFetchStatus === pokemonsFetchStatusType.fulfilled
                ){return;}
                   
                setPokemonsFetchStatus(pokemonsFetchStatusType.pending);
                const queryParams: IGetPokemonQueryParams = {
                    PokemonsQueryInput:{
                        limit: fetchLimit,
                        offset: scrollOffset,
                        search: searchValue ? searchValue : undefined,
                        filter:{
                            type: searchPokemonType.value === 'All' ? undefined : searchPokemonType.value,
                            isFavorite: searchTabType === 'favorite'
                        }
                    }
                }

                const newPokemons = await getPokemons(queryParams);
                const statePokemons = [
                    ...pokemons,
                    ...newPokemons
                ]

                setPokemons(statePokemons);
                scrollOffset += fetchLimit;

                if(newPokemons.length === 0){
                    setPokemonsFetchStatus(pokemonsFetchStatusType.fulfilled);
                }else{
                    setPokemonsFetchStatus(null);
                }
            };

    
            //header logic
            const reloadPokemons = async (queryParams: IGetPokemonQueryParams) =>{
                setPokemonsFetchStatus(pokemonsFetchStatusType.pending);
                const newPokemons = await getPokemons(queryParams);
        
                const statePokemons = [ ...newPokemons]
        
                setPokemons(statePokemons);
                const scrollOffset = getScrollOffset() + fetchLimit;
                setScrollOffset(scrollOffset)
        
        
                if(newPokemons.length < fetchLimit){
                    setPokemonsFetchStatus(pokemonsFetchStatusType.fulfilled);
                }else{
                    setPokemonsFetchStatus(null);
                }
            }

            //effects
            useEffect(() => {
                setScrollOffset(0)
                loadMorePokemons();
            },[]);


            useEffect(() => {
                const scrollHandler = (e) => {
                    
                    if(pokemonsFetchStatus !== pokemonsFetchStatusType.pending && pokemonsFetchStatus !== pokemonsFetchStatusType.fulfilled){
                        const extraOffset = 50;
                        let reachedEnd = window.pageYOffset + window.innerHeight + extraOffset >= document.body.scrollHeight 

                
                        if(reachedEnd){
                            loadMorePokemons();
                        }
                    }
                }

                window.addEventListener("scroll", scrollHandler);

                return function cleanup() {
                    window.removeEventListener("scroll",scrollHandler);

                };
            },[pokemons, pokemonsFetchStatus]);

    
        
            return (
                <React.Fragment>
                    <HeaderContainer 
                        searchValue = {searchValue}
                        searchPokemonType = {searchPokemonType}
                        searchTabType = {searchTabType}
                        viewType = {viewType}

                        setSearchValue = {_setSearchValue}
                        setSearchPokemonType = {_setSearchPokemonType}
                        setSearchTabType = {_setSearchTabType}
                        setScrollOffset = {setScrollOffset}                       
                        reloadPokemons = {reloadPokemons}
                        setViewType = {_setViewType}
              
                    />
                
                    <ContentContainer 
                        pokemons = {pokemons}                 
                        viewType = {viewType}
                    />
                    pokemonsFetchStatus = {pokemonsFetchStatus}
                </React.Fragment>
            );
            
        }}
    </ApolloConsumer>




      
}

export default ListView;