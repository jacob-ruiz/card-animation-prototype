import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

/*
  Card dismissal sequence:
  1. Scale down
  2. After scale down, pause, shrink height
  3. onRemove(i) to remove from stack
*/

function Card({ item, isActive, setActiveItem, onRemove, options }) {
  const { id, category, mistake, suggestion, description } = item;
  const [render, setRender] = useState(true);

  // Possible states:
  // open, minimized, scaledDown, shrunkHeight
  const [state, setState] = useState('minimized');
  const elRef = useRef();
  const [maxHeight, setMaxHeight] = useState(0);
  const [height, setHeight] = useState(48);

  useEffect(() => {
    setMaxHeight(elRef.current.scrollHeight);
    if (isActive) {
      setState('open');
    } else {
      setState('minimized');
    }
  }, [isActive]);

  useEffect(() => {
    if (state === 'minimized') {
      setHeight(48);
    } else if (state === 'open') {
      setHeight(maxHeight);
    } else if (state === 'scaledDown') {
      setHeight(maxHeight);
    } else if (state === 'shrunkHeight') {
      setHeight(0);
    }
  }, [state]);

  function handleAccept() {
    console.log('handleAccept');
    setState('scaledDown');
  }

  function handleTransitionEnd(event) {
    event.persist();

    if (state === 'scaledDown') {
      setState('shrunkHeight');
    }
    if (state === 'shrunkHeight' && event.propertyName === 'height') {
      setTimeout(() => {
        onRemove(id);
      }, options.nextCardDelay);
    }
  }

  return (
    <div
      className="height-wrapper"
      id={state}
      style={{
        height: height,
        marginBottom: state === 'shrunkHeight' ? 0 : 8,
        transition: `${options.duration} ${options.easing}`,
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        ref={elRef}
        id={state}
        onClick={() => setActiveItem(id)}
        className={`card ${isActive ? 'open' : 'closed'} `}
        style={{
          height: height,
          transform: state === 'scaledDown' ? 'scale(0.5)' : 'scale(1)',
          opacity: state === 'scaledDown' || state === 'shrunkHeight' ? 0 : 1,
          transition: `${options.duration} ${options.easing}`,
        }}
      >
        <div
          style={{
            opacity: state === 'minimized' ? 0 : 1,
            transition: options.duration,
          }}
        >
          <h4 className="category">{category}</h4>
          <p className="mistake">{mistake}</p>
          <button onClick={handleAccept} className="suggestion">
            {suggestion}
          </button>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
