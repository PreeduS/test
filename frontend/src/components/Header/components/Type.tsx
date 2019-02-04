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
        /*{ value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }*/
        ...pokemonTypesList
    ];
    const customStyles = {
        container: (provided, state) => ({
            ...provided,
            border: '1px solid blue',
            display:'flex',
            flex:'1',
        }),
        menu: (provided, state) => ({
            ...provided,
            border: '1px solid red',
            display:'flex',
            flex:'1',
        }),
        menuList: (provided, state) => ({
            ...provided,
            border: '1px solid purple',
            display:'flex',
            flexDirection:'column',
            flex:'1',
        }),
        control: (provided, state) => ({
            ...provided,
            border: '1px solid green',
            display:'flex',
            flex:'1',
        }),
        option: (provided, state) => ({
            ...provided,
            border: '1px solid yellow',
            display:'flex',
            flex:'1',
        }),
        
    }

        
    const handleChange = (selectedOption) => {
       
        console.log(`Option selected:`, selectedOption);
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