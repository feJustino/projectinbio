import { ProjectCard } from '@/app/components/commons/project-card';
import { TotalVisits } from '@/app/components/commons/total-visits';
import UserCard from '@/app/components/commons/user-card';
import { auth } from '@/app/lib/auth';
import { getProfileData } from '@/app/server/get-profile-data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import NewProject from './new-project';

export default async function ProfilePage({
  params,
}: {
  params: { profileId: string };
}) {
  const { profileId } = await params;
  const profileData = await getProfileData(profileId);
  if (!profileData) return notFound();
  //todo: getProjects
  const session = await auth();
  const isOwner = profileData.userId === session?.user?.id;
  //TODO: adicionar pageView
  // TODO: se o usuário não estiver mais no trial não deixar mais ver o projeto. Direcionar upgrade

  return (
    <div className="relative h-screen flex p-20 overflow-hidden justify-center">
      <div className="fixed top-0 left-0 w-full flex justify-center items-center gap-1 py-2 bg-background-tertiary  z-link">
        <span>Você está usando a versão trial.</span>
        <Link href={`/${profileId}/upgrade`}>
          <button className="text-accent-green font-bold">
            Faça o upgrade agora!
          </button>
        </Link>
      </div>
      <div className="w-1/2 flex justify-center h-min">
        <UserCard />
      </div>
      <div className="w-full flex flex-col justify-start content-center gap-4 flex-wrap overflow-y-auto">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
        {isOwner && <NewProject profileId={profileId} />}
      </div>
      <div className="absolute bottom-4 right-0 left-0 w-min mx-auto">
        <TotalVisits />
      </div>
    </div>
  );
}
