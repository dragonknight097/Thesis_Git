import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Image, Icon} from 'react-native';
import { createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { TabNavigator } from 'react-navigation';
import TableNode2 from './TableNode_2';
import TableNode1 from './TableNode_1';
import Chart1 from './Chart1';
import Chart2 from './Chart2';
import LoginForm from './LoginForm';
import Control from './Control.js';
import Home from './Home.js';

const TabNavigatorCon = createMaterialTopTabNavigator({
    Tab1: {
        screen: TableNode1,
        navigationOptions: {
            tabBarLabel: "Table 1",
            tabBarIcon: ({ navigation }) => (
            <Image source = {require('./Images/checklist.png')}
                    style={{width: 32, height: 32}} />
            )
        },
    },
    Tab2: {
        screen: TableNode2,
        navigationOptions: {
            tabBarLabel: "Table 2",
            tabBarIcon: ({ navigation }) => (
            <Image source = {require('./Images/checklist(1).png')}
                style={{width: 30, height: 30}} />
            )
        },
    },
    Tab3: {
        screen: Chart1,
        navigationOptions: {
            tabBarLabel: "Chart 1",
            tabBarIcon: ({ navigation }) => (
            <Image source = {require('./Images/analysis.png')}
                style={{width: 30, height: 30}} />
            )
        },
    },
    Tab4: {
        screen: Chart2,
        navigationOptions: {
            tabBarLabel: "Chart 2",
            tabBarIcon: ({ navigation }) => (
            <Image source = {require('./Images/chart.png')}
                style={{width: 37, height: 37}} />
            )
        },
    },
    Tab5: {
        screen: Control,
        navigationOptions: {
            tabBarLabel: "Control",
            tabBarIcon: ({ navigation }) => (
            <Image source = {require('./Images/click.png')}
                    style={{width: 30, height: 30}} />
            )
        },
    },
    },
    {
    swipeEnabled: true,
    animationEnabled: true,
    tabBarPosition:"bottom",
    tabBarOptions: {
        labelStyle: {
            fontSize: 11,
        },
        style: {
            backgroundColor: '#696969',
            height: 65,
            padding: -5
        },    
        showIcon: true
    },
    },
);

const MainStackNavigator = createStackNavigator({
    LoginStack: {
        screen: LoginForm,
        navigationOptions: {
            header: null,
        },
    },
    HomeStack: {
        screen: Home,
        navigationOptions: {
            header: null,
        }
    },
    AppStack: {
        screen: TabNavigatorCon,
        navigationOptions: {
            header: null,
        },
    }
},
{
    initialRouteName: 'AppStack',
});

const AppContainer =  createAppContainer(MainStackNavigator);

export default AppContainer;