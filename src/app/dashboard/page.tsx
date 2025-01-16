'use client'
import React, { useState } from 'react';
import Button from '../components/Button';
import Header from '../components/Header';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);


type StudyDataset = {
  data: number[];
  backgroundColor: (context: { raw: number }) => string;
  borderRadius: number;
  borderSkipped: false;
  barThickness: number;
  categoryPercentage: number;
  barPercentage: number;
}

// Add type definitions
interface TabOption {
  id: string;
  label: string;
}

interface SubjectProgress {
  name: string;
  progress: number;
}

const TRIMESTER_TABS: TabOption[] = [
  { id: '1', label: '1º Trimestre' },
  { id: '2', label: '2º Trimestre' },
  { id: '3', label: '3º Trimestre' },
  { id: '4', label: '4º Trimestre' }
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
      legend: { display: false }
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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(TRIMESTER_TABS[0].id);


  const studyData: {
    labels: string[];
    datasets: StudyDataset[];
  } = {
    labels: ['Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.', 'Dom.'],
    datasets: [{
      data: [25, 120, 90, 30, 90, 120, 120],
      backgroundColor: (context: { raw: number }) => context.raw >= 120 ? '#C1DB25' : '#4D5D71',
      borderRadius: 4,
      borderSkipped: false,
      barThickness: 32,
      categoryPercentage: 1,
      barPercentage: 0.9,
    }]
  };

  return (
    <main className="dashboard-container min-h-screen bg-[#0D1621] p-8">
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
        <div className="dashboard-header flex justify-between items-center mb-8">
          <div>
            <h1 className="text-white text-base font-medium mb-2">
              Bem-vindo(a) ao seu dashboard inteligente do curso
            </h1>
            <h2 className="text-white text-2xl font-bold">
              Gestão Comercial: Negócios Digitais
            </h2>
          </div>
          <Button 
            label="EDITAR PLANEJAMENTO" 
            variant="secondary"
            size="md"
          />
        </div>

        <div className="dashboard-grid grid grid-cols-3 gap-6 w-full">
          <div className="performance-study-card bg-[#172537] p-6 rounded-lg col-span-2 flex w-full">
            {/* Performance Section */}
            <div className="performance-section flex-1 pr-6 border-r border-[#1D2F47]">
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
              
              <div className="trimester-tabs flex gap-4 mb-4">
                {TRIMESTER_TABS.map((tab, i) => (
                  <button
                    key={i}
                    className={`text-sm ${activeTab === tab.id ? 'text-[#0095D6] border-b-2 border-[#0095D6]' : 'text-gray-400 border-b-2 border-gray-400'}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="performance-chart flex justify-center -mt-6">
                <div className="w-80 h-80">
                  <Doughnut
                    data={doughnutChartConfig.data}
                    options={doughnutChartConfig.options}
                  />
                </div>
              </div>
              <div className="performance-stats text-center -mt-36 ">
                <span className="text-6xl text-white font-bold">69<span className="text-xl">%</span></span>
                <p className="text-gray-400">De aproveitamento</p>
              </div>

              <div className="performance-subjects mt-6 space-y-4">
                {SUBJECTS.map(subject => (
                  <SubjectCard key={subject.name} {...subject} />
                ))}
              </div>
            </div>

            {/* Study Hours Section */}
            <div className="study-hours-section flex-1 pl-6">
              <div className="study-hours-title flex items-center gap-2 mb-4">
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
              
              <div className="study-hours-chart w-full h-[250px]">
                <Bar 
                  data={studyData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      y: {
                        grid: {
                          color: 'rgba(193, 219, 37, 0.4)',
                          drawTicks: false,
                          lineWidth: 0.3,
                          borderDash: [2, 2]
                        },
                        ticks: { 
                          display: false,
                        },
                        border: {
                          display: false
                        },
                        min: 0,
                        max: 150,
                      },
                      x: {
                        grid: { 
                          display: false,
                        },
                        ticks: { 
                          color: '#fff',
                          padding: 10,
                          font: {
                            size: 12
                          }
                        },
                        border: {
                          display: false
                        }
                      }
                    },
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            const value = context.raw as number;
                            if (value >= 60) {
                              return `${value/60}h`;
                            }
                            return `${value}min`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>

              <div className="study-hours-legend flex gap-6 text-sm mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C1DB25]"></div>
                  <span className="text-white">Meta de estudo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4D5D71]"></div>
                  <span className="text-white">Média semanal</span>
                </div>
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
                <span className="text-white text-2xl font-bold">2h</span>
              </div>
            </div>
          </div>

          {/* Insights Card */}
          <div className="insights-card p-6 rounded-2xl w-full border border-[#20344E] insights-gradient" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='173' height='173' viewBox='0 0 173 173' fill='none'%3E%3Cg opacity='0.05'%3E%3Cpath d='M41.3319 65.4465L41.749 66.4913C53.2213 61.9107 62.3098 52.8602 66.9102 41.4321L65.8666 41.0119L66.9102 41.432L81.5511 5.05913C81.5511 5.05908 81.5511 5.05902 81.5511 5.05896C83.3682 0.547184 89.7871 0.54724 91.6041 5.05913L106.245 41.432C110.845 52.8602 119.934 61.9107 131.406 66.4913L131.807 65.4882L131.406 66.4913L167.928 81.0723C172.459 82.8818 172.459 89.2637 167.928 91.0733C167.928 91.0733 167.928 91.0734 167.928 91.0734L131.406 105.654C119.934 110.235 110.845 119.285 106.245 130.714L91.6041 167.087C89.7871 171.598 83.3682 171.599 81.5511 167.087C81.5511 167.087 81.5511 167.087 81.5511 167.087L66.9102 130.714L65.8666 131.134L66.9102 130.714C62.3098 119.285 53.2213 110.235 41.749 105.654L5.22688 91.0734C5.22683 91.0734 5.22677 91.0733 5.22671 91.0733C0.696509 89.2637 0.696564 82.8818 5.22688 81.0723L41.749 66.4913L41.3319 65.4465Z' fill='white' stroke='white' /%3E%3Cpath d='M29.4304 120.006L34.0321 131.431C35.4424 134.927 38.2266 137.7 41.7378 139.105L53.2092 143.688C54.9321 144.375 54.9321 146.801 53.2092 147.481L41.7378 152.064C38.2266 153.469 35.4424 156.242 34.0321 159.738L29.4304 171.163C28.7398 172.879 26.3045 172.879 25.6212 171.163L21.0196 159.738C19.6093 156.242 16.825 153.469 13.3138 152.064L1.84246 147.481C0.119571 146.794 0.119571 144.368 1.84246 143.688L13.3138 139.105C16.825 137.7 19.6093 134.927 21.0196 131.431L25.6212 120.006C26.3118 118.29 28.7471 118.29 29.4304 120.006Z' fill='white'/%3E%3Cpath d='M147.199 1.99639L151.8 13.4209C153.21 16.9177 155.995 19.6906 159.506 21.0951L170.977 25.678C172.7 26.3658 172.7 28.7911 170.977 29.4717L159.506 34.0545C155.995 35.459 153.21 38.2319 151.8 41.7287L147.199 53.1532C146.508 54.8691 144.073 54.8691 143.389 53.1532L138.788 41.7287C137.377 38.2319 134.593 35.459 131.082 34.0545L119.611 29.4717C117.888 28.7839 117.888 26.3585 119.611 25.678L131.082 21.0951C134.593 19.6906 137.377 16.9177 138.788 13.4209L143.389 1.99639C144.08 0.280541 146.515 0.280541 147.199 1.99639Z' fill='white'/%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'center',
                 backgroundSize: '173px'
               }}>
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
              <div className='insights-text h-[400px]'>
                <p className="mb-4">
                Olá, Cecília. Identifiquei alguns pontos de melhorias no seu cronograma de estudos baseados no seu desempenho até aqui
                </p>
              </div>
            </div>
            <Button 
            label="Gerar insights" 
            variant="primary"
            size="md"
            fullWidth={true}
          />
          </div>
        </div>
      </div>
    </main>
  );
} 