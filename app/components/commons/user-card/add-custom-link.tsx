'use client';

import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';
import Button from '../../ui/button';
import Modal from '../../ui/modal';
import TextInput from '../../ui/text-input';
import { createCustomLinks, Link } from '@/app/actions/create-custom-links';

const INPUT_QUANTITY = 3;

type AddCustomLinkProps = {
  customLinks?: Link[];
};

type CustomLinkInputProps = {
  index: number;
  defaultTitle?: string;
  defaultUrl?: string;
};

function CustomLinkInput({
  index,
  defaultTitle,
  defaultUrl,
}: CustomLinkInputProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col w-full">
        <p>Título do Link</p>
        <TextInput
          name={`title-${index}`}
          placeholder="digite o título do link"
          defaultValue={defaultTitle}
        />
      </div>
      <div className="flex flex-col w-full">
        <p className="font-bold">URL do Link</p>
        <TextInput
          name={`url-${index}`}
          placeholder="digite a URL do link"
          defaultValue={defaultUrl}
        />
      </div>
    </div>
  );
}

export default function AddCustomLink({ customLinks }: AddCustomLinkProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { refresh } = useRouter();
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
    const arrayOfInputs = Array.from({ length: INPUT_QUANTITY });
    const formData = new FormData(e.currentTarget);
    const links = arrayOfInputs
      .map((_, i) => ({
        title: (formData.get(`title-${i}`)?.toString() ?? '').trim(),
        url: (formData.get(`url-${i}`)?.toString() ?? '').trim(),
      }))
      .filter(link => link.title && link.url);

    try {
      await createCustomLinks({
        profileId: profileId as string,
        links,
      });
      startTransition(() => {
        setIsSaving(false);
        setIsModalOpen(false);
        refresh();
      });
    } catch (error) {
      setIsSaving(false);
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
            Adicionar Links Personalizados
          </p>
          <div className="flex flex-col gap-4">
            {Array.from({ length: INPUT_QUANTITY }).map((_, index) => (
              <CustomLinkInput
                key={index}
                index={index}
                defaultTitle={customLinks?.[index]?.title || ''}
                defaultUrl={customLinks?.[index]?.url || ''}
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
