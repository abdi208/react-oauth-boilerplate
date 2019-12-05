import express from 'express';
const router = express.Router();
import axios from 'axios';
import { IUser } from '../oauthtyoes'

// declare global {
//     namespace Express {
//         interface Request {
//             user?: IUser;
//         }
//     }
// }

// GET FROM /api/:id/repos get users repos from GH
router.get('/:id/repos', (req, res) => {
    let ghUser = req.user as IUser
    let config = {
        headers: {
            'Authorization': `Bearer ${ghUser.accessToken}`,
            'User-Agent': 'react-oauth-aa'
        }
    }
    axios.get('https://api.github.com/user/repos', config)
        .then((response) => {
            res.json(response.data)
        }).catch((err) => {
            console.log(err)
        })
})

export default router;