import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from './routes/auth.route.js'

const app = express();

const allowedOrigins = [
    'http://localhost:5173', //development origin
]

app.use((req, res, next) => {
  console.log('🔥 REQUEST HIT:', req.method, req.url)
  next()
})

app.use(cors({
  origin: (origin, callback) => {
     console.log('🌍 Incoming Origin:', origin) //Log the origin that's being used
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      /\.app\.github\.dev$/.test(new URL(origin).hostname)
    ) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },

  credentials: true,
}));

app.use(express.json())
app.use(errorHandler)
app.use('/api/auth', authRoutes)

export default app;