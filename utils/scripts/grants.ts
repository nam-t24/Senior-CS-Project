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

type closedGrantType = {
    id: number,
    created_at: string,
    name: string,
    amount: number,
    description: string,
    deadline: string,
    FK_organizations: number,
    isOpen: false,
    FK_orgFunded: number,
    requirements: string,
    ownerOrgName: {
      name: string
    } | null
    orgFundedName: {
      name: string
    } | null
}
export const getClosedGrants = async() => {
    const supabase = createClient();

    const { data: { user }} = await supabase.auth.getUser();
    const userUUID = user.id;

    const { data, error } = await supabase.from('profiles').select('FK_organizations').eq('id', userUUID);
    if(error){
        console.log(error);
        return null;
    }

    const orgID = data[0].FK_organizations;
    const { data: grantData, error: grantError} = await supabase.from('grants').select('*, orgFundedName:FK_orgFunded(name), ownerOrgName:FK_organizations(name)').eq('FK_organizations', orgID).eq('isOpen', false).returns<Array<closedGrantType>>();
    if(grantError){
        console.log(grantError);
        return null;
    }

    // returns array of grants
    return grantData;
}

export const getClosedGrantByID = async(id: number): Promise<closedGrantType> => {
    const supabase = createClient();

    const { data: grantData, error: grantError} = await supabase.from('grants').select('*, orgFundedName:FK_orgFunded(name), ownerOrgName:FK_organizations(name)').eq('id', id).eq('isOpen', false).returns<Array<closedGrantType>>();
    if(grantError){
        console.log(grantError);
        return null;
    }
    if(grantData.length === 0){
        return null;
    }

    // returns array of grants
    return grantData[0];
}