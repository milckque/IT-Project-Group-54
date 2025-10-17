// hooks/useProfile.ts
import { useEffect, useState } from 'react';
import { useAuth } from '../backend/AuthContext';
import supabase from '../supabaseClient';
import type { Profile } from '../types/api';

export const useProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            fetchProfile();
        }
    }, [user]);

    const fetchProfile = async () => {
        const { data, error } = await supabase
            .from('Profiles')
            .select('*')
            .eq('auth_id', user?.id)
            .single();

        if (error) {
            setError(error.details || error.message);
        } else {
            setProfile(data);
        }
    };

    return { profile, error, refetch: fetchProfile };
}