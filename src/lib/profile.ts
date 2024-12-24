import { supabase } from "./supabase";
import { CompanionProfile } from "@/types/companion";

export async function saveProfile(formData: Partial<CompanionProfile>): Promise<{ data: CompanionProfile | null; error: Error | null }> {
  try {
    console.log('Starting profile save operation with data:', formData);
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error("User not authenticated");
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('companions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    console.log('Existing profile:', existingProfile);

    const dataToSave = {
      user_id: user.id,
      ...(existingProfile || {}),
      ...formData,
      updated_at: new Date().toISOString()
    };

    console.log('Attempting to save data:', dataToSave);

    let result;
    if (existingProfile) {
      console.log('Updating existing profile...');
      result = await supabase
        .from('companions')
        .update(dataToSave)
        .eq('user_id', user.id)
        .select()
        .single();
    } else {
      console.log('Creating new profile...');
      result = await supabase
        .from('companions')
        .insert(dataToSave)
        .select()
        .single();
    }

    if (result.error) {
      console.error('Error saving profile:', result.error);
      throw result.error;
    }

    console.log('Successfully saved profile:', result.data);
    return { data: result.data, error: null };
  } catch (error: any) {
    console.error('Error in save operation:', error);
    return { data: null, error };
  }
}