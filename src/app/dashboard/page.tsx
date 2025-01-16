'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useRouter } from 'next/navigation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// Add type definitions
interface TabOption {
  id: string;
  label: string;
  isLocked: boolean;
  completion?: number; // percentage of completion
}

interface SubjectProgress {
  name: string;
  progress: number;
}

interface InsightData {
  general_insight: string;
  performance_insight: string;
  time_insight: string;
  suggested_daily_time: number;
  study_time?: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
  pd_suggested: {
    title: string;
    link: string;
  }[];
}

interface PerformanceData {
  [key: string]: {
    data: {
      datasets: [{
        data: number[];
        backgroundColor: string[];
        circumference: number;
        rotation: number;
        borderRadius: number;
        borderWidth: number;
      }]
    };
    subjects: SubjectProgress[];
  }
}

interface StudyData {
  labels: string[];
  datasets: [{
    data: number[];
    backgroundColor: (context: { raw: number }) => string;
    borderRadius: number;
    borderSkipped: boolean;
    barThickness: number;
    categoryPercentage: number;
    barPercentage: number;
    stack: string;
    datalabels: {
      display?: boolean;
      color?: (context: { raw: number }) => string;
      anchor?: string;
      align?: string;
      formatter?: (value: number) => string;
    };
  }, {
    data: number[];
    backgroundColor: string;
    borderRadius: number;
    borderSkipped: boolean;
    barThickness: number;
    categoryPercentage: number;
    barPercentage: number;
    stack: string;
    datalabels: {
      display: boolean;
    };
  }]
}

// Add interface for completions data
interface CompletionData {
  trimester: string;
  completion: number;
}

const TRIMESTER_TABS: TabOption[] = [
  { id: '1', label: '1º Trimestre', isLocked: false, completion: 100 },
  { id: '2', label: '2º Trimestre', isLocked: false, completion: 45 },
  { id: '3', label: '3º Trimestre', isLocked: true, completion: 0 },
  { id: '4', label: '4º Trimestre', isLocked: true, completion: 0 }
];

const SUBJECTS: SubjectProgress[] = [
  { name: 'Pensamento Lógico e Quantitativo', progress: 70 },
  { name: 'Gestão, Operações e Organizações', progress: 98 }
];

const doughnutChartConfig = {
  data: {
    datasets: [{
      data: [69, 31],
      backgroundColor: ['#C1DB25', '#1D2F47'],
      circumference: 180,
      rotation: 270,
      borderRadius: 20,
      borderWidth: 0
    }]
  },
  options: {
    cutout: '80%',
    plugins: {
      legend: { 
        display: false 
      },
      datalabels: {
        display: false
      }
    }
  }
};

const SubjectCard = ({ name, progress }: SubjectProgress) => (
  <div className='subject-card bg-[#1D2F47] p-4 rounded-lg'>
    <div className='flex flex-row justify-between items-center'>
      <span>{name}</span>
      <div className='flex flex-row gap-2 items-center'>
        <div className="h-3 w-12 bg-[#0D1621] rounded-full">
          <div className="h-full rounded-full bg-[#C1DB25]" style={{ width: `${progress}%` }}></div>
        </div>
        <span>{progress}%</span>
      </div>
    </div>
  </div>
);

// Dados de desempenho para cada trimestre
const trimesterPerformance = {
  '1': {
    data: {
      datasets: [{
        data: [69, 31],
        backgroundColor: ['#C1DB25', '#1D2F47'],
        circumference: 180,
        rotation: 270,
        borderRadius: 20,
        borderWidth: 0
      }]
    },
    subjects: [
      { name: 'Pensamento Lógico e Quantitativo', progress: 70 },
      { name: 'Gestão, Operações e Organizações', progress: 98 }
    ]
  },
  '2': {
    data: {
      datasets: [{
        data: [82, 18],
        backgroundColor: ['#C1DB25', '#1D2F47'],
        circumference: 180,
        rotation: 270,
        borderRadius: 20,
        borderWidth: 0
      }]
    },
    subjects: [
      { name: 'Pensamento Lógico e Quantitativo', progress: 85 },
      { name: 'Gestão, Operações e Organizações', progress: 92 }
    ]
  },
  '3': {
    data: {
      datasets: [{
        data: [75, 25],
        backgroundColor: ['#C1DB25', '#1D2F47'],
        circumference: 180,
        rotation: 270,
        borderRadius: 20,
        borderWidth: 0
      }]
    },
    subjects: [
      { name: 'Pensamento Lógico e Quantitativo 3', progress: 78 },
      { name: 'Gestão, Operações e Organizações 3', progress: 89 }
    ]
  },
  '4': {
    data: {
      datasets: [{
        data: [91, 9],
        backgroundColor: ['#C1DB25', '#1D2F47'],
        circumference: 180,
        rotation: 270,
        borderRadius: 20,
        borderWidth: 0
      }]
    },
    subjects: [
      { name: 'Pensamento Lógico e Quantitativo', progress: 95 },
      { name: 'Gestão, Operações e Organizações', progress: 88 }
    ]
  }
};

