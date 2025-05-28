import { manageAuth } from '@/app/actions/manage-auth';
import Button from '@/app/components/ui/button';
import { auth } from '@/app/lib/auth';

export async function Header() {
  const session = await auth();
  return (
    <div className="absolute top-0 left-0 right-0 max-w-7xl mx-auto flex items-center justify-between py-10 z-10">
      <div className="flex items-center gap-4">
        <img src="/logo.svg" alt="Logo" />
        <h3 className="text-white text-2xl font-bold">Projectinbio</h3>
      </div>
      <div className="flex items-center gap-4">
        {session && <Button>Minha Pagina</Button>}
        <form action={manageAuth}>
          <Button>{session ? 'Sair' : 'Login'}</Button>
        </form>
      </div>
    </div>
  );
}
