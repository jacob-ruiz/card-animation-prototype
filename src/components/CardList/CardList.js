import React, { useState } from 'react';
import Card from '../Card/Card';
import './styles.css';

const initialList = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
];

function CardList({ options }) {
  const [items, setItems] = useState(initialList);
  const [activeItem, setActiveItem] = useState(1);

  function handleRemove(id) {
    let i;
    const newList = items.filter((item, index) => {
      if (item.id === id) {
        i = index;
      }
      return item.id !== id;
    });

    setItems(newList);

    if (options.autoOpen) {
      openNextCard(i);
    }
  }

  function openNextCard(currentIndex) {
    let nextCardID = calculateNextCardID(currentIndex, items);
    setActiveItem(nextCardID);
  }

  function loadMoreCards() {
    setItems(initialList);
  }

  // No cards, render empty state
  if (!items.length) {
    return (
      <div className="cards-column empty">
        <button onClick={loadMoreCards}>Load more cards</button>
      </div>
    );
  }

  // Otherwise, render cards
  return (
    <div className="cards-column">
      {items.map(({ id, text }) => (
        <Card
          key={id}
          id={id}
          isActive={activeItem === id}
          setActiveItem={setActiveItem}
          onRemove={handleRemove}
          options={options}
        />
      ))}
    </div>
  );
}

export default CardList;

function calculateNextCardID(currentIndex, items) {
  // Here, we figure out which card to open next
  // We need to find the id of the card after the current card
  // If there is no "next card", we check if there is a card before
  // If there is neither, then we're dismissing the next card
  let newItemID;
  const itemAfter = items[currentIndex + 1];
  const itemBefore = items[currentIndex - 1];
  if (itemAfter) {
    newItemID = itemAfter.id;
  } else if (itemBefore) {
    newItemID = itemBefore.id;
  } else {
    newItemID = null;
  }
  return newItemID;
}
