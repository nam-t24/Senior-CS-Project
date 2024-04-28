"use server"
import { createClient } from "@/utils/supabase/server"
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";

export const getProfiles = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('profiles').select('id, full_name, email').neq('full_name', null);
    if (error) {
        console.log(error);
        return null;
    }
    return data;
}

export const getOrganizations = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.from('organizations').select('id, name, email)');
    if (error) {
        console.log(error);
        return null;
    }
    return data;
}


type singleProfile = {
    id: number,
    full_name: string,
    email: string,
    bio: string,
    FK_organizations: { name: string }
}

export const getSingleProfile = async (id: string) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('profiles').select('id, full_name, email, bio, FK_organizations, FK_organizations(name)').eq('id', id).returns<singleProfile[]>();
    if (error) {
        console.log(error);
        return null;
    }
    // var tempData = data[0];
    // var { x, y } = await supabase.from('organizations').select('name').eq('id', tempData[0].FK_organizations)
    // if (error) {
    //     console.log(error);
    //     return null;
    // }
    // const data = { full_name: userData[0].name, email: userData[0].email, bio: userData[0].bio, orgName: orgData[0].name }
    return data[0];
}

type singleOrg = {
    id: number,
    name: string,
    email: string,
    bio: string,
    website: string,
    isNonProfit: boolean
}

export const getSingleOrg = async (id: number) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('organizations').select('id, name, email, bio, website, isNonProfit').neq('name', null).eq('id', id).returns<singleOrg[]>();
    if (error) {
        console.log(error);
        return null;
    }
    return data[0];
}

export const getOrgProfiles = async (id: number) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('profiles').select('id, full_name, email').neq('full_name', null).eq('FK_organizations', id);
    if (error) {
        console.log(error);
        return null;
    }
    return data;
}
