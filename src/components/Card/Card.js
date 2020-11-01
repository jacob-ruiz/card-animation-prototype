import React, { useState } from 'react';
import './styles.css';

function Card({ id, isActive, setActiveItem, onRemove }) {
  const [render, setRender] = useState(true);

  // Before unmounting, we need to animate the element away
  function prepareToUnmount() {
    setRender(false);
  }

  // Once the animation is complete, remove the item (and unmount)
  function handleTransitionEnd() {
    if (!render) {
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
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="inner">
        {isActive && <button onClick={prepareToUnmount}>accept</button>}
      </div>
    </div>
  );
}

export default Card;
