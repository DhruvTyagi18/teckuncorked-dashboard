## Tekuncorked server 

- [Tekuncorked server](#tekuncorked-server)
- [problem statement](#problem-statement)
- [project description](#project-description)
    - [package.json -](#packagejson--)
    - [directory structure -](#directory-structure--)
    - [install instructions -](#install-instructions--)
    - [default local url - ( both websocket and restapi )](#default-local-url----both-websocket-and-restapi-)
    - [device schema -](#device-schema--)
    - [api- endpoints](#api--endpoints)



## problem statement

-  The above dashboard depicts a single site installation of multiple Automation Devices. Each box
represents one device. Code the dashboard for ORI-CM-Bush Temperature.


1. Temperature Alarm Setting can be user configured to choose temperature threshold for
alerts

2. The CM-Bush is Green when all three temperatures are within threshold. Turns yellow if
any one temp crosses High and then Red if any one temp crosses Hotspot Threshold.

3. Also code the test framework for testing the dashboard.


  
## project description

1. this is the server side repo used for websockets and restapis.
2. this server side application is other part of the whole project, which was to be done from a company's interview.
3. tech stack mainly used are - node, express, socket.io



#### package.json - 
```json
{
  "name": "tekuncorked-server",
  "version": "1.0.0",
  "description": "assignment for full stack role",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon index.js"
  },
  "author": "parth kamal",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^7.5.2",
    "nodemon": "^3.0.1",
    "socket.io": "^4.7.2"
  }
}

```

#### directory structure - 

```bash
.
├── controllers
│   ├── device.js
│   └── getDevice.js
├── db.js
├── index.js
├── models
│   └── device.js
├── package.json
├── package-lock.json
├── README.md
├── routes
│   └── device.js
└── socket.js

3 directories, 10 files
```
#### install instructions - 
```
$ cd tekuncorked-server
$ npm install
$ npm start
```

#### default local url - ( both websocket and restapi )
```
https://localhost:9000
```

#### device schema - 


```js
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
	name: { type: String, required: true },
	location: { type: String, required: true },
	temperature1: { type: Number, required: true },
	temperature2: { type: Number, required: true },
	temperature3: { type: Number, required: true },
});

module.exports = mongoose.model('Device', deviceSchema);

```

#### api- endpoints 

get 

```
/device/  --> get all devices
/device/:id --> get device by id 
```


post  
``` 
/device/  --> create a new device
 ```

put  
``` 
/device/:id  --> update device by id
 ```

delete 
``` 
/device/  --> delete all devices 
/device/:id --> delete devices by id
 ```

