import 'server-only';
import { db } from '@/app/lib/firebase';

export type ProfileData = {
  userId: string;
  totalVisits: string;
  createAt: Number;
  // todo - adicionar outros tipos
};

export type ProjectData = {
  id: string;
  userId: string;
  projectName: string;
  projectDescription: string;
  imagePath: string;
  projectUrl: string;
  createdAt: number;
  totalVisits?: number;
};

export async function getProfileData(profileId: string) {
  const snapshot = await db.collection('profiles').doc(profileId).get();

  return snapshot.data() as ProfileData;
}

export async function getProfileProjects(profileId: string) {
  const snapshot = await db
    .collection('projects')
    .doc(profileId)
    .collection('projects')
    .get();
  return snapshot.docs.map(doc => doc.data()) as ProjectData[];
}
