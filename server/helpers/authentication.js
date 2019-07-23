const expressJwt = require('express-jwt');
const secret = process.env.JWT_SECRET;

// function generateToken(req){
//     if(!secret){
//         return;
//     }
//     return jwt.sign({
//       auth:  'magic',
//       agent: req.headers['user-agent'],
//       exp:   Math.floor(new Date().getTime()/1000) + 7*24*60*60; // Note: in seconds!
//     }, secret);  // secret is defined in the environment variable JWT_SECRET
//   }

// validate the token supplied in request header
function validate(req, res, next) {
    var token = req.headers.authorization.split(" ")[1];
    try {
      var decoded = jwt.verify(token, secret);
      req.user = decoded;
    } catch (e) {
      return res.status(401).json({ message: 'Unauthorized!!' });
    }
    if(!decoded || decoded.auth !== 'magic') {
      return res.status(401).json({ message: 'Unauthorized----' });
    } else {
      next();
    }
  }

function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
    expressJwt({ secret, credentialsRequired: false,
        getToken: function fromHeaderOrQuerystring (req) {
          if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
              return req.headers.authorization.split(' ')[1];
          } else if (req.query && req.query.token) {
            return req.query.token;
          }
          return null;
        }
      }),
    
    function (req, res, next) {
        if(req.user){
          const {sub, role, role_id} = req.user;
          if (!sub 
              || (roles.length && !roles.includes(role)) //if there are roles and the user's role is not included
              || (roles.length && (req.params.id) && (parseInt(req.params.id)) != role_id)) { //if role_id is not the same as the path's id
              // user or user's role is not authorized:
              return res.status(401).json({ message: 'Unauthorized!' });
          }
        }else{
          return res.status(401).json({ message: 'Unauthorized!' });
        }       

        // authentication and authorization successful
        next();
        }
    ];
}

module.exports = authorize;