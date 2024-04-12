import React, { useEffect, useState } from 'react';
import '../App.css';

const Device = (props) => {
    const device = props.device;
    const id = props.id;
    const key = id
    const { setNormal, setWarning, setAlert, warningThreshold, alertThreshold } = props;
    const { name, location, temperature1, temperature2, temperature3 } = device;


    const [color, setColor] = useState("normal");

    useEffect(() => {
        returnUpdates();
    }, [warningThreshold, alertThreshold, device]);

    const returnUpdates = () => {
        let maxTemperature = Math.max(temperature1, temperature2, temperature3);

        console.log(maxTemperature);

        if (maxTemperature >= alertThreshold) {
            setAlert((prev) => prev + 1);
            setColor((prev) => "alert")
        } else if (maxTemperature >= warningThreshold) {
            setWarning((prev) => prev + 1);
            setColor((prev) => "warning")
        } else {
            setNormal((prev) => prev + 1);
            setColor((prev) => "normal");
        }
    };

    return (
        <div key={key} className={`${color}-btn device`}>
            <div>Name: {name}</div>
            <div>Location: {location}</div>
            <div>Temperature1: {temperature1}</div>
            <div>Temperature2: {temperature2}</div>
            <div>Temperature3: {temperature3}</div>
        </div>
    );
};

export default Device;

