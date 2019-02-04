import * as React from 'react';
import { useState, useEffect } from 'react';
import gql from "graphql-tag";
import {Query, Mutation, ApolloConsumer } from 'react-apollo';


const FAVORITE_POKEMON = gql`
    mutation FavoritePokemon($id:ID!){
        favoritePokemon(id:$id){
            name
            isFavorite
        } 
    }
`;

const UNFAVORITE_POKEMON = gql`
    mutation UnFavoritePokemon($id:ID!){
        unFavoritePokemon(id:$id){
                name
                isFavorite
        } 
    }

`;

const ListView = (props) => {
    return <Mutation mutation={FAVORITE_POKEMON}>
        {(favoriteMutation, { data:favData }) => (

         <Mutation mutation={UNFAVORITE_POKEMON}>
            {(unFavoriteMutation, { data:unFavData }) => (
                <div>
                    <div
                        onClick={e => {  favoriteMutation({ variables: { id: '011'} });  }}
                        >
                        favoriteMutation
                    </div>
                    <div
                        onClick={e => {  unFavoriteMutation({ variables: { id: '011'} });  }}
                        >
                        unFavoriteMutation
                    </div>
                </div>
            )}
        </Mutation>

        

        
        )}
  </Mutation>
}

export default ListView;