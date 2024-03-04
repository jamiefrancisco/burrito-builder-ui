export const getOrders = async () => {
  const response = await fetch("http://localhost:3001/api/v1/orders");
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  const data = await response.json();
  return data;
};


export const postOrder = async (newOrder) => {
  const response = await fetch("http://localhost:3001/api/v1/orders", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newOrder),
  });

  if (!response.ok) {
    throw new Error('Failed to post order');
  }
  
  const data = await response.json();
  return data;
};


export const deleteOrder = async (orderId) => {
  const response = await fetch(`http://localhost:3001/api/v1/orders/${orderId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete order');
  }
};