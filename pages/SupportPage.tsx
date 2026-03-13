
import React, { useState, useEffect } from 'react';
import DonateCTA from '../components/DonateCTA';
import { BuildingLibraryIcon } from '../components/icons';
import { supabase } from '../supabase';

const PageBanner: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-brand-light py-20 sm:py-28">
        <div className="container mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-5xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6">{title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">{subtitle}</p>
        </div>
    </div>
);

// 예시 데이터: 실제 운영 시 관리자 페이지나 Notices 테이블과 연동 가능
const financialReports = [
    { year: '2023', collection: '52,000,000원', usage: '52,000,000원', link: '#' },
    { year: '2022', collection: '48,500,000원', usage: '48,100,000원', link: '#' },
    { year: '2021', collection: '35,000,000원', usage: '35,000,000원', link: '#' },
];

const SupportPage: React.FC = () => {
    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccounts = async () => {
            const { data } = await supabase.from('bank_accounts').select('*').order('sort_order', { ascending: true });
            if (data) setAccounts(data);
            setLoading(false);
        };
        fetchAccounts();
    }, []);

    return (
        <div className="animate-fade-in-up">
            <PageBanner title="후원·참여" subtitle="여러분의 소중한 나눔이 모여 우리 사회에 따뜻한 비전이 됩니다." />
            
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl mx-auto mb-20 text-center">
                        <h2 className="text-4xl font-black text-gray-900 mb-8">후원계좌 안내</h2>
                        <div className="w-20 h-2 bg-brand-secondary rounded-full mx-auto mb-10"></div>
                        <p className="text-xl text-gray-500 font-medium">따뜻한 마음을 나누어 주시는 모든 분들께 깊은 감사를 드립니다.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {loading ? (
                            <div className="col-span-full py-20 text-center"><div className="w-10 h-10 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin mx-auto"></div></div>
                        ) : accounts.length > 0 ? (
                            accounts.map(acc => (
                                <div key={acc.id} className="bg-gray-50 border border-gray-100 p-10 rounded-[2.5rem] flex items-start group hover:bg-white hover:shadow-2xl hover:border-brand-secondary/20 transition-all duration-500">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mr-8 shadow-sm group-hover:bg-brand-secondary transition-all">
                                        <BuildingLibraryIcon className="w-8 h-8 text-brand-secondary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{acc.bank_name}</p>
                                        <p className="text-2xl font-black text-gray-900 mb-2 tracking-tighter">{acc.account_number}</p>
                                        <p className="text-sm font-bold text-brand-secondary">예금주: {acc.account_holder}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200 text-center text-gray-400 font-black">
                                후원 계좌 정보를 준비 중입니다.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 기부금 모금액 및 활용실적 공개 게시판 */}
            <section className="py-24 bg-white border-t border-gray-100">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-brand-secondary font-black tracking-widest uppercase text-sm mb-4 block">Financial Transparency</span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">연간 기부금 모금액 및 활용실적</h2>
                            <p className="text-lg text-gray-500 font-medium">충북음성새터민협회는 여러분의 후원금을 투명하고 정직하게 사용하며,<br className="hidden md:block"/> 매년 결산 내역을 국세청 및 홈페이지를 통해 공시하고 있습니다.</p>
                        </div>

                        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left min-w-[600px]">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-8 py-6 font-black text-gray-500 text-sm uppercase tracking-widest text-center">귀속연도</th>
                                            <th className="px-8 py-6 font-black text-gray-900 text-sm uppercase tracking-widest text-right">기부금 모금액</th>
                                            <th className="px-8 py-6 font-black text-gray-900 text-sm uppercase tracking-widest text-right">기부금 활용실적</th>
                                            <th className="px-8 py-6 font-black text-gray-500 text-sm uppercase tracking-widest text-center">상세보기</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {financialReports.map((report, idx) => (
                                            <tr key={idx} className="hover:bg-brand-secondary/5 transition-colors group">
                                                <td className="px-8 py-6 text-center font-black text-lg text-brand-primary">{report.year}년</td>
                                                <td className="px-8 py-6 text-right font-bold text-gray-600 text-lg">{report.collection}</td>
                                                <td className="px-8 py-6 text-right font-bold text-brand-secondary text-lg">{report.usage}</td>
                                                <td className="px-8 py-6 text-center">
                                                    <a href={report.link} className="inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-brand-primary hover:text-white rounded-lg text-xs font-bold transition-all text-gray-500">
                                                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                        결산서 보기
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="bg-gray-50 p-6 text-center text-sm text-gray-500 font-medium">
                                * 위 내역은 국세청 홈택스 공시 내용과 동일합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="text-4xl font-black text-gray-900 mb-8">기부금 영수증 발행</h3>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium mb-10">
                                보내주신 소중한 후원금은 법인세법 및 소득세법에 따라 세액 공제 혜택을 받으실 수 있습니다. 후원 후 사무국으로 연락 주시면 영수증 발행을 도와드립니다.
                            </p>
                            <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                                <p className="text-gray-400 text-sm font-bold uppercase mb-2">문의처</p>
                                <p className="text-brand-primary text-2xl font-black">사무국: 043-871-XXXX</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm text-center">
                                <h4 className="font-black text-brand-secondary text-2xl mb-2">120%</h4>
                                <p className="text-sm font-bold text-gray-500">투명한 예산 집행</p>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm text-center">
                                <h4 className="font-black text-brand-secondary text-2xl mb-2">24/7</h4>
                                <p className="text-sm font-bold text-gray-500">정착 위기 대응</p>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm text-center">
                                <h4 className="font-black text-brand-secondary text-2xl mb-2">5,000+</h4>
                                <p className="text-sm font-bold text-gray-500">누적 수혜 인원</p>
                            </div>
                            <div className="bg-white p-8 rounded-[2rem] shadow-sm text-center">
                                <h4 className="font-black text-brand-secondary text-2xl mb-2">10년</h4>
                                <p className="text-sm font-bold text-gray-500">한결같은 동행</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <DonateCTA />
        </div>
    );
};

export default SupportPage;
