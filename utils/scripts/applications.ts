"use server"
import { createClient } from "@/utils/supabase/server";

export const createApplication = async (description: string, purpose: string, timeline: string, grantID: number) => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const userUUID = user.id;

    const { data, error } = await supabase.from('profiles').select('FK_organizations').eq('id', userUUID);
    if(error) {
        console.log(error)
        return error;
    }

    const orgApplyID = data[0].FK_organizations;

    const { data: grantData, error: grantError } = await supabase.from('grants').select('FK_organizations').eq('id', grantID);
    if(grantError) {
        console.log(grantError);
        return grantError;
    }

    const orgGrantID = grantData[0].FK_organizations;

    const { error: insertError } = await supabase.from('applications').insert({ description: description, purpose: purpose, timeline: timeline, FK_orgGrant: orgGrantID, FK_orgApply: orgApplyID, FK_grantID: grantID });
    if(insertError) {
        console.log(insertError);
        return insertError;
    }

    return null;
}

type ApplicationType = {
    id: number,
    created_at: string,
    description: string,
    purpose: string,
    timeline: string,
    FK_orgGrant: number,
    FK_orgApply: number,
    FK_grantID: number,
    status: string,
    grantName: {
      name: string,
    },
    applicantInfo: {
      name: string,
      email: string,
    }
}
export const getApplicationsByGrantID = async (grantID: number) => {
    const supabase = createClient();

    const { data, error } = await supabase.from('applications').select('*, grantName:FK_grantID(name), applicantInfo:FK_orgApply(name, email)').eq('FK_grantID', grantID).returns<ApplicationType []>();
    
    if(error){
        console.log(error);
        return null;
    }
    return data;
}

export const updateApplicationStatus = async (applicationID: number, status: string) => {
    const supabase = createClient();

    const { error } = await supabase.from('applications').update({status: status}).eq('id', applicationID);
    if(error){
        console.log(error);
        return error;
    }
    return null;
}

export const finishReviewForGrantID = async(grantID: number, acceptedOrg: number | null) => {
    const supabase = createClient();
    // mark all pending applications as rejected
    const { error } = await supabase.from('applications').update({status: 'Rejected'}).eq('FK_grantID', grantID).eq('status', 'Pending');
    if(error){
        console.log(error);
        return error;
    }


    const { error: updateError } = await supabase.from('grants').update({inReview: false, isOpen: false, FK_orgFunded: acceptedOrg, acceptedDate: acceptedOrg===null ? null : (new Date()).toISOString().slice(0,10)}).eq('id', grantID);
    if(updateError){
        console.log(updateError);
        return updateError;
    }

    return null;
}


type AcceptedGrantDataType = {
  id: number,
  name: string,
  FK_orgFunded: {
    name: string,
    email: string,
  },
}
export const getAcceptedGrantData = async (grantID: number) => {
    const supabase = createClient();

    const { data, error } = await supabase.from('grants').select('id, name, FK_orgFunded(name, email)').eq('id', grantID).returns<AcceptedGrantDataType []>();
    if(error){
        console.log(error);
        return null;
    }
    return data[0];
}

export const getAcceptedApplicationByGrantID = async (grantID: number) => {
    const supabase = createClient();

    const { data, error } = await supabase.from('applications').select('*').eq('FK_grantID', grantID).eq('status', 'Accepted');
    
    if(error){
        console.log(error);
        return null;
    }
    return data;
}

export const getApplicationsByOrgID = async (orgID: number) => {
    const supabase = createClient();

    // return applications for grants in review
    const { data, error } = await supabase.from('applications').select('id, created_at, grants!inner(name, amount, description)').eq('FK_orgApply', orgID).eq('grants.inReview', true);
    if(error) {
        console.log(error);
        return null;
    }
    return data;
}

type ApplicationInfo = {
    created_at: string,
    description: string,
    purpose: string,
    timeline: string,
    status: string,
    FK_grantID: {
        name: string,
    }
}
export const getApplicationInfo = async (appID: number) => {
    const supabase = createClient();

    const { data, error } = await supabase.from('applications').select('created_at, description, purpose, timeline, status, FK_grantID(name)').eq('id', appID).returns<ApplicationInfo []>();
    if(error) {
        console.log(error);
        return null;
    }
    return data;
}

export const hasExistingApplication = async (grantID: number) => {
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    const userUUID = user.id;

    const { data, error } = await supabase.from('profiles').select('FK_organizations').eq('id', userUUID);
    if(error) {
        console.log(error)
        return error;
    }

    const orgApplyID = data[0].FK_organizations;

    const { count } = await supabase.from('applications').select('*', {count: 'exact', head: true}).eq('FK_orgApply', orgApplyID).eq('FK_grantID', grantID);
    if(count != 0) {
        return true;
    }
    return false;
}

export const canDelete = async (appID: number) => {
    const supabase = createClient();

    const { data: { user }} = await supabase.auth.getUser();
    const userUUID = user.id;

    const {data: userOrgID, error} = await supabase.from('profiles').select('FK_organizations').eq('id', userUUID);
    if(error) {
        console.log(error);
        return false;
    }

    const {data: appOrgID, error: dataError} = await supabase.from('applications').select('FK_orgApply').eq('id', appID);
    if(dataError) {
        console.log(dataError);
        return false;
    }
    return userOrgID[0].FK_organizations === appOrgID[0].FK_orgApply;
}

export const deleteApplication = async (appID: number) => {
    const supabase = createClient();
    
    const { error } = await supabase.from('applications').delete().eq('id', appID);
    if(error){
        console.log(error);
        return error;
    }
    return null;
}