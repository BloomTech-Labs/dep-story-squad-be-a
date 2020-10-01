import createError from 'http-errors';

const ds_admin_secret = process.env.DS_ADMIN_SECRET || 'xD5w6CTfQSh6qs4xviIV6viQomie3ePjQQeDQjsr';

const dsAdmin = async (req, res, next) => {
    try {
        if (req.headers.authorization == ds_admin_secret) {
            next();
        } else {
            throw new Error('Admin authorization failed.');
        }
    } catch (err) {
        next(createError(401, err.message));
    }
};

export default dsAdmin;