import React, {Component} from 'react';
import AppContainer from './Navigator';
import io from 'socket.io-client';
import { throwStatement } from '@babel/types';

let { baseURL } = 'http://192.168.1.79:3000/';
const socket = io(baseURL);

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            socket: socket
        }
    }
    setSocket = (socket) => {
        this.setState({
            socket: socket
        })
    }
    render() {
        return (
            <AppContainer
                propsSocket = {{
                    ...this.state,
                    setSocket: this.setSocket
                }}
            />
        )
    }
}

//export default AppContainer;

