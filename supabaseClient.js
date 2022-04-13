import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    localStorage: AsyncStorage
});

const getAllLocations = async () => {
    let { data: locations, error } = await supabase
    .from('location')
    .select('*')
    return {locations, error}
}

const getAllFences = async () => {
    let { data: fences, error } = await supabase
    .from('fence')
    .select('*')
    return {fences, error}
}

const getAllPaths = async () => {
    let { data: paths, error } = await supabase
    .from('path')
    .select('*')
    return { paths, error }
}

export {supabase, getAllLocations, getAllFences, getAllPaths}