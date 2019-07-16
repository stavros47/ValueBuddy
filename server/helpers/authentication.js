function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return function (req, res, next) {
        const {user_id, role, role_id} = req.session;
            if (!user_id 
                || (roles.length && !roles.includes(role)) 
                || ((req.params.id) && (parseInt(req.params.id)) != role_id)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
}

module.exports = authorize;