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


type grantInfoType = {
    id: number,
    created_at: string,
    name: string,
    amount: number,
    description: string,
    deadline: string,
    FK_organizations: number,
    isOpen: boolean;
    FK_orgFunded: number | null,
    requirements: string,
    organizations: {
        name: string,
    }
  }
export const getGrantInfo = async(grantID: number) => {
    const supabase = createClient();
    const { data, error } = await supabase.from('grants').select("*, organizations:FK_organizations(id, name)").eq('id', grantID).returns<Array<grantInfoType>>();
    if(error){
        console.log(error);
        return null;
    }

    return data;

}

export const updateGrant = async(grantID: number, grantName: string, description: string, requirements: string, amount: number, deadline: Date) => {
    const supabase = createClient();
    const { error } = await supabase.from('grants').update({ name: grantName, description: description, requirements: requirements, amount: amount, deadline: deadline }).eq('id', grantID);
    if(error){
        console.log(error);
        return error;
    }
    return null;
}

export const canEdit = async(grantID: number) => {
    const supabase = createClient();
    const { data: { user }} = await supabase.auth.getUser();
    const userUUID = user.id;

    const {data: userOrgID, error} = await supabase.from('profiles').select('FK_organizations').eq('id', userUUID);
    if(error){
        console.log(error);
        return false;
    }

    const {data: grantOrgID, error: dataError} = await supabase.from('grants').select('FK_organizations').eq('id', grantID);
    if(dataError){
        console.log(dataError);
        return false;
    }

    return userOrgID[0].FK_organizations === grantOrgID[0].FK_organizations;
}

export const deleteGrant = async(grantID: number) => {
    const supabase = createClient();
    const { error } = await supabase.from('grants').delete().eq('id', grantID);

    if(error){
        return error;
    }
    return null;
}