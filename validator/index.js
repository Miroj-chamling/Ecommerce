exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    req.check('email', 'Email must be valid')
        .matches(/.+@.+\..+/)
        .withMessage("Emal must contain @")
        .isLength({
            min:4,
            max:32
        });
    req.check('password', 'Password is required').notEmpty()
        .isLength({min:6})
        .withMessage('Password must be 6 characters long')
        .matches(/\d/)
        .withMessage('password must contain a number');
         const errors = req.validationErrors();
         if(errors){
             const firstError = errors.map(error => error.msg)[0]
             return res.status(400).json({error: firstError});
         }
         next();
};