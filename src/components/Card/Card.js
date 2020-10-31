import React, { useEffect, useState } from 'react';
import './styles.css';

function Card({ onExited, id, children, isActive, onClick }) {
  const [state, setState] = useState('closed');

  useEffect(() => {
    if (isActive) {
      setState('open');
    } else {
      setState('closed');
    }
  }, [isActive]);

  function handleAccept() {
    setState('exited');
  }

  function handleTransitionEnd() {
    if (state === 'exited') {
      onExited();
    }
  }

  function makeClassName(state) {
    if (isActive) {
      return 'open';
    }
    return state;
  }

  function handleClick(event) {
    if (state === 'closed') {
      onClick();
    }
    return;
  }

  return (
    <div
      onClick={handleClick}
      className={`card ${state}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {isActive && <button onClick={handleAccept}>accept</button>}
    </div>
  );
}

export default Card;
