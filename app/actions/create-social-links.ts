'use server';

import { Timestamp } from 'firebase-admin/firestore';
import { auth } from '../lib/auth';
import { db } from '../lib/firebase';

export async function createSocialLinks({
  profileId,
  links,
}: {
  profileId: string;
  links: Record<string, string | undefined>;
}) {
  const session = await auth();

  if (!session) return;
  try {
    await db
      .collection('profiles')
      .doc(profileId)
      .update({
        socialMedias: { ...links },
        updateAt: Timestamp.now().toMillis(),
      });

    return true;
  } catch (error) {
    console.error('Error creating social links:', error);
    return false;
  }
}
