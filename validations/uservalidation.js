const joi  = require ("joi");

const signUpSchema =  joi.object({
    name: joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": "Name must contain only letters and spaces",
    }),
    email:joi.string()
    .email()
    .required()
    .messages({
        "string.email": "Please provide a valid email address",
        "string.empty": "Email is required",
    }),
    password:joi.string()
    .min(8)
    .max(32)
    .pattern(/[A-Z]/)
    .pattern(/[a-z]/)
    .pattern(/[0-9]/)
    .pattern(/[!@#$%^&*(),.?":{}|<>]/)
    .required()
    .messages({
        "string.pattern.base":
          "Password must include uppercase, lowercase, number, and special character",
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters",
        "string.max": "Password must not exceed 32 characters",
      }),
})

const loginSchema = joi.object({

    email:joi.string().email().required()
    .messages({
      "string.empty":"email is required"
    }),
    password:joi.string().required()
    .messages({
      "string.empty":"password is required"
    })
})

module.exports = {signUpSchema,loginSchema}