
import React from 'react';

const webzineItems = [
    { 
        title: '충북음성새터민협회, 지역사회 상생 발전 유공 표창 수상', 
        publisher: '음성신문',
        date: '2024.08.12',
        excerpt: '음성군 북한이탈주민의 성공적인 정착을 돕고 지역 주민과의 화합에 기여한 공로를 인정받아...',
        img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800'
    },
    { 
        title: '"따뜻한 정 나눔" 음성 새터민 가족 설맞이 합동 차례', 
        publisher: '충청일보',
        date: '2024.02.10',
        excerpt: '남기영 이사장은 "고향에 가지 못하는 아픔을 지역 이웃들과 함께 나누며 이겨내고 있다"며...',
        img: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800'
    },
    { 
        title: '남과 북이 하나로, 음성군 ‘남북 음식 축제’ 성료', 
        publisher: '중부매일',
        date: '2023.11.21',
        excerpt: '이날 행사에는 300여 명의 주민이 참여해 평양냉면과 개성만두를 직접 빚으며 즐거운 시간을...',
        img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800'
    },
    { 
        title: '음성 새터민 정착 지원 위해 민관 협력 네트워크 구축', 
        publisher: '연합뉴스',
        date: '2024.05.30',
        excerpt: '음성군과 협회는 기업체 취업 연계 프로그램을 확대하여 실질적인 경제적 자립을 지원하기로...',
        img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800'
    },
];

const WebzinePage: React.FC = () => {
    return (
        <div className="animate-fade-in-up bg-white">
            <section className="bg-[#F1F5F9] py-24 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12 text-center">
                    <span className="text-brand-secondary font-black tracking-widest uppercase text-sm mb-4 block">Press & Media</span>
                    <h1 className="text-5xl md:text-7xl font-black text-brand-primary mb-6">언론 보도</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">다양한 매체를 통해 소개된 협회의 가슴 따뜻한 이야기입니다.</p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {webzineItems.map((item, idx) => (
                            <div key={idx} className="group flex flex-col md:flex-row gap-8 items-center cursor-pointer">
                                <div className="w-full md:w-2/5 aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                </div>
                                <div className="w-full md:w-3/5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-brand-secondary font-black text-sm uppercase">{item.publisher}</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-gray-400 font-bold text-sm">{item.date}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-brand-secondary transition-colors leading-tight">{item.title}</h3>
                                    <p className="text-gray-500 font-medium line-clamp-2 leading-relaxed">{item.excerpt}</p>
                                    <div className="mt-6 flex items-center text-gray-900 font-black text-sm group-hover:translate-x-2 transition-transform">
                                        기사 원문 읽기 <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WebzinePage;
