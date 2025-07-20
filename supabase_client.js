import {createClient} from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();


//supabase configuration
const supabaseUrl = 'https://inakkspoeuvvnrqlbdml.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


export async function fetch () { 
    return await supabase.from('user_info').select('*');
}

//for user
export async function insert_user_info(id,user,password,email){
    try{
    const {user_data,error}= await supabase.from('userinfo').insert({id:id,user:user,password:password,email:email});
    if (error) {
        console.error("Insert Error:", error);
        return null;
    }
        return user_data;
    }
    catch(error){
        console.error(error);
    }

}

//for posts
export async function insert_post_info(user, id, writer, title, content) {
    try{
        const {data,error} = await supabase.from('posts').insert({user_id:user, post_id:id, pen_name:writer, content:content, title:title});
        if (error) {
            console.error("Insert Error:", error);
            return null;
        }
    }
    catch(error){
        console.error("Insert Error:", error);
        return null;
    }
}

export async function get_user_info(userid , password){
    try{
        const {data,error}=await supabase.from('userinfo').select('*').eq('user',userid).eq('password',password).maybeSingle();
        if(error){
            console.error("Fetch Error:", error);
            return null;
        }
        return data;
    }
    catch(error){
        console.error("Error fetching user info:", error);
        return null;
    }
}

export async function user_exists(email) {
    try {
        const { data, error } = await supabase.from('userinfo').select('*').eq('email', email).maybeSingle();
        if (error) {
            console.error("Error checking user existence:", error);
            return false;
        }
        return data !== null;
    } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
    }
}

export async function del_user_info(userid){
    try{
        const {data,error} = await supabase.from('userinfo').delete().eq('id',userid);
        if(error){
            console.error(error);
            return null;
        }return data;
    }
    catch(error){
        console.error("Delete Error:", error);
        return null;
    }

}

export async function update_user_info(id,user,password,email){
    try{
        const {data,error} = await supabase.from('userinfo').update({user:user,password:password,email:email}).eq('id',id);
        if(error){
            console.error("Update Error:", error);
            return null;
        }
        return data;
    }
    catch(error){
        console.error("Error updating user info:", error);
        return null;
    }
}

export async function get_user_id(id){
    try{
        const {data,error}=await supabase.from('userinfo').select('*').eq('id',id).maybeSingle();
        if(error){
            console.error(error);
            return null;
        }
        return data;
    }
    catch(error){
        console.error("Error fetching user ID:", error);
        return null;
    }

}