
import React from 'react';
import { QuoteIcon, HandshakeIcon, HeartIcon, BookOpenIcon, UsersIcon } from './icons';

const values = [
  { name: '신뢰', description: '새터민 가족들이 믿고 의지할 수 있는\n투명하고 정직한 협회가 되겠습니다.', icon: <HeartIcon className="w-8 h-8 text-brand-secondary" /> },
  { name: '화합', description: '지역 주민과 새터민이 편견 없이\n소통하고 어우러지는 문화를 만듭니다.', icon: <HandshakeIcon className="w-8 h-8 text-brand-secondary" /> },
  { name: '자립', description: '경제적, 사회적 자립을 위한\n맞춤형 교육과 취업을 지원합니다.', icon: <BookOpenIcon className="w-8 h-8 text-brand-secondary" /> },
  { name: '봉사', description: '지역사회의 일원으로서 나눔을 실천하며\n함께 성장해 나가는 동반자가 됩니다.', icon: <UsersIcon className="w-8 h-8 text-brand-secondary" /> },
];

const ChairMessage: React.FC = () => (
  <div id="greeting" className="relative bg-white p-8 md:p-16 rounded-[3rem] shadow-[0_30px_100px_rgba(15,23,42,0.08)] border border-gray-100 overflow-hidden scroll-mt-32">
    {/* Decorative Watermark Quote */}
    <div className="absolute -top-10 -right-10 opacity-[0.03] select-none pointer-events-none">
      <QuoteIcon className="w-64 h-64 text-brand-primary" />
    </div>

    <div className="relative z-10">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
        {/* Left Side: Image & Title */}
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="relative group">
            <div className="absolute -inset-4 bg-brand-secondary/10 rounded-[2.5rem] blur-xl group-hover:bg-brand-secondary/20 transition-all duration-700"></div>
            <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl aspect-[3/4]">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                alt="이사장 사진" 
                className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/80 text-xs font-bold tracking-widest uppercase mb-1">Chairman of Board</p>
                <p className="text-white text-2xl font-black">남 기 영</p>
              </div>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="p-5 bg-brand-light rounded-2xl border border-brand-secondary/10">
              <p className="text-brand-secondary font-bold text-sm mb-1">문의 및 상담</p>
              <p className="text-brand-primary font-black text-xl">043-871-XXXX</p>
            </div>
          </div>
        </div>

        {/* Right Side: Letter Content */}
        <div className="flex-grow">
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 bg-brand-secondary/10 text-brand-secondary font-black text-xs rounded-full tracking-widest uppercase mb-4">CEO Message</span>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              함께 걷는 걸음이<br />
              <span className="text-brand-secondary">희망의 지도</span>가 됩니다
            </h2>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-gray-600 leading-[1.8] font-medium">
            <p>
              안녕하십니까.<br />
              충북음성새터민협회 홈페이지를 방문해주신 여러분,<br />
              진심으로 환영하며 감사의 인사를 올립니다.
            </p>

            <p>
              충북 음성은 이제 수많은 새터민 가족들에게<br />
              낯선 땅이 아닌, <span className="text-gray-900 font-bold underline decoration-brand-accent decoration-4 underline-offset-4">제2의 고향이자 삶의 터전</span>이 되었습니다.
            </p>

            <p>
              우리 협회는 새터민들이 지역사회의 든든한 구성원으로<br />
              당당히 자립할 수 있도록 주거, 교육, 일자리 등<br />
              실질적인 정착 인프라를 구축하는 데 매진하고 있습니다.
            </p>

            <p>
              마음의 벽을 허물고 서로를 이웃으로 받아들이는 그 짧은 순간이<br />
              진정한 통일의 시작이라고 믿습니다.<br />
              여러분의 따뜻한 관심이 우리 가족들에게는 큰 용기가 됩니다.
            </p>

            <p>
              음성군이 대한민국에서 가장 살기 좋은 화합의 장이 되도록<br />
              협회 임직원 모두가 진심을 다해 발로 뛰겠습니다.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-dashed border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-gray-400 font-bold text-sm mb-1 tracking-tighter">충청북도 음성군 새터민 정착의 든든한 동반자</p>
              <p className="text-gray-900 font-black text-2xl tracking-tight">충북음성새터민협회 임직원 일동</p>
            </div>
            <div className="flex items-center space-x-4">
               <div className="text-right">
                 <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Chairman Signature</p>
                 <p className="text-brand-primary font-black text-3xl font-serif italic">Nam Ki Young</p>
               </div>
               <div className="w-16 h-16 bg-brand-secondary/10 rounded-full flex items-center justify-center border-2 border-brand-secondary/20">
                  <HeartIcon className="w-8 h-8 text-brand-secondary" />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Values: React.FC = () => (
  <div id="vision" className="h-full flex flex-col justify-center py-10 scroll-mt-32">
    <div className="mb-16 text-center lg:text-left">
      <h3 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
        우리가 지켜나갈<br />
        <span className="text-brand-secondary">네 가지 약속</span>
      </h3>
      <div className="w-20 h-2 bg-brand-accent rounded-full mb-6 mx-auto lg:mx-0"></div>
      <p className="text-xl text-gray-500 font-medium">단단한 정착을 넘어, 행복한 상생을 꿈꿉니다.</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {values.map(value => (
        <div key={value.name} className="group bg-white p-10 rounded-[2.5rem] text-left shadow-[0_15px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(22,101,52,0.1)] transition-all duration-500 border border-transparent hover:border-brand-secondary/10 transform hover:-translate-y-2">
          <div className="mb-6 w-16 h-16 flex items-center justify-center bg-brand-light rounded-2xl group-hover:bg-brand-secondary group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
            {value.icon}
          </div>
          <h4 className="font-black text-gray-900 text-2xl mb-4">{value.name}</h4>
          <p className="text-gray-500 leading-relaxed font-semibold whitespace-pre-line">{value.description}</p>
        </div>
      ))}
    </div>
  </div>
);

const AboutSection: React.FC = () => {
  return (
    <section className="py-32 bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Decor Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-brand-secondary/5 to-transparent blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-accent/5 blur-[100px] rounded-full"></div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-24 items-stretch">
          <div className="animate-fade-in-up">
             <ChairMessage />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
             <Values />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
