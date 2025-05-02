const joi  = require ("joi");

const signUpSchema =  joi.object({
    name:joi.string().min(3).max(30).required(),
    email:joi.string().email().required(),
    password:joi.string()
    .min(8)
    .max(32)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[!@#$%^&*(),.?":{}|<>]/)
    .required()
})

const loginSchema = joi.object({

    email:joi.string().email().required(),
    password:joi.string().required()
})

module.exports = {signUpSchema,loginSchema}