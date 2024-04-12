import { io } from "socket.io-client";

const SERVER_URL = 'http://localhost:9000/'; 

class WebSocketService {

  constructor() {
    this.socket= io(SERVER_URL); 
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  subscribe(event, callback) {
    this.socket.on(event, callback);
  }

  unsubscribe(event, callback) {
    this.socket.off(event, callback);
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }
}

export default new WebSocketService();
