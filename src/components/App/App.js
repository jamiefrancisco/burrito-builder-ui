import { useEffect, useState } from "react";
import "./App.css";
import { getOrders, postOrder, deleteOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

function App() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data.orders);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };
    fetchOrders();
  }, []);

  const addNewOrder = async (newOrder) => {
    try {
      const addedOrder = await postOrder(newOrder);
      setOrders(prevOrders => [...prevOrders, addedOrder]);
    } catch (err) {
      console.error("Error posting new order:", err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addNewOrder={addNewOrder} />
      </header>

      <Orders orders={orders} handleDeleteOrder={handleDeleteOrder} />
    </main>
  );
}

export default App;
