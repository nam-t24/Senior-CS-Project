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

    const { error: insertError } = await supabase.from('grants').insert({ name: grantName, amount: amount, description: description, deadline: deadline.toISOString().slice(0,10), requirements: requirements, FK_organizations: orgID})
    if(insertError){
        console.log(insertError);
        return insertError;
    }

    return null;
}

export const getGrantsByOrgID = async(orgID: number) => {
    const supabase = createClient();

    const { data: grantData, error: grantError} = await supabase.from('grants').select().eq('FK_organizations', orgID).eq('isOpen', true).eq('inReview', true);
    if(grantError){
        console.log(grantError);
        return null;
    }

    // returns array of grants
    return grantData;
}

// Grants are closed(past deadline) and are in review
export const getGrantsInReviewByOrgID = async(orgID: number) => {
    const supabase = createClient();

    const { data: grantData, error: grantError} = await supabase.from('grants').select().eq('FK_organizations', orgID).eq('isOpen', false).eq('inReview', true);
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
    isOpen: boolean,
    InReview: boolean,
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


export const getAllOpenGrants = async() => {
    const supabase = createClient();

    const { data, error } = await supabase.from('grants').select('*, orgName:FK_organizations(name)').eq('isOpen', true);
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
    isOpen: boolean,
    FK_orgFunded: number,
    requirements: string,
    acceptedDate: string,
    inReview: boolean,
    ownerOrgName: {
      name: string
    } | null
    orgFundedName: {
      name: string
    } | null
}
export const getClosedGrantsByOrgID = async(orgID: number) => {
    const supabase = createClient();

    const { data: grantData, error: grantError} = await supabase.from('grants').select('*, orgFundedName:FK_orgFunded(name), ownerOrgName:FK_organizations(name)').eq('FK_organizations', orgID).eq('isOpen', false).eq('inReview', false).returns<Array<closedGrantType>>();
    if(grantError){
        console.log(grantError);
        return null;
    }

    // returns array of grants
    return grantData;
}

// Gets grants received by an organization(FK_orgFunded has value)
export const getGrantsReceivedByOrgID = async(orgID: number) => {
    const supabase = createClient();

    const { data: grantData, error: grantError} = await supabase.from('grants').select('*, orgFundedName:FK_orgFunded(name), ownerOrgName:FK_organizations(name)').eq('FK_orgFunded', orgID).eq('isOpen', false).eq('inReview', false).returns<Array<closedGrantType>>();
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
    // Grant is not closed
    if(grantData.length === 0){
        return null;
    }

    // returns grant object
    return grantData[0];
}

export const updateGrant = async(grantID: number, grantName: string, description: string, requirements: string, amount: number, deadline: Date) => {
    const supabase = createClient();
    const { error } = await supabase.from('grants').update({ name: grantName, description: description, requirements: requirements, amount: amount, deadline: deadline.toISOString().slice(0,10) }).eq('id', grantID);
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
        console.log(error);
        return error;
    }
    return null;
}

export const closeGrant = async(grantID: number) => {
    const supabase = createClient();
    const { error } = await supabase.from('grants').update({ isOpen: false, inReview: false }).eq('id', grantID);
    if(error){
        console.log(error);
        return error;
    }
    return null;
}