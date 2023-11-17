//setting up Express app

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const signupRoute = require('./routes/signupRoutes');

dotenv.config();

app.use(express.json());
app.use(signupRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

