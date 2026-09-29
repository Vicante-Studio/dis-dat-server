import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
    const data = req.body;
    res.json({message: 'Auth Route is active, yessss', data})
})


export default router;