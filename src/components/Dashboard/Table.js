import React from 'react';

const Table = ({ address, handleEdit, handleDelete }) => {
  address.forEach((addres, i) => {
    addres.id = i + 1;
  });
  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>ZipCode</th>
            <th colSpan={2} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {address.length > 0 ? (
            address.map((addres, i) => (
              <tr key={addres.id}>
                <td>{i + 1}</td>
                <td>{addres.street}</td>
                <td>{addres.city}</td>
                <td>{addres.state}</td>
                <td>{addres.zipcode}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(addres.id)}
                    className="button muted-button"
                    style= {{backgroundColor: 'lightgreen'}}
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(addres.id)}
                    className="button muted-button"
                    style= {{color: 'red', backgroundColor: 'lightblue'}}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No address</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
