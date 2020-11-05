import React from 'react';
import './styles.css';

const durations = ['50ms', '80ms', '100ms', '150ms', '1000ms'];

// https://easings.net/#
// TODO : add elastic curves from link above
// TODO : add graphs!

const easings = {
  // easeInSine: 'cubic-bezier(0.47, 0, 0.745, 0.715)',
  // easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1)',
  easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  // easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  // easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  // easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  // easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  // easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  // easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  easeInOutQuart: 'cubic-bezier(0.77, 0, 0.175, 1)',
  // easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  // easeOutQuint: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutQuint: 'cubic-bezier(0.86, 0, 0.07, 1)',
  // easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  // easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeInOutExpo: 'cubic-bezier(1, 0, 0, 1)',
  // easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  // easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  // easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  // easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

const nextCardDelays = [0, 50, 100, 150, 200, 300];

const defaultOptions = {
  duration: durations[2],
  autoOpen: true,
  easing: easings.easeInOutQuart,
  nextCardDelay: nextCardDelays[3],
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
        <select
          name="duration"
          id="duration"
          onChange={onChange}
          defaultValue={defaultOptions.duration}
        >
          {durations.map((duration, i) => {
            const isDefault = duration === defaultOptions.duration;
            return (
              <option value={duration} key={i}>
                {duration === '1000ms' ? '🐢 Slow motion' : duration}
                {isDefault && ' (Recommended)'}
              </option>
            );
          })}
        </select>
      </div>

      <div className="panel-section">
        <div>
          <label htmlFor="easing">Easing curve</label>
        </div>
        <select
          name="easing"
          id="easing"
          onChange={onChange}
          defaultValue={defaultOptions.easing}
        >
          {Object.keys(easings).map((key, i) => {
            const isDefault = easings[key] === defaultOptions.easing;
            return (
              <option key={i} value={easings[key]}>
                {key} {isDefault && '(Recommended)'}
              </option>
            );
          })}
        </select>
      </div>

      <div className="panel-section ">
        <div className="align-center">
          <input
            type="checkbox"
            id="autoOpen"
            checked={options.autoOpen}
            name="autoOpen"
            onChange={onChange}
          />
          <label htmlFor="autoOpen" className="cursor-pointer">
            Auto-open next card
          </label>
        </div>
        <div>
          {options.autoOpen && (
            <>
              <div style={{ marginTop: 8 }}>
                <label htmlFor="nextCardDelay">Delay</label>
              </div>
              <select
                name="nextCardDelay"
                id="nextCardDelay"
                onChange={onChange}
                defaultValue={defaultOptions.nextCardDelay}
              >
                {nextCardDelays.map((nextCardDelay, i) => {
                  const isDefault =
                    nextCardDelay === defaultOptions.nextCardDelay;
                  return (
                    <option value={nextCardDelay} key={i}>
                      {nextCardDelay + 'ms'}
                      {isDefault && ' (Recommended)'}
                    </option>
                  );
                })}
              </select>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionsPanel;

export { defaultOptions, durations, easings };
