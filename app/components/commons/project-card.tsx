'use client';
import { increaseProjectVisits } from '@/app/actions/increase-project-visits';
import { formatURL } from '@/app/lib/utils';
import { ProjectData } from '@/app/server/get-profile-data';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function ProjectCard({
  project,
  isOwner,
  img,
  fallbackDescription = 'ProjectInBio',
  fallbackName = 'Projeto',
}: {
  project?: ProjectData;
  isOwner: boolean;
  img: string;
  fallbackName?: string;
  fallbackDescription?: string;
}) {
  const { profileId } = useParams();
  const { projectName, projectDescription, totalVisits } = project || {};
  const projectUrl = project?.projectUrl || '';
  const formattedURL = formatURL(projectUrl);

  async function handleClick() {
    if (!project?.id || !profileId || isOwner) return;
    await increaseProjectVisits(profileId as string, project.id);
  }

  return (
    <Link
      href={formattedURL}
      target="_blank"
      className="no-underline"
      onClick={handleClick}
    >
      <div className="w-[340px] h-[132px] flex gap-5 bg-background-secondary p-3 rounded-[20px] border border-transparent hover:border-border-secondary">
        <div className="size-24 rounded-md overflow-hidden flex-shrink-0">
          <img
            src={img}
            alt={projectName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          {isOwner && (
            <span className="uppercase text-xs font-bold text-accent-green">
              {totalVisits || 0} Cliques
            </span>
          )}
          <div className="flex flex-col">
            <span className="text-white font-bold text-xl">
              {projectName || fallbackName}
            </span>
            <span className="text-content-body text-sm">
              {projectDescription || fallbackDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
