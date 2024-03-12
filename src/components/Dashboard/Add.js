import React, { useState } from 'react';
import Swal from 'sweetalert2';
import indianStates from './stateAll';
import './statestyle.css'

const Add = ({ address, setaddress, setIsAdding }) => {
  const [street, setstreet] = useState('');
  const [city, setcity] = useState('');
  const [state, setstate] = useState('');
  const [zipcode, setzipcode] = useState('');
  const [isOtherState, setIsOtherState] = useState(false); // Track if "Other" is selected

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    if (selectedState === 'Other') {
      setIsOtherState(true); // Enable input field for manual entry
    } else {
      setIsOtherState(false);
      setstate(selectedState); // Set the state value when selecting an Indian state
    }
  };

  const isValidzipCode = (zip) => {
    return /^\d{6}$/.test(zip);
  };

  const handleAdd = e => {
    e.preventDefault();

    if (!street || !city || !state || !zipcode) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required.',
        showConfirmButton: true,
      });
    }

    // Check if the address already exists
    const isDuplicate = address.some(
      address =>
        address.street.trim().toLowerCase() === street.trim().toLowerCase() &&
        address.city.trim().toLowerCase() === city.trim().toLowerCase() &&
        address.state.trim().toLowerCase() === state.trim().toLowerCase() &&
        address.zipcode.trim() === zipcode.trim()
    );
    

    if (isDuplicate) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Address already exists.',
        showConfirmButton: true,
      });
    }

    if (!isValidzipCode(zipcode)) {
      alert('Please enter a valid 6-digit zip code.');
      return;
    }

    const id = address.length + 1;
    const newAddress = {
      id,
      street,
      city,
      state,
      zipcode,
    };

    // Update address state with the new address
    setaddress(prevAddress => [...prevAddress, newAddress]);

    // Persist data in localStorage
    localStorage.setItem(
      'address_data',
      JSON.stringify([...address, newAddress])
    );

    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${street} ${city}'s data has been Added.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Address</h1>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          placeholder="ex: Spruce Street"
          name="street"
          value={street}
          onChange={e => setstreet(e.target.value)}
        />
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          placeholder="ex: Mumbai"
          name="city"
          value={city}
          onChange={e => setcity(e.target.value)}
        />
        <label htmlFor="state">State</label>
        {isOtherState ? (
          <input
            id="state"
            type="text"
            name="state"
            value={state}
            onChange={(e) => setstate(e.target.value)}
          />
        ) : (
          <select
            id="state"
            name="state"
            value={state}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {indianStates.map((stateName) => (
              <option key={stateName} value={stateName}>
                {stateName}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        )}
        <label htmlFor="zipcode">ZipCode</label>
        <input
          id="zipcode"
          type="number"
          name="zipcode"
          placeholder="ex: 400056"
          value={zipcode}
          onChange={e => setzipcode(e.target.value)}
        />
        
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
