import axios from 'axios';
import axiosGet, {axiosPost} from './axios-fetch';
import { config } from './config';
let { baseURL } = config;

export default () => {
    let services = {
        login : (loginpass) => {
            return axiosPost(baseURL + 'admin/Login_2', 
            {
                email: loginpass.email,
                password: loginpass.password
            })
            .then((result) => {
                if(result.data.status === 'success')
                    return result.data.loginform
                    else {
                        return null
                    }
            })
        },
        getNode1: () => {
            return axiosGet(baseURL + 'Router/node1')
            .then((result) => {
                if(result.data.status == 'success')
                {
                    return result.data
                }
                return null
            })
        },
        getNode2: () => {
            return axiosGet(baseURL + 'Router/node2')
            .then((result) => {
                if(result.data.status == 'success')
                {
                    return result.data
                }
                return null
            })
        },
        Pump: (PumpdataNode) => {
            return axiosPost(baseURL + 'Router/Pump', {
                Auto: PumpdataNode.Auto,
                Timer: PumpdataNode.Timer,
                Pump1: PumpdataNode.On1,
                Pump2: PumpdataNode.On2,
                Pump3: PumpdataNode.On3,
                node: PumpdataNode.node
            })
                .then((result) => {
                    return result.data.PumpData
                })
        }
    }
    return services;
}