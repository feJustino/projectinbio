'use client';

import {
  compressImageFile,
  handleImageChange,
  triggerImageInput,
} from '@/app/lib/utils';
import { ProfileData } from '@/app/server/get-profile-data';
import { ArrowUpFromLine, UserPen } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';
import Button from '../../ui/button';
import Modal from '../../ui/modal';
import TextArea from '../../ui/text-area';
import TextInput from '../../ui/text-input';
import { saveProfile } from '@/app/actions/save-profile';

export default function EditUserCard({
  profileData,
}: {
  profileData: ProfileData;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const router = useRouter();

  const [yourName, setYourName] = useState<string>(profileData.name || '');
  const [yourDescription, setYourDescription] = useState<string>(
    profileData.description || ''
  );
  const [profilePic, setProfilePic] = useState<string | null>(
    profileData.imagePath || null
  );

  const { profileId } = useParams();

  function handleClick() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setIsEditingProfile(false);
    setYourName(profileData.name || '');
    setYourDescription(profileData.description || '');
    setProfilePic(profileData.imagePath || null);
  }

  async function handleEditUserData(e: React.FormEvent<HTMLFormElement>) {
    setIsEditingProfile(true);

    e.preventDefault();
    if (!profileId) {
      console.error('Profile ID is not defined');
      setIsEditingProfile(false);
      return;
    }

    const compressedFiles = await compressImageFile('profile-pic-input');

    const formData = new FormData();

    if (compressedFiles) {
      formData.append('file', compressedFiles[0]);
    }
    formData.append('profileId', profileId as string);
    formData.append('yourName', yourName || '');
    formData.append('yourDescription', yourDescription || '');

    await saveProfile(formData);
    startTransition(() => {
      handleCloseModal();
      router.refresh();
    });
  }

  return (
    <>
      <button onClick={handleClick}>
        <UserPen />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <form
          className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10"
          onSubmit={handleEditUserData}
        >
          <p className="text-white font-bold text-xl">Editar Perfil</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile Picture"
                    className="rounded-full object-cover object-center w-full h-full"
                  />
                ) : (
                  <button
                    onClick={() => triggerImageInput('profile-pic-input')}
                    className="w-full h-full"
                  >
                    100x100
                  </button>
                )}
              </div>

              <button
                type="button"
                className="text-white flex items-center gap-2"
                onClick={() => triggerImageInput('profile-pic-input')}
              >
                <ArrowUpFromLine className="size-4" />
                Adicionar Foto
              </button>
              <input
                id="profile-pic-input"
                name="profile-pic-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => setProfilePic(handleImageChange(e))}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="your-name" className="font-bold text-white">
                  Seu nome
                </label>
                <TextInput
                  id="your-name"
                  name="your-name"
                  placeholder="Digite seu nome"
                  value={yourName}
                  onChange={e => setYourName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="your-description"
                  className="font-bold text-white"
                >
                  Sua descrição
                </label>
                <TextArea
                  id="your-description"
                  name="your-description"
                  placeholder="Fale um pouco sobre você"
                  className="h-36"
                  value={yourDescription}
                  onChange={e => setYourDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button className="text-white font-bold" onClick={handleCloseModal}>
              Voltar
            </button>
            <Button type="submit" disabled={isEditingProfile}>
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
