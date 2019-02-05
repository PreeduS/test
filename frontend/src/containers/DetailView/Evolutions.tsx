import * as React from 'react';
import styled from 'styled-components';
import Pokemons from '../../components/Content/components/Pokemons'

const Wrapper = styled.div`
    margin-top:40px;
`;

const Header = styled.div`
    font-weight:bold;
    font-size:1.2rem;
`;

const Evolutions = ({evolutions}) => {
    if(!evolutions.length){
        return null;
    }
    return <Wrapper>
        <Header>Evolutions</Header>
        <Pokemons pokemons = {evolutions} viewType = {'grid-small'}/>
    </Wrapper>
}

export default Evolutions;