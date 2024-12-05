import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import LiveTracking from '../components/LiveTracking'


const CaptainHome = () => {

  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null)
  const confirmRidePopupPanelRef = useRef(null)
  const ridePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)
   useEffect(() => {
  //   if (!captain) return; // Exit if captain data is not available yet
  //   socket.emit('join', {
  //     userId: captain._id,
  //     userType: 'captain',
  //   });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => clearInterval(locationInterval); // Cleanup interval on unmount
  }, []);

  // socket.on('new-ride', (data) => {
  //   console.log('Received new ride:', data);
  //   setRide(data)
  //   setRidePopupPanel(true)
  // })

  useEffect(() => {
    console.log('Ride state:', ride);
  }, [ride]);
  useEffect(() => {
    if (!captain) return; // Exit if captain data is not available yet
    
    console.log('Joining socket with id:', captain._id); // Log the captain ID
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain',
    });
  
    socket.on('connect', () => {
      console.log('Socket connected', socket.id);
    });
  
    socket.on('new-ride', (data) => {
      console.log('New ride received:', data); // Log the new ride data
      setRide(data);
      setRidePopupPanel(true);
    });
  
    }, [captain, socket]);

    async function confirmRide() {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

          rideId: ride._id,
          captainId: captain._id,


      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)

  }



  useGSAP(function () {
    if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ ridePopupPanel ])

  useGSAP(function(){
    if(confirmRidePopupPanel){
      gsap.to(confirmRidePopupPanelRef.current,{
        transform:'translateY(0)'
      });
  
    }else{
      gsap.to(confirmRidePopupPanelRef.current,{
        transform:'translateY(100%)'
      });  
    }

  },[confirmRidePopupPanel])



  return (
    <div className='h-screen'>
   <div className='fixed p-6 top-0 flex items-center justify-between w-screen z-10'>
    <img className='w-16' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt=''></img>
    <Link to="/captain-home" className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className='text-lg font-medium ri-logout-box-r-line'></i>
    </Link>
   </div>

   <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
  <div className='h-2/5 p-6 '>
        <CaptainDetails />
  </div>
  <div
  ref={ridePopupPanelRef}
  className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'
>
  <RidePopUp
    setRidePopupPanel={setRidePopupPanel}
    ride={ride}
    confirmRide={confirmRide}
    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
  />
</div>
    <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white p-3 py-6 pt-12'>
         <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
    </div>
</div>
  )
}

export default CaptainHome
