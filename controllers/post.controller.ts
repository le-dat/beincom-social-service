import { Request, Response } from 'express'
import { PostModel } from '../database/models/post.model'

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body
    await PostModel.create({
      title,
      content,
    })
    return res.status(201).json({ message: 'Post created' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const totalPosts = await PostModel.countDocuments()
    const totalPages = Math.ceil(totalPosts / limit)

    const posts = await PostModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return res.status(200).json({
      posts,
      page,
      totalPages,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await PostModel.findById(req.params.id).lean()
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    return res.status(200).json(post)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body
    await PostModel.findByIdAndUpdate(req.params.id, { title, content })
    return res.status(200).json({ message: 'Post updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id)
    return res.status(204).json({ message: 'Post deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const addComment = async (req: Request, res: Response) => {
  try {
    const { comment } = req.body
    await PostModel.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment },
    })
    return res.status(200).json({ message: 'Comment added' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { comment } = req.body
    await PostModel.updateOne(
      { _id: req.params.id, 'comments._id': req.params.commentId },
      { $set: { 'comments.$.comment': comment } }
    )
    return res.status(200).json({ message: 'Comment updated' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await PostModel.updateOne(
      { _id: req.params.id },
      { $pull: { comments: { _id: req.params.commentId } } }
    )
    return res.status(204).json({ message: 'Comment deleted' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
