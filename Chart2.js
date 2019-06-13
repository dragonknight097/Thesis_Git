import React, {Component} from 'react';
import {
    ScrollView,
    Image, View, Text, TextInput,
    Dimensions, StyleSheet, TouchableOpacity
    } from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import ChartNode2 from './services/api';
import io from 'socket.io-client';
import { config } from './services/config';
let { baseURL } = config;

export default class Chart2 extends Component {
    constructor(props){
        super(props);
        this.state = {
            ChartTemp: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: [0]
                    }]
            },
            ChartHumi: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: [0]
                    }]
            },
            ChartPH: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: [0]
                    }]
            },
            ChartOxy: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: [0]
                    }]
            },
            socket: io(baseURL, {jsonp: false})
        },

        this.chartNode2 = ChartNode2();
    }

    handleback = () => {
        this.props.navigation.navigate("HomeStack");
    }

    handlelogout = () => {
        this.props.navigation.navigate("LoginStack");
    }

    componentDidMount() {
        this.handleChart();
        this.state.socket.emit('chart 2', { message: 'chart 1'})
        this.state.socket.on('Receive Data Chart 2', async (data) => {
            await this.handleChart();
            this.state.socket.emit('chart 2', { message: 'chart 2'})
        })
    }

    handleChart = () => {
        this.chartNode2.getNode2().then((data) => {
            if (data.length2 > 0) {  
                let temp = {
                    labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: []
                    }]
                };
                let humi = {
                    labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: []
                    }]
                };
                let ph = {
                    labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: []
                    }]
                };
                let oxy = {
                    labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: []
                    }]
                };
                for(let i = data.node2.length - 7; i < data.node2.length; i++){
                    temp.datasets[0].data.push(data.node2[i].nhietdo);
                    humi.datasets[0].data.push(data.node2[i].doam);
                    ph.datasets[0].data.push(data.node2[i].ph);
                    oxy.datasets[0].data.push(data.node2[i].ph);
                }
                this.setState({
                    ChartTemp: temp,
                    ChartHumi: humi,
                    ChartPH: ph,
                    ChartOxy: oxy
                })
            }
        })
      }
    render() {
        let screenWidth = Dimensions.get('window').width;
        return (
            <View style = {{
                flex: 1,
                backgroundColor: '#071324'
            }}>
                <ScrollView>
                    <View style = {{
                        height: 70,
                        flex: 1,
                        flexDirection: 'row',
                        backgroundColor: '#072347'
                    }}>
                        <TouchableOpacity style = {{
                            height: 80,
                            width: 70
                        }}
                            onPress = {this.handleback}>
                            <Image source = {require('./Images/back.png')}
                                style = {{
                                    height: 40,
                                    width: 40,
                                    marginTop: 15,
                                    marginLeft: 10
                                }}>
                            </Image>
                        </TouchableOpacity>
                        <View style = {{
                            flex: 1
                        }}>
                            <Text style = {{
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginTop: 18,
                                marginLeft: 2,
                                color: '#D4D7DB',
                                textShadowColor: 'rgba(0, 0, 0, 1)',
                                textShadowOffset: {width: -1, height: 1},
                                textShadowRadius: 15
                            }}>
                            Chart Node 2 
                            </Text>
                        </View>
                        <TouchableOpacity onPress = {this.handlelogout}>
                            <Image source = {require('./Images/237815.png')}
                                style = {{
                                    height: 40,
                                    width: 40,
                                    marginTop: 15,
                                    marginRight: 10
                                }}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.container}>
                        <Text style = {styles.text}>
                            Temperature(°C)
                        </Text>
                    </View>
                    <LineChart
                    data={this.state.ChartTemp}
                    width={Dimensions.get('window').width}
                    height={230}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: '#F9F9EB',
                        backgroundGradientTo: '#F9F9EB',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(19, 107, 137, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    
                    bezier
                    />
                    <View style = {styles.container}>
                        <Text style = {styles.text}>
                            Humidity(%)
                        </Text>
                    </View>
                    <LineChart
                    data={this.state.ChartHumi}
                    width={Dimensions.get('window').width}
                    height={230}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: '#F9F9EB',
                        backgroundGradientTo: '#F9F9EB',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(19, 107, 137, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    />
                    <View style = {styles.container}>
                        <Text style = {styles.text}>
                            PH
                        </Text>
                    </View>
                    <LineChart
                    data={this.state.ChartPH}
                    width={Dimensions.get('window').width}
                    height={230}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: '#F9F9EB',
                        backgroundGradientTo: '#F9F9EB',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(19, 107, 137, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    />
                    <View style = {styles.container}>
                        <Text style = {styles.text}>
                            Dissolved Oxygen(%)
                        </Text>
                    </View>
                    <LineChart
                    data={this.state.ChartOxy}
                    width={Dimensions.get('window').width}
                    height={230}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: '#F9F9EB',
                        backgroundGradientTo: '#F9F9EB',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(19, 107, 137, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    bezier
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        // backgroundColor: '#E7EEF0',
        padding: 15
    },
    text: {
        fontSize: 19,
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#0984FF',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15
    }
})
