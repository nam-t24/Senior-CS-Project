"use server"
import { createClient } from "@/utils/supabase/server";
import { demoteAdmin } from "./team";

// SQL functions for organizations table

export const getUserIDandOrgID = async () => {
    const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();
    const userUUID = user.id;

    const { data, error } = await supabase.from("profiles").select('FK_organizations').eq("id", userUUID);

    const orgID = data[0].FK_organizations

    return {userUUID, orgID};
}

export const createOrganization = async (orgName: string, orgEmail: string, orgBio: string, orgWebsite: string, orgType: number) => {
    const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();
    const userID = user?.id;

    const isNonProfit = orgType == 0 ? true : false;
    orgBio = (orgBio === "" ? null : orgBio); //set orgBio to null if no org bio entered
    orgWebsite = (orgWebsite === "" ? null : orgWebsite) //set orgWebsite to null if no org website entered

    // Add org foreign key to user
    const updateUserOrg = async (data) => {
        const { error: updateError } = await supabase
        .from('profiles')
        .update({ FK_organizations: data[0]?.id })
        .eq('id', userID)

        if (updateError){
            return updateError;
        }
    }

    // Creates org and adds foreign key
    const error = await supabase
    .from('organizations')
    .insert({ name: orgName, email: orgEmail, bio: orgBio, website: orgWebsite, isNonProfit: isNonProfit, owner: userID}).select().then(({data}) => updateUserOrg(data));

    if (error){
        return error;
    }
}

type orgDataType = {
    name: string;
    email: string;
    bio: string | null;
    website: string | null;
    isNonProfit: boolean;
    owner: string;
    admins: Array<string>;
}
export const getUserOrgData = async (orgID: number) => {
    const supabase = createClient();

    const {data, error} = await supabase.from('organizations').select('name, email, bio, website, owner, isNonProfit, admins').eq('id', orgID).returns<orgDataType>();
    const orgData = data[0]
    return {orgData, error};
}

export const updateOrg = async (orgName: string, orgEmail: string, orgBio: string, orgWebsite: string, orgID: number) => {
    const supabase = createClient();

    orgBio = (orgBio === "" ? null : orgBio); //set orgBio to null if no org bio entered
    orgWebsite = (orgWebsite === "" ? null : orgWebsite) //set orgWebsite to null if no org website entered

    const { data, error } = await supabase.from('organizations').update({name: orgName, email: orgEmail, bio: orgBio, website: orgWebsite}).eq('id', orgID).select();

    if(error){
        console.log(error.message);
        return error;
    }

    return null;
}

// Return id of the org owner of user's current org
export const getOrgOwner = async (orgID: number) => {
    const supabase = createClient();

    const { data, error } = await supabase.from('organizations').select('owner').eq('id', orgID);

    if(error){
        console.log("Error in getting org owner ID");
        console.log(error.message);
        return null;
    }

    return data[0].owner;
}

export const isUserOwner = async (userID: string, orgID: number) => {
    const supabase = createClient();

    const ownerID = await getOrgOwner(orgID);

    if(ownerID == null){
        return false;
    }
    return ownerID === userID;
}

export const getOrgTeam = async (orgID: number, admins: Array<string>) => {
    const supabase = createClient();
    const ownerID = await getOrgOwner(orgID);

    const { data, error } = await supabase.from('profiles').select('id, full_name, email').eq('FK_organizations', orgID);

    let ownerArray = []
    let adminArray = []
    let memberArray = []

    for (const profile of data){
        if(profile.id == ownerID){
            ownerArray.push(profile)
        }
        else if(admins.includes(profile.id)){
            adminArray.push(profile)
        }
        else{
            memberArray.push(profile)
        }
    }

    const members = ownerArray.concat(adminArray, memberArray)

    return members;
}

export const removeUserFromOrg = async (userID: string, orgID: number) => {
    const supabase = createClient();

    const error = await demoteAdmin(userID, orgID);
    if(error){
        console.log(error)
        return error;
    }

    const {error: updateError} = await supabase.from('profiles').update({FK_organizations: null}).eq('id', userID);
    if(updateError){
        console.log(updateError)
        return updateError;
    }
    return null;
}