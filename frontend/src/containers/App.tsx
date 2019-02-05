import * as React from 'react';
import { useState, useEffect } from 'react';
import gql from "graphql-tag";
import {Query, Mutation, ApolloConsumer } from 'react-apollo';

import ListViewContainer from './ListView/ListView';

//import Header from '../components/Header'
//import Content from '../components/Content'
//import ContentContainer from '../containers/ListView/Content'
//import HeaderContainer from '../containers/ListView/Header'
//const { limit, offset, search, filter } = args.query;

//todo:
//list view
//detail view


//import ListView from '../containers/ListView';
import AppRouter from '../Router'

//add pagination here
const App = (props) => {
    return <AppRouter />
   // return <ListView />

}

export default App;



//get the poke list
//get poke types
//filter - favs/all, search,pokeType, viewType
//viewType switch
//*load more 


//content data
