'use client';

import { useEffect } from 'react';
import { client } from '@/lib/appwrite';

/**
 * Component that pings the Appwrite backend server on app initialization
 * to verify the setup. This runs automatically when the app loads.
 */
export function AppwritePing() {
  useEffect(() => {
    // Ping Appwrite backend to verify setup
    client.ping().catch((error) => {
      // Silently handle errors - this is just a verification ping
      console.error('Appwrite ping failed:', error);
    });
  }, []);

  // This component doesn't render anything
  return null;
}

