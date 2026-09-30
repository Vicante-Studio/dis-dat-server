import { supabaseAuth } from "../config/supabase.js";
import { ConflictError } from "../errors/serverError.js";
import type { supabaseSignUpData } from "../types/auth.types.js";

export async function registerUser ({ email, password }: supabaseSignUpData){
    const { data, error } = await supabaseAuth.auth.signUp({email, password});

    if(error || !data.user) {
        throw new Error(error?.message || "SignUp Failed")
    }

    if (data.user.identities?.length === 0) {
        throw new ConflictError("Email already registered")
    }

    return data;
}