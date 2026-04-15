const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const twilio = require('twilio');
const app = express();

app.set("trust proxy", 1);

app.use(cors({
  origin: "https://nursery-plant-admin-dashboard.vercel.app",
  credentials: true,
}));

app.use(express.json());
app.use(helmet());
app.use(cookieParser());

require('dotenv').config();


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
const authRouter = require('./routes/authRouter');

// user routes
app.use('/api', userRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter);
app.use('/admin', authRouter)


app.get('/', (req, res) => {
  res.send(`server is running on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

