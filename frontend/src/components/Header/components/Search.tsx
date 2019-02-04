import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display:flex;
    flex:1;
 

`;
const Input = styled.input`
    display:flex;
    flex:1;
    height:80px;
    background:rgb(240,240,240);
    cololr:black;
    padding:5px;
    outline:none;
    border:1px solid grat;
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