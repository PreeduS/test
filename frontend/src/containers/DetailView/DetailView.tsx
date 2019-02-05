import * as React from 'react';
import {Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import styled from 'styled-components';

import Image from './Image';
import Evolutions from './Evolutions';
import Description from './Description';

const GET_POKEMON_BY_NAME = gql`
  query PokemonByName($name: String!) {
      pokemonByName(name: $name) {
 		name
      	types    	 	
      	weight{
          minimum
          maximum
        }
      	height{
          minimum
          maximum
        }
      	evolutions{
            id
            name
            isFavorite
        
            image
        }
      	maxCP
      	maxHP
      	image
      	sound
      	isFavorite
      }
  }
`;

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    flex:1;
    border:1px solid gray;
`;


const DetailView = ({match}) => {
    const {name} = match.params;
    return <Query query = {GET_POKEMON_BY_NAME} variables={{name}}>
        { ({loading, error, data}) => {
            
            if(loading){ return <div>loading</div> }
            if(error){ return <div>error</div> }
            const {pokemonByName} = data;
            const {image, evolutions, maxCP, maxHP, height, weight, types} = pokemonByName;
            const type = types && types.reduce( (acc, value) => 
                `${acc}, ${value}`
            ,'').substring(1);

        return <Wrapper>
            
                <Image image = {image} />
                <Description name = {name} maxCP = {maxCP} maxHP = {maxHP} height = {height} weight = {weight} type = {type} />
                <Evolutions evolutions = {evolutions} />
                
     
            </Wrapper>           
    }}
    </Query>
}

export default DetailView;