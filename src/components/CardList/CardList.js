import React, { useState } from 'react';
import Card from '../Card/Card';
import './styles.css';

const initialList = [
  {
    id: 1,
    category: 'style',
    mistake: '98%',
    suggestion: '98 percent',
    description:
      'Spell out ‘percent’ rather than use the percent symbol (%), when using numerals.',
  },
  {
    id: 2,
    category: 'style',
    mistake: 'lorem',
    suggestion: 'ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  },
  {
    id: 3,
    category: 'style',
    mistake: 'exercitation',
    suggestion: 'architecto',
    description: 'Nemo enim ipsam voluptatem',
  },
  {
    id: 4,
    category: 'style',
    mistake: 'minima',
    suggestion: 'veniam',
    description:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
  },
  {
    id: 5,
    category: 'style',
    mistake: '98%',
    suggestion: '98 percent',
    description:
      'Spell out ‘percent’ rather than use the percent symbol (%), when using numerals.',
  },
  {
    id: 6,
    category: 'style',
    mistake: 'lorem',
    suggestion: 'ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  },
  {
    id: 7,
    category: 'style',
    mistake: 'exercitation',
    suggestion: 'architecto',
    description: 'Nemo enim ipsam voluptatem',
  },
  {
    id: 8,
    category: 'style',
    mistake: 'minima',
    suggestion: 'veniam',
    description:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur',
  },
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
      {items.map((item) => (
        <Card
          key={item.id}
          item={item}
          isActive={activeItem === item.id}
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
