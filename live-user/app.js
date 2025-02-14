const express = require('express');
const app = express();
const userRouter = require('./api/users');
const authRouter = require('./auth/auth');

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});