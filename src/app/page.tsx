'use client'
import { useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Button from './components/Button';

export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState({
    studyTime: '',
    studyDays: '',
    courseDuration: ''
  });

  const handleOptionChange = (category: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const renderIndicator = (category: string, value: string) => {
    const isSelected = selectedOptions[category as keyof typeof selectedOptions] === value;
    
    if (isSelected) {
      return (
        <svg className="w-6 h-6 rounded-full border-2 border-[#0095D6]" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="6.5" cy="6.5" r="6.5" fill="#0095D6" />
          <mask id="mask0_68_424" maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="13" style={{maskType: 'alpha'}}>
            <rect x="0.333252" y="0.5" width="12" height="12" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_68_424)">
            <path d="M5.10836 8.075L9.34586 3.8375C9.44586 3.7375 9.56461 3.6875 9.70211 3.6875C9.83961 3.6875 9.95836 3.7375 10.0584 3.8375C10.1584 3.9375 10.2084 4.05625 10.2084 4.19375C10.2084 4.33125 10.1584 4.45 10.0584 4.55L5.45836 9.15C5.35836 9.25 5.24169 9.3 5.10836 9.3C4.97502 9.3 4.85836 9.25 4.75836 9.15L2.60836 7C2.50836 6.9 2.46044 6.78125 2.46461 6.64375C2.46877 6.50625 2.52086 6.3875 2.62086 6.2875C2.72086 6.1875 2.83961 6.1375 2.97711 6.1375C3.11461 6.1375 3.23336 6.1875 3.33336 6.2875L5.10836 8.075Z" fill="white"/>
          </g>
        </svg>
      );
    }
    
    return <div className="w-6 h-6 rounded-full border-2 border-[#4D5D71]"></div>;
  };

  return (
    <div className="min-h-screen bg-[#0D1621]">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Seção de boas-vindas */}
        <div className='flex flex-wrap gap-6 justify-start'>
        <div className="mb-8">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <mask id="mask0_68_359" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask0_68_359)">
              <path d="M11.8499 12.9H14.7071C14.96 12.9 15.1721 12.8143 15.3432 12.6428C15.5143 12.4713 15.5999 12.2588 15.5999 12.0053C15.5999 11.7518 15.5143 11.5375 15.3432 11.3625C15.1721 11.1875 14.96 11.1 14.7071 11.1H11.8499L12.6499 10.3C12.8332 10.1167 12.9249 9.90419 12.9249 9.66252C12.9249 9.42086 12.8332 9.20836 12.6499 9.02502C12.4666 8.84169 12.2541 8.75003 12.0124 8.75003C11.7707 8.75003 11.5582 8.84169 11.3749 9.02502L9.02145 11.3785C8.84042 11.5595 8.7499 11.7682 8.7499 12.0046C8.7499 12.2409 8.84157 12.4478 9.0249 12.625L11.3749 14.975C11.5582 15.1584 11.7707 15.2459 12.0124 15.2375C12.2541 15.2292 12.4666 15.1334 12.6499 14.95C12.8332 14.7667 12.9249 14.5542 12.9249 14.3125C12.9249 14.0709 12.8332 13.8584 12.6499 13.675L11.8499 12.9ZM12.0068 21.6C10.6855 21.6 9.44157 21.35 8.2749 20.85C7.10824 20.35 6.0874 19.6625 5.2124 18.7875C4.3374 17.9125 3.6499 16.892 3.1499 15.7261C2.6499 14.5601 2.3999 13.3143 2.3999 11.9886C2.3999 10.6629 2.6499 9.42086 3.1499 8.26253C3.6499 7.10419 4.3374 6.08752 5.2124 5.21252C6.0874 4.33752 7.10789 3.65002 8.27385 3.15002C9.43984 2.65002 10.6857 2.40002 12.0114 2.40002C13.3371 2.40002 14.5791 2.65002 15.7374 3.15002C16.8957 3.65002 17.9124 4.33752 18.7874 5.21252C19.6624 6.08752 20.3499 7.10606 20.8499 8.26812C21.3499 9.43021 21.5999 10.6719 21.5999 11.9931C21.5999 13.3144 21.3499 14.5584 20.8499 15.725C20.3499 16.8917 19.6624 17.9125 18.7874 18.7875C17.9124 19.6625 16.8939 20.35 15.7318 20.85C14.5697 21.35 13.3281 21.6 12.0068 21.6ZM11.9999 19.8C14.1666 19.8 16.0082 19.0417 17.5249 17.525C19.0416 16.0084 19.7999 14.1667 19.7999 12C19.7999 9.83336 19.0416 7.99169 17.5249 6.47502C16.0082 4.95836 14.1666 4.20002 11.9999 4.20002C9.83324 4.20002 7.99157 4.95836 6.4749 6.47502C4.95824 7.99169 4.1999 9.83336 4.1999 12C4.1999 14.1667 4.95824 16.0084 6.4749 17.525C7.99157 19.0417 9.83324 19.8 11.9999 19.8Z" fill="white"/>
            </g>
          </svg>
            Voltar
          </button>
          
          <h1 className="text-white text-base font-medium mb-2">
            Bem-vindo(a) ao seu dashboard inteligente do curso
          </h1>
          <h2 className="text-white text-2xl font-bold mb-4">
            Gestão Comercial: Negócios Digitais
          </h2>
        </div>

        </div>
        {/* Cards existentes */}
        <div className="flex flex-wrap gap-6 justify-center">
          {/* Card 1 - Tempo de estudo diário */}
          <Card title="Qual seu tempo planejado de estudos diariamente?">
            <div className="flex flex-col gap-4">
              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.studyTime === '10-20' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="study-time" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('studyTime', '10-20')}
                  checked={selectedOptions.studyTime === '10-20'}
                  value="10-20"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">Entre 10 a 20 minutos por dia</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('studyTime', '10-20')}
                </div>
              </label>

              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.studyTime === '30-60' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="study-time" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('studyTime', '30-60')}
                  checked={selectedOptions.studyTime === '30-60'}
                  value="30-60"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">Entre 30 minutos a 1 hora</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('studyTime', '30-60')}
                </div>
              </label>

              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.studyTime === '1-2' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="study-time" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('studyTime', '1-2')}
                  checked={selectedOptions.studyTime === '1-2'}
                  value="1-2"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">Cerca de 1 a 2 horas</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('studyTime', '1-2')}
                </div>
              </label>

              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.studyTime === '2+' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="study-time" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('studyTime', '2+')}
                  checked={selectedOptions.studyTime === '2+'}
                  value="2+"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">Mais de 2 horas</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('studyTime', '2+')}
                </div>
              </label>
            </div>
          </Card>

          {/* Card 2 - Dias de estudo por semana */}
          <Card title="Quantos dias da semana você pretende dedicar aos estudos?">
            <div className="flex flex-col gap-4">
              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.studyDays === '1-3' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="study-days" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('studyDays', '1-3')}
                  checked={selectedOptions.studyDays === '1-3'}
                  value="1-3"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">De 1 a 3 dias por semana</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('studyDays', '1-3')}
                </div>
              </label>

              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.studyDays === '4-5' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="study-days" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('studyDays', '4-5')}
                  checked={selectedOptions.studyDays === '4-5'}
                  value="4-5"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">Entre 4 e 5 dias</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('studyDays', '4-5')}
                </div>
              </label>

              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.studyDays === '5' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="study-days" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('studyDays', '5')}
                  checked={selectedOptions.studyDays === '5'}
                  value="5"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">5 dias, considerando dias úteis</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('studyDays', '5')}
                </div>
              </label>

              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.studyDays === '7' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="study-days" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('studyDays', '7')}
                  checked={selectedOptions.studyDays === '7'}
                  value="7"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">7 dias por semana</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('studyDays', '7')}
                </div>
              </label>
            </div>
          </Card>

          {/* Card 3 - Tempo para conclusão do curso */}
          <Card title="Com quanto tempo você pretende concluir seu curso?">
            <div className="flex flex-col gap-4">
              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.courseDuration === '6' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="course-duration" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('courseDuration', '6')}
                  checked={selectedOptions.courseDuration === '6'}
                  value="6"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">6 meses, quero concluir rápido</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('courseDuration', '6')}
                </div>
              </label>

              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.courseDuration === '6-12' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="course-duration" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('courseDuration', '6-12')}
                  checked={selectedOptions.courseDuration === '6-12'}
                  value="6-12"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">Entre 6 e 12 meses</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('courseDuration', '6-12')}
                </div>
              </label>

              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.courseDuration === '2' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="course-duration" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('courseDuration', '2')}
                  checked={selectedOptions.courseDuration === '2'}
                  value="2"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">Usarei os 2 anos de duração do curso</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('courseDuration', '2')}
                </div>
              </label>

              <label className={`flex items-center p-4 bg-transparent rounded-[8px] cursor-pointer hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] ${selectedOptions.courseDuration === 'more' ? 'bg-[#4D5D71]' : ''}`}>
                <input 
                  type="radio" 
                  name="course-duration" 
                  className="hidden peer" 
                  onChange={() => handleOptionChange('courseDuration', 'more')}
                  checked={selectedOptions.courseDuration === 'more'}
                  value="more"
                />
                <div className="w-full flex items-center peer-checked:text-white text-gray-300">
                  <span className="ml-3">Provavelmente precisarei de mais prazo</span>
                </div>
                <div className="ml-auto">
                  {renderIndicator('courseDuration', 'more')}
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
