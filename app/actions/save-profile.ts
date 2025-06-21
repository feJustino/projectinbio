'use server';

import { randomUUID } from 'node:crypto';
import { auth } from '../lib/auth';
import { db, storage } from '../lib/firebase';
import { Timestamp } from 'firebase-admin/firestore';

export async function saveProfile(formData: FormData) {
  const session = await auth();
  if (!session) {
    return;
  }

  const profileId = formData.get('profileId') as string;
  const name = formData.get('yourName') as string;
  const description = formData.get('yourDescription') as string;
  const file = formData.get('file') as File;
  let imagePath: string | undefined;

  const hasFile = file instanceof File && file.size > 0;

  if (hasFile) {
    const currentProfile = await db.collection('profiles').doc(profileId).get();
    const currentImagePath = currentProfile?.data()?.imagePath;
    if (currentImagePath) {
      const currentStoragePath = storage.file(currentImagePath);
      const [exists] = await currentStoragePath.exists();
      if (exists) {
        await currentStoragePath.delete();
      }
    }
    const generatedId = randomUUID();

    const storageRef = storage.file(
      `profile-images/${profileId}/${generatedId}`
    );
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await storageRef.save(buffer);

    imagePath = storageRef.name;
  }

  try {
    await db
      .collection('profiles')
      .doc(profileId)
      .update({
        userId: session?.user?.id,
        name,
        description,
        ...(hasFile && { imagePath }),
        updatedAt: Timestamp.now().toMillis(),
      });
    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    return false;
  }
}
