function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return function (req, res, next) {
        const {user_id, role, role_id} = req.session;
            if (!user_id 
                || (roles.length && !roles.includes(role)) //if there are roles and the user's role is not included
                || (roles.length && (req.params.id) && (parseInt(req.params.id)) != role_id)) { //if role_id is not the same as the path's id
                // user or user's role is not authorized:
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
}

module.exports = authorize;