import 'server-only';
import { db } from '@/app/lib/firebase';
import { ProfileData } from '@/app/actions/verify-exist-link';

export async function getProfileData(profileId: string) {
  const snapshot = await db.collection('profiles').doc(profileId).get();

  return snapshot.data() as ProfileData;
}
