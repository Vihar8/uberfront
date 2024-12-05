import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 className='p-3 text-center w-[93%] absolute top-0' onClick={() => {
      props.setVehiclePanel(false)
    }}><i className='text-xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
    <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        props.setVehicle('car')
      }} className='flex border-2 active:border-black mb-2 w-full items-center bottom-0 p-3 rounded'>
        <img className='h-12' src='https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg' />
        <div className=' w-1/2'>
          <h4 className='font-medium text-lg'>UberGo<span><i className="ri-user-3-fill"></i>4</span></h4>
          <h5 className='font-medium text-sm'>2 Minutes Away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, Compact Rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹ {props?.fare?.car ? props?.fare?.car : ""}</h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        props.setVehicle('auto')
      }}
      className='flex border-2 active:border-black mb-2 w-full items-center bottom-0 p-3 rounded'>
        <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' />
        <div className=' w-1/2'>
          <h4 className='font-medium text-lg'>Uber Auto<span><i className="ri-user-3-fill"></i>3</span></h4>
          <h5 className='font-medium text-sm'>2 Minutes Away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, Compact Rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹ {props?.fare?.auto ? props?.fare?.auto : ""}</h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
        props.setVehicle('moto')
      }} 
      className='flex border-2 active:border-black mb-2 w-full items-center bottom-0 p-3 rounded'>
        <img className='h-12' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' />
        <div className=' w-1/2'>
          <h4 className='font-medium text-lg'>Moto<span><i className="ri-user-3-fill"></i>1</span></h4>
          <h5 className='font-medium text-sm'>2 Minutes Away</h5>
          <p className='font-normal text-xs text-gray-600'>Affordable, Compact Rides</p>
        </div>
        <h2 className='text-lg font-semibold'>₹ {props?.fare?.moto ? props?.fare?.moto : ""}</h2>
      </div>
    </div>
  )
}

export default VehiclePanel
