'use server';

import { auth, signIn, signOut } from '@/app/lib/auth';
import { getProfileData } from '../server/get-profile-data';

export async function manageAuth() {
  const session = await auth();
  if (!session) {
    return await signIn('google', { redirectTo: '/criar' });
  }
  return await signOut({ redirectTo: '/' });
}
