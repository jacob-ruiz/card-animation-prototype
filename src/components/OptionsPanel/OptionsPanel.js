import React from 'react';
import './styles.css';

const durations = ['50ms', '80ms', '100ms', '150ms'];

const defaultOptions = {
  duration: durations[0], // default to 50ms
  autoOpen: false,
};

const OptionsPanel = ({ onChange, options }) => {
  return (
    <div className="panel">
      <div className="panel-section">
        <h3>Prototype Options</h3>
      </div>
      <div className="panel-section">
        <div>
          <label htmlFor="duration">Duration</label>
        </div>
        <select name="duration" id="duration" onChange={onChange}>
          {durations.map((duration) => {
            const isDefault = duration === defaultOptions.duration;
            return (
              <option value={duration} selected={isDefault}>
                {duration} {isDefault && '(Recommended)'}
              </option>
            );
          })}
        </select>
      </div>
      <div className="panel-section align-center">
        <input
          type="checkbox"
          id="autoOpen"
          checked={options.autoOpen}
          name="autoOpen"
          onChange={onChange}
        />
        <label htmlFor="autoOpen" class="cursor-pointer">
          Auto-open next card
        </label>
      </div>
      {options.autoOpen && (
        <div style={{ padding: 16 }}>
          <h3>About auto-opening</h3>
          <p>
            This setting will cause the next card in the stack to automatically
            open after a card has been accepted.
          </p>
          <p>
            The problem with this is that it feels like a glitch. It makes it
            look like the card was accepted and then immediately reopened.
          </p>
          <p>Try it out and ssee what you think.</p>
        </div>
      )}
    </div>
  );
};

export default OptionsPanel;

export { defaultOptions, durations };
