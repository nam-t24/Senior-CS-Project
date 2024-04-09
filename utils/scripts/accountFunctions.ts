"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

interface FormData {
    email: string;
    password: string;
}

export const signIn = async (formData: FormData) => {
    const email = formData["email"];
    const password = formData["password"];
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/dashboard");
};

export const signUp = async (formData: FormData) => {
    const origin = headers().get("origin");
    const email = formData["email"];
    const password = formData["password"];
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
};

export const signInWithGoogle = async () => {
    const origin = headers().get("origin");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    if (error) {
      return redirect("/login?message=Could not authenticate using Google");
    }

    redirect(data.url)
}

export const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
};

export const checkLoggedIn = async () => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser()
  if(user){
    redirect("/dashboard");
  }
}