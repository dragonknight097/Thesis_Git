import React, {Component} from 'react';
import ApiService from './services/api';
import {Alert, Platform, StyleSheet, Text, View,
Image, TextInput, ImageBackground, Button, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import io from 'socket.io-client';
const URL = 'http://192.168.1.76:3000/'

export default class LoginForm extends Component {
    constructor(props){
        super(props);
        this.state = {
          email: '',
          pass: '',
        };
        this.apiService = ApiService()
      };
      async componentDidMount() {
        try {
          const value = await AsyncStorage.getItem('UserID');
          if (value !== null) {
            // We have data!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      }
      handleLogin = () => {
        this.apiService.login({
          email: this.state.email,
          password: this.state.pass,
        }).then(async (data) => {
          if (data !== null) {
            await AsyncStorage.setItem('UserId', data.email);
            this.props.navigation.navigate('AppStack');
          }
        //   else {
        //       alert('Please enter email!')
        //   }
        })
      }
    render() {
        return(
            <View style = {{
                flex: 1
            }}>
                <ImageBackground 
                    source = {require('./Images/large.jpg')}
                    style={{width: '100%', height: '100%'}}>
                <ScrollView>
                <View style = {{
                    height: 400,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image source = {require('./Images/human.png')}
                        style = {{
                            height: 120,
                            width: 120
                        }}>
                    </Image>
                    <Text style = {{
                        fontSize: 23,
                        marginTop: 15,
                        fontWeight: 'bold',
                        color: '#7D3AA4'
                    }}>
                    LORA APP CONTROL
                    </Text>
                </View>
                <View style = {{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <View style = {{
                        height: 60,
                        // backgroundColor: '#DED6D6',
                        borderRadius: 30,
                        marginLeft: 30,
                        marginRight: 30,
                        backgroundColor: 'rgba(246, 246, 246, 0.8)',
                        padding: 10
                    }}
                    >
                        <TextInput style = {{
                            fontSize: 17
                        }}
                            keyboardtype = 'email-address'
                            placeholder = 'Enter your email'
                            value = {this.state.email}
                            onChangeText={(text) => this.setState({email: text})}
                        >
                        </TextInput>
                    </View>
                    <View style = {{
                        height: 10
                    }}>
                    </View>
                    <View style = {{
                        height: 60,
                        borderRadius: 30,
                        marginLeft: 30,
                        marginRight: 30,
                        backgroundColor: 'rgba(246, 246, 246, 0.8)',
                        padding: 10
                    }}>
                        <TextInput style = {{
                            fontSize: 17
                        }}
                            keyboardtype = 'default'
                            placeholder = 'Enter your Password'
                            underlineColorAndroid={'transparent'}
                            secureTextEntry = {true}
                            value = {this.state.pass}
                            onChangeText={(text) => this.setState({pass: text})}
                        >
                        </TextInput>
                    </View>
                    <View style = {{
                        height: 10
                    }}>
                    </View>
                    <TouchableOpacity onPress = {
                        () => {
                            this.handleLogin()
                        }
                    }>
                        <View style = {{
                            backgroundColor: '#C7A2C7',
                            height: 50,
                            marginLeft: 120,
                            marginRight: 120,
                            borderRadius: 30
                        }}>
                            <Text style = {{
                                fontSize: 18,
                                textAlign: 'center',
                                marginTop: 11,
                                fontWeight: 'bold',
                                color: '#952E95'
                            }}>
                            LOGIN
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                </ScrollView>
                </ImageBackground>
            </View>
        )
    }   
}