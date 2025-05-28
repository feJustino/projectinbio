'use server';

import { db } from '@/app/lib/firebase';

export type ProfileData = {
  userId: string;
  totalVisits: string;
  createAt: Number;
  // todo - adicionar outros tipos
};

export async function VerifyExistLink(link: string) {
  const snapshot = await db.collection('profiles').doc(link).get();

  return snapshot.exists;
}
