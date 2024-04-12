## Tekuncorked Client 


## problem statement

-  The above dashboard depicts a single site installation of multiple Automation Devices. Each box
represents one device. Code the dashboard for ORI-CM-Bush Temperature.


1. Temperature Alarm Setting can be user configured to choose temperature threshold for
alerts

2. The CM-Bush is Green when all three temperatures are within threshold. Turns yellow if
any one temp crosses High and then Red if any one temp crosses Hotspot Threshold.

3. Also code the test framework for testing the dashboard.


  
## project description

1. this is the client side application which is build using reactjs.
2. this client side application is a part of whole assignment, which was to be done from a company's interview.
3. tech stack mainly used are - reactjs, socket.io-client, material ui



#### package.json - 
```json
{
  "name": "tekuncorked-client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.14.10",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1",
    "socket.io-client": "^4.7.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

directory structure - 

```bash
.
├── package.json
├── package-lock.json
├── public
│   └── index.html
├── README.md
└── src
    ├── App.css
    ├── App.js
    ├── components
    │   ├── Dashboard.jsx
    │   └── Device.jsx
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── WebSocketService.js

3 directories, 12 files
```
install instructions - 
```
$ cd tekuncorked-client
$ npm install
$ npm start

```

default local url - 
```
https://localhost:3000
```


#### demo 

[![Watch the video](https://img.youtube.com/vi/fbt3ZuXG_0s/default.jpg)](https://youtu.be/fbt3ZuXG_0s?si=Eydu_QxOUA5Jo3T-)