import * as React from 'react';
import styled from 'styled-components';
import Pokemons from '../../components/Content/components/Pokemons'

const Evolutions = ({evolutions}) => {

    return <Pokemons pokemons = {evolutions} viewType = {'grid'}/>
}

export default Evolutions;