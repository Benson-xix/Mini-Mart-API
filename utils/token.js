const jwt = require('jsonwebtoken')

const generateAcessToken = (admin) => {
    const token = jwt.sign({admin}, process.env.TOKEN_ACESS, { expiresIn: "7d"})
    return token 
}


const generateAcessTokenUser = (user) => {
    const token = jwt.sign({user}, process.env.TOKEN_ACESS_USER, { expiresIn: "7d"})
    return token 
}

const verifyUserToken = (token) => {
   // try {
    const {user} = jwt.verify(token, process.env.TOKEN_ACESS_USER)
    return user
//}
//catch(err) {
  //  return {err: err.message}
// }
 }

const verifyAdminToken = (token) => {
    // try {
    const {admin} = jwt.verify(token, process.env.TOKEN_ACESS)
    return admin
//}
// catch(err) {
//     return {err: err.message}
// }
}
module.exports = {
    generateAcessToken,
 generateAcessTokenUser,
 verifyUserToken,
 verifyAdminToken

}