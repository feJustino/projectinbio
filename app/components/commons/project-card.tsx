import { ProjectData } from '@/app/server/get-profile-data';
import Link from 'next/link';

export function ProjectCard({
  project,
  isOwner,
  img,
}: {
  project: ProjectData;
  isOwner: boolean;
  img: string;
}) {
  const { projectName, projectDescription, totalVisits } = project;
  const projectUrl = project.projectUrl || '';
  const formattedURL = projectUrl.startsWith('http')
    ? projectUrl
    : `https://${projectUrl}`;

  const handleClick = () => {
    console.log('clicked');
  };

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
            <span className="text-white font-bold text-xl">{projectName}</span>
            <span className="text-content-body text-sm">
              {projectDescription}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
