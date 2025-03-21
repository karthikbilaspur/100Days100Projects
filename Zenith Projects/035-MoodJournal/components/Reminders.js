import React, { useState } from 'react';

const Reminders = ({ reminders, handleAddReminder, handleDeleteReminder }) => {
  const [reminderText, setReminderText] = useState('');

  const handleAddReminderClick = () => {
    handleAddReminder(reminderText);
    setReminderText('');
  };

  return (
    <div>
      <h2>Reminders</h2>
      <ul>
        {reminders.map((reminder) => (
          <li key={reminder.id}>
            {reminder.text}
            <button onClick={() => handleDeleteReminder(reminder.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input type="text" value={reminderText} onChange={(e) => setReminderText(e.target.value)} />
      <button onClick={handleAddReminderClick}>Add Reminder</button>
    </div>
  );
};

export default Reminders;