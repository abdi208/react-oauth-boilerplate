import express from 'express';
const router = express.Router();
import passport from '../config/ppConfig';
import {IUser} from '../oauthtyoes'
// GET /auth/github- display GH LOGIN PAGE
router.get('/github', passport.authenticate('github'));

// GET /auth/callback - receives the token from Github
router.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/auth/github'}),
    (req, res) => {
        console.log(`THIS IS THE USER FROM DB: ${req.user}`);
        res.render('success', {user: req.user as IUser});
    });

export default router;