import type { AuthError } from "@supabase/supabase-js";
import { supabaseAuth } from "../config/supabase.js";
import { AppError, BadRequestError, ConflictError, ForbiddenError, ServiceUnavailableError, UnauthorizedError } from "../errors/serverError.js";
import type { SupabaseSignUpData } from "../types/auth.types.js";

function toAppError(error: AuthError): AppError {
  const status = error.status ?? 0

  if (error.code === 'email_exists' || error.code === 'user_already_exists') {
    return new ConflictError('Email already registered')
  }
  if (status === 429) return new AppError('Too many attempts, try again later', 429)
  if (status >= 400 && status < 500) return new BadRequestError(error.message)

  console.error('Supabase auth failure:', error)
  return new ServiceUnavailableError()
}

export async function createAuthUser ({ email, password }: SupabaseSignUpData){
    const { data, error } = await supabaseAuth.auth.signUp({email, password}); //Sign up with email and password

    if (error) throw toAppError(error);
    if(!data.user) throw new ServiceUnavailableError()
    
    if (data.user.identities?.length === 0) {
        throw new ConflictError("Email already registered")
    } //Catch Errors

    return { user: data.user, session: data.session }; // Return user data and session
}

export async function signInWithPassword ( email: string, password: string) {
    const { data, error } = await supabaseAuth.auth.signInWithPassword({ email, password }); //Sign in with Password

      if (error) {
        if (error.code === 'email_not_confirmed') {
            throw new ForbiddenError('Please confirm your email first')
        }

        const status = error.status ?? 0
        if (status === 429) throw new AppError('Too many attempts, try again later', 429)
        if (status >= 400 && status < 500) {
            throw new UnauthorizedError('Invalid email or password')
        }

        console.error('Supabase login failure:', error)
        throw new ServiceUnavailableError()
    } // Catch Errors

    return data.session //Return data session
}

export async function deleteAuthUser(id: string){
    const { error } = await supabaseAuth.auth.admin.deleteUser(id)

    if(error) console.error("Failed to clean up Auth User", id, error)
}