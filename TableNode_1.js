import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, Image, TouchableOpacity,
        ScrollView
        } from 'react-native';
import ApiNode1 from './services/api';
import io from 'socket.io-client';
import { config } from './services/config';
let { baseURL } = config;

class FlatListItem extends Component{
    constructor(props){
        super(props);       
    }  
    render() {
        return (
            <ScrollView>
                <View style = {text.Round}>
                    <Text style = {text.container}>{this.props.item.nhietdo}</Text>
                </View>
            </ScrollView>
        )
    }
}

class FlatListItem_2 extends Component{
    constructor(props){
        super(props);       
    }  
    render() {
        return (
            <View style = {text.Round}>
                <Text style = {text.container}>{this.props.item.doamkhongkhi}</Text>
            </View>
        )
    }
}

class FlatListItem_3 extends Component{
    constructor(props){
        super(props);       
    }  
    render() {
        return (
            <View style = {text.Round}>
                <Text style = {text.container}>{this.props.item.doamdat}</Text>
            </View>
        )
    }
}

const NewStyles = StyleSheet.create({
    flatlist: {
        padding: 10,
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'italic',
        // color: '#212729'
    }
})

const text = StyleSheet.create ({
    container: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: 'bold'
    },
    Round: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#D3FCFC',
        width: 65,
        height: 30
    }
})


export default class TableNode1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            flatlistData: [],
            socket: io(baseURL, {jsonp: false})
        }
        this.apiNode1 = ApiNode1(); 
    }
    handleInfo = () => {
        this.apiNode1.getNode1().then((data) => {
          if (data.length1 > 0) {  
                    this.setState({
                        flatlistData: data.node1
                    })
                    this.setState({
                        length1: data.length1
                    })        
          }
          else {
              alert('Error Get Data')
          }
        })
    }

    backtoHome = () => {
        this.props.navigation.navigate("HomeStack");
    }

    handlelogout = () => {
        this.props.navigation.navigate("LoginStack");
    }

    componentDidMount() {
        this.handleInfo();
        this.state.socket.emit('table 1', { message: 'table 1'})
        this.state.socket.on('Receive Data Table 1', async (data) => {
            await this.handleInfo();
            this.state.socket.emit('table 1', { message: 'table 1'})
        })
    }
    render() {
        return(
            <View style = {styles.container}>
                <View style = {TextHeader.container}>
                    <TouchableOpacity onPress = {this.backtoHome}
                        style = {{
                            marginTop: 10
                        }}>
                        <Image 
                            source = {require('./Images/back.png')}
                            style = {TextHeader.image}
                        />
                    </TouchableOpacity>
                    <View style = {TextHeader.containerText}>
                        <Text style = {TextHeader.text}>Node 1 Parameters</Text>
                    </View>
                    <TouchableOpacity onPress = {this.handlelogout}
                        style = {{
                            marginTop: 10
                        }}>
                        <Image
                            source = {require('./Images/237815.png')}
                            style = {{
                                height: 40,
                                width: 40,
                                marginTop: 7,
                                marginLeft: 90
                            }}>
                        </Image>
                    </TouchableOpacity>
                </View>
                <View style = {mainbackground.background}>
                    <View style = {parameters.background}>
                        <View style = {{
                            flex: 1,
                            flexDirection: 'row'
                        }}>
                            <View style = {{
                                marginLeft: 5,
                            }}>
                                <Image 
                                    source = {require('./Images/hot.png')}
                                    style = {{
                                        marginTop: 20,
                                        width: 60,
                                        height: 60
                                    }}
                                />
                            </View>
                            <View style={{   
                                flexDirection: 'column',
                                flex: 1,
                                marginLeft: 10,
                            }}>  
                                <View>
                                    <Text style = {NewStyles.flatlist}>Temperature(°C)</Text>
                                </View>
                                <View style = {{
                                    flexDirection: 'column'
                                }}>
                                    <FlatList
                                        contentContainerStyle = {{
                                            flexDirection: 'row'
                                        }}
                                        renderItem={
                                            ({item, index}) => {
                                                return (
                                                    <FlatListItem 
                                                        item = {item} index ={index}>
                                                    </FlatListItem>
                                                )
                                            }
                                        }
                                        data={this.state.flatlistData.slice(this.state.length1 - 5)}
                                        keyExtractor={(item, index) => index.toString()}
                                    ></FlatList>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style = {parameters.background}>
                        <View style = {{
                            flex: 1,
                            flexDirection: 'row'
                        }}>
                            <View style = {{
                                marginLeft: 5,
                            }}>
                                <Image 
                                    source = {require('./Images/umbrella.png')}
                                    style = {{
                                        marginTop: 20,
                                        width: 60,
                                        height: 60
                                    }}
                                />
                            </View>
                            <View style={{   
                                flexDirection: 'column',
                                flex: 1,
                                marginLeft: 5,
                            }}>  
                                <View>
                                    <Text style = {NewStyles.flatlist}>Air Humidity(%)</Text>
                                </View>
                                <View style = {{
                                    flex: 1
                                }}>
                                <FlatList
                                    contentContainerStyle = {{
                                        flexDirection: 'row'
                                    }}
                                    renderItem={
                                        ({item, index}) => {
                                            return (
                                                <FlatListItem_2
                                                    item = {item} index ={index}>
                                                </FlatListItem_2>
                                            )
                                        }
                                    }
                                    data={this.state.flatlistData.slice(this.state.length1 - 5)}
                                    keyExtractor={(item, index) => index.toString()}
                                ></FlatList>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style = {parameters.background}>
                        <View style = {{
                            flex: 1,
                            flexDirection: 'row'
                        }}>
                            <View style = {{
                                marginLeft: 5,
                            }}>
                                <Image 
                                    source = {require('./Images/shovel.png')}
                                    style = {{
                                        marginTop: 20,
                                        width: 60,
                                        height: 60
                                    }}
                                />
                            </View>
                            <View style={{   
                                flexDirection: 'column',
                                flex: 1,
                                marginLeft: 5,
                            }}>  
                                <View>
                                    <Text style = {NewStyles.flatlist}>Soil Moisture(%)</Text>
                                </View>
                                <View style = {{
                                    flex: 1
                                }}>
                                <FlatList
                                    contentContainerStyle = {{
                                        flexDirection: 'row'
                                    }}
                                    renderItem={
                                        ({item, index}) => {
                                            return (
                                                <FlatListItem_3
                                                    item = {item} index ={index}>
                                                </FlatListItem_3>
                                            )
                                        }
                                    }
                                    data={this.state.flatlistData.slice(this.state.length1 - 5)}
                                    keyExtractor={(item, index) => index.toString()}
                                ></FlatList>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#071324'
    }
})

const TextHeader = StyleSheet.create ({
    container: {
        flexDirection: 'row',
        backgroundColor: '#072347'
    },
    containerText: {
        marginLeft: 10,
        height: 70
    },
    text: {
        marginLeft: 10,
        textAlign: 'center',
        marginTop: 20,
        fontSize: 24,
        color: '#F3F3F3',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15
    },
    image: {
        height: 40,
        width: 40,
        marginBottom: 20,
        marginLeft: 10,
        marginTop: 7
    }
})

const mainbackground = StyleSheet.create({
    background: {
        marginTop: 10
    }
})

const parameters = StyleSheet.create({
    background: {
        backgroundColor: '#B0D3FF',
        borderRadius: 20,
        flexDirection: 'column',
        marginLeft: 5,
        height: 100,
        marginTop: 15
    }
})
