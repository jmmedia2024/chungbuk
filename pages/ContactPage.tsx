
import React from 'react';

const PageBanner: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-brand-primary py-32 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-brand-secondary/20 to-transparent"></div>
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">{title}</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium">{subtitle}</p>
        </div>
    </div>
);

const ContactInfo: React.FC = () => (
    <section className="py-32 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-20">
                <div className="animate-fade-in-up">
                    <h2 className="text-4xl font-black text-gray-900 mb-10 pb-4 border-b-4 border-brand-secondary/20 inline-block">찾아오시는 길</h2>
                     <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 border-8 border-gray-50">
                        {/* Google Maps Iframe - 음성군청 인근 중심지 설정 */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.914282713809!2d127.6841797764952!3d36.93123895995254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356396b797f3747f%3A0x6b447814b7e80f2d!2z7J2M7ISx6rWw7LKt!5e0!3m2!1sko!2skr!4v1708587373307!5m2!1sko!2skr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            title="Location Map"
                        ></iframe>
                    </div>
                    <div className="bg-brand-light p-10 rounded-[2.5rem]">
                        <h4 className="text-2xl font-black text-gray-900 mb-6">교통 안내</h4>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-brand-secondary p-3 rounded-xl mr-5 mt-1">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                                </div>
                                <div>
                                    <h5 className="font-black text-gray-900 text-lg">버스 이용 시</h5>
                                    <p className="text-gray-600 font-medium">음성공용버스터미널 하차 후 음성군청 방향 도보 10분</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-brand-secondary p-3 rounded-xl mr-5 mt-1">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                                </div>
                                <div>
                                    <h5 className="font-black text-gray-900 text-lg">자차 이용 시</h5>
                                    <p className="text-gray-600 font-medium">충북 음성군 음성읍 군청길 38 (네비게이션 '음성군청' 검색 후 인근 주차장 이용)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                     <h3 className="text-4xl font-black text-gray-800 mb-10">연락처 및 상담 안내</h3>
                     <div className="grid gap-8">
                        <div className="p-10 bg-white border-2 border-gray-100 rounded-[2.5rem] shadow-xl">
                            <h4 className="text-2xl font-black text-brand-secondary mb-8">사무국 정보</h4>
                            <div className="space-y-6 text-xl">
                                <div className="flex items-center">
                                    <span className="w-32 text-gray-400 font-bold shrink-0">주소</span>
                                    <span className="text-gray-800 font-bold">(27634) 충청북도 음성군 음성읍 군청길 38 일원</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-32 text-gray-400 font-bold shrink-0">전화</span>
                                    <span className="text-gray-800 font-bold text-3xl">043-871-XXXX</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-32 text-gray-400 font-bold shrink-0">이메일</span>
                                    <span className="text-gray-800 font-bold">eumseong_seter@korea.kr</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="w-32 text-gray-400 font-bold shrink-0">운영시간</span>
                                    <span className="text-gray-800 font-bold">평일 09:00 - 18:00</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-10 bg-brand-primary rounded-[2.5rem] text-white">
                            <h4 className="text-2xl font-black mb-6">긴급 정착 상담</h4>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                야간이나 주말, 긴급한 정착 도움이 필요하신 새터민 가족분들은 아래 핫라인으로 연락 주시기 바랍니다.
                            </p>
                            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 flex items-center justify-between">
                                <span className="font-bold text-xl">24시 정착 핫라인</span>
                                <span className="text-brand-accent text-3xl font-black tracking-tighter">010-XXXX-XXXX</span>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </section>
);


const ContactPage: React.FC = () => {
    return (
        <>
            <PageBanner title="오시는 길 & 문의" subtitle="충북음성새터민협회는 여러분의 목소리에 언제나 귀 기울이고 있습니다." />
            <ContactInfo />
        </>
    );
};

export default ContactPage;
