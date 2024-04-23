"use server"
import { createClient } from "@/utils/supabase/server"

export const getProfiles = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("profiles").select('id, full_name, email').neq('full_name', null);
    if(error){
        console.log(error);
        return null;
    }
    return data;
}

export const getOrganizations = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from("organizations").select('id, name, email)');
    if(error){
        console.log(error);
        return null;
    }
    return data;
}