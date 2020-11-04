import {getUsers, addUser} from '../controllers/users.js'
import express from 'express'
const router = express.Router();


router.route('/', getUsers)
router.route('/add', addUser)

export default router