import { Router } from 'express'
import {
  register,
  login,
  logout,
  refreshToken,
} from '../controllers/auth.controller'
import { authenticateToken } from '../middleware/auth.middleware'

const authRoutes = Router()

authRoutes.post('/auth/register', register)
authRoutes.post('/auth/login', login)
authRoutes.post('/auth/logout', authenticateToken, logout)
authRoutes.post('/auth/refresh-token', refreshToken)

export default authRoutes
