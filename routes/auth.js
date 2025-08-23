const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// GET registration page
router.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register - StudySync',
        description: 'Create your StudySync account'
    });
});

router.post('/register', async (req, res) => {
    try {
        const { username, password, name, email } = req.body;
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', {
                error: 'Username already exists',
                title: 'Register - StudySync'
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            username,
            password: hashedPassword,
            name,
            email
        });
        
        await user.save();
        
        res.redirect(`/dashboard?username=${username}`);
        
    } catch (error) {
        console.error('Registration error:', error);
        res.render('register', {
            error: 'Registration failed. Please try again.',
            title: 'Register - StudySync'
        });
    }
});

module.exports = router;