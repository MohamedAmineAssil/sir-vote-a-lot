import { io } from 'socket.io-client';

//connect client socket with back one
const socket = io(`ws://localhost:3002`, { transports: ["websocket"] });

function useSocket() {
  return (
    {
        socket
    }
  )
}

export default useSocket