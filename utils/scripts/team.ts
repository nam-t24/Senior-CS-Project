"use server"
import { createClient } from "@/utils/supabase/server";

export const makeUserAdmin = async(userID: string, orgID: number) => {
    const supabase = createClient();

    const {data: admins, error } = await supabase.from('organizations').select('admins').eq('id', orgID);
    if(error){
        console.log(error.message);
        return error;
    }
    const adminList = admins[0].admins;

    if(!adminList.includes(userID)){
        adminList.push(userID);
    }
    const {error: updateError} = await supabase.from('organizations').update({admins: adminList}).eq('id', orgID);

    if(updateError){
        console.log(updateError.message);
        return updateError;
    }

    return null;
}

export const demoteAdmin = async(userID: string, orgID: number) => {
    const supabase = createClient();

    const {data: admins, error } = await supabase.from('organizations').select('admins').eq('id', orgID);
    if(error){
        console.log(error.message);
        return error;
    }

    const adminList = admins[0].admins;
    let newAdminList = adminList;
    if(adminList.includes(userID)){
        newAdminList = adminList.filter(function(id){return id !== userID});
    }

    const {error: updateError} = await supabase.from('organizations').update({admins: newAdminList}).eq('id', orgID);

    if(updateError){
        console.log(updateError.message);
        return updateError;
    }

    return null;
}

export const removeMember = async(userID: string, orgID: number) => {
    const supabase = createClient();

    const {data: admins, error } = await supabase.from('organizations').select('admins').eq('id', orgID);
    if(error){
        console.log(error.message);
        return error;
    }

    const adminList = admins[0].admins;
    let newAdminList = adminList;
    // need to remove user from admin first
    if(adminList.includes(userID)){
        newAdminList = adminList.filter(function(id){return id !== userID});
        await supabase.from('organizations').update({admins: newAdminList}).eq('id', orgID);
    }

    const {error: updateError} = await supabase.from('profiles').update({FK_organizations: null}).eq('id', userID);
    if(updateError){
        console.log(updateError.message);
        return updateError;
    }

    return null;
}

export const changeOwners = async(userID: string, orgID: number) => {
    const supabase = createClient();

    // must remove user from admins first before making owner
    const error = await demoteAdmin(userID, orgID);
    if(error){
        console.log(error)
        return error;
    }

    const {error: updateError} = await supabase.from('organizations').update({owner: userID}).eq('id', orgID);
    if(error){
        console.log(updateError.message);
        return updateError;
    }
    return null;
}

// reload team section in dashboard for any reason, not flushed out needs to do error handling if ever implemented
// export const reloadTeam = async(orgID: number) => {
//     const supabase = createClient();
//     const ownerID = await getOrgOwner(orgID);
//     if(ownerID == null){
//         return [];
//     }

//     const {data: adminData, error: errorAdmin} = await supabase.from('organizations').select('admins').eq('id', orgID);
//     if(errorAdmin){
//         console.log(errorAdmin.message);
//         return [];
//     }
//     const admins = adminData[0].admins;

//     const { data, error } = await supabase.from('profiles').select('id, full_name, email').eq('FK_organizations', orgID);
//     if(error){
//         console.log(error.message);
//         return [];
//     }

//     let ownerArray = []
//     let adminArray = []
//     let memberArray = []

//     for (const profile of data){
//         if(profile.id == ownerID){
//             ownerArray.push(profile)
//         }
//         else if(admins.includes(profile.id)){
//             adminArray.push(profile)
//         }
//         else{
//             memberArray.push(profile)
//         }
//     }

//     const members = ownerArray.concat(adminArray, memberArray)

//     return members;
// }
