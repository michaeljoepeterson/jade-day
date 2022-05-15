const checkRole = (role) => {
    return (req, res, next) => {
        try{
            let {user} = req;
            if(user.role <= role){
                return next();
            }

            res.status(500);
            return res.json({
                message: 'Unauthorized'
            });
        }
        catch(e){
            res.status(500);
            return res.json({
                message: 'Unauthorized'
            });
        }
    }
}

module.exports = {checkRole};