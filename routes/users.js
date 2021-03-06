const express = require('express');
const userRouter = express.Router();

const {
    checkJwt
} = require('../controllers/authController')

const {
    createNewUser,
    getSelectedUserData,
    modifySelectedUserData,
    deleteSelectedUser,
    getSelectedUserPostings,
    getSelectedUserSinglePosting
} = require('../controllers/userController');

userRouter.post('', createNewUser);

userRouter.get('/:id', checkJwt, getSelectedUserData);

userRouter.put('/:id', checkJwt, modifySelectedUserData);

userRouter.delete('/:id', checkJwt, deleteSelectedUser);

userRouter.get('/:id/postings', checkJwt, getSelectedUserPostings);

userRouter.get('/:id/postings/:slug', checkJwt, getSelectedUserSinglePosting);


module.exports = userRouter;