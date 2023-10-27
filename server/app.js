//setting up Express app

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const signupRoute = require('./routes/signupRoutes');

dotenv.config();

app.use(express.json());
app.use(signupRoute);

app.get('/signup', (req, res)=>{
    res.send('Hello Registration world');
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

