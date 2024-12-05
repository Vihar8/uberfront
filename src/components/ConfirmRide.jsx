import React from 'react';

const ConfirmRide = (props) => {

  const handleConfirm = () => {
    props.setVehicleFound(true);
    setTimeout(() => {
      props.setConfirmRidePanel(false);
      props.createRide();
    }, 500); // Adjust delay to match the animation
  };
  
  
  

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
        props.setVehiclePanel(false);
        }}
      >
        <i className="text-xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

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
              <p className='text-base font-gray-600'>{props?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
            <div className="ml-2">
              <h3 className="text-lg font-medium">565/11A</h3>
              <p className='text-base font-gray-600'>{props?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
          <i className="text-lg ri-currency-line"></i>
            <div className="ml-2">
              <h3 className="text-lg font-medium">₹ {props?.fare[props?.vehicleType]} </h3>
              <p className='text-base font-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
        <button onClick={handleConfirm} className="w-full mt-4 bg-lime-600 text-white py-2 rounded">
  Confirm
</button>

      </div>
    </div>
  );
};

export default ConfirmRide;
