import * as React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Favorite from '../../Commons/Favorite'

interface IPropTypes {
    id: String,
    name: String,
    isFavorite: Boolean,
    types?: String[],
    image: String,
    viewType?: any,

}

const Wrapper = styled.div`


    border:1px solid gray;  
    display:flex;
    flex-direction:column;

    /*row view*/
    ${props => props.viewType === 'list' && `
        flex-direction:row;
    `}



`;

const ImageContainer = styled(NavLink)`
    flex:1;
    background:rgba(220,220,220,.3);
    background:url(${props => props.image});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;

    /*row view*/
    ${props => props.viewType === 'list' && `
        flex-basis:120px;
        flex-grow:0;
    `}
`;
const Footer = styled.div`
    display:flex;
    align-items:center;

    background:rgb(230,230,230);


    /*row view*/
    ${props => props.viewType === 'list' && `
        flex:1;
        height:100%;
    `||`
        height:60px;
    `}

    
`;
const FooterContent = styled.div`
    flex:1;
    padding: 0px 5px;
`;
const Name = styled.div`
    font-weight:bold;
`;
const Type = styled.div`

`;

const Pokemon = ({id, name, isFavorite, types, image, viewType}: IPropTypes) => {

    return (
        <Wrapper viewType = {viewType}>
     
            <ImageContainer image = {image} viewType = {viewType} exact to={`/pokemon/${name}`} />
       
            <Footer viewType = {viewType}>
                <FooterContent>
                    <Name>{name}</Name>
                    <Type> {
                        types && types.reduce( (acc, value) => 
                            `${acc}, ${value}`
                        ,'').substring(1)
                    }</Type>
                </FooterContent>
                <Favorite isFavoriteInitValue = {isFavorite} pokemonId ={id}/>
            </Footer>
        
        </Wrapper>
    );
}

export default Pokemon;