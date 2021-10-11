const mongoose = require('mongoose');
import { UserSchema } from '../models/userModel';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configs');

const User = mongoose.model('User', UserSchema);

export const registerUser = (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 10);

    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        isAdmin: req.body.isAdmin
    });

    newUser
        .save()
        .then((data) => {
            let userToken = jwt.sign(
                {
                    id: data._id,
                    admin: data.isAdmin,
                },
                config.jwt.secret,
                {
                    expiresIn: 86400,
                }
            );
            console.log(userToken);
            res.send({
                auth: true,
                token: userToken,
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occured',
            });
        });
};

export const loginUser = (req, res) => {
    // Recherche si l'user existe à partir du mail
    User.findOne({
        email: req.body.email,
    })
    .then((user) => {
        if(!user) {
            return res.status(404).send({
                message: `no user find with email ${req.body.email}`,
            });
        }
        // décrypter mdp et regarder si c'est le bon
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!passwordIsValid) {
            return res.status(401).send({
                auth: false,
                token: null,
              });
        }
        // Attribuer token avec bonne data à l'user
        let userToken = jwt.sign(
            {
                id: user._id,
                admin: user.isAdmin,
            },
            config.jwt.secret,
            {
            expiresIn: 86400,
            }
        );
        // Envoi de la réponse success
        res.status(200).send({
            auth: true,
            token: userToken,
        });
    });
}

export const getUsers = (req, res) => {
    User.find()
    .then((users) => {
        if(!users) {
            return res.status(404).send({
                message: `pas d'users à afficher `,
            });
        }
        res.send(users);
    })
    .catch((err) => {
        return res.status(404).send({
            message: err.message,
        });
    });
}

export const updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new : true }, (err, user) => {
        if(err) {
            res.send(err);
        }
        res.json(user);
    })
}