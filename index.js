const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const twilio = require('twilio');

const app = express();
app.use(express.json());

app.use(helmet());
app.use(cookieParser());

require('dotenv').config();

// app.use(cors());

// app.use(
//   cors({
//     origin: "https://nursery-plant-admin-dashboard.vercel.app",
//     credentials: true,
//   })
// );

app.set("trust proxy", 1);

const allowedOrigins = [
  "http://localhost:5173/",
  "https://nursery-plant-admin-dashboard.vercel.app/",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Cors not allowed"));
    }
  },
  credentials: true,
}))


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

