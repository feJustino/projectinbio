import 'server-only';
import { db } from '@/app/lib/firebase';
import { Link } from '../actions/create-custom-links';

export type ProfileData = {
  userId: string;
  name?: string;
  imagePath?: string;
  description?: string;
  totalVisits: string;
  createAt: Number;
  socialMedias?: Record<string, string>;
  customLinks?: Link[];
  updateAt?: number;
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
    .collection('profiles')
    .doc(profileId)
    .collection('projects')
    .get();
  return snapshot.docs.map(doc => doc.data()) as ProjectData[];
}
