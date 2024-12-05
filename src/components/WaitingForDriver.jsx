import React from 'react'

const WaitingForDriver = (props) => {
    return (
        <div>
            <h5
                className="p-1 text-center w-[93%] absolute top-0"
                onClick={() => {
                    props.waitingForDriver(false);
                }}
            >
                <i className="text-xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
          <div className='flex items-center justify-between'>
          <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt="Ride preview"
        />
        <div>
            <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.plate}</h4>
            <p className='text-sm text-gray-600'>Maruti Swift</p>
            <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
        </div>
          </div>

            <div className="flex flex-col gap-2 justify-between items-center">
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
                            <h3 className="text-lg font-medium">Rs {props.ride?.fare}</h3>
                            <p className='text-base font-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WaitingForDriver
