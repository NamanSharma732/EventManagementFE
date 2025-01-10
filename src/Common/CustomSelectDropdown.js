import React, { useState } from 'react';
import { Form, FormControl, Dropdown } from 'react-bootstrap';
// import './CustomSelectDropdown.css';

const CustomSelectDropdown = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredOptions(
      options.filter(option =>
        option.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setShowDropdown(false);
  };

  return (
    <div>
      <FormControl
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={() => setShowDropdown(true)}
      />
      {showDropdown && (
        <Dropdown.Menu show>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleSelect(option)}
              >
                {option.flag && <img src={option.id} alt={option.name} style={{ width: '20px', marginRight: '10px' }} />}
                {option.name}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No options</Dropdown.Item>
          )}
        </Dropdown.Menu>
      )}
    </div>
  );
};

export default CustomSelectDropdown;
