import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import { addressData } from '../../data';

const Dashboard = ({ setIsAuthenticated }) => {
  const [address, setaddress] = useState(addressData);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('address_data'));
    if (data !== null && Object.keys(data).length !== 0) setaddress(data);
  }, []);

  const handleEdit = id => {
    const [Address] = address.filter(Address => Address.id === id);

    setSelectedAddress(Address);
    setIsEditing(true);
  };

  const handleDelete = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(result => {
      if (result.value) {
        const [Address] = address.filter(Address => Address.id === id);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${Address.street} ${Address.city} ${Address.state} ${Address.zipcode}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        });

        const addressCopy = address.filter(Address => Address.id !== id);
        localStorage.setItem('address_data', JSON.stringify(addressCopy));
        setaddress(addressCopy);
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            address={address}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          address={address}
          setaddress={setaddress}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          address={address}
          selectedAddress={selectedAddress}
          setaddress={setaddress}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
