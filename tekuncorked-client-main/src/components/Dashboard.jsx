import React, { useEffect, useState } from 'react';
import WebSocketService from '../WebSocketService';
import Device from '../components/Device';
import Slider from '@mui/material/Slider';
import '../App.css';

const Dashboard = () => {
    const [deviceList, setDeviceList] = useState([]);
    const [warningThreshold, setWarningThreshold] = useState(0);
    const [alertThreshold, setAlertThreshold] = useState(0);
    const [normal, setNormal] = useState(0);
    const [warning, setWarning] = useState(0);
    const [alert, setAlert] = useState(0);

    useEffect(() => {
        const websocket = WebSocketService;
        websocket.connect();

        websocket.subscribe('data', (data) => {
            console.log('got data from the server');
            setDeviceList(data.devices);
        });

        websocket.subscribe('data-created', (data) => {
            console.log('device created');
            console.log(data.devices);
            setDeviceList(data.devices);
        });

        websocket.subscribe('data-updated', (data) => {
            console.log('device updated');
            setDeviceList(data.devices);
        });

        websocket.subscribe('data-deleted', (data) => {
            console.log('devices deleted');
            setDeviceList(data.devices);
        });

        return () => {
            websocket.disconnect();
        };
    }, []);

    useEffect(() => {
        console.log('device list change hui ')
        configureStatus();
    }, [warningThreshold, alertThreshold,deviceList]);

    const configureStatus = () => {
        let newNormal = 0;
        let newWarning = 0;
        let newAlert = 0;

        deviceList.forEach((device) => {
            const { temperature1, temperature2, temperature3 } = device;
            const maxTemperature = Math.max(temperature1, temperature2, temperature3);

            if (maxTemperature >= alertThreshold) {
                newAlert++;
            } else if (maxTemperature >= warningThreshold) {
                newWarning++;
            } else {
                newNormal++;
            }
        });

        setNormal(newNormal);
        setWarning(newWarning);
        setAlert(newAlert);
    };


    const deviceComponents = deviceList.map((device, index) => (
        <Device key={device._id}
            device={device}
            setNormal={setNormal}
            setWarning={setWarning}
            setAlert={setAlert}
            warningThreshold={warningThreshold}
            alertThreshold={alertThreshold}
            deviceList={deviceList}
        />
    ));

    const handleWarningThreshold = (e) => {
        const newWarningThreshold = e.target.value;
        setWarningThreshold(newWarningThreshold);
    };

    const handleAlertThreshold = (e) => {
        const newAlertThreshold = e.target.value;
        setAlertThreshold(newAlertThreshold);
    };

    return (
        <div className='dashboard-outer' style={{ background: 'linear-gradient(to bottom, #b3d9ff, #ffffff)' }}>
            <div className='threshold-outer'>
                <div className='threshold-heading'>{"set threshold here: warning <= alert "}</div>
                <div className='threshold'>
                    warning: {warningThreshold} <Slider
                        value={warningThreshold}
                        onChange={handleWarningThreshold}
                        min={0}
                        valueLabelDisplay="auto"
                        max={100}

                    />
                </div>

                <div className='threshold'>
                    alert: {alertThreshold} <Slider
                        value={alertThreshold}
                        onChange={handleAlertThreshold}
                        min={0}
                        valueLabelDisplay="auto"
                        max={100}
                    />
                </div>

            </div>

            <div className='status-outer'>
                <div className='normal-btn'>Normal : {normal}</div>
                <div className='warning-btn'>Warning : {warning}</div>
                <div className='alert-btn'>Alert : {alert}</div>
            </div>


            <p>Devices dashboard</p>

            <div className='device-outer'>
                {

                    deviceList ? (deviceComponents) : <></>
                }
            </div>
        </div>
    );
};

export default Dashboard;
