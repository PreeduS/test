import * as React from 'react';
import { useState, useEffect } from 'react';
import gql from "graphql-tag";
import {Query, Mutation, ApolloConsumer } from 'react-apollo';

import ListViewContainer from './ListView/ListView';

import Header from '../components/Header'
import Content from '../components/Content'
//const { limit, offset, search, filter } = args.query;

//todo:
//list view
//detail view


interface IGetPokemonQueryParams{
    PokemonsQueryInput:{
        limit?: number,
        offset?: number,
        search?: string,
        filter?: Object,
    }
}

type TabType = 'all' | 'favorite' | null;

const getPokemonsQuery = gql`
  query getPokemonsQuery($PokemonsQueryInput: PokemonsQueryInput!) {
      pokemons(query: $PokemonsQueryInput) {
          limit
          edges{
            id
            name
            types
            image
          }
      }
  }
`;

//pokemons(limit: $limit,offset:2, search:"", filter:{type:"",isFavorite:""}) {
const getPokemonsTypes = gql`
    query getPokemonsTypes {
        pokemonTypes 
  }
`;

let scrollOffset = 0;
//let loadingByScroll = false;

const fetchLimit = 10;

const pokemonsFetchStatusType = {
    pending: 'pending',     //loadingByScroll
    fulfilled: 'fulfilled',
}

const App = (props) => {

    const [pokemons, setPokemons] = useState<Object[]>([]);
    const [pokemonsFetchStatus, setPokemonsFetchStatus] = useState<string|null>(null);
    const [searchValue, _setSearchValue] = useState<string>('');
    const [searchPokemonType, _setSearchPokemonType] = useState<{value:String, label:String}>({value:'All',label:'All'});
    const [searchTabType, _setSearchTabType] = useState<TabType>('all');
    const [viewType, _setViewType] = useState<'grid'|'list'>('grid');

    return <Query query = {getPokemonsTypes}>
                { ({loading, error, data}) => {
                    
                    if(loading){ return <div>loading</div> }
                    if(error){ return <div>error</div> }
                    let {pokemonTypes} = data;
                    pokemonTypes = ['All', ...pokemonTypes]
                    const pokemonTypesList = pokemonTypes.map( pokemon => ({value: pokemon, label:pokemon}) )
                 
                    return <ApolloConsumer>
                        {client => {

                                //console.log('pokemons zz ',pokemons)
                            //shared
                            const getPokemons = async (variables: IGetPokemonQueryParams) => { //both header and content
                                const { data, ...rest } = await client.query({
                                    query: getPokemonsQuery,
                                    variables,
                                    fetchPolicy:'network-only'
                                });

                                return data.pokemons.edges;

                            }
                            /*const resetContentState = () => {
                                 if(pokemonsFetchStatus !== null){
                                    setPokemonsFetchStatus(null);
                                }
                                if(pokemonsFetchStatus !== pokemonsFetchStatusType.pending){
                                    setPokemonsFetchStatus(pokemonsFetchStatusType.pending);
                                }
                                
                                scrollOffset = 0;
                                setPokemons([])
                            }*/

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
                 //header && content
                 const setViewType = (viewType) => {
                    _setViewType(viewType);
                }
                            //content logic
                            //on scroll end
                            const loadMorePokemons = async() => {
                                //todo - add logic for search, type - favs/all
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

                                
                                /* if(searchValue){
                                    queryParams.PokemonsQueryInput.search = searchValue;
                                }*/
                                console.log('queryParams ',queryParams)
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
                                console.log('reload newPokemons ',newPokemons)
                                const statePokemons = [ ...newPokemons]

                                setPokemons(statePokemons);
                                scrollOffset += fetchLimit;

                                //if(newPokemons.length === 0){
                                if(newPokemons.length < fetchLimit){
                                    setPokemonsFetchStatus(pokemonsFetchStatusType.fulfilled);
                                }else{
                                    setPokemonsFetchStatus(null);
                                }
                            }
                    

                            const setSearchValue = async (value) => {
                                //resetContentState();
                                scrollOffset = 0;
                                _setSearchValue(value);
                                //loadMorePokemons()
                                
                                /*const queryParams: IGetPokemonQueryParams = {
                                    PokemonsQueryInput:{
                                        limit: fetchLimit,
                                        offset: 0,
                                        search: value
                                        }
                                }*/
                                const queryParams = getCommonQueryParams({search: value});
                                reloadPokemons(queryParams);

                            }
                            const setSearchPokemonType = (type) => {
                                //resetContentState();
                                scrollOffset = 0;
                                _setSearchPokemonType(type);
                                
                                /*const queryParams: IGetPokemonQueryParams = {
                                    PokemonsQueryInput:{
                                        limit: fetchLimit,
                                        offset: 0,
                                        search: searchValue,
                                        filter:{
                                            type: type.value === 'All' ? undefined : type.value
                                        }
                                    }
                                }*/
                                const queryParams = getCommonQueryParams(
                                    {filter:{
                                        type: type.value === 'All' ? undefined : type.value,
                                        isFavorite: searchTabType === 'favorite'
                                    }}
                                );
                                reloadPokemons(queryParams);
                            }
                            const setSearchTabType = (type:TabType) => {  // all/favorite  
                                //resetContentState();
                                scrollOffset = 0;
                                _setSearchTabType(type);
                                const queryParams = getCommonQueryParams(
                                    {filter:{
                                        type: searchPokemonType.value === 'All' ? undefined : searchPokemonType.value,
                                        isFavorite: type === 'favorite'
                                    }}
                                );

                                console.log('setSearchTabType queryParams ',queryParams)
                                reloadPokemons(queryParams);
                            }


                   


                            //todo - add mutation for fav/unfav     && filter:{...} update



                            //effects
                            useEffect(() => {
                                loadMorePokemons();
                            },[]);

                           /* useEffect(() => {
                                //  resetContentState();
                                // loadMorePokemons();

                            },[searchValue]);*/

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
                                    <Header 
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

                                    <ListViewContainer />
                                    <Content 
                                        loadMorePokemons = {loadMorePokemons} 
                                        pokemons = {pokemons}
                                        searchTabType = {undefined}
                                        viewType = {viewType}
                                    />
                                    pokemonsFetchStatus = {pokemonsFetchStatus}
                                </React.Fragment>
                            );
                            
                        }}
                    </ApolloConsumer>
            
                }}
            </Query>
        

    
}

export default App;


//get the poke list
//get poke types
//filter - favs/all, search,pokeType, viewType
//viewType switch
//*load more 


//content data
