import React, { useState } from 'react';
import CardList from './components/CardList/CardList';
import OptionsPanel, {
  defaultOptions,
} from './components/OptionsPanel/OptionsPanel';
import './styles.css';

export default function App() {
  const [options, setOptions] = useState(defaultOptions);

  function handleChange(event) {
    event.persist();
    const property = event.target.id;
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    console.log(event);
    setOptions({
      ...options,
      [property]: value,
    });
  }
  return (
    <div className="App">
      <OptionsPanel options={options} onChange={handleChange} />
      <CardList options={options} />
    </div>
  );
}
