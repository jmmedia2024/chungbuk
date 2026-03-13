
import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import { supabase } from '../supabase';

interface GalleryDetailPageProps {
    id: number | null;
    navigateTo: (page: Page, id?: number) => void;
}

const GalleryDetailPage: React.FC<GalleryDetailPageProps> = ({ id, navigateTo }) => {
    const [item, setItem] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .eq('id', id)
                    .single();
                
                if (error) throw error;
                setItem(data);
            } catch (err) {
                console.error('Gallery detail fetch error:', err);
                setItem(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="py-64 flex justify-center items-center">
                <div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="py-64 text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-6">해당 게시물을 찾을 수 없습니다.</h2>
                <button 
                    onClick={() => navigateTo('gallery')}
                    className="bg-brand-secondary text-white font-bold px-10 py-4 rounded-full shadow-xl hover:bg-green-700 transition-all"
                >
                    갤러리 목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up bg-gray-50 min-h-screen py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl">
                {/* Board Header Style */}
                <div className="bg-white rounded-t-[2.5rem] border border-gray-200 border-b-0 overflow-hidden">
                    <div className="p-8 md:p-12 border-b border-gray-100">
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="bg-brand-secondary/10 text-brand-secondary px-4 py-1 rounded-full text-xs font-black tracking-widest uppercase">
                                {item.category}
                            </span>
                            <span className="text-gray-400 text-sm font-bold">{item.date}</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
                            {item.title}
                        </h1>
                        <div className="flex items-center text-sm text-gray-500 font-bold border-t border-gray-50 pt-6">
                            <div className="flex items-center mr-6">
                                <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                                </span>
                                관리자
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white border-x border-gray-200 p-8 md:p-16">
                    <div className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
                        <img src={item.img_url} alt={item.title} className="w-full h-auto object-cover" />
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-600 leading-[1.8] font-medium space-y-6">
                        <p>
                            안녕하세요, 충북음성새터민협회입니다.<br />
                            지난 {item.date}, 음성군 일원에서 진행된 <strong>[{item.title}]</strong> 활동의 생생한 현장 모습을 공유해 드립니다.
                        </p>
                        <p>
                            참여해 주신 모든 분들의 밝은 미소가 음성군을 더욱 따뜻하게 만들었습니다. 
                            앞으로도 우리 협회는 새터민과 원주민이 편견 없이 하나 되는 행복한 공동체를 만들기 위해 
                            다양한 활동을 지속해 나가겠습니다.
                        </p>
                    </div>
                </div>

                {/* Board Footer / Navigation */}
                <div className="bg-white rounded-b-[2.5rem] border border-gray-200 border-t-0 p-8 md:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <button 
                            onClick={() => navigateTo('gallery')}
                            className="bg-gray-900 text-white font-black px-12 py-4 rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95 flex items-center"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            목록으로
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryDetailPage;
