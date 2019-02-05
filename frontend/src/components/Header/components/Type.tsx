import * as React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const Wrapper = styled.div`
    display:flex;
    flex:.6;
    
`;

interface IPropTypes {
    searchPokemonType: Object,
    setSearchPokemonType: (value:any) => any,
    pokemonTypesList:[]
}

const Type = (props: IPropTypes) => {
    const {
        searchPokemonType, pokemonTypesList, setSearchPokemonType
    } = props;

    const options = [
        ...pokemonTypesList
    ];
    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            display:'flex',
            flex:'1',
            outline:'none'
        }),
        menu: (provided, state) => ({
            ...provided,
            display:'flex',
            flex:'1',
        }),
        menuList: (provided, state) => ({
            ...provided,
            display:'flex',
            flexDirection:'column',
            flex:'1',
        }),
        control: (provided, state) => ({
            ...provided,
            display:'flex',
            flex:'1',
        }),
        option: (provided, state) => ({
            ...provided,
            display:'flex',
            flex:'1',
        }),
        
    }

       
    return (
        <Wrapper>
            <Select
                value={searchPokemonType}
                onChange={setSearchPokemonType}
                options={options}
                styles = {customStyles}
            />
        </Wrapper>
    );
}

export default Type;