import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          image: "https://pixabay.com",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15"
        },
        {
          name: "Spider Plant",
          image: "https://pixabay.com",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12"
        },
        {
          name: "Peace Lily",
          image: "https://pixabay.com",
          description: "Removes mold spores and purifies the air.",
          cost: "$18"
        }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        {
          name: "Lavender",
          image: "https://unsplash.com",
          description: "Calming scent, used in aromatherapy.",
          cost: "$20"
        },
        {
          name: "Jasmine",
          image: "https://unsplash.com",
          description: "Sweet fragrance, promotes relaxation.",
          cost: "$18"
        },
        {
          name: "Rosemary",
          image: "https://pixabay.com",
          description: "Invigorating scent, often used in cooking.",
          cost: "$15"
        }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        {
          name: "ZZ Plant",
          image: "https://unsplash.com",
          description: "Thrives in low light and requires minimal watering.",
          cost: "$25"
        },
        {
          name: "Aloe Vera",
          image: "https://pixabay.com",
          description: "Purifies the air and has healing properties for skin.",
          cost: "$14"
        },
        {
          name: "Pothos",
          image: "https://pixabay.com",
          description: "Tolerates neglect and can grow in various conditions.",
          cost: "$10"
        }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <img src="https://pixabay.com" alt="Paradise Nursery" />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div className="ul">
          <div>
            <a href="#" onClick={handlePlantsClick}>Plants</a>
          </div>
          <div>
            <a href="#" onClick={handleCartClick}>
              <h1 className="cart">
                <svg xmlns="http://w3.org" viewBox="0 0 256 256" height="68" width="68">
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                </svg>
                <span className="cart_quantity_count">{totalItemsCount}</span>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h1>
                <div>{category.category}</div>
              </h1>
              <div className="product-list">
                {category.plants.map((plant, plantIndex) => (
                  <div className="product-card" key={plantIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className={`product-button ${addedToCart[plant.name] ? 'added-to-cart' : ''}`}
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                    >
                      {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
