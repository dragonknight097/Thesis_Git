import React, {Component} from 'react';
import {
    ScrollView,
    Image, View, Text, TextInput,
    Dimensions, StyleSheet, TouchableOpacity, FlatList
    } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {LineChart} from 'react-native-chart-kit';
import ChartNode1 from './services/api';
import io from 'socket.io-client';
import { config } from './services/config';
import ApiNode from './services/api';
let { baseURL } = config;

class FlatListItem extends Component {
    constructor(props){
        super(props);               
    }  
    render() {
        return (
            <View>
                <Text style = {parameterstyle.number}>
                    {this.props.item.nhietdo}°C
                </Text>
            </View>
        )
    }
}

class FlatListItem1 extends Component{
    constructor(props){
        super(props);       
    }  
    render() {
        return (
            <View>
                <Text style = {parameterstyle.number}>
                    {this.props.item.doam}%
                </Text>
            </View>
        )
    }
}

class FlatListItem2 extends Component{
    constructor(props){
        super(props);       
    }  
    render() {
        return (
            <View>
                <Text style = {parameterstyle.number}>
                    {this.props.item.doamkhongkhi}%
                </Text>
            </View>
        )
    }
}

class FlatListItem3 extends Component{
    constructor(props){
        super(props);       
    }  
    render() {
        return (
            <View>
                <Text style = {parameterstyle.number}>
                    {this.props.item.doamdat}%
                </Text>
            </View>
        )
    }
}

class FlatListItem4 extends Component{
    constructor(props){
        super(props);       
    }  
    render() {
        return (
            <View>
                <Text style = {parameterstyle.number}>
                    {this.props.item.ph}
                </Text>
            </View>
        )
    }
}

