import React, { useState, useEffect } from 'react';
import './MoodJournal.css';
import { Route, Switch } from 'react-router-dom';
import Calendar from './components/Calendar';
import Chart from './components/Chart';
import Dashboard from './components/Dashboard';
import Reminders from './components/Reminders';
import MoodTracker from './components/MoodTracker';
import SocialFeatures from './components/SocialFeatures';
import Gamification from './components/Gamification';

function MoodJournal() {
  const [mood, setMood] = useState('');
  const [entry, setEntry] = useState('');
  const [tags, setTags] = useState('');
  const [entries, setEntries] = useState([]);
  const [happinessCount, setHappinessCount] = useState(0);
  const [sadnessCount, setSadnessCount] = useState(0);
  const [angerCount, setAngerCount] = useState(0);
  const [neutralityCount, setNeutralityCount] = useState(0);
  const [reminders, setReminders] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [taggedEntries, setTaggedEntries] = useState({});

  useEffect(() => {
    const storedEntries = localStorage.getItem('entries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('entries', JSON.stringify(entries));
  }, [entries]);


  useEffect(() => {
    const storedReminders = localStorage.getItem('reminders');
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);


  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };


  const handleEntryChange = (e) => {
    setEntry(e.target.value);
  };


  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: uuidv4(),
      mood,
      entry,
      tags,
      date: new Date().toISOString(),
    };
    setEntries([...entries, newEntry]);
    updateMoodStats(newEntry.mood);
    axios.post('/api/entries', newEntry)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const updateMoodStats = (mood) => {
    switch (mood) {
      case 'happy':
        setHappinessCount(happinessCount + 1);
        break;
      case 'sad':
        setSadnessCount(sadnessCount + 1);
        break;
      case 'angry':
        setAngerCount(angerCount + 1);
        break;
      default:
        setNeutralityCount(neutralityCount + 1);
        break;
    }
  };


  const handleDeleteEntry = (id) => {
    const updatedEntries = entries.filter((entry) => entry.id !== id);
    setEntries(updatedEntries);
  };


  const handleAddReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };


  const handleDeleteReminder = (id) => {
    const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
    setReminders(updatedReminders);
  };


  const handleUpdateDashboardData = (data) => {
    setDashboardData(data);
  };


  const handleTaggedEntries = (tag, entries) => {
    setTaggedEntries((prevTaggedEntries) => ({ ...prevTaggedEntries, [tag]: entries }));
  };


  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <div className={`mood-journal ${darkMode ? 'dark-mode' : ''}`}>
      <h1>Mood Journal</h1>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <Switch>
        <Route path="/" exact>
          <Calendar entries={entries} />
          <Reminders reminders={reminders} handleAddReminder={(reminder) => setReminders([...reminders, reminder])} handleDeleteReminder={(id) => setReminders(reminders.filter((reminder) => reminder.id !== id))} />
          <Dashboard data={dashboardData} handleUpdateDashboardData={(data) => setDashboardData(data)} />
          <Chart happinessCount={happinessCount} sadnessCount={sadnessCount} angerCount={angerCount} neutralityCount={neutralityCount} />
        </Route>
        <Route path="/mood-tracker">
          <MoodTracker />
        </Route>
        <Route path="/social-features">
          <SocialFeatures />
        </Route>
        <Route path="/gamification">
          <Gamification />
        </Route>
      </Switch>
    </div>
  );
}

export default MoodJournal;