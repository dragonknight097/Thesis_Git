import React, {Component} from 'react';
import {
    ScrollView,
    Image, View, Text, TextInput,
    Dimensions, StyleSheet, Switch, TouchableOpacity, ImageBackground
    } from 'react-native';
import { ToggleSwitch } from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ApiPump from './services/api';
import { axiosPost } from './services/axios-fetch';

export default class Control extends Component {
    constructor(props){
        super(props)
        const nodeid = 2;
        this.state = {
            isSwitchOn: false,
            On1: false,
            On2: false,
            On3: false,
            Timer: [0],
            node: nodeid
        }
        this.ApiPump = ApiPump();
    }
    
    handleControl = async () => {
        this.ApiPump.Pump({
            Auto: this.ToggleSwitchButton(),
            Timer: this.state.Timer
        }).then((result) => {
            
        })
    }

    ToggleSwitchButton = (value) => {
        if (!this.state.On1 && !this.state.On2 && !this.state.On3) {
            this.setState({isSwitchOn: value});
        }
    }

    ToggleSwitchOn1 = (value) => {
        if (!this.state.isSwitchOn) {
            this.setState({On1: value})
        }
    }

    ToggleSwitchOn2 = (value) => {
        if (!this.state.isSwitchOn) {
            this.setState({On2: value})
        }
    }

    ToggleSwitchOn3 = (value) => {
        if (!this.state.isSwitchOn) {
            this.setState({On3: value})
        }
    }

    sendTimer = (time) => {
        if (this.state.isSwitchOn && this.state.Timer) {
            this.ApiPump.Pump({
                Auto: this.state.isSwitchOn,
                Timer: this.state.Timer,
                node: this.state.node,
                On1: this.state.On1,
                On2: this.state.On2,
                On3: this.state.On3
            }).then((data) => {
            })
        }
    }

    ManualControl = (Manual) => {
        if (!this.state.isSwitchOn) {
            this.ApiPump.Pump({
                Auto: this.state.isSwitchOn,
                Timer: this.state.Timer,
                node: this.state.node,
                On1: this.state.On1,
                On2: this.state.On2,
                On3: this.state.On3
            }).then((data) => {})
        }
    }

    handleback = () => {
        this.props.navigation.navigate("HomeStack");
    }