class FlatListItem5 extends Component{
    constructor(props){
        super(props);       
    }  
    render() {
        return (
            <View>
                <Text style = {parameterstyle.number}>
                    {this.props.item.oxyhoatan}%
                </Text>
            </View>
        )
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DataNode1: [],
            DataNode2: [],
            socket: io(baseURL, {jsonp: false})
        }
        this.apiNode = ApiNode(); 
    }

    handleInfo = () => {
        this.apiNode.getNode1().then((data) => {
            if (data.length1 > 0) {  
                this.setState({
                    DataNode1: data.node1
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

    handleInfo2 = () => {
        this.apiNode.getNode2().then((data) => {
            if (data.length2 > 0) {  
                this.setState({
                    DataNode2: data.node2
                })
                this.setState({
                    length2: data.length2
                })        
            }
            else {
              alert('Error Get Data')
            }
        })
    }

    componentDidMount() {
        this.handleInfo();
        this.handleInfo2();
        this.state.socket.emit('home 1', { message: 'home 1'});
        this.state.socket.emit('home 2', { message: 'home 2'});
        this.state.socket.on('Data Home 1', async (data) => {
            await this.handleInfo();
            await this.handleInfo2();
            this.state.socket.emit('home 1', { message: 'home 1'})
        })
    }

    handlelogout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('LoginStack');
    }
    
    handlegoin = () => {
        this.props.navigation.navigate('AppStack');
    }

    render() 
    {
        return (
            <View style = {backgroundstyle.background}>
                <View style = {{
                    flexDirection: 'row'
                }}>
                    <View style = {headerstyle.homestyle}>
                        <Image source = {
                            require('./Images/house.png')
                        }
                        style = {{
                            marginTop: 10,
                            marginLeft: 10,
                            height: 50,
                            width: 50
                        }}></Image>
                    </View>
                    <View style = {headerstyle.background}>
                        <Text style = {headerstyle.textstyle}>
                            Home
                        </Text>
                    </View>
                    <View style = {headerstyle.logoutstyle}>
                        <TouchableOpacity onPress = {this.handlelogout}>
                            <View style = {{
                                height: 70,
                                width: 70,
                            }}>
                                <Image source = {require('./Images/237815.png')}
                                    style = {{
                                        marginTop: 10,
                                        marginLeft: 5,
                                        height: 50,
                                        width: 50,
                                    }}>
                                </Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {{
                    height: 70,
                    flexDirection: 'row'
                }}>
                    <View style = {dashboardstyle.background}>
                        <Text style = {dashboardstyle.text}>
                            Dashboard
                        </Text>
                    </View>
                    <View style = {dashboardstyle.backgroundAnalystics}>
                        <View style = {{
                            flex: 1
                        }}>
                            <Text style = {dashboardstyle.textAnalystics}>
                                GO IN
                            </Text>
                        </View>
                        <View style = {{
                            flex: 1
                        }}>
                            <TouchableOpacity onPress = {this.handlegoin}>
                                <Image source = {require('./Images/goinanalystics.png')}
                                    style = {{
                                        marginTop: 5,
                                        marginLeft: 10,
                                        height: 50,
                                        width: 50
                                    }}>
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style = {parameterstyle.background}>
                    <View style = {{
                        flexDirection: 'row',
                        height: 120,
                        marginLeft: 5,
                        marginRight: 5,
                        backgroundColor: '#071324'
                    }}>
                        <View style = {parameterstyle.parameters}>
                            <View style = {parameterstyle.Numberbackground}>
                                <View>
                                    <Image source = {require('./Images/fahrenheit.png')}
                                        style = {parameterstyle.image}>
                                    </Image>
                                </View>
                                <View style = {parameterstyle.Numberstyle}>
                                    <View>
                                        <Text style = {parameterstyle.textPara}>
                                            Temperature
                                        </Text>
                                    </View>
                                    <FlatList
                                        renderItem={
                                            ({item, index}) => {
                                                return (
                                                    <FlatListItem 
                                                        item = {item} index ={index}>
                                                    </FlatListItem>
                                                )
                                            }
                                        }
                                        data={this.state.DataNode1.slice(this.state.length1 - 1)}
                                        keyExtractor={(item, index) => index.toString()}>
                                    </FlatList>
                                </View>
                            </View>
                            <View style = {parameterstyle.updatebackground}>
                                <View>
                                    <Image source = {require('./Images/refresh-button.png')}
                                        style = {parameterstyle.updateicon}>
                                    </Image>
                                </View>
                                <View style = {{
                                    flex: 1
                                }}>
                                    <Text style = {parameterstyle.updatetext}>
                                        Update Now
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style = {{
                            width: 10,
                            backgroundColor: '#071324'
                        }}></View>
                        <View style = {parameterstyle.parameters}>
                            <View style = {parameterstyle.Numberbackground}>
                                <View>
                                    <Image source = {require('./Images/thermometer.png')}
                                        style = {parameterstyle.image}>
                                    </Image>
                                </View>
                                <View style = {parameterstyle.Numberstyle}>
                                    <View>
                                        <Text style = {parameterstyle.textPara}>
                                                 Humidity
                                        </Text>
                                    </View>
                                    <FlatList
                                        renderItem={
                                            ({item, index}) => {
                                                return (
                                                    <FlatListItem1
                                                        item = {item} index ={index}>
                                                    </FlatListItem1>
                                                )
                                            }
                                        }
                                        data={this.state.DataNode2.slice(this.state.length2 - 1)}
                                        keyExtractor={(item, index) => index.toString()}>
                                    </FlatList>
                                </View>
                            </View>
                            <View style = {parameterstyle.updatebackground}>
                                <View>
                                    <Image source = {require('./Images/refresh-button.png')}
                                        style = {parameterstyle.updateicon}>
                                    </Image>
                                </View>
                                <View style = {{
                                    flex: 1
                                }}>
                                    <Text style = {parameterstyle.updatetext}>
                                        Update Now
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style = {{
                        height: 10,
                    }}>
                    </View>
                    <View style = {{
                        flexDirection: 'row',
                        height: 120,
                        marginLeft: 5,
                        marginRight: 5,
                        backgroundColor: '#071324',
                    }}>
                        <View style = {parameterstyle.parameters}>
                            <View style = {parameterstyle.Numberbackground}>
                                <View>
                                    <Image source = {require('./Images/air-humidity.png')}
                                        style = {parameterstyle.image}>
                                    </Image>
                                </View>
                                <View style = {parameterstyle.Numberstyle}>
                                    <View>
                                        <Text style = {parameterstyle.textPara}>
                                            Air-Humi
                                        </Text>
                                    </View>
                                    <FlatList
                                        renderItem={
                                            ({item, index}) => {
                                                return (
                                                    <FlatListItem2 
                                                        item = {item} index ={index}>
                                                    </FlatListItem2>
                                                )
                                            }
                                        }
                                        data={this.state.DataNode1.slice(this.state.length1 - 1)}
                                        keyExtractor={(item, index) => index.toString()}>
                                    </FlatList>
                                </View>
                            </View>
                            <View style = {parameterstyle.updatebackground}>
                                <View>
                                    <Image source = {require('./Images/refresh-button.png')}
                                        style = {parameterstyle.updateicon}>
                                    </Image>
                                </View>
                                <View style = {{
                                    flex: 1
                                }}>
                                    <Text style = {parameterstyle.updatetext}>
                                        Update Now
                                    </Text>
                                </View>
                            </View> 
                        </View>
                        <View style = {{
                            width: 10,
                            backgroundColor: '#071324'
                        }}></View>
                        <View style = {parameterstyle.parameters}>
                            <View style = {parameterstyle.Numberbackground}>
                                <View>
                                    <Image source = {require('./Images/soilmoisture.png')}
                                        style = {parameterstyle.image}>
                                    </Image>
                                </View>
                                <View style = {parameterstyle.Numberstyle}>
                                    <View>
                                        <Text style = {parameterstyle.textPara}>
                                            Soil 
                                        </Text>
                                    </View>
                                    <FlatList
                                        renderItem={
                                            ({item, index}) => {
                                                return (
                                                    <FlatListItem3
                                                        item = {item} index ={index}>
                                                    </FlatListItem3>
                                                )
                                            }
                                        }
                                        data={this.state.DataNode1.slice(this.state.length1 - 1)}
                                        keyExtractor={(item, index) => index.toString()}>
                                    </FlatList>
                                </View>
                            </View>
                            <View style = {parameterstyle.updatebackground}>
                                <View>
                                    <Image source = {require('./Images/refresh-button.png')}
                                        style = {parameterstyle.updateicon}>
                                    </Image>
                                </View>
                                <View style = {{
                                    flex: 1
                                }}>
                                    <Text style = {parameterstyle.updatetext}>
                                        Update Now
                                    </Text>
                                </View>
                            </View> 
                        </View>
                    </View>
                    <View style = {{
                        height: 10,
                    }}>
                    </View>
                    <View style = {{
                        flexDirection: 'row',
                        height: 120,
                        marginLeft: 5,
                        marginRight: 5,
                        backgroundColor: '#071324',
                    }}>
                        <View style = {parameterstyle.parameters}>
                            <View style = {parameterstyle.Numberbackground}>
                                <View>
                                    <Image source = {require('./Images/ph.png')}
                                        style = {parameterstyle.image}>
                                    </Image>
                                </View>
                                <View style = {parameterstyle.Numberstyle}>
                                    <View>
                                        <Text style = {parameterstyle.textPara}>
                                            PH
                                        </Text>
                                    </View>
                                    <FlatList
                                        renderItem={
                                            ({item, index}) => {
                                                return (
                                                    <FlatListItem4 
                                                        item = {item} index ={index}>
                                                    </FlatListItem4>
                                                )
                                            }
                                        }
                                        data={this.state.DataNode2.slice(this.state.length2 - 1)}
                                        keyExtractor={(item, index) => index.toString()}>
                                    </FlatList>
                                </View>
                            </View>
                            <View style = {parameterstyle.updatebackground}>
                                <View>
                                    <Image source = {require('./Images/refresh-button.png')}
                                        style = {parameterstyle.updateicon}>
                                    </Image>
                                </View>
                                <View style = {{
                                    flex: 1
                                }}>
                                    <Text style = {parameterstyle.updatetext}>
                                        Update Now
                                    </Text>
                                </View>
                            </View> 
                        </View>
                        <View style = {{
                            width: 10,
                            backgroundColor: '#071324'
                        }}></View>
                        <View style = {parameterstyle.parameters}>
                            <View style = {parameterstyle.Numberbackground}>
                                <View>
                                    <Image source = {require('./Images/oxygen-tank.png')}
                                        style = {parameterstyle.image}>
                                    </Image>
                                </View>
                                <View style = {parameterstyle.Numberstyle}>
                                    <View>
                                        <Text style = {parameterstyle.textPara}>
                                            Oxygen
                                        </Text>
                                    </View>
                                    <FlatList
                                        renderItem={
                                            ({item, index}) => {
                                                return (
                                                    <FlatListItem5 
                                                        item = {item} index ={index}>
                                                    </FlatListItem5>
                                                )
                                            }
                                        }
                                        data={this.state.DataNode2.slice(this.state.length2 - 1)}
                                        keyExtractor={(item, index) => index.toString()}>
                                    </FlatList>
                                </View>
                            </View>
                            <View style = {parameterstyle.updatebackground}>
                                <View>
                                    <Image source = {require('./Images/refresh-button.png')}
                                        style = {parameterstyle.updateicon}>
                                    </Image>
                                </View>
                                <View style = {{
                                    flex: 1
                                }}>
                                    <Text style = {parameterstyle.updatetext}>
                                        Update Now
                                    </Text>
                                </View>
                            </View> 
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const backgroundstyle = StyleSheet.create({
    background: {
        backgroundColor: '#071324',
        flex: 1,
        flexDirection: 'column'
    }
})

const headerstyle = StyleSheet.create({
    background: {
        backgroundColor: '#072347',
        height: 70,
        flex: 1
    }, 
    homestyle: {
        backgroundColor: '#072347'
    },
    textstyle: {
        marginTop: 17,
        marginLeft: 20,
        fontSize: 25,
        color: '#D4D7DB',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15
    },
    logoutstyle: {
        height: 70,
        backgroundColor: '#072347'
    }
})

const dashboardstyle = StyleSheet.create({
    background: {
        flex: 1,
        marginTop: 13
    },
    text: {
        marginTop: 15,
        marginLeft: 30,
        fontSize: 25,
        color: '#5F7EFC',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15
    },
    backgroundAnalystics: {
        width: 150,
        flexDirection: 'row',
        marginTop: 15
    },
    textAnalystics: {
        fontWeight: 'bold',
        color: '#4694FA',
        marginTop: 18,
        marginLeft: 26,
        fontSize: 18
    }
})

const parameterstyle = StyleSheet.create({
    background: {
        height: 380,
        marginTop: 30
    },
    parameters: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#B0D3FF',
        width: '45%',
        borderRadius: 20,
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,

        elevation: 20,
    },
    Numberbackground: {
        height: 80,
        flexDirection: 'row'
    },
    Numberstyle: {
        flexDirection: 'column'
    },
    textPara: {
        textAlign: 'right',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 6
    },
    number: {
        marginTop: 2,
        marginLeft: 80,
        fontSize: 19,
        fontWeight: 'bold'
    },
    updatebackground: {
        flex: 1,
        flexDirection: 'row'
    },
    image: {
        height: 50,
        width: 50,
        marginTop: 14,
        marginLeft: 10
    },
    updateicon: {
        height: 30,
        width: 30,
        marginLeft: 20
    },
    updatetext: {
        fontSize: 17,
        marginLeft: 2,
        marginTop: 3,
        fontStyle: 'italic'
    }
})