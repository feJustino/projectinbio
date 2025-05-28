'use client';

import { createLink } from '@/app/actions/create-link';
import { VerifyExistLink } from '@/app/actions/verify-exist-link';
import Button from '@/app/components/ui/button';
import TextInput from '@/app/components/ui/text-input';
import { sanitizeLink } from '@/app/lib/utils';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

function CreateLinkForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [link, setLink] = useState('');

  function handleLinkChange(e: ChangeEvent<HTMLInputElement>) {
    const linkSanatized = sanitizeLink(e.target.value);
    setLink(linkSanatized);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (link.length === 0) return setError('Escolha o link primeiro');

    const isLinkExist = await VerifyExistLink(link);
    if (isLinkExist) return setError('Desculpe esse link já existe');

    const isLinkCreate = await createLink(link);
    if (!isLinkCreate) return setError('Erro ao criar o perfil');

    router.push(`/${link}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
        <span>projectinbio.com/</span>
        <TextInput onChange={handleLinkChange} value={link} />
        <Button className="w-[126px]">Criar</Button>
      </form>
      <div>
        <span className="text-accent-pink">{error}</span>
      </div>{' '}
    </>
  );
}

export default CreateLinkForm;
