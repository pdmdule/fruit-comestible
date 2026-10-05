'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export interface UserProfile {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  street_address?: string | null;
  postal_code?: string | null;
  city?: string | null;
  canton?: string | null;
  country?: string | null;
  phone?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  updateProfile: (
    updates: Partial<UserProfile>
  ) => Promise<{ success: boolean; data?: any; error?: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string, currentUser?: User | null) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (data) {
        setProfile(data as UserProfile);
        return;
      }

      // If no profile row exists yet, create one from user metadata
      const meta = currentUser?.user_metadata || {};
      const newProfile: Partial<UserProfile> = {
        id: userId,
        first_name: meta.first_name || '',
        last_name: meta.last_name || '',
        country: 'Schweiz',
        canton: 'ZH',
      };

      const { data: created, error: insertError } = await supabase
        .from('profiles')
        .insert([newProfile])
        .select()
        .maybeSingle();

      if (created) {
        setProfile(created as UserProfile);
      } else {
        // Fallback in memory
        setProfile(newProfile as UserProfile);
      }
    } catch (err) {
      console.warn('Error fetching or creating user profile:', err);
      // Fallback in memory so user always has functional profile
      if (currentUser?.user_metadata) {
        setProfile({
          id: userId,
          first_name: currentUser.user_metadata.first_name || '',
          last_name: currentUser.user_metadata.last_name || '',
          country: 'Schweiz',
          canton: 'ZH',
        });
      }
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    await fetchProfile(user.id, user);
  }, [user, fetchProfile]);

  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      try {
        if (!user) {
          throw new Error('Kein authentifizierter Benutzer gefunden.');
        }

        // Osiguraj id korisnika i ažurirano vrijeme
        const profileData = {
          id: user.id,
          ...updates,
          updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabase
          .from('profiles')
          .upsert(profileData, { onConflict: 'id' })
          .select()
          .maybeSingle();

        if (error) {
          console.error('Fehler beim Aktualisieren des Profils:', error.message);
          throw error;
        }

        const savedProfile = (data as UserProfile) || profileData;
        // Ažuriraj lokalno stanje profila u contextu
        setProfile((prev) => ({ ...(prev || { id: user.id }), ...savedProfile }));
        return { success: true, data: savedProfile, error: null };
      } catch (err: any) {
        console.error('updateProfile error:', err);
        return { success: false, error: err?.message || 'Fehler beim Speichern' };
      }
    },
    [user]
  );

  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Error during signOut:', err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // 1. Initial Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id, session.user).finally(() => {
          if (mounted) setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    // 2. Realtime Auth State Listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id, session.user);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        refreshProfile,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
