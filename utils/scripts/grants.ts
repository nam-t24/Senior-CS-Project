"use server"
import { createClient } from "@/utils/supabase/server";

export const createGrant = async(grantName: string, description: string, requirements: string, amount: number, deadline: Date) => {
    const supabase = createClient();

    const { data: { user }} = await supabase.auth.getUser();
    const userUUID = user.id;

    const { data, error } = await supabase.from('profiles').select('FK_organizations').eq('id', userUUID);
    if(error){
        console.log(error)
        return error;
    }

    const orgID = data[0].FK_organizations;

    const { error: insertError } = await supabase.from('grants').insert({ name: grantName, amount: amount, description: description, deadline: deadline, requirements: requirements, FK_organizations: orgID})
    if(insertError){
        console.log(insertError);
        return insertError;
    }

    return null;
}