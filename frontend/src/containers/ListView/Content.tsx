import * as React from 'react';
import { useState, useEffect } from 'react';
import gql from "graphql-tag";
import {Query, Mutation, ApolloConsumer } from 'react-apollo';

import Content from '../../components/Content/';


const ContentContainer = ({ pokemons, viewType}) => {

    return <Content 
        pokemons = {pokemons}
        viewType = {viewType}
    />


}

export default ContentContainer;