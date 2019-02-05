

import * as React from 'react';
import styled from 'styled-components';

const TabsWrapper = styled.div`
    display:flex;
    height:80px;
 

`;
const TabWrapper = styled.div`
    display:flex;
    border:1px solid rgb(132,190,163);
    flex:1;
    ${props => props.selected && `
        background: rgb(132,190,163);
        color:white;
    ` || `
        color: rgb(132,190,163);
    `}

`;

const Label = styled.div`
    margin:auto;
`;

interface IPropTypes {
    searchTabType?: any,
    setSearchTabType: (value:string) => any,
}

export const Tab = (props) => {
    const {label, selected, onClick} = props;
    return (
        <TabWrapper selected = {selected} onClick = {onClick} >
            <Label>
                {label}
            </Label>
            
        </TabWrapper>
    );
}

const Tabs = (props: IPropTypes) => {
    const {
        searchTabType, 
        setSearchTabType
    } = props;
    return (
        <TabsWrapper>
            <Tab selected = {searchTabType === 'all'} label = {'All'} onClick = {()=>setSearchTabType('all')}/>
            <Tab selected = {searchTabType === 'favorite'} label = {'Favorites'} onClick = {()=>setSearchTabType('favorite')}/>          
        </TabsWrapper>
    );
}

export default Tabs;