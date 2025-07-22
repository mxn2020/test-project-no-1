// Check if OAuth providers are available
export const checkOAuthProviders = async (): Promise<{ github: boolean; google: boolean }> => {
  // For now, we'll disable OAuth providers since they're not configured
  // These would need to be set up in the better-auth config with proper client IDs and secrets
  return {
    github: false,
    google: false,
  };
};