'use client'
import { useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Button from './components/Button';
import { useRouter } from 'next/navigation';

interface SelectedOptions {
  studyDays: string;
}

const STUDY_DAY_OPTIONS = {
  FEW_DAYS: '1-3',
  SOME_DAYS: '4-5',
  WEEKDAYS: '5',
  ALL_WEEK: '7'
} as const;

const STUDY_OPTIONS = [
  { value: STUDY_DAY_OPTIONS.FEW_DAYS, label: 'De 1 a 3 dias por semana' },
  { value: STUDY_DAY_OPTIONS.SOME_DAYS, label: 'Entre 4 e 5 dias' },
  { value: STUDY_DAY_OPTIONS.WEEKDAYS, label: '5 dias, considerando dias úteis' },
  { value: STUDY_DAY_OPTIONS.ALL_WEEK, label: '7 dias por semana' }
];

export default function Home() {
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    studyDays: STUDY_DAY_OPTIONS.FEW_DAYS
  });

  const hasSelectedOption = (): boolean => {
    return Object.values(selectedOptions).some(value => value !== '');
  };

  const handleNavigation = (): void => {
    if (!hasSelectedOption()) {
      alert('Por favor, selecione pelo menos uma opção antes de continuar.');
      return;
    }
    router.push('/dashboard');
  };

  const handleOptionChange = (category: keyof SelectedOptions, value: string): void => {
    setSelectedOptions(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const StudyOptionIndicator = ({ isSelected }: { isSelected: boolean }) => {
    if (isSelected) {
      return (
        <svg 
          className="study-option-indicator--selected w-6 h-6 rounded-full border-2 border-[#0095D6]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 13 13"
        >
          <circle cx="6.5" cy="6.5" r="6.5" fill="#0095D6" />
          <path 
            d="M5.10836 8.075L9.34586 3.8375C9.44586 3.7375 9.56461 3.6875 9.70211 3.6875C9.83961 3.6875 9.95836 3.7375 10.0584 3.8375C10.1584 3.9375 10.2084 4.05625 10.2084 4.19375C10.2084 4.33125 10.1584 4.45 10.0584 4.55L5.45836 9.15C5.35836 9.25 5.24169 9.3 5.10836 9.3C4.97502 9.3 4.85836 9.25 4.75836 9.15L2.60836 7C2.50836 6.9 2.46044 6.78125 2.46461 6.64375C2.46877 6.50625 2.52086 6.3875 2.62086 6.2875C2.72086 6.1875 2.83961 6.1375 2.97711 6.1375C3.11461 6.1375 3.23336 6.1875 3.33336 6.2875L5.10836 8.075Z" 
            fill="white"
          />
        </svg>
      );
    }
    return <div className="study-option-indicator--unselected w-6 h-6 rounded-full border-2 border-[#4D5D71]" />;
  };

  const StudyOption = ({ value, label }: { value: string; label: string }) => {
    const isSelected = selectedOptions.studyDays === value;
    
    return (
      <label 
        className={`study-days-option flex items-center p-3 sm:p-4 rounded-[8px] cursor-pointer 
          hover:bg-[#1E2A3B] transition-colors group border border-[#4D5D71] 
          ${isSelected ? 'bg-[#4D5D71]' : ''}`}
      >
        <input 
          type="radio" 
          name="study-days" 
          className="study-days-input hidden peer" 
          onChange={() => handleOptionChange('studyDays', value)}
          checked={isSelected}
          value={value}
        />
        <div className="option-content w-full flex items-center peer-checked:text-white text-gray-300">
          <span className="option-text ml-3 text-sm sm:text-base">{label}</span>
        </div>
        <div className="indicator-wrapper ml-auto">
          <StudyOptionIndicator isSelected={isSelected} />
        </div>
      </label>
    );
  };

  return (
    <div className="home-container min-h-screen bg-[#0D1621]">
      <Header />
      <div className="home-content container mx-auto px-4 py-8">
        <div className='home-welcome-section flex flex-wrap gap-6 justify-start'>
          <div className="welcome-wrapper mb-8">
            <button className="back-button flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6">
              <svg className="back-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_68_359" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_68_359)">
                  <path d="M11.8499 12.9H14.7071C14.96 12.9 15.1721 12.8143 15.3432 12.6428C15.5143 12.4713 15.5999 12.2588 15.5999 12.0053C15.5999 11.7518 15.5143 11.5375 15.3432 11.3625C15.1721 11.1875 14.96 11.1 14.7071 11.1H11.8499L12.6499 10.3C12.8332 10.1167 12.9249 9.90419 12.9249 9.66252C12.9249 9.42086 12.8332 9.20836 12.6499 9.02502C12.4666 8.84169 12.2541 8.75003 12.0124 8.75003C11.7707 8.75003 11.5582 8.84169 11.3749 9.02502L9.02145 11.3785C8.84042 11.5595 8.7499 11.7682 8.7499 12.0046C8.7499 12.2409 8.84157 12.4478 9.0249 12.625L11.3749 14.975C11.5582 15.1584 11.7707 15.2459 12.0124 15.2375C12.2541 15.2292 12.4666 15.1334 12.6499 14.95C12.8332 14.7667 12.9249 14.5542 12.9249 14.3125C12.9249 14.0709 12.8332 13.8584 12.6499 13.675L11.8499 12.9ZM12.0068 21.6C10.6855 21.6 9.44157 21.35 8.2749 20.85C7.10824 20.35 6.0874 19.6625 5.2124 18.7875C4.3374 17.9125 3.6499 16.892 3.1499 15.7261C2.6499 14.5601 2.3999 13.3143 2.3999 11.9886C2.3999 10.6629 2.6499 9.42086 3.1499 8.26253C3.6499 7.10419 4.3374 6.08752 5.2124 5.21252C6.0874 4.33752 7.10789 3.65002 8.27385 3.15002C9.43984 2.65002 10.6857 2.40002 12.0114 2.40002C13.3371 2.40002 14.5791 2.65002 15.7374 3.15002C16.8957 3.65002 17.9124 4.33752 18.7874 5.21252C19.6624 6.08752 20.3499 7.10606 20.8499 8.26812C21.3499 9.43021 21.5999 10.6719 21.5999 11.9931C21.5999 13.3144 21.3499 14.5584 20.8499 15.725C20.3499 16.8917 19.6624 17.9125 18.7874 18.7875C17.9124 19.6625 16.8939 20.35 15.7318 20.85C14.5697 21.35 13.3281 21.6 12.0068 21.6ZM11.9999 19.8C14.1666 19.8 16.0082 19.0417 17.5249 17.525C19.0416 16.0084 19.7999 14.1667 19.7999 12C19.7999 9.83336 19.0416 7.99169 17.5249 6.47502C16.0082 4.95836 14.1666 4.20002 11.9999 4.20002C9.83324 4.20002 7.99157 4.95836 6.4749 6.47502C4.95824 7.99169 4.1999 9.83336 4.1999 12C4.1999 14.1667 4.95824 16.0084 6.4749 17.525C7.99157 19.0417 9.83324 19.8 11.9999 19.8Z" fill="white"/>
                </g>
              </svg>
              Voltar
            </button>
            
            <h1 className="welcome-title text-white text-base font-medium mb-2">
              Bem-vindo(a) ao seu dashboard inteligente do curso
            </h1>
            <h2 className="course-title text-white text-2xl font-bold mb-4">
              Gestão Comercial: Negócios Digitais
            </h2>
          </div>
        </div>

        <div className="cards-container flex flex-wrap justify-center">
          <Card title="Quantos dias da semana você pretende dedicar aos estudos?">
            <div className="study-days-options flex flex-col gap-4">
              {STUDY_OPTIONS.map(option => (
                <StudyOption 
                  key={option.value}
                  value={option.value}
                  label={option.label}
                />
              ))}
            </div>
          </Card>
        </div>

        <div className='button-container flex justify-center sm:justify-end mt-4 px-4 sm:px-6'>
          <Button 
            label="CRIAR PLANEJAMENTO" 
            variant="primary"
            size="md"
            className={`create-plan-button uppercase w-full sm:w-auto ${!hasSelectedOption() ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleNavigation}
            disabled={!hasSelectedOption()}
          />
        </div>
      </div>
    </div>
  ); 
}
