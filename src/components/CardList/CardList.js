import React, { useEffect, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from '../Card/Card';
import './styles.css';

function CardList() {
  const [items, setItems] = useState([
    { id: 1, text: 'Suggestion 1' },
    { id: 2, text: 'Suggestion 2' },
    { id: 3, text: 'Suggestion 3' },
    { id: 4, text: 'Suggestion 4' },
    { id: 5, text: 'Suggestion 5' },
    { id: 6, text: 'Suggestion 6' },
    { id: 7, text: 'Suggestion 7' },
    { id: 8, text: 'Suggestion 8' },
  ]);
  const [activeItem, setActiveItem] = useState(1);

  function removeItem(id) {
    const newList = items.filter((item) => item.id !== id);

    setItems(newList);

    if (items.length) {
      setActiveItem(items[0].id);
    }
  }

  return (
    <div className="cards-column">
      {items.map(({ id, text }) => (
        <Card
          key={id}
          onExited={() => removeItem(id)}
          isActive={activeItem === id}
          onClick={() => {
            if (activeItem === id) return;
            setActiveItem(id);
          }}
        >
          {text}
        </Card>
      ))}
    </div>
  );
}

export default CardList;
