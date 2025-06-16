'use server';

import { Timestamp } from 'firebase-admin/firestore';
import { auth } from '../lib/auth';
import { db } from '../lib/firebase';

export type Link = {
  title: string;
  url: string;
};

export async function createCustomLinks({
  profileId,
  links,
}: {
  profileId: string;
  links: Link[];
}) {
  const session = await auth();

  if (!session) return;
  try {
    await db.collection('profiles').doc(profileId).update({
      customLinks: links,
      updateAt: Timestamp.now().toMillis(),
    });

    return true;
  } catch (error) {
    console.error('Error creating social links:', error);
    return false;
  }
}
