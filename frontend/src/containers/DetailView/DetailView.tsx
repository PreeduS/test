import * as React from 'react';
import {Query, Mutation } from 'react-apollo';
import gql from "graphql-tag";
import styled from 'styled-components';

import Image from './Image';
import Evolutions from './Evolutions';

const GET_POKEMON_BY_ID = gql`
  query PokemonById($id: ID!) {
      pokemonById(id: $id) {
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


//todo - move mutation on app for pages
const DetailView = ({match}) => {
    const {id} = match.params;
    return <Query query = {GET_POKEMON_BY_ID} variables={{id}}>
        { ({loading, error, data}) => {
            
            if(loading){ return <div>loading</div> }
            if(error){ return <div>error</div> }
            const {pokemonById} = data;
            const {image, evolutions} = pokemonById;
            console.log(pokemonById, image)

        return <Wrapper>
            
                <Image image = {image} />
                <Evolutions evolutions = {evolutions} />
                
     
            </Wrapper>           
    }}
    </Query>
    //return <div>DetailView</div>
}

export default DetailView;