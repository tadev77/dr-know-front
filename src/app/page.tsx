import Card from './components/Card';
import Header from './components/Header';
import Button from './components/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1621]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Seção de boas-vindas */}
        <div className='flex flex-wrap gap-6 justify-start'>
        <div className="mb-8">
          <button className="flex items-center text-gray-400 hover:text-white transition-colors mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Voltar
          </button>
          
          <h1 className="text-white text-2xl font-medium mb-2">
            Bem-vindo(a) ao seu dashboard inteligente do curso
          </h1>
          <h2 className="text-white text-3xl font-bold mb-4">
            Gestão Comercial: Negócios Digitais
          </h2>
        </div>

        </div>
        {/* Cards existentes */}
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Card 1 - Tempo de estudo diário */}
          <Card title="Qual seu tempo planejado de estudos diariamente?">
            <div className="flex flex-col gap-4">
              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input type="radio" name="study-time" className="hidden peer" />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">Entre 10 a 20 minutos por dia</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>

              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input type="radio" name="study-time" className="hidden peer" />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">Entre 30 minutos a 1 hora</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>

              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input type="radio" name="study-time" className="hidden peer" />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">Cerca de 1 a 2 horas</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>

              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input type="radio" name="study-time" className="hidden peer" />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">Mais de 2 horas</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>
            </div>
          </Card>

          {/* Card 2 - Dias de estudo por semana */}
          <Card title="Quantos dias da semana você pretende dedicar aos estudos?">
            <div className="flex flex-col gap-4">
              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input type="radio" name="study-days" className="hidden peer" />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">De 1 a 3 dias por semana</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>

              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input type="radio" name="study-days" className="hidden peer" />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">Entre 4 e 5 dias</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>

              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input type="radio" name="study-days" className="hidden peer" />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">5 dias, considerando dias úteis</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>

              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input type="radio" name="study-days" className="hidden peer" />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">7 dias por semana</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>
            </div>
          </Card>

          {/* Card 3 - Tempo para conclusão do curso */}
          <Card title="Com quanto tempo você pretende concluir seu curso?">
            <div className="flex flex-col gap-4">
              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input 
                  type="radio" 
                  name="course-duration" 
                  className="hidden peer" 
                />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">6 meses, quero concluir rápido</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>

              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input 
                  type="radio" 
                  name="course-duration" 
                  className="hidden peer" 
                />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">Entre 6 e 12 meses</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>

              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input 
                  type="radio" 
                  name="course-duration" 
                  className="hidden peer" 
                />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">Usarei os 2 anos de duração do curso</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>

              <label className="flex items-center p-4 bg-[#1A2332] rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71]">
                <input 
                  type="radio" 
                  name="course-duration" 
                  className="hidden peer" 
                />
                <div className="w-full flex items-center peer-checked:text-[#00A3FF] text-gray-300">
                  <span className="ml-3">Provavelmente precisarei de mais prazo</span>
                </div>
                <div className="ml-auto opacity-0 peer-checked:opacity-100">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#00A3FF]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </label>
            </div>
          </Card>
        </div>
        <div className='flex justify-end mt-4'>
          <Button 
            label="CRIAR PLANEJAMENTO" 
            variant="primary"
            size="md"
            className="uppercase"
          />
        </div>
      </div>
    </div>
  );
}
