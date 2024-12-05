import React from 'react';

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
  // Handling suggestion click based on active field
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion); // Set pickup location
    } else if (activeField === 'destination') {
      setDestination(suggestion); // Set destination location
    }
    // setVehiclePanel(true); // Assuming you want to open the vehicle panel after a selection
    // setPanelOpen(false); // Close the location panel
  };

  return (
    <div>
    {
        suggestions.map((elem, index) => (
          <div 
            key={index} 
            onClick={() => handleSuggestionClick(elem.value)} 
            className='flex items-center my-2 border-gray-50 active:border-black justify-start gap-4 border-2 p-3 rounded-xl cursor-pointer'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className='font-medium mt-4'>
              {elem.value}
            </h4>
          </div>
          ))
          }
       
    </div>
  );
};

export default LocationSearchPanel;