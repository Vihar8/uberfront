
// import React, { createContext, useEffect } from 'react';
// import { io } from 'socket.io-client';

// export const SocketContext = createContext();

// const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

// const SocketProvider = ({ children }) => {
//     useEffect(() => {
//         // Basic connection logic
//         socket.on('connect', () => {
//             console.log('Connected to server');
//         });

//         socket.on('disconnect', () => {
//             console.log('Disconnected from server');
//         });

//     }, []);



//     return (
//         <SocketContext.Provider value={{ socket }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// export default SocketProvider;



// import React, { createContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// export const SocketContext = createContext();

// const socket = io(`${import.meta.env.VITE_BASE_URL}`,{
//     transports: ['websocket']
// }); // Replace with your server URL

// const SocketProvider = ({ children }) => {
//     const [ride, setRide] = useState(null);
//     const [ridePopupVisible, setRidePopupVisible] = useState(false);

//     useEffect(() => {
//         // Basic connection logic
//         socket.on('connect', () => {
//             console.log('Connected to server');
//         });

//         socket.on('disconnect', () => {
//             console.log('Disconnected from server');
//         });

//         socket.on('new-ride', (data) => {
//             console.log('New ride data received:', data);
//             setRide(data);
//             setRidePopupVisible(true);
//         });

//         return () => {
//             socket.off('new-ride'); // Clean up on unmount
//         };
//     }, []);

//     return (
//         <SocketContext.Provider value={{ socket, ride, setRide, ridePopupVisible, setRidePopupVisible }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

// export default SocketProvider;






import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(import.meta.env.VITE_BASE_URL, {
    transports: ['websocket'],  // optional: use only WebSocket transport
});
const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);



    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;