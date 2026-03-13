
import React from 'react';
import { ArrowRightIcon } from './icons';

const newsItems = [
  { title: '[결과보고] 2024년 청년 자립역량 강화 워크숍 성공적으로 마무리', date: '2024-08-05', excerpt: '지난 3일간 진행된 워크숍에 50여 명의 청년이 참여하여...', img: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=200&auto=format&fit=crop' },
  { title: '[현장스케치] 제8회 지역상생 나눔 바자회, 500여 명의 주민 참여', date: '2024-08-02', excerpt: '따스한 햇살 아래, 주민들과 함께한 나눔의 장이 열렸습니다.', img: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=200&auto=format&fit=crop' },
  { title: '[지원안내] 하반기 무료 법률 상담 확대 운영…매주 수요일 진행', date: '2024-07-28', excerpt: '경제적 어려움으로 법률 자문을 받기 힘든 분들을 위해...', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop' },
  { title: '[모집] 다문화가정 자녀를 위한 \'글로벌 리더십 캠프\' 참가자 모집', date: '2024-07-25', excerpt: '미래의 주역이 될 우리 아이들의 꿈을 지원합니다.', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=200&auto=format&fit=crop' },
];

const NewsAndNotice: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 소식 */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">소식</h2>
              <a href="#" className="text-brand-secondary font-medium hover:text-brand-primary flex items-center group">
                <span>더보기</span>
                <ArrowRightIcon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            <div className="space-y-4">
              {newsItems.map((item, index) => (
                <a href="#" key={index} className="group flex items-start p-4 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:border-brand-primary border-2 border-transparent">
                  <img src={item.img} alt={item.title} className="w-20 h-20 rounded-lg object-cover mr-5 flex-shrink-0" />
                  <div className="flex-grow overflow-hidden">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-brand-primary">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.excerpt}</p>
                    <p className="text-xs text-gray-400 mt-2">{item.date}</p>
                  </div>
                  <ArrowRightIcon className="w-6 h-6 text-gray-300 ml-4 flex-shrink-0 transition-transform transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-300" />
                </a>
              ))}
            </div>
          </div>
          
          {/* 공지 */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">공지</h2>
              <div className="bg-white p-8 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-500 to-pink-500"></div>
                <div className="flex items-center mb-4">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-[0_2px_10px_rgba(239,68,68,0.3)] border border-red-400/50">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                    중요 공지
                  </span>
                </div>
                <h3 className="font-black text-xl mb-3 text-gray-900 group-hover:text-brand-secondary transition-colors leading-snug">2024년 하반기 후원금 사용내역 보고 및 감사 행사 안내</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-3">여러분의 소중한 후원금이 어떻게 사용되었는지 투명하게 보고드리는 행사를 개최합니다. 많은 참여 부탁드립니다. 자세한 내용은 공지 게시판을 확인해주세요.</p>
              </div>
            </div>
            <div>
              <a href="#" className="group block bg-gradient-to-tr from-brand-secondary to-blue-400 text-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-2">자료실 바로가기</h3>
                <p className="opacity-90">연간 보고서, 재무 투명성 자료, 프로그램 신청 서식을 다운로드 받을 수 있습니다.</p>
                 <ArrowRightIcon className="w-8 h-8 mt-4 transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsAndNotice;
