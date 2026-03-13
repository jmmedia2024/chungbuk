
import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import { supabase } from '../supabase';

export const mockNotices = [
    { id: 1, title: '충북음성새터민협회 홈페이지 정식 오픈 안내', date: '2024-03-20', isImportant: true, views: 105 },
];

interface NoticePageProps {
    navigateTo: (page: Page, id?: number) => void;
}

const NoticePage: React.FC<NoticePageProps> = ({ navigateTo }) => {
    const [notices, setNotices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const { data, error } = await supabase
                    .from('notices')
                    .select('*')
                    .order('is_important', { ascending: false })
                    .order('created_at', { ascending: false });
                
                if (error) throw error;
                setNotices(data || []);
            } catch (err) {
                console.warn('DB fetch failed, using fallback:', err);
                setNotices(mockNotices);
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    return (
        <div className="animate-fade-in-up bg-white">
            <section className="bg-brand-primary py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-6 lg:px-12 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6">공지사항</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">협회의 소식을 가장 빠르고 정확하게 전달합니다.</p>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-8 py-6 font-black text-gray-400 text-sm tracking-widest hidden sm:table-cell uppercase">No.</th>
                                    <th className="px-8 py-6 font-black text-gray-900 text-lg">제목</th>
                                    <th className="px-8 py-6 font-black text-gray-400 text-sm tracking-widest hidden md:table-cell uppercase text-center">작성일</th>
                                    <th className="px-8 py-6 font-black text-gray-400 text-sm tracking-widest hidden lg:table-cell uppercase text-center">조회수</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-bold">
                                           <div className="flex flex-col items-center gap-4">
                                              <div className="w-8 h-8 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
                                              <p>데이터를 안전하게 불러오는 중입니다...</p>
                                           </div>
                                        </td>
                                    </tr>
                                ) : notices.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center text-gray-400 font-bold italic">등록된 공지사항이 없습니다.</td>
                                    </tr>
                                ) : notices.map((item, idx) => (
                                     <tr 
                                        key={item.id} 
                                        onClick={() => navigateTo('notice-detail', item.id)}
                                        className="group hover:bg-brand-secondary/5 cursor-pointer transition-colors"
                                    >
                                        <td className="px-8 py-8 hidden sm:table-cell">
                                            {item.is_important ? (
                                                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-[0_2px_10px_rgba(239,68,68,0.3)] border border-red-400/50">
                                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                                                    필독
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 font-bold">{notices.length - idx}</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="flex flex-col">
                                                <span className="text-xl font-bold text-gray-800 group-hover:text-brand-secondary transition-colors line-clamp-1">{item.title}</span>
                                                <span className="md:hidden text-xs text-gray-400 mt-2 font-bold">{new Date(item.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8 text-gray-500 font-bold hidden md:table-cell text-center">{new Date(item.created_at).toLocaleDateString()}</td>
                                        <td className="px-8 py-8 text-gray-400 font-bold hidden lg:table-cell text-center">{item.views}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NoticePage;
