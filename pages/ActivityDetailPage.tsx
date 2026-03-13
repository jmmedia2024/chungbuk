
import React from 'react';
import { Page } from '../App';
import { ArrowRightIcon, HeartIcon, UsersIcon, BookOpenIcon, HandshakeIcon } from '../components/icons';

interface ActivityDetail {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    goals: string[];
    programs: { name: string; desc: string }[];
    effect: string;
}

const activityData: Record<string, ActivityDetail> = {
    support: {
        title: '정착지원 사업',
        subtitle: '음성군에서 시작하는 안정적인 제2의 인생',
        description: '음성군에 신규 전입한 새터민들이 초기 환경에 빠르게 적응할 수 있도록 종합적인 맞춤형 서비스를 제공합니다. 특히 주거지 마련 및 가전제품 지원 등 초기 생활 인프라 구축에 집중합니다.',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop',
        goals: ['음성군 내 주거지 조기 정착', '초기 생활 가전 및 물품 지원', '지자체 복지 서비스 연계'],
        programs: [
            { name: '초기 전입 가구 멘토링', desc: '음성군에 먼저 정착한 선배 새터민이 1:1로 지역 생활 팁을 공유합니다.' },
            { name: '생활 밀착형 행정지원', desc: '주민등록, 의료보험 등 복잡한 행정 절차를 전문가가 동행하여 처리합니다.' },
            { name: '정착 희망 키트 배분', desc: '쌀, 생필품, 소형 가전 등 초기 생활에 꼭 필요한 물품 꾸러미를 전달합니다.' }
        ],
        effect: '초기 정착 과정의 심리적 불안 해소 및 경제적 부담 경감'
    },
    volunteer: {
        title: '지역사회 봉사',
        subtitle: '수혜자에서 기여자로서의 가치 실현',
        description: '우리 새터민들이 지역사회의 도움을 받는 존재를 넘어, 음성군을 위해 봉사하는 당당한 일원으로 거듭나도록 돕습니다. 김장 나눔, 환경 정화 등 다양한 활동을 전개합니다.',
        image: 'https://images.unsplash.com/photo-1559027615-cd26714e93af?q=80&w=2072&auto=format&fit=crop',
        goals: ['지역사회 공헌 의지 함양', '지역 주민과의 유대감 강화', '새터민에 대한 긍정적 인식 확산'],
        programs: [
            { name: '사랑의 김장 나눔 행사', desc: '매년 겨울 직접 담근 김치를 지역 내 취약 계층에게 직접 배달합니다.' },
            { name: '음성천 환경 정화 활동', desc: '분기별로 지역 하천과 공원을 청소하며 깨끗한 음성 만들기에 앞장섭니다.' },
            { name: '재능기부 봉사단 운영', desc: '새터민이 가진 특기를 살려 경로당 방문 및 문화 재능기부를 실천합니다.' }
        ],
        effect: '사회 통합의 실질적 모델 제시 및 지역 내 화합 분위기 조성'
    },
    education: {
        title: '문화 체험 행사',
        subtitle: '함께 즐기며 알아가는 이웃의 문화',
        description: '남북한 문화의 차이를 좁히고 함께 어우러지는 다채로운 문화 체험을 진행합니다. 특히 명절마다 진행하는 합동 차례는 고향에 대한 그리움을 달래고 이웃 정을 나누는 소중한 시간입니다.',
        image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2070&auto=format&fit=crop',
        goals: ['남북 문화 이질감 해소', '전통 풍습 계승 및 소통', '심리 정서적 지지망 형성'],
        programs: [
            { name: '설·추석 명절 합동 차례', desc: '고향에 가지 못하는 아픔을 달래며 함께 차례를 지내고 음식을 나눕니다.' },
            { name: '음성군 문화 탐방', desc: '음성군의 주요 명소와 역사지를 돌아보며 제2의 고향에 대한 애착을 키웁니다.' },
            { name: '남북 음식 문화 축제', desc: '남한 음식과 북한 음식을 함께 만들며 맛으로 소통하는 축제를 개최합니다.' }
        ],
        effect: '정서적 고립 방지 및 공동체 의식 강화'
    },
    counseling: {
        title: '상담 및 권익보호',
        subtitle: '말 못 할 고민을 함께 나누는 따뜻한 쉼터',
        description: '새터민들이 겪는 심리적 갈등, 법률적 무지, 취업의 어려움 등을 전문 상담사와 함께 고민하고 해결합니다. 편견으로 인한 차별로부터 여러분의 권익을 보호합니다.',
        image: 'https://images.unsplash.com/photo-1573497620053-ea5310f94a17?q=80&w=2070&auto=format&fit=crop',
        goals: ['심리적 트라우마 회복', '법률 지식 부족에 따른 피해 방지', '부당 처우 대응 및 권익 증진'],
        programs: [
            { name: '전문 심리 상담소 운영', desc: '정착 과정에서 겪는 우울감이나 외상 후 스트레스를 전문의와 상담합니다.' },
            { name: '법률 및 노무 자문 연계', desc: '임금 체불이나 계약 문제 등 법적 보호가 필요할 때 전문가를 연결합니다.' },
            { name: '취업 역량 강화 교육', desc: '이력서 작성법, 모의 면접 등을 통해 지역 내 일자리 매칭을 돕습니다.' }
        ],
        effect: '자존감 회복 및 사회적 안전망 강화'
    },
    unification: {
        title: '통일 안보 교육',
        subtitle: '미래 세대와 소통하는 평화의 메시지',
        description: '새터민들이 직접 강사가 되어 생생한 경험을 바탕으로 통일의 필요성과 안보의 중요성을 지역 학생 및 주민들에게 전달합니다. 올바른 안보관 확립에 기여합니다.',
        image: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=2054&auto=format&fit=crop',
        goals: ['생생한 통일 교육 현장 구현', '지역사회 안보 의식 고취', '통일 시대를 대비한 소통 능력 강화'],
        programs: [
            { name: '찾아가는 안보 강연', desc: '음성군 내 학교와 관공서를 방문하여 북한 실상과 통일의 가치를 교육합니다.' },
            { name: '통일 한마음 웅변대회', desc: '청소년들이 참여하여 평화와 통일에 대한 생각을 발표하는 장을 마련합니다.' },
            { name: '안보 현장 견학 지원', desc: 'DMZ 등 주요 안보 현장을 방문하여 역사 의식을 고취하는 연수를 진행합니다.' }
        ],
        effect: '새터민에 대한 편견 해소 및 평화 통일 공감대 형성'
    }
};

