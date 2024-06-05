import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export interface UserSettings {
  aiTextColor: string;
  userTextColor: string;
  maxTokens: number;
}

export interface FetchedUserSettings {
  settings: UserSettings;
  createdAt: string;
  updatedAt: string;
}

const fetchUserSettings = async (): Promise<FetchedUserSettings> => {
  const response = await fetch('/api/user/settings');
  if (response.status === 404) {
    // Return default settings if not found
    return {
      settings: {
        aiTextColor: "gray-200",
        userTextColor: "primary",
        maxTokens: 200,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
  if (!response.ok) {
    throw new Error('Failed to fetch user settings');
  }
  return response.json();
};


const updateUserSettings = async (settings: UserSettings): Promise<UserSettings> => {
  const response = await fetch('/api/user/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ settings }),
  });
  if (!response.ok) {
    throw new Error('Failed to update user settings');
  }
  return response.json();
};

export const useUserSettings = () => {
  const [cachedSettings, setCachedSettings] = useState<FetchedUserSettings | null>(null);

  return useQuery<FetchedUserSettings, Error>({
    queryKey: ['userSettings'],
    queryFn: async () => {
      if (cachedSettings) {
        return cachedSettings;
      }
      const settings = await fetchUserSettings();
      setCachedSettings(settings);
      return settings;
    },
  });
};

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();
  const [cachedSettings, setCachedSettings] = useState<FetchedUserSettings | null>(null);

  return useMutation<UserSettings, Error, UserSettings>({
    mutationFn: updateUserSettings,
    onSuccess: (newSettings) => {
      queryClient.invalidateQueries({
        queryKey: ['userSettings'],
      });
      setCachedSettings({
        settings: newSettings,
        createdAt: cachedSettings?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },
  });
};
