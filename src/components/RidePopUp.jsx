import React from 'react'

const RidePopUp = (props) => {
  
  return (
    <div>
<h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
            props.setRidePopupPanel(false)
        }}
      >
        <i className="text-xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available !</h3>
        <div className='flex items-center justify-between mt-4 p-3 bg-lime-300 rounded-lg'>
            <div className='flex items-center gap-3'>
                <img className='h-12 w-12 rounded-full object-cover' src="https://tse2.mm.bing.net/th?id=OIP.DpcVGeBmv4GxJvlwYWIt-wHaE8&pid=Api&P=0&h=180" />
                <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname+ " " + props.ride?.user.fullname.lastname}</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2 KM</h5>
        </div>
      <div className="flex flex-col gap-2 justify-between items-center">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Ride preview"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div className="ml-2">
              <h3 className="text-lg font-medium">565/11A</h3>
              <p className='text-base font-gray-600'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
            <div className="ml-2">
              <h3 className="text-lg font-medium">565/11A</h3>
              <p className='text-base font-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
          <i className="text-lg ri-currency-line"></i>
            <div className="ml-2">
              <h3 className="text-lg font-medium">₹ {props.ride?.fare}</h3>
              <p className='text-base font-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
       <div className='w-full flex items-center justify-between'>
        <button onClick={() => {
          props.setRidePopupPanel(false)
                        props.confirmRide()

        }} className="mt-4 bg-gray-300 text-gray-700 py-3 px-8 rounded-lg">
          Ignore Ride
        </button>
       <button onClick={() => {
            props.setConfirmRidePopupPanel(true)
               props.setRidePopupPanel(false)

        }} className="mt-4 bg-lime-600 text-white py-3 px-8 rounded-lg">
          Accept Ride
        </button>
       </div>
      </div>
    </div>
  )
}

export default RidePopUp
