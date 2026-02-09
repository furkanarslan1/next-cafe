import ItemsSlider from "@/components/ItemsSlider";
import React from "react";

const customerFavoritesItems = [
  {
    id: 1,
    title: "Cappuccino",
    description: "Rich espresso with steamed milk and creamy foam",
    price: 95,
    image: "/customer-favorites/cappuccino.webp",
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
    image: "/customer-favorites/brownie.webp",
    category: "dessert",
    isPopular: true,
  },
  {
    id: 4,
    title: "Croissant",
    description: "Freshly baked, crispy outside and soft inside",
    price: 75,
    image: "/customer-favorites/croissant.webp",
    category: "bakery",
    isPopular: true,
  },
];

export default function CustomerFavorites() {
  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">Customer Favorites</h1>
      <p className=" text-sm">The most loved flavors, chosen by our guests.</p>
      <ItemsSlider
        sliderId="customer-favorites-slider"
        items={customerFavoritesItems}
      />
    </div>
  );
}
