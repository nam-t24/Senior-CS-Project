"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const inviteUser = async(email: string, orgID: number) => {
    const supabase = createClient();
    const {data, error: resError} = await supabase.from('profiles').select('id, FK_organizations').eq('email', email);

    if(data.length === 0){
        return "nonexistent email"
    }
    const FK_organizations = data[0].FK_organizations;
    if(FK_organizations !== null){
        return "already in org"
    }
    const userUUID = data[0].id;

    const { count } = await supabase.from('invites').select('*', { count: 'exact', head: true }).eq('FK_profiles', userUUID).eq('FK_organizations', orgID);

    // User already invited, tell owner/admin they invited the user again for satisfaction
    if(count != 0){
        console.log("User already invited");
        return null;
    }

    const { error } = await supabase.from('invites').upsert({ FK_profiles: userUUID, FK_organizations: orgID });
    if(error){
        console.log(error.message)
        return error.message;
    }

    return null;
}

export const uninviteUser = async(userID: string, orgID: number) => {
    const supabase = createClient();
    const { error } = await supabase.from('invites').delete().eq('FK_profiles', userID).eq('FK_organizations', orgID);
    if (error){
        console.log(error.message)
        return error
    }
    return null;
}

export const acceptInvite = async(userID: string, orgID: number) => {
    const supabase = createClient();
    const { error } = await supabase.from('invites').delete().eq('FK_profiles', userID).eq('FK_organizations', orgID);
    if (error){
        console.log(error.message)
        return error;
    }

    const {error: updateError} = await supabase.from('profiles').update({FK_organizations: orgID}).eq('id', userID);
    if (updateError){
        console.log(updateError.message)
        return updateError;
    }
    return null;
}

export const hasInvites = async(userID: string) => {
    const supabase = createClient();

    const {data, error} = await supabase.from('invites').select().eq('FK_profiles', userID);
    if(error){
        console.log(error);
        return false;
    }

    return  data.length > 0 ? true : false;
}

// Retrieves invites from an organization to display on org page
export const getInvitesOfOrg = async(orgID: number) => {
    const supabase = createClient();

    const { data, error } = await supabase.from('invites').select(`FK_profiles`).eq('FK_organizations', orgID);

    // on error just return empty array and not show invite table in UI
    if(error){
        console.log(error.message);
        return [];
    }

    let userIDs = [];
    for(const profile of data){
        userIDs.push(profile.FK_profiles)
    }

    const { data: dataProfiles, error: errorProfiles} = await supabase.from('profiles').select('id, full_name, email').in('id', userIDs);
    if(error){
        console.log(errorProfiles.message);
        return [];
    }

    return dataProfiles;
}

// Retrieves invites of a user to display for user to accept
export const getInvitesOfUser = async(userID: string) => {
    const supabase = createClient();

    const { data, error } = await supabase.from('invites').select(`FK_organizations`).eq('FK_profiles', userID);
    // on error just return empty array and not show invite table in UI
    if(error){
        console.log(error.message);
        return [];
    }

    let orgIDs = [];
    for(const profile of data){
        orgIDs.push(profile.FK_organizations)
    }

    const { data: dataOrganizations, error: errorProfiles} = await supabase.from('organizations').select('id, name, email').in('id', orgIDs);
    if(error){
        console.log(errorProfiles.message);
        return [];
    }

    return dataOrganizations;
}