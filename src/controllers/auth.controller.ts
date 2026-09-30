import type { Request, Response } from 'express'
import { BadRequestError } from "../errors/serverError.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export async function handleRegisterUser(req: Request, res: Response) {
    const parsed = registerSchema.safeParse(req.body);

    if(!parsed.success){
        throw new BadRequestError('Invalid input', parsed.error.flatten().fieldErrors)
    }

    const result = await registerUser(parsed.data)

    res.status(201).json({
        message: result.confirmationRequired
            ? "Registered. Check your email to confirm your account."
            : "Registered",
    })
}

export async function handleLoginUser(req: Request, res: Response){
    const parsed = loginSchema.safeParse(req.body)

    if(!parsed.success){
        throw new BadRequestError('Invalid input', parsed.error.flatten().fieldErrors)
    }

    const { email, password } = parsed.data

    const tokens = await loginUser(email, password)

    res.status(200).json(tokens)
}