// Order.js

import React from "react";

function Order({ name, email, ticketsCount, totalPrice, discountedPrice }) {
  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
        <h2 className="text-xl mb-2">User Informations</h2>
        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <h2 className="text-xl mt-4 mb-2">Ticket Details</h2>
        <p>Number of Tickets: {ticketsCount}</p>
        <p>Total Price: {totalPrice}</p>
        {discountedPrice > 0 && <p>Discounted Price: {discountedPrice}</p>}
      </div>
    </div>
  );
}

export default Order;
