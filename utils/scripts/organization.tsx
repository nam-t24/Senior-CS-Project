"use server"
import { createClient } from "@/utils/supabase/server";

// SQL functions for organizations table


export const getUserOrganizationID = async () => {
    const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();
    const userID = user?.id;

    const { data, error } = await supabase.from("profiles").select("FK_organizations").eq("id", userID);
    return data;
}

export const createOrganization = async (orgName: string, orgEmail: string, orgBio: string, orgType: number) => {
     const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();
    const userID = user?.id;

    const isNonProfit = orgType == 0 ? true : false;

    const updateUserOrg = async (data) => {
        const { error: updateError } = await supabase
        .from('profiles')
        .update({ FK_organizations: data[0]?.id })
        .eq('id', userID)

        if (updateError){
            return updateError;
        }
    }

    const error = await supabase
    .from('organizations')
    .insert({ name: orgName, email: orgEmail, bio: orgBio, isNonProfit: isNonProfit, owner: userID}).select().then(({data}) => updateUserOrg(data));

    if (error){
        return error;
    }

}