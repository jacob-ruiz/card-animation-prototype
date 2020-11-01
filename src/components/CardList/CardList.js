import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from '../Card/Card';
import './styles.css';

// TODO: Fix crash when accepting final card

const initialList = [
  { id: 1, text: 'Suggestion 1' },
  { id: 2, text: 'Suggestion 2' },
  { id: 3, text: 'Suggestion 3' },
  { id: 4, text: 'Suggestion 4' },
  { id: 5, text: 'Suggestion 5' },
  { id: 6, text: 'Suggestion 6' },
  { id: 7, text: 'Suggestion 7' },
  { id: 8, text: 'Suggestion 8' },
];

function CardList() {
  const [items, setItems] = useState(initialList);
  const [activeItem, setActiveItem] = useState(items[0].id);

  function handleRemove(id) {
    let i;
    const newList = items.filter((item, index) => {
      if (item.id === id) {
        i = index;
      }
      return item.id !== id;
    });

    // Here, we figure out which card to open next
    // We need to find the id of the card after the current card
    // If there is no "next card", we check if there is a card before
    // If there is neither, then we're dismissing the next card
    let newItemID;
    const itemAfter = items[i + 1];
    const itemBefore = items[i - 1];
    if (itemAfter) {
      newItemID = itemAfter.id;
    } else if (itemBefore) {
      newItemID = itemBefore.id;
    } else {
      console.log('last card!');
      newItemID = null;
    }
    setActiveItem(newItemID);
    setItems(newList);
  }

  return (
    <div className="cards-column">
      {items.map(({ id, text }) => (
        <Card
          key={id}
          id={id}
          isActive={activeItem === id}
          setActiveItem={setActiveItem}
          onRemove={handleRemove}
        >
          {text}
        </Card>
      ))}
    </div>
  );
}

export default CardList;
