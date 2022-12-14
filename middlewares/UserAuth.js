const { verifyUserToken } = require("../utils/token")


const UserAuthenticate = (req, res, next) => {
    const { authorization} =req.headers

    if(!authorization) {
        res.status(403).json({ error: "Not authorized"})
        return
    }

    //
    const token = authorization.split(" ")[1]
    try {
        const user = verifyUserToken(token)
        req.user = user
        next()
    } catch (e) {
        res.status(500).json({error: e.message })
    }
}


module.exports = {
 UserAuthenticate
}