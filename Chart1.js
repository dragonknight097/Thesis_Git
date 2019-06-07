import React, {Component} from 'react';
import {
    ScrollView,
    Image, View, Text, TextInput,
    Dimensions, StyleSheet
    } from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import ChartNode1 from './services/api';
import io from 'socket.io-client';
import { config } from './services/config';
let { baseURL } = config;


export default class Chart1 extends Component {
    constructor(props){
        super(props);
        this.state = {
            ChartTemp: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: [0]
                    }]
            },
            ChartAir: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: [0]
                    }]
            },
            ChartSoil: {
                labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: [0]
                    }]
            },
            socket: io(baseURL, {jsonp: false})
        }
        this.chartNode1 = ChartNode1();
    }
    componentDidMount() {
        this.handleChart();
        this.state.socket.emit('chart 1', { message: 'chart 1'})
        this.state.socket.on('Receive Data Chart 1', async (data) => {
            await this.handleChart();
            this.state.socket.emit('chart 1', { message: 'chart 1'})
        })
    }
    handleChart = () => {
        this.chartNode1.getNode1().then((data) => {
            if (data.length1 > 0) {  
                let temp = {
                    labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: []
                    }]
                };
                let air = {
                    labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: []
                    }]
                };
                let soil = {
                    labels: ['1', '2', '3', '4', '5', '6', '7'],
                    datasets: [{
                        data: []
                    }]
                };
                for(let i = data.node1.length - 7; i < data.node1.length; i++){
                    temp.datasets[0].data.push(data.node1[i].nhietdo);
                    air.datasets[0].data.push(data.node1[i].doamkhongkhi);
                    soil.datasets[0].data.push(data.node1[i].doamdat);
                }
                this.setState({
                    ChartTemp: temp,
                    ChartAir: air,
                    ChartSoil: soil
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
                        height: 80,
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                        <View style = {{
                            height: 80,
                            width: 70
                        }}>
                            <Image source = {require('./Images/graph.png')}
                                style = {{
                                    height: 60,
                                    width: 60,
                                    marginTop: 10,
                                    marginLeft: 10
                                }}>
                            </Image>
                        </View>
                        <View style = {{
                            flex: 1
                        }}>
                            <Text style = {{
                                fontSize: 24,
                                fontWeight: 'bold',
                                marginTop: 25,
                                marginLeft: 10,
                                color: '#B38E98'
                            }}>
                            Chart Node 1
                            </Text>
                        </View>
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
                            Air Humidity(%)
                        </Text>
                    </View>
                    <LineChart
                    data={this.state.ChartAir}
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
                            Soil Moisture(%)
                        </Text>
                    </View>
                    <LineChart
                    data={this.state.ChartSoil}
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
        fontStyle: 'italic'
    }
})
