'use client';

import { createProject } from '@/app/actions/create-project';
import Button from '@/app/components/ui/button';
import Modal from '@/app/components/ui/modal';
import TextArea from '@/app/components/ui/text-area';
import TextInput from '@/app/components/ui/text-input';
import { compressFiles } from '@/app/lib/utils';
import { ArrowUpFromLine, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { startTransition, useState } from 'react';

function NewProject({ profileId }: { profileId: string }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [projectName, setProjectName] = useState<string>('');
  const [projectUrl, setProjectUrl] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [projectImage, setProjectImage] = useState<string | null>('');

  function triggerImageInput(id: string) {
    document.getElementById(id)?.click();
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProjectImage(imageUrl);
    }
  }

  function handleCloseModal() {
    setIsOpen(false);
  }

  async function handleSaveProject() {
    setIsCreatingProject(true);
    const imageInput = document.getElementById(
      'imageInput'
    ) as HTMLInputElement;
    if (imageInput.files) {
      const compressedFiles = await compressFiles(Array.from(imageInput.files));

      const formData = new FormData();
      formData.append('file', compressedFiles[0]);
      formData.append('profileId', profileId);
      formData.append('projectName', projectName);
      formData.append('projectDescription', projectDescription);
      formData.append('projectUrl', projectUrl);

      await createProject(formData);
      startTransition(() => {
        setIsOpen(false);
        setProjectName('');
        setProjectDescription('');
        setProjectUrl('');
        setProjectImage(null);
        setIsCreatingProject(false);
        router.refresh();
      });
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-[340px] h-[132px] rounded-[20px] bg-background-secondary flex items-center gap-2 justify-center hover:border hover:border-dashed border-border-secondary"
      >
        <Plus className="size-10 text-accent-green" />
        <span>Novo projeto</span>
      </button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <div
          onKeyDown={e => e.key === 'Enter' && handleSaveProject()}
          className="bg-background-primary p-8 rounded-[20px] flex flex-col justify-between gap-10"
        >
          <p className="text-white font-bold text-xl">Novo Projeto</p>
          <div className="flex gap-10">
            <div className="flex flex-col items-center gap-3 text-xs">
              <div className="w-[100px] h-[100px] rounded-xl bg-background-tertiary overflow-hidden">
                {projectImage ? (
                  <img
                    src={projectImage}
                    alt="Imagem do projeto"
                    className="object-cover object-center"
                  />
                ) : (
                  <button
                    onClick={() => triggerImageInput('imageInput')}
                    className="w-full h-full"
                  >
                    100x100
                  </button>
                )}
              </div>
              <button
                className="flex text-white items-center gap-2"
                onClick={() => triggerImageInput('imageInput')}
              >
                <ArrowUpFromLine className="size-4" />
                <span>Adicionar imagem</span>
              </button>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-col gap-4 w-[293px]">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name" className="text-white font-bold">
                  Titulo do projeto
                </label>
                <TextInput
                  onChange={e => setProjectName(e.target.value)}
                  id="project-name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="project-description"
                  className="text-white font-bold"
                >
                  Descrição
                </label>
                <TextArea
                  id="project-description"
                  placeholder="De uma breve descrição do seu projeto"
                  className="h-36"
                  onChange={e => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-url" className="text-white font-bold">
                  URL do projeto
                </label>
                <TextInput
                  onChange={e => setProjectUrl(e.target.value)}
                  id="project-url"
                  type="url"
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-end">
            <button className="font-bold text-white" onClick={handleCloseModal}>
              Voltar
            </button>
            <Button onClick={handleSaveProject} disabled={isCreatingProject}>
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default NewProject;
