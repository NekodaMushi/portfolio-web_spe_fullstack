import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
  return useQuery<FetchedUserSettings, Error>({
    queryKey: ['userSettings'],
    queryFn: fetchUserSettings,
  });
};

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();
  return useMutation<UserSettings, Error, UserSettings>({
    mutationFn: updateUserSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userSettings'],
      });
    },
  });
};
