import { Router } from 'express'
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/post.controller'
import { authenticateToken } from '../middleware/auth.middleware'

const postRoutes = Router()

postRoutes.get('/', authenticateToken, getAllPosts)
postRoutes.get('/:id', authenticateToken, getPostById)
postRoutes.post('/', authenticateToken, createPost)
postRoutes.put('/:id', authenticateToken, updatePost)
postRoutes.delete('/:id', authenticateToken, deletePost)

export default postRoutes
