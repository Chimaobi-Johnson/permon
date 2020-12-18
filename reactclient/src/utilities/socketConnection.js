import io from 'socket.io-client';
let socket = io("http://localhost:8181");

socket.emit("clientAuth", '5dfss25df1fskjdk484e8');

// console.log(socket);

export default socket;
