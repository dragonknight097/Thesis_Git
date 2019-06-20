import React, {Component} from 'react';
import { TouchableOpacity, View, Dimensions,
        StyleSheet, Image, Text, TextInput,
        ScrollView } from 'react-native';
import threshold from './services/api'

export default class Threshold extends Component {
    constructor(props){
        super(props);
        this.state = {
            nhietdo: [0],
            doam: [0],
            doamkhongkhi: [0],
            doamdat: [0],
            ph: [0],
            oxyhoatan: [0]
        }
        this.threshold = threshold();
    }

    backtoHome = () => {
        this.props.navigation.navigate('HomeStack');
    }

    SendThreshold = (value) => {
            this.threshold.threshold({
                nhietdo_t: this.state.nhietdo,
                doam_t: this.state.doam,
                doamkhongkhi_t: this.state.doamkhongkhi,
                doamdat_t: this.state.doamdat,
                ph_t: this.state.ph,
                oxyhoatan_t: this.state.oxyhoatan
            }).then((data) => {})
        }

    render() {
        return (
            <View style = {background.background}>
                <View style = {header.background}>
                    <TouchableOpacity onPress = {this.backtoHome}>
                        <Image source = {
                            require('./Images/back.png')
                        }
                        style = {{
                            marginTop: 16,
                            marginLeft: 10,
                            height: 40,
                            width: 40
                        }}></Image>
                    </TouchableOpacity>
                    <View>
                        <Text style = {header.textheader}>
                            Set Threshold
                        </Text>
                    </View>
                </View>
                <View style = {thresholdtable.container}>
                    <View style = {thresholdtable.styles}>
                        <Text style = {thresholdtable.textStyle}>
                            Set up Threshold
                        </Text>
                        <TouchableOpacity style = {{
                            height: 40,
                            width: 90,
                            backgroundColor: '#8BFF93',
                            borderRadius: 20,
                            marginLeft: 130,
                            marginTop: 10
                        }}
                            onPress = {this.SendThreshold}>
                            <Text style = {{
                                marginTop: 6,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 18
                            }}>
                                Send
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {thresholdtable.styles}>
                        <Image source = {require('./Images/fahrenheit.png')}
                            style = {thresholdtable.image}>
                        </Image>
                        <View style = {thresholdtable.setstyle}>
                            <View style = {thresholdtable.textContainer}>
                                <TextInput style = {thresholdtable.textInput}
                                    value = {this.state.nhietdo}
                                    onChangeText = {(txt) => {
                                        this.setState({nhietdo: txt})
                                    }}>
                                </TextInput>
                            </View>
                            <Text style = {thresholdtable.text}>
                                Temperature(°C)
                            </Text>
                        </View>
                    </View>
                    <View style = {thresholdtable.styles}>
                        <Image source = {require('./Images/thermometer.png')}
                            style = {thresholdtable.image}>
                        </Image>
                        <View style = {thresholdtable.setstyle}>
                            <View style = {thresholdtable.textContainer}>
                                <TextInput style = {thresholdtable.textInput}
                                    value = {this.state.doam}
                                    onChangeText = {(txt) => {
                                        this.setState({doam: txt})
                                    }}>
                                </TextInput>
                            </View>
                            <Text style = {thresholdtable.text}>
                                Humidity(%)
                            </Text>
                        </View>
                    </View>
                    <View style = {thresholdtable.styles}>
                        <Image source = {require('./Images/air-humidity.png')}
                            style = {thresholdtable.image}>
                        </Image>
                        <View style = {thresholdtable.setstyle}>
                            <View style = {thresholdtable.textContainer}>
                                <TextInput style = {thresholdtable.textInput}
                                    value = {this.state.doamkhongkhi}
                                    onChangeText = {(txt) => {
                                    this.setState({doamkhongkhi: txt})
                                    }}>
                                </TextInput>
                            </View>
                            <Text style = {thresholdtable.text}>
                                Air-Humidity(%)
                            </Text>
                        </View>
                    </View>
                    <View style = {thresholdtable.styles}>
                        <Image source = {require('./Images/soilmoisture.png')}
                            style = {thresholdtable.image}>
                        </Image>
                        <View style = {thresholdtable.setstyle}>
                            <View style = {thresholdtable.textContainer}>
                                <TextInput style = {thresholdtable.textInput}
                                    value = {this.state.doamdat}
                                    onChangeText = {(txt) => {
                                    this.setState({doamdat: txt})
                                    }}>
                                </TextInput>
                            </View>
                            <Text style = {thresholdtable.text}>
                                Soil Moisture(%)
                            </Text>
                        </View>
                    </View>
                    <View style = {thresholdtable.styles}>
                        <Image source = {require('./Images/ph.png')}
                            style = {thresholdtable.image}>
                        </Image>
                        <View style = {thresholdtable.setstyle}>
                            <View style = {thresholdtable.textContainer}>
                                <TextInput style = {thresholdtable.textInput}
                                    value = {this.state.ph}
                                    onChangeText = {(txt) => {
                                    this.setState({ph: txt})
                                    }}>
                                </TextInput>
                            </View>
                            <Text style = {thresholdtable.text}>
                                PH
                            </Text>
                        </View>
                    </View>
                    <View style = {thresholdtable.styles}>
                        <Image source = {require('./Images/oxygen-tank.png')}
                            style = {thresholdtable.image}>
                        </Image>
                        <View style = {thresholdtable.setstyle}>
                            <View style = {thresholdtable.textContainer}>
                                <TextInput style = {thresholdtable.textInput}
                                    value = {this.state.oxyhoatan}
                                    onChangeText = {(txt) => {
                                    this.setState({oxyhoatan: txt})
                                    }}>
                                </TextInput>
                            </View>
                            <Text style = {thresholdtable.text}>
                                Dissolved oxygen(%)
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const background = StyleSheet.create({
    background: {
        flex: 1,
        width: Dimensions.get('window').width,
        backgroundColor: '#071324',
        flexDirection: 'column'
    }
})

const header = StyleSheet.create({
    background: {
        height: 70,
        width: Dimensions.get('window').width,
        backgroundColor: '#072347',
        flexDirection: 'row'
    },
    textheader: {
        marginTop: 18,
        marginLeft: 20,
        fontSize: 25,
        color: '#D4D7DB',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15
    }
})

const thresholdtable = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    styles: {
        flex: 1,
        flexDirection: 'row'
    },
    textStyle: {
        marginTop: 18,
        marginLeft: 20,
        fontSize: 20,
        color: '#7DA6F7',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15
    },
    image: {
        height: 50,
        width: 50,
        marginLeft: 15
    },
    setstyle: {
        flexDirection: 'row'
    },
    text: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 17,
        color: '#7DA6F7',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15
    },
    textContainer:{
        backgroundColor: '#B0D3FF',
        marginLeft: 5,
        height: 48,
        width: 120,
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
    textInput: {
        fontSize: 19,
        textAlign: 'center'
    }
})