'use server';

import { Timestamp } from 'firebase-admin/firestore';
import { db } from '@/app/lib/firebase';
import { auth } from '@/app/lib/auth';

export async function createLink(link: string) {
  const session = await auth();

  if (!session || !session.user) return;
  try {
    await db.collection('profiles').doc(link).set({
      userId: session.user.id,
      totalVisits: 0,
      createAt: Timestamp.now().toMillis(),
    });
    return true;
  } catch (error) {
    return false;
  }
}
