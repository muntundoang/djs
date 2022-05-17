const { User } = require('../models')
const { payloadTokenGenerate, readPayloadToken } = require('../helpers/jwt');
const errHandler = require('../helpers/errorHandler');

class userController {

    static async register(req, res) {
        try {

            const { username, role } = req.body
            console.log(username, role)
            if (username === "" || role === "" || !username || !role) {
                throw { name: 'registerFieldEmpty' }
            } else if (username.length < 4) {
                throw { name: 'registerUsernameLength' }
            }

            const data = await User.create({
                username,
                role
            })

            res.status(201).json({ message: `ID ${data.id} dengan username ${data.username} telah dibuat` })

        } catch (err) {
            const error = errHandler(err)
            res.status(error.status).json(error)
        }
    }

    static async login(req, res) {

        const { username, password } = req.body

        try {
            if (username === "" || password === "" || !username || !password) {
                throw { name: 'loginFieldEmpty' }
            }
            const option = {
                where: {
                    username: username
                }
            }
            const userData = await User.findOne(option)

            if (!userData) {

                throw { name: 'invalidUserusername' }

            } else {

                const validPass = password === userData.password ? true : false

                if (!validPass) {

                    throw { name: 'invalidUserusername' }

                } else {

                    const payload = userData.username
                    const {access_token, expired_at} = payloadTokenGenerate(payload)

                    res.status(200).json({
                        ID: userData.id,
                        access_token: access_token,
                        expired_at: expired_at,
                        username: userData.username
                    })
                }
            }
        } catch (err) {

            const error = errHandler(err)
            res.status(error.status).json(error)

        }

    }

    static async findUser(req, res) {
        try {
            const user = await User.findAll({})
            res.status(200).json(user)
        } catch (err) {
            const error = errHandler(err)
            res.status(error.status).json(error)
        }
    }

    static async authentication(req, res) {
        try {
            const { access_token } = req.headers
            const payload = readPayloadToken(access_token)
            const {data, expired_at} = payload
            const userLogin = await User.findOne({
                where: {
                    username: data
                }
            })
            if (!userLogin || !payload) {
                throw { name: 'AuthenticationFailUserNotFound' }
            } else {
                res.status(200).json({
                    is_valid: true,
                    expired_at,
                    username: userLogin.username
                })
            }
        } catch (err) {
            const error = errHandler(err)
            res.status(error.status).json(error)
        }
    }

}

module.exports = userController