import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";


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

const FavoriteWrapper = styled.div`
    width:20px;
    height:20px;
    ${props => props.selected && `
        background:red;
    `}
    ${props => props.loading && `
        opacity: .2;
    `}
    border:1px solid red;
    margin-right:20px;
    border-radius:10px;
    cursor:pointer;

`;
const Favorite = ({isFavoriteInitValue, pokemonId}) => {

    const [isFavorite, setIsFavorite] = useState<Boolean>(isFavoriteInitValue);
    return <Mutation mutation={FAVORITE_POKEMON}>
        {(favoriteMutation, { data:favData ,loading:loadingFav, called: calledFav, error:errorFav}) => (

         <Mutation mutation={UNFAVORITE_POKEMON}>
            {(unFavoriteMutation, { data:unFavData , loading:loadingUnFav, called: calledUnFav, error:errorUnFav}) => {
                const loading = loadingFav || loadingUnFav;

            
                    var clickHandler = !loading ?(
                        isFavorite ?  () => {
                            unFavoriteMutation({ variables: { id: pokemonId} }) ;                 
                            setIsFavorite(false)
                        }
                        : 
                        () => {
                            favoriteMutation({ variables: { id: pokemonId} })
                            setIsFavorite(true)
                        }
                    ) : null;
             
                return <FavoriteWrapper selected = {isFavorite} onClick = {clickHandler } loading = {loading}> </FavoriteWrapper>
                
            }}
        </Mutation>

        

        
        )}
  </Mutation>

   
}

export default Favorite;