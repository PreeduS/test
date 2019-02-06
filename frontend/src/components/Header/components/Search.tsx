import * as React from 'react';
import styled from 'styled-components';


export const Input = styled.input`
    display:flex;
    flex:1;
    height:60px;
    background:rgb(240,240,240);
    padding:15px;
    font-size:20px;
    color:rgb(60,60,60);
    outline:none;
    border:1px solid gray;
    box-shadow:none;

`;

interface IPropTypes {
    searchValue?: any,
    setSearchValue: (value:string) => any,
}
const Search = (props: IPropTypes) => {
    const {
        setSearchValue, 
        searchValue,
    } = props;
    return (

        <Input onChange = {e => setSearchValue(e.target.value)} value = {searchValue}>
     
        </Input>
    );
}

export default Search;