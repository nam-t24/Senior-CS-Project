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

export const getGrants = async() => {
    const supabase = createClient();

    const { data: { user }} = await supabase.auth.getUser();
    const userUUID = user.id;

    const { data, error } = await supabase.from('profiles').select('FK_organizations').eq('id', userUUID);
    if(error){
        console.log(error);
        return null;
    }

    const orgID = data[0].FK_organizations;

    const { data: grantData, error: grantError} = await supabase.from('grants').select().eq('FK_organizations', orgID).eq('isOpen', true);
    if(grantError){
        console.log(grantError);
        return null;
    }

    // returns array of grants
    return grantData;
}

export const getGrantInfo = async(grantID: number) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('grants').select().eq('id', grantID);
    if(error){
        console.log(error);
        return null;
    }

    return data;

}

export const getAllOpenGrants = async() => {
    const supabase = createClient();

    const { data, error } = await supabase.from('grants').select('*, orgName:FK_organizations(name)').eq('isOpen', true);
    if(error){
        console.log(error);
        return null;
    }

    // returns array of grants
    return data;
}