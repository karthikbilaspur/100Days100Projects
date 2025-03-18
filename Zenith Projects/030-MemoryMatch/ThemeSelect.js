import React from 'react';

const ThemeSelect = ({ onThemeSelect }) => {
const handleSelect = (event) => {
onThemeSelect(event.target.value);
};

return (
<select onChange={handleSelect}>
<option value="default">Default</option>
<option value="dark">Dark</option>
<option value="light">Light</option>
</select>
);
};

export default ThemeSelect;