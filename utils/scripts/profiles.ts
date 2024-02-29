"use server"
import { createClient } from "@/utils/supabase/server"

export const getProfileByUserId = async() => {
    const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();
    const userUUID = user.id;

    const { data, error } = await supabase.from("profiles").select('full_name, email, bio, organizations(name)').eq("id", userUUID);
    return data[0];
}

export const updateProfile = async(userName: string, userEmail: string, userBio: string) => {
    const supabase = createClient();
    const {data: {user}} = await supabase.auth.getUser();
    const userUUID = user.id;

    const { error } = await supabase.from("profiles").update({full_name: userName, email: userEmail, bio: userBio}).eq('id', userUUID);

    if (error) {
        console.log(error.message);
        return error;
    }
    return null;
}