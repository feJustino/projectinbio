export default function Hero() {
  return (
    <div className="flex border">
      <div className="w-full flex flex-col gap-2 mt-[35vh]">
        <h1 className="text-5xl font-bold text-white leading-[64px]">
          Seus projetos e redes sociais em um unico lugar
        </h1>
        <h2 className="text-xl leading-6">
          Crie sua própria pagina de projetos e compartilhe eles com o mundo
          <br />
         Acompanhe o engagemento com Analytics de liques
        </h2>
        <div className="flex items-center gap-2 w-full -mt-[10vh]">
          <span className="text-white text-xl">projectinbio.com</span>
          <input
            type="text"
          />
          <button>
            Criar agora
          </button>
        </div>
        <div className="w-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,#4B2DBB, transparent_55%)]">
          <div className="relative">
           {/* <UserCard></UserCard> */}
           <div className='absolute -bottom-[7%] -right-[45%]'>
            {/* <TotalVisits /> */}
           </div>
           <div className='absolute top-[20%] -left-[45%] -z-10'></div>
           {/* <ProjectCard /> */}
           <div className='absolute top-[5%] -left-[55%] -z-10'></div>
           {/* <ProjectCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
