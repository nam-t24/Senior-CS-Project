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