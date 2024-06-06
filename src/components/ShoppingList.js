import React, { useState } from "react";
import Item from "./Item";
import Filter from "./Filter";
import ItemForm from "./ItemForm";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [itemList, setItemList] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchChange(text) {
    setSearchText(text);
  }

  function handleItemFormSubmit(newItem) {
    setItemList([...itemList, newItem]);
  }

  const itemsToDisplay = itemList.filter((item) => {
    if (selectedCategory === "All") {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    }
    return (
      item.category === selectedCategory &&
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="shoppingList">
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        searchText={searchText}
      />
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
