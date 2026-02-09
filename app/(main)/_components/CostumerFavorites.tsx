import ItemsSlider from "@/components/ItemsSlider";
import React from "react";

const customerFavoritesItems = [
  {
    id: 1,
    title: "Cappuccino",
    description: "Rich espresso with steamed milk and creamy foam",
    price: 95,
    image: "/costumer-favorites/cappuccino.webp",
    category: "coffee",
    isPopular: true,
  },
  {
    id: 2,
    title: "Mocha",
    description: "Espresso blended with rich chocolate and steamed milk",
    price: 100,
    image: "/customer-favorites/mocha.webp",
    category: "coffee",
    isPopular: true,
  },

  {
    id: 3,
    title: "Chocolate Brownie",
    description: "Warm brownie served with rich chocolate flavor",
    price: 110,
    image: "/costumer-favorites/brownie.webp",
    category: "dessert",
    isPopular: true,
  },
  {
    id: 4,
    title: "Croissant",
    description: "Freshly baked, crispy outside and soft inside",
    price: 75,
    image: "/costumer-favorites/croissant.jpg",
    category: "bakery",
    isPopular: true,
  },
];

export default function CostumerFavorites() {
  return (
    <div>
      <h1>Customer Favorites</h1>
      <p>The most loved flavors, chosen by our guests.</p>
      <ItemsSlider
        sliderId="customer-favorites-slider"
        items={customerFavoritesItems}
      />
    </div>
  );
}
