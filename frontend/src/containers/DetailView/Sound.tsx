
import * as React from 'react';
import styled from 'styled-components';
import Pokemons from '../../components/Content/components/Pokemons'
import SoundImgPath from '../../assets/sound.png'

const Wrapper = styled.div`
    margin-top:40px;
`;

const Img = styled.img`
    margin-top:40px;
    width:30px;
    height:30px;
    cursor:pointer;
    margin:10px;
`;

const Sound = ({sound}) => {
    const audio = new Audio();
    audio.src = sound//"http://localhost:4000/sounds/1";
    console.log(SoundImgPath)
    return <Wrapper onClick = {()=>{audio.play()}}>
        <Img src = {SoundImgPath} />
    </Wrapper>
}

export default Sound;