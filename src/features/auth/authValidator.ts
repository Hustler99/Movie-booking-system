import Joi from "joi";
import passwordComplexity  from"joi-password-complexity"
export function validateUserSign(obj:object) {
    const schema = Joi.object({
    email:Joi.string().email().trim().required().max(100),
    firstName: Joi.string().trim().min(3).max(100).required(),
    lastName: Joi.string().trim().min(3).max(100).required(),
    password: passwordComplexity().required(),
    })
    return schema.validate(obj)
}

export function validateLogin(obj:object) {
    const schema = Joi.object({
    email:Joi.string().email().trim().required().max(100),
    password: passwordComplexity().required(),
    })
    return schema.validate(obj)
}