const express = require('express');
const app = express();
app.use(express.json());
const twilio = require('twilio');

require('dotenv').config();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;

// Database connection
const connectDB = require('./config/database');
connectDB();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const morgan = require('morgan');

app.use(morgan('dev'));

// Twilio configuration


// Routes
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');
const reviewRouter = require('./routes/reviewRouter');


// user routes
app.use('/api/users', userRouter);
app.use('/product', productRouter);
app.use('/api', reviewRouter);

//admin routes
// const { requireRole } = require('./middleware/authMiddle');

// app.use('/admin-dashboard', requireRole('admin'), (res, req) => {
//     res.send('Admin dashboard');
// })



app.get('/', (req, res) => {
    res.send(`server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

