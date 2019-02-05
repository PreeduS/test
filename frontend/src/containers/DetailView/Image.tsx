import * as React from 'react';
import styled from 'styled-components';


interface IPropTypes {
    image: string,

}

const Wrapper = styled.div`
    display:flex;

    width:100%;
    max-width:700px;
    min-height:260px;;
    max-height:400px;;
    height:35vh;
    margin:0px auto;
`;
const ImageContainer = styled.div`
    flex:1;
    background:rgba(220,220,220,.3);
    background:url(${props => props.image});
    background-size:contain;
    background-repeat:no-repeat;
    background-position:center;

`;

const Image = ({image}: IPropTypes) => {
  

    return (
        <Wrapper >
             <ImageContainer image = {image} />
        
        </Wrapper>
    );
}

export default Image;