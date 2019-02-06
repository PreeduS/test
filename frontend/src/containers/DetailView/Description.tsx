import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    background:rgb(240,240,240);
    border-top:1px solid rgb(210,210,210);
    border-bottom:1px solid rgb(210,210,210);
    padding:10px;
`;

const Header = styled.div`
    font-weight:bold;
    font-size:1.2rem;
`;
const Type = styled.div`
`;

const LineWrapper = styled.div`
    display:flex;
`;
const LineStyle = styled.div`
    flex:1;
    height: 10px;
    ${props => `background: ${props.color}`};
    border-radius:3px;
    margin: auto 0px;

`; 
export const LineLabel = styled.div`
    flex-shrink:0;
    flex-basis:80px;
    margin: auto 0px;
    margin-left:10px;
    text-align:center;
    
`;

const DetailBoxWrapper = styled.div`
    display:flex;
`;
const BoxWrapper = styled.div`
    flex:1;
    display:flex;
    flex-direction:column;
    border:1px solid rgb(210,210,210);
    &:first-child{
        border-right:0px;
    }
    height:90px;
    text-align:center;
    padding: 10px 0px;
`;
const BoxHeader = styled.div`
    font-weight:bold;
    font-size:1.2rem;
    margin-bottom:10px;
`;
export const BoxLabel = styled.div``;

const Line = ({color, label}) => {
    return <LineWrapper>
        <LineStyle color = {color}/>
        <LineLabel>{label}</LineLabel>
    </LineWrapper>
}

const DetailBox = ({header, label}) => {
    return <BoxWrapper>
        <BoxHeader>{header}</BoxHeader>
        <BoxLabel>{label}</BoxLabel>
    </BoxWrapper>
}

const Description = ({name, maxCP, maxHP, height, weight, type}) => {

    return <Wrapper>
        <Header>{name}</Header>
        <Type>{type}</Type>
        <Line color = {'purple'} label = {`CP: ${maxCP}`}/>
        <Line color = {'rgb(132,190,163)'} label = {`HP: ${maxHP}`} />
        <DetailBoxWrapper>
            <DetailBox header = {'Weight:'} label = {`${weight.minimum} - ${weight.maximum}`} />
            <DetailBox header = {'Height:'} label = {`${height.minimum} - ${height.maximum}`} />
        </DetailBoxWrapper>

    </Wrapper>
}

export default Description;