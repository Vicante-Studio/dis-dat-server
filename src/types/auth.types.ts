export interface NewUserProfile {
  id: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
}

export type InputData = Omit<NewUserProfile, 'id'> & { password: string }

export interface SupabaseSignUpData {
    email: string;
    password: string;
}