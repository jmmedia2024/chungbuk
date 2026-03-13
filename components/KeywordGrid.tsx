
import React from 'react';
import { HandshakeIcon, BookOpenIcon, HeartIcon, ChatBubbleLeftRightIcon, UsersIcon } from './icons';
import { Page } from '../App';

interface KeywordGridProps {
  navigateTo: (page: Page, id?: string) => void;
}

export const keywords = [
  { id: 'support', name: '정착지원', description: '안정적인 사회 정착을 위한 주거, 일자리, 생활 지원', icon: <HandshakeIcon className="h-14 w-14 mb-5 text-brand-primary" />, color: 'blue' },
  { id: 'collaboration', name: '지역협력', description: '지자체, 기업, 단체와 협력하여 복지 네트워크 구축', icon: <HandshakeIcon className="h-14 w-14 mb-5 text-emerald-600" />, color: 'emerald' },
  { id: 'education', name: '교육·문화', description: '아동, 청소년, 성인 대상 맞춤형 교육 및 문화 프로그램', icon: <BookOpenIcon className="h-14 w-14 mb-5 text-indigo-600" />, color: 'indigo' },
  { id: 'volunteer', name: '나눔·봉사', description: '자원봉사자들과 함께 따뜻한 나눔을 실천하는 활동', icon: <HeartIcon className="h-14 w-14 mb-5 text-rose-600" />, color: 'rose' },
  { id: 'unification', name: '통일공감', description: '평화 통일에 대한 긍정적 인식을 확산하는 캠페인', icon: <HandshakeIcon className="h-14 w-14 mb-5 text-amber-600" />, color: 'amber' },
  { id: 'counseling', name: '상담·연계', description: '심리, 법률, 의료 등 전문 상담 및 기관 연계 서비스', icon: <ChatBubbleLeftRightIcon className="h-14 w-14 mb-5 text-cyan-600" />, color: 'cyan' },
  { id: 'youth', name: '청년·가족', description: '청년의 자립과 건강한 가족 관계 형성을 위한 지원', icon: <UsersIcon className="h-14 w-14 mb-5 text-pink-600" />, color: 'pink' },
  { id: 'legal', name: '법률·행정 안내', description: '일상 속 어려움을 해결하기 위한 법률 및 행정 정보 제공', icon: <BookOpenIcon className="h-14 w-14 mb-5 text-slate-600" />, color: 'slate' },
];

const KeywordGrid: React.FC<KeywordGridProps> = ({ navigateTo }) => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">주요 사업 영역</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">우리의 핵심적인 활동 분야는 공동체의 모든 구성원들을 위한 든든한 기반이 됩니다.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {keywords.map((keyword, index) => (
            <div 
              key={index} 
              onClick={() => navigateTo('activity-detail', keyword.id)}
              className={`group relative bg-white border border-gray-100 rounded-3xl shadow-lg p-10 text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden flex flex-col items-center justify-start`}
            >
              <div className={`absolute top-0 left-0 h-2 w-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100`}></div>
              {keyword.icon}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{keyword.name}</h3>
              <p className="text-base text-gray-500 opacity-90 leading-relaxed min-h-[48px]">{keyword.description}</p>
              <div className="mt-6 text-brand-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-all flex items-center">
                <span>자세히 보기</span>
                <span className="ml-1 tracking-widest">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeywordGrid;
