
import React, { useState, useEffect } from 'react';
import AboutSection from '../components/AboutSection';
import { UsersIcon, HeartIcon } from '../components/icons';
import { supabase } from '../supabase';

const PageBanner: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-brand-light py-16 sm:py-24">
        <div className="container mx-auto px-6 lg:px-12 text-center">
            <h1 className="text-5xl md:text-6xl font-black text-brand-primary tracking-tighter mb-6">{title}</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">{subtitle}</p>
        </div>
    </div>
);

const History: React.FC = () => {
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            const { data } = await supabase.from('history').select('*').order('sort_order', { ascending: true });
            if (data) setHistory(data);
        };
        fetchHistory();
    }, []);

    return (
        <section id="history" className="py-32 bg-gray-50 scroll-mt-32">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-black text-gray-900 mb-6">걸어온 발자취</h2>
                    <div className="w-20 h-2 bg-brand-secondary rounded-full mx-auto"></div>
                </div>
                
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
                    
                    <div className="space-y-16">
                        {history.map((item, idx) => (
                            <div key={item.id} className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                <div className="hidden md:block md:w-1/2"></div>
                                <div className="relative z-10 w-12 h-12 rounded-full bg-brand-secondary border-4 border-white shadow-xl flex-shrink-0 flex items-center justify-center text-white font-black text-xs">
                                    {item.year.slice(-2)}
                                </div>
                                <div className={`md:w-1/2 w-full p-8 bg-white rounded-[2rem] shadow-xl border border-gray-100 ${idx % 2 !== 0 ? 'text-right' : 'text-left'}`}>
                                    <p className="text-2xl font-black text-brand-secondary mb-2">{item.year}</p>
                                    <p className="text-lg text-gray-700 font-bold leading-relaxed">{item.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const OrgChart: React.FC = () => {
    const [org, setOrg] = useState<any[]>([]);

    useEffect(() => {
        const fetchOrg = async () => {
            const { data } = await supabase.from('organization').select('*').order('sort_order', { ascending: true });
            if (data) setOrg(data);
        };
        fetchOrg();
    }, []);

    return (
        <section id="organization" className="py-32 bg-white scroll-mt-32">
            <div className="container mx-auto px-6 lg:px-12 text-center">
                <div className="mb-20">
                    <h2 className="text-4xl font-black text-gray-900 mb-6">함께하는 사람들</h2>
                    <p className="text-xl text-gray-500 font-medium">충북음성새터민협회를 이끌어가는 헌신적인 전문가들입니다.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {org.map((person) => (
                        <div key={person.id} className="group">
                            <div className="relative mb-8 aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
                                {person.image_url ? (
                                    <img src={person.image_url} alt={person.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                                        <UsersIcon className="w-20 h-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                                    <p className="text-white text-sm font-bold italic">"협회의 발전과 새터민의 행복을 위해 최선을 다하겠습니다."</p>
                                </div>
                            </div>
                            <h4 className="text-2xl font-black text-gray-900 mb-1">{person.name}</h4>
                            <p className="text-brand-secondary font-black text-sm uppercase tracking-widest mb-2">{person.role}</p>
                            <p className="text-gray-400 font-bold text-xs">{person.department}</p>
                        </div>
                    ))}
                </div>
                
                {org.length === 0 && (
                   <div className="py-20 border-2 border-dashed border-gray-100 rounded-[3rem] text-gray-300 font-black tracking-widest">
                      MEMBERS UPDATING...
                   </div>
                )}
            </div>
        </section>
    );
};

const AboutPage: React.FC = () => {
    return (
        <div className="animate-fade-in-up">
            <PageBanner title="협회소개" subtitle="우리는 나눔을 통해 비전을 만들고, 화합을 통해 미래를 설계합니다." />
            <AboutSection />
            <History />
            <OrgChart />
        </div>
    );
};

export default AboutPage;
