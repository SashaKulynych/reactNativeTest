import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,ScrollView,Image,StatusBar,ToolbarAndroid,RefreshControl,View,TextInput,ListView
} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Fab } from 'native-base';
let  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 } );
class ListPage extends Component {
    constructor(){
        super();
        this.state={
            dataSource:ds,
            rawData:[],
            searchText:'',
            refreshing:false,
            updateTime:'',
            value:0,
            active: false,
            searchData:[]}
        ;
        this._renderRow = this._renderRow.bind(this);
        this.listSortTitle = this.listSortTitle.bind(this);
        console.log('Constructor');
    }
    getNotes() {
        return fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
    }
    componentDidMount() {
        this.fetchData();
        console.log('DidMount');
    }
    fetchData() {
        this.setState({refreshing: true});
        this.getNotes()
            .then((data) => {
                this.setState({
                    dataSource: ds.cloneWithRows(data),
                    isLoading: false,
                    empty: false,
                    rawData: data,
                    searchData:data,
                    refreshing:false,
                    updateTime : new Date().toLocaleString()
                });
                console.log(this.state.dataSource);
                console.log(this.state.rawData);
                console.log(this.state.searchData);
            })
            .catch((error) => {
            });
        console.log('Constructor');
    }
    filterSearch(text){
        let data = this.state.rawData;
        const newData = data.filter((item)=>{
            const itemData = item.body.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData)>-1;
        });
        this.setState({
            searchData:newData,
            dataSource:ds.cloneWithRows(newData),
            searchText: text
        });
    }
    listSortTitle(){
        let data = this.state.searchData;

        let newData = data.sort((a, b)=>{
                if (a.title > b.title)
                    return 1;
                if (a.title < b.title)
                    return -1;
                return 0;
            });
        this.setState({
            dataSource:ds.cloneWithRows(newData),
        });
    }
    listSortId(){
        let data = this.state.searchData;
        const newData = data.sort((a, b)=>{
                if (a.id > b.id)
                    return 1;
                if (a.id < b.id)
                    return -1;
                return 0;
            });
        this.setState({
            dataSource:ds.cloneWithRows(newData),
        });
    }
    _renderRow(rowData){
        return(
            <View style={styles.blockStyle}>
                <Text><Text style={styles.textStyle}>userId:</Text> {rowData.userId}</Text>
                <Text><Text style={styles.textStyle}>id:</Text> {rowData.id}</Text>
                <Text><Text style={styles.textStyle}>title:</Text> {rowData.title}</Text>
                <Text><Text style={styles.textStyle}>body:</Text> {rowData.body}</Text>
            </View>
        );
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input
                            value={this.state.searchText}
                            onChangeText={(text)=>{this.filterSearch(text)}}
                            placeholder='Search'
                        />
                        <Icon name="ios-list" />
                    </Item>
                </Header>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.fetchData.bind(this)}
                        />}
                >
                    <Text style={styles.timeStyle}>{this.state.updateTime}</Text>
                    <ListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this._renderRow.bind(this)}
                    />
                </ScrollView>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="md-settings" />
                    <Button style={{ backgroundColor: '#34A34F' }} onPress={()=>this.listSortId()}>
                        <Text>Id</Text>
                    </Button>
                    <Button style={{ backgroundColor: '#3B5998' }} onPress={()=>this.listSortTitle()}>
                        <Text>Title</Text>
                    </Button>
                </Fab>
            </View>
        );
    }
}
let styles = StyleSheet.create({
    searchBar: {
        paddingLeft: 30,
        fontSize: 22,
        height: 10,
        flex: .1
    },
    timeStyle:{
        textAlign:'center',
        marginBottom:5,
        color:'silver',
        fontSize:12
    },
    blockStyle:{
        padding:10,
        borderBottomWidth:2,
    },
    textStyle:{
        fontSize:18,
        fontWeight:'bold'
    }

});
export default ListPage;