
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

    const handleWarningThreshold = (e, newValue) => {
        setWarningThreshold(newValue);
    };

    const handleAlertThreshold = (e, newValue) => {
        setAlertThreshold(newValue);
    };

    return (
        <div className='dashboard-outer' style={{ background: 'linear-gradient(to bottom, #b3d9ff, #ffffff)', padding: '20px' }}>
            <div style={{ backgroundColor: 'darkblue', padding: '10px',width: '120%' }}>
    <p style={{ marginTop: '1px', fontSize: '24px', fontWeight: 'bold', color: 'white',textAlign:"center" }}>Devices Dashboard</p>
</div>


            <div className='status-outer' style={{ marginTop: '20px' }}>
                <div className='normal-btn'>Normal: {normal}</div>
                <div className='warning-btn'>Warning: {warning}</div>
                <div className='alert-btn'>Alert: {alert}</div>
            </div>
            <div className='threshold-outer'>
                <div className='threshold-heading'>Set Threshold Here: Warning ≤ Alert</div>
                <div className='threshold'>
                    Warning: {warningThreshold} <Slider
                        value={warningThreshold}
                        onChange={handleWarningThreshold}
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                    />
                </div>

                <div className='threshold'>
                    Alert: {alertThreshold} <Slider
                        value={alertThreshold}
                        onChange={handleAlertThreshold}
                        min={0}
                        max={100}
                        valueLabelDisplay="auto"
                    />
                </div>
            </div>

            

            

            <div className='device-outer'>
                {deviceList && deviceComponents}
            </div>

            <footer style={{ backgroundColor: '#1a237e', color: 'white', padding: '10px', marginTop: '20px', width: "100%", }}>
    <div style={{ textAlign: 'center',fontSize: '20px' }}>
        Contact Us
    </div>
    <div style={{ textAlign: 'center', marginTop: '10px',fontSize: '13px' }}>
        Powered by TekUncorked
    </div>
</footer>

        </div>
    );
};

export default Dashboard;
