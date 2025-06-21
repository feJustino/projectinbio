'use client';

import { Plus, Github, Linkedin, Instagram, Twitter } from 'lucide-react';
import { startTransition, useState } from 'react';
import Modal from '../../ui/modal';
import Button from '../../ui/button';
import { createSocialLinks } from '@/app/actions/create-social-links';
import { useParams } from 'next/navigation';
import TextInput from '../../ui/text-input';

// Tipos e dados centralizados
type SocialLink = {
  name: string;
  icon: React.ElementType;
};

const SOCIAL_LINKS: SocialLink[] = [
  { name: 'GitHub', icon: Github },
  { name: 'LinkedIn', icon: Linkedin },
  { name: 'Instagram', icon: Instagram },
  { name: 'Twitter', icon: Twitter },
];

// Componente de input para redes sociais
function SocialInput({
  name,
  Icon,
  defaultValue,
}: {
  name: string;
  Icon: React.ElementType;
  defaultValue?: string;
}) {
  return (
    <div className="flex items-center gap-2 w-full">
      <Icon />
      <TextInput
        type="text"
        placeholder={`Link do ${name}`}
        name={name.toLowerCase()}
        defaultValue={defaultValue}
      />
    </div>
  );
}

interface EditSocialsLinksProps {
  socialMedias?: Record<string, string>;
}

export default function EditSocialsLinks({
  socialMedias,
}: EditSocialsLinksProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { profileId } = useParams();

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    if (!profileId) {
      setIsSaving(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const links: Record<string, string> = {};
    SOCIAL_LINKS.forEach(({ name }) => {
      const key = name.toLowerCase();
      links[key] = formData.get(key)?.toString() || '';
    });

    try {
      await createSocialLinks({ profileId: profileId as string, links });
      startTransition(() => {
        setIsSaving(false);
        setIsModalOpen(false);
      });
    } catch (error) {
      setIsSaving(false);
      // Adicione um feedback de erro se desejar
    }
  }

  return (
    <>
      <button
        className="p-3 rounded-xl bg-[#1E1E1E] hover:bg-[#2E2E2E]"
        onClick={handleOpenModal}
      >
        <Plus />
      </button>
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
        <form
          className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10 w-[514px]"
          onSubmit={handleSubmit}
        >
          <p className="text-white font-bold text-xl">
            Adicionar Redes Sociais
          </p>
          <div className="flex flex-col gap-4">
            {SOCIAL_LINKS.map(({ icon, name }) => (
              <SocialInput
                key={name}
                name={name}
                Icon={icon}
                defaultValue={socialMedias?.[name.toLowerCase()]}
              />
            ))}
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="text-white font-bold"
              type="button"
              onClick={handleCloseModal}
            >
              Voltar
            </button>
            <Button type="submit" disabled={isSaving}>
              Salvar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
