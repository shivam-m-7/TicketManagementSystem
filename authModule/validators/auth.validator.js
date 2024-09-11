import { body } from 'express-validator';

const register = [
    body('name').notEmpty().withMessage('Name is required'),
    body('emial').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 6}).withMessage('Password must be at least 6 character')
]

const login = [
    body('emial').isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
]

export default { register, login }
