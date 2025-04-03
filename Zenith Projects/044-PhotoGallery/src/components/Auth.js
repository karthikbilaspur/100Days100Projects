import React from 'react';
import { Auth } from 'aws-amplify';

const Protected = () => {
  const [allowed, setAllowed] = useState(false);

  Auth.currentAuthenticatedUser()
    .then((user) => {
      const groups = user.signInUserSession.accessToken.payload['cognito:groups'];
      setAllowed(groups.includes('admin'));
    })
    .catch((error) => console.error(error));

  return allowed ? (
    <div>Protected content</div>
  ) : (
    <div>Access denied</div>
  );
};

export default Protected;