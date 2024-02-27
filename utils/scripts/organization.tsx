"use server"
import { createClient } from "@/utils/supabase/server";

// SQL functions for organizations table


export const getUserOrganizationID = async () => {
    const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();
    const userID = user?.id;

    const { data, error } = await supabase.from("profiles").select("FK_organizations").eq("id", userID);
    return data[0]?.FK_organizations;
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

export const getUserOrgData = async () => {
    const supabase = createClient();

    const data = getUserOrganizationID().then((FK_organizations) => supabase.from('organizations').select('name, email, bio, website, isNonProfit').eq('id', FK_organizations));

    return data;
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