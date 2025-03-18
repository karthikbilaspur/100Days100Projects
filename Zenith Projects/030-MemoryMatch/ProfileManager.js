import React, { useState } from 'react';

const ProfileManager = ({ profile, onProfileSave }) => {
const [name, setName] = useState(profile.name || '');
const [email, setEmail] = useState(profile.email || '');
const [password, setPassword] = useState(profile.password || '');

const handleSave = () => {
const newProfile = {
name,
email,
password,
};
onProfileSave(newProfile);
};

return (
<div>
<h2>Profile Manager</h2>
<form>
<label>Name:</label>
<input
type="text"
value={name}
onChange={(event) => setName(event.target.value)}
/>
<br />
<label>Email:</label>
<input
type="email"
value={email}
onChange={(event) => setEmail(event.target.value)}
/>
<br />
<label>Password:</label>
<input
type="password"
value={password}
onChange={(event) => setPassword(event.target.value)}
/>
<br />
<button onClick={handleSave}>Save</button>
</form>
</div>
);
};

export default ProfileManager;