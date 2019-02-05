import * as React from 'react';
import styled from 'styled-components';
import Tabs from './components/Tabs';
import Search from './components/Search';
import Type from './components/Type';
import ViewType from './components/ViewType';

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
`;

const OptionsMenu = styled.div`
    display:flex;
`;

interface IPropTypes {
    searchValue?: any,
    searchPokemonType?: any,
    searchTabType?: any,
    viewType?: any,

    pokemonTypesList: [],

    setSearchValue: (value:string) => any,
    setSearchPokemonType: (value:any) => any,
    setViewType:(value:any) => any,
    setSearchTabType:(value:any) => any,
}

const Header = (props: IPropTypes) => {
    const {
        searchValue, searchPokemonType, searchTabType, viewType, pokemonTypesList,
        setSearchValue, setSearchPokemonType, setViewType, setSearchTabType
    } = props;
    return (
        <Wrapper>
            <Tabs searchTabType = {searchTabType} setSearchTabType = {setSearchTabType}/>
            <OptionsMenu>
                <Search setSearchValue = {setSearchValue} searchValue = {searchValue}/>
                <Type searchPokemonType = {searchPokemonType} setSearchPokemonType = {setSearchPokemonType} pokemonTypesList = {pokemonTypesList}/>
                <ViewType setViewType = {setViewType} viewType = {viewType}/>
            </OptionsMenu>
    
            
        </Wrapper>
    );
}

export default Header;