const studyData = {
  labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  datasets: [
    {
      data: [30, 60, 60, 90, 50, 90, 120],
      backgroundColor: (context: { raw: number }) => {
        return context.raw >= 120 ? '#C1DB25' : '#98A2AE';
      },
      borderRadius: 6,
      borderSkipped: false,
      barThickness: 35,
      categoryPercentage: 0.8,
      barPercentage: 0.9,
      stack: 'stack1',
      datalabels: {
        color: (context: { raw: number }) => {
          return context.raw >= 120 ? '#172537' : '#172537';
        },
        anchor: 'center',
        align: 'center',
        formatter: (value: number) => {
          if (value >= 60) {
            return `${value/60}h`;
          }
          const valueStr = value.toString();
          const padding = ' '.repeat(Math.max(0, 3 - valueStr.length));
          return `${padding}${value}\n min`;
        }
      }
    },
    {
      data: [150, 150, 150, 150, 150, 150, 150],
      backgroundColor: '#1D2F47',
      borderRadius: 6,
      borderSkipped: false,
      barThickness: 35,
      categoryPercentage: 0.8,
      barPercentage: 0.9,
      stack: 'stack1',
      datalabels: {
        display: false
      }
    }
  ]
};

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    const totalDuration = 500; // 500ms = meio segundo
    const intervalTime = totalDuration / text.length; // Calcula o intervalo baseado no tamanho do texto
    
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [text]);

  return <div className="mb-4" dangerouslySetInnerHTML={{ __html: displayText }} />;
};

const getWeekDateRange = () => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  return `${monday.toLocaleDateString('pt-BR', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })} a ${sunday.toLocaleDateString('pt-BR', { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })}`;
};

const getTotalStudyHours = (data: StudyData) => {
  const totalMinutes = data.datasets[0].data.reduce((sum, minutes) => sum + minutes, 0);
  return totalMinutes >= 60 
    ? `${(totalMinutes/60).toFixed(1)}h` 
    : `${totalMinutes}min`;
};

const formatTabLabel = (tab: TabOption) => {
  const parts = tab.label.split(' ');
  if (parts.length !== 2) {
    console.warn(`Invalid tab label format: ${tab.label}`);
    return tab.label;
  }

  const [number, ...rest] = parts;
  return (
    <span className="flex items-center gap-1">
      {tab.isLocked && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="8" 
          height="8" 
          viewBox="0 0 8 8" 
          fill="none"
          aria-label="Trimestre bloqueado"
          role="img"
        >
          <g opacity="0.4">
            <path d="M2.00016 7.44446C1.81683 7.44446 1.65989 7.37918 1.52933 7.24862C1.39877 7.11807 1.3335 6.96112 1.3335 6.77779V3.44446C1.3335 3.26112 1.39877 3.10418 1.52933 2.97362C1.65989 2.84307 1.81683 2.77779 2.00016 2.77779H2.3335V2.11112C2.3335 1.65001 2.496 1.25696 2.821 0.931958C3.146 0.606958 3.53905 0.444458 4.00016 0.444458C4.46127 0.444458 4.85433 0.606958 5.17933 0.931958C5.50433 1.25696 5.66683 1.65001 5.66683 2.11112V2.77779H6.00016C6.1835 2.77779 6.34044 2.84307 6.471 2.97362C6.60155 3.10418 6.66683 3.26112 6.66683 3.44446V6.77779C6.66683 6.96112 6.60155 7.11807 6.471 7.24862C6.34044 7.37918 6.1835 7.44446 6.00016 7.44446H2.00016ZM4.00016 5.77779C4.1835 5.77779 4.34044 5.71251 4.471 5.58196C4.60155 5.4514 4.66683 5.29446 4.66683 5.11112C4.66683 4.92779 4.60155 4.77085 4.471 4.64029C4.34044 4.50974 4.1835 4.44446 4.00016 4.44446C3.81683 4.44446 3.65989 4.50974 3.52933 4.64029C3.39877 4.77085 3.3335 4.92779 3.3335 5.11112C3.3335 5.29446 3.39877 5.4514 3.52933 5.58196C3.65989 5.71251 3.81683 5.77779 4.00016 5.77779ZM3.00016 2.77779H5.00016V2.11112C5.00016 1.83335 4.90294 1.59724 4.7085 1.40279C4.51405 1.20835 4.27794 1.11112 4.00016 1.11112C3.72239 1.11112 3.48627 1.20835 3.29183 1.40279C3.09739 1.59724 3.00016 1.83335 3.00016 2.11112V2.77779Z" fill="white"/>
          </g>
        </svg>
      )}
      {number} {rest.join(' ')}
    </span>
  );
};

