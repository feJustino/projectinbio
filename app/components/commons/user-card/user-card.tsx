import Button from '@/app/components/ui/button';
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Plus,
  UserPen,
} from 'lucide-react';
import EditSocialsLinks from './edit-social-links';
import { ProfileData } from '@/app/server/get-profile-data';
import Link from 'next/link';
import AddCustomLink from './add-custom-link';
import { formatURL } from '@/app/lib/utils';
import EditUserCard from './edit-user-card';
import { getDownloadURLFromPath } from '@/app/lib/firebase';

export default async function UserCard({
  profileData,
  isOwner,
}: {
  profileData: ProfileData;
  isOwner: boolean;
}) {
  const icons = [Github, Linkedin, Instagram, Twitter];
  const profileImage = await getDownloadURLFromPath(profileData.imagePath);

  return (
    <div className="w-[348px] flex flex-col gap-5 items-center p-5 border border-white border-opacity-10 bg-[#121212] rounded-3xl text-white">
      <div className="size-48">
        <img
          src={profileImage || ''}
          alt="Justin Fernandes"
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <h3 className="text-3xl font-bold min-w-0 overflow-hidden">
            {profileData.name || 'Justin Fernandes'}
          </h3>
          {isOwner && (
            <EditUserCard
              profileData={{ ...profileData, imagePath: profileImage }}
            />
          )}
        </div>
        <p className="opacity-40">
          {profileData.description || 'Full Stack Developer'}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <span className="uppercase text-xs font-medium">links</span>
        <div className="flex gap-3">
          {icons.map((Icon, index) => {
            const socialMediaKey = Icon.displayName?.toLowerCase() || '';
            return (
              <Link
                href={formatURL(
                  profileData?.socialMedias?.[socialMediaKey] || '#'
                )}
                target="_blank"
                key={index}
                className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
              >
                <Icon />
              </Link>
            );
          })}
          {isOwner && (
            <EditSocialsLinks socialMedias={profileData?.socialMedias} />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full min-h-[172px]">
        <div className="w-full flex flex-col items-center gap-3">
          {profileData.customLinks &&
            profileData.customLinks.map((link, index) => (
              <Link
                key={index}
                target="_blank"
                href={formatURL(link.url)}
                className="w-full"
              >
                <Button className="w-full">{link.title}</Button>
              </Link>
            ))}
          {isOwner && <AddCustomLink customLinks={profileData?.customLinks} />}
        </div>
      </div>
    </div>
  );
}
