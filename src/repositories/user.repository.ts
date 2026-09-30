import { supabaseAdmin } from "../config/supabase.js";
import { ConflictError } from "../errors/serverError.js";
import type { newUserProfile } from "../types/auth.types.js";

export async function insertAuthUser(profile: newUserProfile){
    const { error } = await supabaseAdmin.from("users").insert(profile);

    if(error) {
        if(error.code === '23505'){
            throw new ConflictError('Phone number already in use')
        } else {
            throw error
        }
    }
}