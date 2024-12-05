import React, { useContext, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios'; // Ensure to import axios
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

function Home() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [activeField, setActiveField] = useState('pickup');
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fare, setFare] = useState(null)
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  
  useEffect(() => {
    console.log("User ID:", user ? user._id : "No user found");
    if (user) {
      socket.emit("join", { userType: "user", userId: user._id });
    }
  }, [user]);

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    navigate('/riding', {state: { ride }})
  })


  
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPickupSuggestions(response.data);
      setErrorMessage('');
    } catch {
      setErrorMessage('Failed to fetch pickup suggestions.');
    } finally {
      setLoading(false);
    }
  };

  console.log(vehicleFound, "vehicleFound");
  

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDestinationSuggestions(response.data);
      setErrorMessage('');
    } catch {
      setErrorMessage('Failed to fetch destination suggestions.');
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

 
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%", padding: 24 });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, { height: "0%", padding: 0 });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  
  // Animations for vehicle panel
  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePanel]);
  
  // Animations for confirm ride panel
  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePanel]);
  
  useEffect(() => {
    console.log("vehicleFound state:", vehicleFound);
  }, [vehicleFound]);
  
  useGSAP(() => {
    console.log("Animating vehicleFoundRef...");
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
      duration: 1, // Adjust duration if needed
      ease: "power2.out",
    });
  }, [vehicleFound]);
  
  
  // Animations for waiting for driver
  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
    });
  }, [waitingForDriver]);

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: {
        pickup: pickup,
        destination: destination
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Add your token here
      }
    })

    setFare(response.data)
   
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Add your token here
      }
    })

    console.log(response.data)
  }
  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5 z-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt='' />
      <div className='absolute top-0 left-0 right-0 bottom-0 z-0'>
        <LiveTracking  pickup={pickup?.ldt} // Replace with actual pickup coordinates
  destination={destination?.lng} />
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className='absolute opacity-0 right-6 top-6 text-2xl cursor-pointer'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line absolute h-12 w-1 top-[55%] left-10 bg-gray-700 rounded-full'></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5'
              type='text'
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'
              type='text'
              placeholder='Enter your Destination'
            />
          </form>
         <button 
         onClick={
          findTrip
         }
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>

            Find Trip
          </button>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField} />
        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-6 pt-12'>
        {fare && <VehiclePanel setVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />}
      </div>

      {vehicleType && 
        <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-6 pt-12'>
          <ConfirmRide  pickup={pickup} fare={fare} vehicleType={vehicleType} destination={destination} createRide={createRide} setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} />
        </div>
      }
      {vehicleFound &&  <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-6 pt-12'>
      <LookingForDriver
        pickup={pickup} fare={fare} vehicleType={vehicleType} destination={destination} createRide={createRide} setVehicleFound={setVehicleFound} />
      </div>}
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white p-3 py-6 pt-12'>
        <WaitingForDriver ride={ride} waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
}

export default Home;