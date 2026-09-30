import { createAuthUser, deleteAuthUser, signInWithPassword } from "../repositories/auth.repository.js"
import { insertAuthUser } from "../repositories/user.repository.js";
import type { InputData } from "../types/auth.types.js"

export async function registerUser(input: InputData) {
    const { email, password, ...profile } = input;

    const { user, session } = await createAuthUser({ email, password })

    try {
        await insertAuthUser({ id: user.id, email, ...profile})
    } catch (error) {
        await deleteAuthUser(user.id)
        throw error
    }

    return { confirmationRequired: !session }
}

export async function loginUser (email: string, password: string) {
    const session = await signInWithPassword(email, password);

    return {
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        expiresIn: session.expires_in
    }
    
}