interface ActivityDetailPageProps {
    id: string | null;
    navigateTo: (page: Page, id?: string) => void;
}

const ActivityDetailPage: React.FC<ActivityDetailPageProps> = ({ id, navigateTo }) => {
    const data = id ? activityData[id] : null;

    if (!data) {
        return (
            <div className="py-64 text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-6">해당 정보를 찾을 수 없습니다.</h2>
                <button 
                    onClick={() => navigateTo('activities')}
                    className="bg-brand-secondary text-white font-bold px-10 py-4 rounded-full shadow-xl hover:bg-green-700 transition-all"
                >
                    활동 목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up">
            {/* Hero Section */}
            <section className="relative h-[600px] overflow-hidden">
                <img src={data.image} alt={data.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/40 to-transparent flex items-center justify-center">
                    <div className="container mx-auto px-6 text-center">
                        <span className="inline-block bg-brand-accent text-brand-primary font-black px-4 py-1.5 rounded-full mb-6 tracking-widest text-sm uppercase">Activity Detail</span>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">{data.title}</h1>
                        <p className="text-xl md:text-2xl text-gray-200 font-medium max-w-3xl mx-auto opacity-90">{data.subtitle}</p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-12 gap-20">
                            {/* Left Col: Info */}
                            <div className="lg:col-span-7">
                                <h2 className="text-4xl font-black text-gray-900 mb-8 pb-4 border-b-4 border-brand-secondary/20 inline-block">사업 개요</h2>
                                <p className="text-xl text-gray-600 leading-relaxed mb-12 font-medium">
                                    {data.description}
                                </p>

                                <div className="space-y-12">
                                    <div className="bg-brand-light p-10 rounded-3xl border border-brand-secondary/10">
                                        <h3 className="text-2xl font-black text-brand-secondary mb-6 flex items-center">
                                            <HeartIcon className="w-8 h-8 mr-3" />
                                            주요 목표
                                        </h3>
                                        <ul className="grid sm:grid-cols-2 gap-4">
                                            {data.goals.map((goal, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <div className="w-2.5 h-2.5 bg-brand-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                    <span className="text-gray-700 font-bold text-lg">{goal}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-3xl font-black text-gray-900 mb-8">주요 프로그램</h3>
                                        <div className="grid gap-6">
                                            {data.programs.map((prog, idx) => (
                                                <div key={idx} className="group p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-brand-secondary hover:bg-white hover:shadow-2xl transition-all duration-500">
                                                    <h4 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-brand-secondary transition-colors">{prog.name}</h4>
                                                    <p className="text-lg text-gray-500 font-medium leading-relaxed">{prog.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Col: Sticky Sidebar */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-32 space-y-8">
                                    <div className="bg-brand-primary p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/20 blur-[50px] rounded-full"></div>
                                        <h3 className="text-2xl font-black mb-6 relative z-10">기대 효과</h3>
                                        <div className="text-2xl font-bold italic leading-relaxed text-brand-accent relative z-10">
                                            "{data.effect}"
                                        </div>
                                        <p className="mt-8 text-gray-400 font-medium leading-relaxed">
                                          본 사업을 통해 충북 음성군 내 북한이탈주민들이 안정적인 정착은 물론, 지역사회의 당당한 일원으로 거듭나고 있습니다.
                                        </p>
                                    </div>

                                    <div className="p-8 border-2 border-gray-100 rounded-[2.5rem] bg-white">
                                        <h4 className="text-xl font-black text-gray-900 mb-4">참여 및 안내</h4>
                                        <p className="text-gray-500 mb-8 font-medium">사업 참여를 원하시거나 관련 문의가 있으신 분은 언제든지 연락 바랍니다.</p>
                                        <button 
                                            onClick={() => navigateTo('contact')}
                                            className="w-full bg-brand-secondary text-white font-black py-5 rounded-2xl hover:bg-green-700 shadow-xl transition-all mb-4"
                                        >
                                            상담 문의하기
                                        </button>
                                        <button 
                                            onClick={() => navigateTo('activities')}
                                            className="w-full bg-white border-2 border-gray-200 text-gray-400 font-black py-5 rounded-2xl hover:bg-gray-50 transition-all"
                                        >
                                            전체 활동 목록
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ActivityDetailPage;
