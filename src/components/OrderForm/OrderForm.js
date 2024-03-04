import { useState } from "react";

function OrderForm({ addNewOrder} ) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    if (!name || ingredients.length === 0) {
      setErrorMessage("Please enter a name and select at least one ingredient.");

      setTimeout(() => {
        setErrorMessage("");
      }, 1500);
  
    } else {
    const newOrder = { name, ingredients };
    addNewOrder(newOrder);
    clearInputs();
    setErrorMessage("");
    }
  }

  function clearInputs() {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        type="button"
        className="ingredient-button"
        onClick={() => setIngredients([...ingredients, ingredient])}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {ingredientButtons}

      <p className="order-text" >Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button type="submit">Submit Order</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

    </form>
  );
}

export default OrderForm;
