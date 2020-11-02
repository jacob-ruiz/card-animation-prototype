import React, { useEffect, useState } from 'react';
import './styles.css';

function Card({ id, isActive, setActiveItem, onRemove, options }) {
  const [render, setRender] = useState(true);

  // Before unmounting, we need to animate the element away
  function prepareToUnmount() {
    setRender(false);
  }

  // Once the animation is complete, remove the item (and unmount)
  function handleTransitionEnd(event) {
    event.persist();
    // Hacky way to make sure the transition we're acting on is the closing
    // of the card (height), and not the button background color transition.
    const isExited = event.propertyName === 'height';

    if (!render && isExited) {
      onRemove(id);
    }
    return;
  }

  return (
    <div
      onClick={() => setActiveItem(id)}
      className={`card ${isActive ? 'open' : 'closed'} ${
        render ? null : 'exited'
      }`}
      style={{ transition: `${options.duration} ease-in-out` }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="inner">
        {isActive && <button onClick={prepareToUnmount}>accept</button>}
      </div>
    </div>
  );
}

export default Card;