    handlelogout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('LoginStack');
    }

    render() {
        return (
            <View style = {{
                flex: 1, 
                flexDirection: 'column',
                backgroundColor: '#071324'
            }}>
                <View style = {{
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style = {{
                        width: 70
                    }}
                        onPress = {this.handleback}>
                        <Image style = {{
                            width: 40,
                            height: 40,
                            marginTop: 15,
                            marginLeft: 10
                        }}
                            source = {require('./Images/back.png')}>
                        </Image>
                    </TouchableOpacity>
                    <View style = {{
                        flex: 1
                    }}>
                        <Text style = {{
                            marginTop: 18,
                            marginLeft: 2,
                            fontSize: 25,
                            color: '#5F7EFC',
                            fontWeight: 'bold',
                            textShadowColor: 'rgba(0, 0, 0, 1)',
                            textShadowOffset: {width: -1, height: 1},
                            textShadowRadius: 15
                        }}>
                            Controllers
                        </Text>
                    </View>
                    <View style = {{
                        flex: 1
                    }}>
                        <TouchableOpacity onPress = {
                            () => {this.handlelogout()}
                        }
                        >
                            <View>
                                <Image 
                                    style = {{
                                        marginLeft: 115,
                                        marginTop: 15,
                                        width: 40,
                                        height: 40
                                    }}
                                    source = {require('./Images/237815.png')}>
                                </Image>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style = {{
                    marginTop: 30,
                    flexDirection: 'row',
                    height: 50
                }}>
                    <View style = {{
                        flex: 1
                    }}>
                        <Text style = {{
                            fontSize: 24,
                            marginLeft: 15,
                            fontWeight: 'bold',
                            marginTop: 4,
                            color: '#6FABB5',
                            fontStyle: 'italic'
                        }}>
                            Automatic
                        </Text>
                    </View>
                </View>
                <View style = {{
                    flexDirection: 'column',
                    height: 120,
                    backgroundColor: '#ECF5F6',
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.44,
                    shadowRadius: 10.32,

                    elevation: 16,
                }}>
                    <View style = {{ 
                        flexDirection: 'row'
                    }}>
                        <Text style = {{
                            fontSize: 22,
                            marginTop: 10,
                            marginLeft: 20,
                            fontWeight: 'bold'
                        }}>
                            Type Timer:
                        </Text>
                        <View style = {{
                            flex: 1,
                            marginTop: 14,
                            marginRight: 65
                        }}>
                            <Switch 
                                onValueChange={this.ToggleSwitchButton}
                                value={this.state.isSwitchOn} 
                                style={{ 
                                    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                                    width: 50,
                                    marginLeft: 195
                                    }}
                            />
                        </View>
                    </View>
                    <View style = {{
                        flexDirection: 'row'
                    }}>
                        <View style = {{
                            backgroundColor: 'rgba(224, 223, 245, 0.8)',
                            borderRadius: 10,
                            marginTop: 13,
                            height: 45,
                            marginLeft: 24,
                            width: 110
                        }}>
                            <TextInput style = {{
                                fontSize: 19,
                                textAlign: 'center'
                            }}
                            value = {this.state.Timer}
                            onChangeText = {(txt) => {
                                this.setState({Timer: txt})
                            }}>
                            </TextInput>
                        </View>
                        <Text style = {{
                            fontSize: 22,
                            marginLeft: 10,
                            marginTop: 20,
                            fontWeight: 'bold'
                        }}>
                            Second
            
                        </Text>
                        <View style = {{
                            alignItems: 'flex-end',
                            flex: 1,
                        }}>
                            <TouchableOpacity onPress={(time) => { this.sendTimer(time) }}>
                                <Text style = {{
                                    marginTop: 21,
                                    marginRight: 25,
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: '#49A7F9',
                                    fontStyle: 'italic'
                                }}> Send </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style = {{
                    flexDirection: 'row',
                    flex: 1,
                }}>
                    <View style = {{
                        marginTop: 20,
                        flex: 1,
                    }}>
                        <Text style = {{
                            fontSize: 24,
                            marginLeft: 15,
                            fontWeight: 'bold',
                            marginTop: 4,
                            color: '#6FABB5',
                            fontStyle: 'italic'
                        }}>
                            Manual
                        </Text>
                    </View>
                    <TouchableOpacity style = {{
                        width: 120,
                    }}
                        onPress ={(Manual) => { this.ManualControl(Manual) }}>
                        <Text style = {{
                            textAlign: 'center',
                            marginTop: 22,
                            fontSize: 24,
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            color: '#49A7F9'
                        }}>
                            Press
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style = {{
                    marginTop: 20,
                    marginBottom: 5,
                    flexDirection: 'column',
                    height: 260,
                    backgroundColor: '#ECF5F6',
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.44,
                    shadowRadius: 10.32,

                    elevation: 16,
                }}>
                    <View style = {{
                        flexDirection: 'row',
                        flex: 1
                    }}>
                        <View style = {{
                            flexDirection: 'column',
                            width: 250
                        }}>
                            <View style = {{
                                flex: 1
                            }}>
                                <Text style = {{
                                    fontSize: 24,
                                    marginLeft: 20,
                                    fontWeight: 'bold',
                                    marginTop: 6,
                                }}>
                                    Pump 1
                                </Text>
                            </View>
                            <View style = {{
                                flex: 1
                            }}>
                                <Text style = {{
                                    marginLeft: 20,
                                    fontSize: 15,
                                    fontStyle: 'italic',
                                    color: '#49AAFF'
                                }}>
                                    Toggle to turn on the Pump 1
                                </Text>
                            </View>
                        </View>
                        <View style = {{
                            flex: 1,
                            marginTop: 10,
                            marginRight: 45
                        }}>
                            <Switch 
                                onValueChange={this.ToggleSwitchOn1}
                                value={this.state.On1} 
                                style={{ 
                                    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                                    width: 50,
                                    marginLeft: 80
                                }}
                            />
                        </View>
                    </View>
                    <View style = {{
                        flexDirection: 'row',
                        flex: 1
                    }}>
                    <View style = {{
                        flexDirection: 'column',
                        width: 250
                    }}>
                        <View style = {{
                            flex: 1
                        }}>
                            <Text style = {{
                                fontSize: 24,
                                marginLeft: 20,
                                fontWeight: 'bold',
                                marginTop: 6,
                            }}>
                                Pump 2
                            </Text>
                        </View>
                        <View style = {{
                            flex: 1
                        }}>
                            <Text style = {{
                                marginLeft: 20,
                                fontSize: 15,
                                fontStyle: 'italic',
                                color: '#49AAFF'
                            }}>
                                Toggle to turn on the Pump 2
                            </Text>
                        </View>
                    </View>
                    <View style = {{
                        flex: 1,
                        marginTop: 10,
                        marginRight: 45
                    }}>
                        <Switch 
                            onValueChange={this.ToggleSwitchOn2}
                            value={this.state.On2} 
                            style={{ 
                                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                                width: 50,
                                marginLeft: 80
                            }}
                        />
                    </View>
                    </View>
                    <View style = {{
                        flexDirection: 'row',
                        flex: 1
                    }}>
                    <View style = {{
                        flexDirection: 'column',
                        width: 250
                    }}>
                        <View style = {{
                            flex: 1
                        }}>
                            <Text style = {{
                                fontSize: 24,
                                marginLeft: 20,
                                fontWeight: 'bold',
                                marginTop: 6
                            }}>
                                Pump 3
                            </Text>
                        </View>
                        <View style = {{
                            flex: 1
                        }}>
                            <Text style = {{
                                marginLeft: 20,
                                fontSize: 15,
                                fontStyle: 'italic',
                                color: '#49AAFF'
                            }}>
                                Toggle to turn on the Pump 3
                            </Text>
                        </View>
                    </View>
                    <View style = {{
                        flex: 1,
                        marginTop: 10,
                        marginRight: 45
                    }}>
                        <Switch 
                            onValueChange={this.ToggleSwitchOn3}
                            value={this.state.On3} 
                            style={{ 
                                transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                                width: 50,
                                marginLeft: 80
                        }}
                        />
                    </View>
                    </View>
                </View>
            </View>
        )
    }
}