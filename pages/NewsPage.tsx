
import React from 'react';
import { ArrowRightIcon } from '../components/icons';

const PageBanner: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-brand-light py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-brand-primary">{title}</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const newsItems = [
  { title: '[결과보고] 2024년 청년 자립역량 강화 워크숍 성공적으로 마무리', date: '2024-08-05', excerpt: '지난 3일간 진행된 워크숍에 50여 명의 청년이 참여하여...', img: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?q=80&w=200&auto=format&fit=crop' },
  { title: '[현장스케치] 제8회 지역상생 나눔 바자회, 500여 명의 주민 참여', date: '2024-08-02', excerpt: '따스한 햇살 아래, 주민들과 함께한 나눔의 장이 열렸습니다.', img: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=200&auto=format&fit=crop' },
  { title: '[지원안내] 하반기 무료 법률 상담 확대 운영…매주 수요일 진행', date: '2024-07-28', excerpt: '경제적 어려움으로 법률 자문을 받기 힘든 분들을 위해...', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=200&auto=format&fit=crop' },
  { title: '[모집] 다문화가정 자녀를 위한 \'글로벌 리더십 캠프\' 참가자 모집', date: '2024-07-25', excerpt: '미래의 주역이 될 우리 아이들의 꿈을 지원합니다.', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=200&auto=format&fit=crop' },
  { title: '[재정보고] 2024년 2분기 후원금 사용내역 투명하게 공개합니다', date: '2024-07-22', excerpt: '여러분의 소중한 후원금이 어떻게 사용되었는지 확인하세요.', img: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=200&auto=format&fit=crop' },
  { title: '[공지] 협회 창립 10주년 기념 후원 감사의 밤 행사 개최', date: '2024-07-21', excerpt: '협회의 10년을 함께 축하하고 미래를 그리는 자리에 여러분을 초대합니다.', img: 'https://images.unsplash.com/photo-1600880292203-942bb68b2432?q=80&w=200&auto=format&fit=crop' },
];

const Pagination: React.FC = () => (
    <nav className="flex justify-center items-center space-x-2 mt-12">
        <a href="#" className="px-4 py-2 text-gray-500 bg-white rounded-md hover:bg-blue-50">이전</a>
        <a href="#" className="px-4 py-2 text-white bg-brand-primary rounded-md">1</a>
        <a href="#" className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-50">2</a>
        <a href="#" className="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-blue-50">3</a>
        <a href="#" className="px-4 py-2 text-gray-500 bg-white rounded-md hover:bg-blue-50">다음</a>
    </nav>
);

const NewsPage: React.FC = () => {
    return (
        <>
            <PageBanner title="소식" subtitle="나눔과 비전의 다양한 활동과 따뜻한 이야기들을 전해드립니다." />
            <section className="py-20 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-6">
                        {newsItems.map((item, index) => (
                            <a href="#" key={index} className="group flex flex-col sm:flex-row items-start p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:border-brand-primary border-2 border-transparent">
                                <img src={item.img} alt={item.title} className="w-full sm:w-48 h-48 sm:h-32 rounded-lg object-cover mr-6 mb-4 sm:mb-0 flex-shrink-0" />
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-brand-primary">{item.title}</h3>
                                    <p className="text-gray-600 mt-2">{item.excerpt}</p>
                                    <p className="text-sm text-gray-400 mt-3">{item.date}</p>
                                </div>
                                <ArrowRightIcon className="w-6 h-6 text-gray-300 ml-4 hidden sm:block flex-shrink-0 transition-transform transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 duration-300" />
                            </a>
                        ))}
                    </div>
                    <Pagination />
                </div>
            </section>
        </>
    );
};

export default NewsPage;
