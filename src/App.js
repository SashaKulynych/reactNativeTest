import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import ListPage from './components/ListPage';

class App extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return <ListPage/>;
    }
}
AppRegistry.registerComponent('App', () => App);