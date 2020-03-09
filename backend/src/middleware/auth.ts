import express, { Handler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { AuthError } from '../errors/AuthError';

const loginHandler: Handler = async (req, res) => {
    if (!process.env.JWT_SECRET) {
        console.log('JWT_SECRET is required');
        return res.status(500);
    }

    const { userName, password } = req.body;
    const userRepository = getRepository(User);

    if (!userName) {
        return res.status(400).send(new AuthError('userName is required'));
    }
    if (!password) {
        return res.status(400).send(new AuthError('password is required'));
    }

    const user = await userRepository.findOne({ userName });
    if (!user) {
        return res.status(400).send(new AuthError('incorrect userName or password'));
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
        return res.status(400).send(new AuthError('incorrect userName or password'));
    }

    const token = jwt.sign({ userName }, process.env.JWT_SECRET);
    return res.status(200).cookie('AUTH_TOKEN', token).send();
};

const logoutHandler: Handler = (req, res) => {
    return res.clearCookie('AUTH_TOKEN').send();
};

const signupHandler: Handler = async (req, res) => {
    const { userName, password, firstName, lastName } = req.body;
    const userRepository = getRepository(User);

    if (!userName) {
        return res.status(400).send(new AuthError('userName is required'));
    }

    const user = await userRepository.findOne({ userName });
    if (user) {
        return res.status(400).send(new AuthError('userName already taken'));
    }

    if (!password) {
        return res.status(400).send(new AuthError('password is required'));
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new User();
    newUser.userName = userName;
    newUser.passwordHash = passwordHash;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    await userRepository.save(newUser);

    return res.status(200).send();
};

export function createAuthRouter() {
    const router = express.Router();

    router.post('/login', loginHandler);
    router.post('/logout', logoutHandler);
    router.post('/signup', signupHandler);

    return router;
}
