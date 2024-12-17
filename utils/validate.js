const zod = require('zod');



const signUpSchema = zod.object({
    name: zod.string().min(3),
    email: zod.string().email(),
    password: zod.string().min(6),
   
    });


const signInSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    });

module.exports = { signUpSchema, signInSchema };