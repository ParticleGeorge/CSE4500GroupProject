import User from '../model/User.js';
import bcrypt from 'bcrypt';

const register = async (req, res) => {
    try {
        const { firstName, lastName, username, password, email } = req.body;
        if(!username || !password || !firstName || !lastName || !email) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        if (typeof username !== 'string' || username.trim() === '') {
            return res.status(400).json({ error: 'Username is invalid.' });
        }

        if (typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({ error: 'Password is invalid.' });
          }
        
        if (typeof firstName !== 'string' || firstName.trim() === '') {
            return res.status(400).json({ error: 'First name is invalid.' });
        }

        if (typeof lastName !== 'string' || lastName.trim() === '') {
            return res.status(400).json({ error: 'Last name is invalid.' });
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) { 
            return res.status(400).json({ error: 'Username is already taken.'});
        }

        //hash password before saving
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            firstName,
            lastName,
            username,
            email,
            passwordDigest: hashedPassword,
        });

        await newUser.save();
        return res.status(201).json({
            message: 'User registered successfully!',
            User: {
              username: newUser.username,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
            },
          });
        }  catch(error) {
            console.error(error);
            res.status(500).json({ error: 'An error occured while registering. Please try again.'})
        }
}


const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const foundUser = await User.findOne({ username });
        if(!foundUser) {
            return res.status(401).json({ error: 'User not found. Please try again or create an account.'});
        }

        const isPasswordValid = await bcrypt.compare(password, User.passwordDigest);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password. Please try again.' });
        }

        res.status(200).json({ message: 'Login successful.', UserId: User._id });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: 'An error occured during login. Please try again.'})
    }
}

const getUserById = async (req, res) => {
    try {
        const{ id } = req.params;

        const User = await User.findById(id).select('-passwordDigest');
        if (!User) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(User);
    }  catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching user details.'});
    }
};

export const userController = {register, login, getUserById};

