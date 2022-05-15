const checkRole = (role) => {
    return (req, res, next) => {
        try{
            let {user} = req;
            if(user.role <= role){
                next();
            }

            return res.json({
                message: 'Unauthorized'
            });
        }
        catch(e){
            return res.json({
                message: 'Unauthorized'
            });
        }
    }
}