// Update interfaces to match new API structure
interface InsightData {
  general_insight: string;
  performance_insight: string;
  time_insight: string;
  suggested_daily_time: number;
  study_time?: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
  pd_suggested: {
    title: string;
    link: string;
  }[];
}

// Add this helper function to convert time string to minutes
const timeStringToMinutes = (timeStr: string): number => {
  const hoursMatch = timeStr.match(/(\d+)h/);
  const minutesMatch = timeStr.match(/(\d+)min/);
  
  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
  const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
  
  return hours * 60 + minutes;
};

const DEFAULT_INSIGHT_TEXT = "Olá, Cecília. Identifiquei alguns pontos de melhorias no seu cronograma de estudos baseados no seu desempenho até aqui.\n\nGostaria de saber como melhorar sua performance?";

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(TRIMESTER_TABS[0].id);
  const [insightText, setInsightText] = useState<string>(DEFAULT_INSIGHT_TEXT);
  const [performanceData, setPerformanceData] = useState<PerformanceData>(trimesterPerformance);
  const [studyHoursData, setStudyHoursData] = useState<StudyData>(studyData);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [tabs, setTabs] = useState<TabOption[]>(TRIMESTER_TABS);
  const [error, setError] = useState<string | null>(null);
  const [suggestedDailyTime, setSuggestedDailyTime] = useState<string>('2h');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/completions', {
          signal: AbortSignal.timeout(60000),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        if (!response.ok) {
          throw new Error(`Erro ao carregar dados (${response.status})`);
        }
        
        const data: InsightData = await response.json();

        if (!data || typeof data !== 'object') {
          throw new Error('Formato de dados inválido');
        }

        if (data.suggested_daily_time) {
          const hours = Math.floor(data.suggested_daily_time / 60);
          const minutes = data.suggested_daily_time % 60;
          setSuggestedDailyTime(minutes > 0 ? `${hours}h${minutes}min` : `${hours}h`);
        }

        // Update study hours data if available from API
        if (data.study_time) {
          const newStudyData = {
            ...studyData,
            datasets: [
              {
                ...studyData.datasets[0],
                data: [
                  data.study_time.monday,
                  data.study_time.tuesday,
                  data.study_time.wednesday,
                  data.study_time.thursday,
                  data.study_time.friday,
                  data.study_time.saturday,
                  data.study_time.sunday
                ]
              },
              studyData.datasets[1] // Keep the background bars unchanged
            ]
          };
          setStudyHoursData(newStudyData);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
        
        if (error instanceof DOMException && error.name === 'TimeoutError') {
          setError('O servidor demorou muito para responder. Por favor, tente novamente.');
        } else if (error instanceof TypeError && error.message === 'Failed to fetch') {
          setError('Não foi possível conectar ao servidor. Verifique se o servidor está rodando em http://localhost:3005');
        } else {
          setError(
            error instanceof Error 
              ? error.message 
              : 'Erro ao carregar dados. Por favor, tente novamente.'
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to update trimester locks based on completion
  const updateTrimesterLocks = useCallback(() => {
    setTabs(prevTabs => {
      return prevTabs.map((tab, index) => {
        if (index === 0) return { ...tab, isLocked: false }; // First trimester is always unlocked
        
        // Unlock next trimester if previous one is completed
        const previousTab = prevTabs[index - 1];
        return {
          ...tab,
          isLocked: previousTab.completion < 100
        };
      });
    });
  }, []);

  // Use effect to update locks when completion changes
  useEffect(() => {
    updateTrimesterLocks();
  }, [updateTrimesterLocks]);

  // Handle insights generation
  const handleGenerateInsights = async () => {
    try {
      setIsLoadingInsights(true);
      setError(null);
      
      const response = await fetch('/api/completions', {
        signal: AbortSignal.timeout(60000),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Erro ao carregar insights (${response.status})`);
      }
      
      const data: InsightData = await response.json();

      // Concatenate insights in the specified order with line breaks between them
      let formattedText = '';
      
      if (data.general_insight) {
        formattedText += data.general_insight + '\n\n';
      }
      
      if (data.performance_insight) {
        formattedText += data.performance_insight + '\n\n';
      }
      
      if (data.time_insight) {
        formattedText += data.time_insight + '\n\n';
      }
      
      // Add PD suggestions at the end
      if (data.pd_suggested && data.pd_suggested.length > 0) {
        formattedText += 'Sugestões de PDs:\n\n';
        data.pd_suggested.forEach(pd => {
          formattedText += `<div class="flex items-center gap-2 p-2 bg-[#1D2F47] rounded-md my-2">
<svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
  <path d="M16.4118 8.01332L9.61529 1.21685C9.14587 0.7474 8.38372 0.7474 7.91429 1.21685L1.11778 8.01332C0.607121 8.5233 0.658816 9.36858 1.22257 9.81918C2.21875 10.6155 3.31482 11.2226 4.46119 11.6592C4.39203 11.3498 4.35011 11.0305 4.35011 10.7008C4.35011 8.2627 6.3264 6.28574 8.76515 6.28574C11.2039 6.28574 13.1802 8.26205 13.1802 10.7008C13.1802 11.0312 13.1382 11.3498 13.0691 11.6592C14.2148 11.2226 15.3108 10.6162 16.3077 9.81918C16.8714 9.36858 16.9232 8.5233 16.4125 8.01332H16.4118Z" fill="#C1DB25"/>
  <path d="M4.46094 11.6591C4.89965 13.6347 6.65658 15.115 8.7649 15.115C10.8732 15.115 12.6302 13.6347 13.0688 11.6591C10.3011 12.7119 7.22944 12.7119 4.46164 11.6591H4.46094Z" fill="#C1DB25"/>
  <path d="M14.9419 14.4382C15.5226 14.4382 15.9933 13.9674 15.9933 13.3868C15.9933 12.8062 15.5226 12.3354 14.9419 12.3354C14.3613 12.3354 13.8906 12.8062 13.8906 13.3868C13.8906 13.9674 14.3613 14.4382 14.9419 14.4382Z" fill="#C1DB25"/>
</svg>
            <a href="${pd.link}" target="_blank" rel="noopener noreferrer" class="text-white hover:text-blue-300 transition-colors">
              ${pd.title}
              <svg class="inline-block ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" >
                <path d="M7 17L17 7M17 7H8M17 7V16" />
              </svg>
            </a>
          </div>`;
        });
      }

      setInsightText(formattedText);

      // Scroll to bottom after content is updated
      const insightsContainer = document.querySelector('.insights-text');
      if (insightsContainer) {
        setTimeout(() => {
          insightsContainer.scrollTop = insightsContainer.scrollHeight;
        }, 600); // Aguarda um pouco mais que a animação de digitação (500ms)
      }

    } catch (error) {
      console.error('Error fetching insights:', error);
      setError(
        error instanceof Error 
          ? error.message 
          : 'Erro ao gerar insights. Por favor, tente novamente.'
      );
    } finally {
      setIsLoadingInsights(false);
    }
  };

  // In the Dashboard component, update the Bar chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        stacked: true,
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: { 
          display: false,
        },
        border: {
          display: false
        },
        min: 0,
        max: timeStringToMinutes(suggestedDailyTime), // Use the converted time here
      },
      x: {
        stacked: true,
        grid: { 
          display: false,
        },
        ticks: { 
          color: '#fff',
          padding: 5,
          font: {
            size: 10,
            md: 12
          }
        },
        border: {
          display: false
        },
        position: 'top'
      }
    },
    plugins: {
      legend: {
        display: false
      },
      datalabels: {
        font: {
          weight: 'bold'
        }
      }
    }
  };

  const handleEditPlanning = () => {
    router.push('/');
  };

  return (
    <main className="dashboard-container min-h-screen bg-[#0D1621] p-4 md:p-8">
      <Header />

      <div className="dashboard-content container mx-auto">
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
        
        <div className="dashboard-header flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-white text-base font-medium mb-2">
              Bem-vindo(a) ao seu dashboard inteligente do curso
            </h1>
            <h2 className="text-white text-xl md:text-2xl font-bold">
              Gestão Comercial: Negócios Digitais
            </h2>
          </div>
          <Button 
            label="EDITAR PLANEJAMENTO" 
            variant="secondary"
            size="sm"
            onClick={handleEditPlanning}
          />
        </div>

        <div className="dashboard-grid grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="performance-study-card bg-[#172537] border border-[#20344E] p-4 md:p-6 rounded-lg col-span-1 md:col-span-2 flex flex-col md:flex-row w-full">
            {/* Performance Section */}
            <div className="performance-section flex-1 md:pr-6 md:border-r border-[#1D2F47] mb-6 md:mb-0">
              <div className="performance-title flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#20344E] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_116_917" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                      <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_116_917)">
                      <path d="M10.45 12.975L11.75 14.275C11.9333 14.4583 12.1667 14.55 12.45 14.55C12.7333 14.55 12.9667 14.4583 13.15 14.275L16 11.425V12.025C16 12.3083 16.0958 12.5417 16.2875 12.725C16.4792 12.9083 16.7167 13 17 13C17.2833 13 17.5208 12.9042 17.7125 12.7125C17.9042 12.5208 18 12.2833 18 12V9C18 8.71667 17.9042 8.47917 17.7125 8.2875C17.5208 8.09583 17.2833 8 17 8H13.975C13.6917 8 13.4583 8.09583 13.275 8.2875C13.0917 8.47917 13 8.71667 13 9C13 9.28333 13.0958 9.52083 13.2875 9.7125C13.4792 9.90417 13.7167 10 14 10H14.575L12.45 12.15L11.15 10.85C10.9667 10.65 10.7333 10.55 10.45 10.55C10.1667 10.55 9.93333 10.65 9.75 10.85L6.7 13.9C6.5 14.0833 6.4 14.3167 6.4 14.6C6.4 14.8833 6.5 15.1167 6.7 15.3C6.88333 15.5 7.11667 15.6 7.4 15.6C7.68333 15.6 7.91667 15.5 8.1 15.3L10.45 12.975Z" fill="white"/>
                    </g>
                  </svg>
                </div>
                <h3 className="text-white">Desempenho nas avaliações</h3>
              </div>
              
              <div className="trimester-tabs relative flex justify-between mb-4 border-b border-gray-400">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    className={`text-xs md:text-sm pb-2 relative ${
                      tab.isLocked 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : activeTab === tab.id 
                          ? 'text-[#0095D6]' 
                          : 'text-gray-400 hover:text-gray-300'
                    }`}
                    onClick={() => !tab.isLocked && setActiveTab(tab.id)}
                    disabled={tab.isLocked}
                    aria-label={`${tab.label}${tab.isLocked ? ' (Bloqueado)' : ''}`}
                  >
                    {formatTabLabel(tab)}
                    {activeTab === tab.id && !tab.isLocked && (
                      <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#0095D6]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="performance-chart flex justify-center -mt-6">
                <div className="w-60 h-60 md:w-80 md:h-80">
                  <Doughnut
                    data={performanceData[activeTab].data}
                    options={doughnutChartConfig.options}
                  />
                </div>
              </div>
              <div className="performance-stats text-center -mt-36 ">
                <span className="text-6xl text-white font-bold">
                  {performanceData[activeTab].data.datasets[0].data[0]}
                  <span className="text-xl">%</span>
                </span>
                <p className="text-gray-400">De aproveitamento</p>
              </div>

              <div className="performance-subjects mt-6 space-y-4">
                {performanceData[activeTab].subjects.map(subject => (
                  <SubjectCard key={subject.name} {...subject} />
                ))}
              </div>
            </div>

            {/* Study Hours Section */}
            <div className="study-hours-section flex-1 md:pl-6 pt-6 md:pt-0 border-t md:border-t-0 border-[#1D2F47]">
              <div className="study-hours-title flex flex-col gap-1 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#20344E] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <mask id="mask0_116_974" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_116_974)">
                        <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4Z" fill="white"/>
                      </g>
                    </svg>
                  </div>
                  <h3 className="text-white">Horas de videoaulas assistidas</h3>
                </div>
                <span className="text-gray-400 text-sm ml-12">{getWeekDateRange()}</span>
              </div>
              
              <div className="study-hours-chart w-full h-[200px] md:h-[335px]">
                <Bar 
                  data={studyHoursData}
                  options={chartOptions}
                />
              </div>

              <div className="daily-study-card flex justify-between mt-4 bg-[#1D2F47] p-4 items-center">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#4D5D71] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <mask id="mask0_116_987" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
                        <rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
                      </mask>
                      <g mask="url(#mask0_116_987)">
                        <path d="M6 22.5C5.45 22.5 4.97917 22.3042 4.5875 21.9125C4.19583 21.5208 4 21.05 4 20.5V4.5C4 3.95 4.19583 3.47917 4.5875 3.0875C4.97917 2.69583 5.45 2.5 6 2.5H18C18.55 2.5 19.0208 2.69583 19.4125 3.0875C19.8042 3.47917 20 3.95 20 4.5V20.5C20 21.05 19.8042 21.5208 19.4125 21.9125C19.0208 22.3042 18.55 22.5 18 22.5H6ZM11 4.5V10.625C11 10.825 11.0792 10.9708 11.2375 11.0625C11.3958 11.1542 11.5667 11.15 11.75 11.05L12.975 10.325C13.1417 10.225 13.3125 10.175 13.4875 10.175C13.6625 10.175 13.8333 10.225 14 10.325L15.225 11.05C15.4083 11.15 15.5833 11.1542 15.75 11.0625C15.9167 10.9708 16 10.825 16 10.625V4.5H11Z" fill="white"/>
                      </g>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-between">
                    <span className="text-white">Estudo diário</span>
                    <span className="text-gray-400 text-sm">Sugestão</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-white text-2xl font-bold">{suggestedDailyTime}</span>
                  <span className="text-gray-400 text-sm">
                  Total: {getTotalStudyHours(studyHoursData)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Insights Card */}
          <div className="insights-card p-4 md:p-6 rounded-2xl w-full border border-[#20344E] insights-gradient">
            <div className="insights-header flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="20" fill="#20344E"/>
                <path d="M21.8588 14.0692L21.8588 14.0692C22.6002 15.9109 24.0643 17.3682 25.9107 18.1054L25.9107 18.1054L30.5069 19.9404L25.9107 21.7753L25.9107 21.7753C24.0643 22.5126 22.6002 23.9699 21.8588 25.8115L21.8588 25.8115L20.0108 30.4025L18.1629 25.8115L18.1628 25.8115C17.4215 23.9699 15.9574 22.5126 14.1109 21.7753L14.1109 21.7753L9.51474 19.9404L14.1109 18.1054L14.1109 18.1054C15.9574 17.3682 17.4215 15.9109 18.1628 14.0692L18.1629 14.0692L20.0108 9.47822L21.8588 14.0692Z" fill="white" stroke="white"/>
                <path d="M11.7662 29.5147C11.4802 28.9761 11.0391 28.5354 10.5011 28.2492C11.0391 27.9629 11.4802 27.5223 11.7662 26.9837C12.0522 27.5223 12.4933 27.963 13.0314 28.2492C12.4933 28.5354 12.0522 28.9761 11.7662 29.5147Z" stroke="white"/>
                <path d="M28.2086 13.0385C27.9226 12.4999 27.4815 12.0593 26.9434 11.7731C27.4815 11.4868 27.9226 11.0462 28.2086 10.5076C28.4946 11.0462 28.9357 11.4868 29.4738 11.7731C28.9357 12.0593 28.4946 12.4999 28.2086 13.0385Z" stroke="white"/>
              </svg>
              <h3 className="text-white">Insights</h3>
            </div>

            <div className="insights-content text-white">
              <div className='insights-text h-[300px] md:h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>
                {isLoadingInsights ? (
                  <p>Gerando insights...</p>
                ) : (
                  <TypewriterText text={insightText} />
                )}
              </div>
            </div>
            <Button 
              className="mt-2"
              label="Gerar insights" 
              variant="primary"
              size="md"
              fullWidth={true}
              onClick={handleGenerateInsights}
              disabled={isLoadingInsights}
            />
          </div>
        </div>
      </div>
    </main>
  );
} 