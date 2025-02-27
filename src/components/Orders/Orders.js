import React from "react";
import "./Orders.css";

const Orders = ({ orders, handleDeleteOrder }) => {
  const orderEls = orders.map((order) => {
    return (
      <div className="order" key={order.id} >
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={index}> {ingredient}</li>;
          })}
        </ul>
        <button onClick={() => handleDeleteOrder(order.id)} className="delete-order">Delete Order</button>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
