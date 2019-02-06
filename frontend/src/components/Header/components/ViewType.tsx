import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display:flex;
    height:60px;
    border:1px solid gray;
`;

export const ButtonWrapper = styled.div`
    display:flex;
    width:40px;
    height:40px;
    margin:auto 10px;
    border:1px solid gray;

    ${props => props.selected && `
        background:rgb(132,190,163);
    `}
`;

interface IPropTypes {
    viewType?: any,
    setViewType:(value:any) => any
}

const Button = ({selected, onClick}) => (
    <ButtonWrapper selected = {selected} onClick={onClick}/>

);

const ViewType = (props: IPropTypes) => {
    const {
        viewType,
        setViewType
    } = props;
    return (
        <Wrapper>
            <Button selected = {viewType === 'list'} onClick = {()=>setViewType('list') }/>
            <Button selected = {viewType === 'grid'} onClick = {()=>setViewType('grid') }/>
        </Wrapper>
    );
}

export default ViewType;