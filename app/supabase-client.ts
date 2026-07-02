import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const apiurl = Constants.expoConfig?.extra?.API_URL;
const apikey = Constants.expoConfig?.extra?.API_KEY;

if (!apiurl || !apikey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(apiurl, apikey);
