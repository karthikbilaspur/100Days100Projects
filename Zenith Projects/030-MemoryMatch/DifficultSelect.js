import React from 'react';

const DifficultySelect = ({ onDifficultySelect }) => {
const handleSelect = (event) => {
onDifficultySelect(event.target.value);
};

return (
<select onChange={handleSelect}>
<option value="easy">Easy</option>
<option value="medium">Medium</option>
<option value="hard">Hard</option>
</select>
);
};

export default DifficultySelect;