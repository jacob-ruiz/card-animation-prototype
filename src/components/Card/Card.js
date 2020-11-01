import React, { useEffect, useState } from 'react';
import './styles.css';

function Card({ id, isActive, setActiveItem, onRemove }) {
  const [render, setRender] = useState(true);

  useEffect(() => {
    return () => {
      console.log('unmounting!');
    };
  }, []);

  function prepareToUnmount() {
    setRender(false);
  }

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
