import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {errorHandler, notFound} from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/users.js";
import savingRoutes from './routes/saving.js';
import expenseRoutes from './routes/expense.js';

const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use('/api/users', userRoutes);
app.use('/api/savings', savingRoutes);
app.use('/api/expenses', expenseRoutes);
app.get('/', (req, res) => {
  res.send("Hello This is phanon.");
})

app.use(notFound);
app.use(errorHandler);
const PORT = 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));