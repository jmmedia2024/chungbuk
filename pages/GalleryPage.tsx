
import React, { useState, useEffect } from 'react';
import { Page } from '../App';
import { supabase } from '../supabase';

const ITEMS_PER_PAGE = 10;

interface GalleryPageProps {
    navigateTo: (page: Page, id?: number) => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ navigateTo }) => {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchGallery = async () => {
            setLoading(true);
            try {
                // 전체 데이터를 가져와서 클라이언트 사이드 페이징 수행
                const { data, error } = await supabase
                    .from('gallery')
                    .select('*')
                    .order('date', { ascending: false });
                
                if (error) throw error;
                setItems(data || []);
            } catch (err) {
                console.error('Gallery fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    // 페이징 계산 로직
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="animate-fade-in-up bg-white min-h-screen pb-24">
            {/* 상단 섹션 - 게시판 타이틀 */}
            <section className="bg-gray-50 border-b border-gray-100 py-16 md:py-20">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4">활동 갤러리</h1>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed">충북음성새터민협회의 생생한 활동 현장을 전해드립니다.</p>
                    </div>
                </div>
            </section>

            {/* 갤러리 게시판 본문 */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-6 lg:px-12">
                    {/* 게시판 상단 정보 바 */}
                    <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-6">
                        <div className="text-sm font-bold text-gray-500">
                            총 <span className="text-brand-secondary">{items.length}</span>개의 활동 기록
                            <span className="mx-3 text-gray-200">|</span>
                            현재 <span className="text-brand-primary">{currentPage}</span> / {totalPages || 1} 페이지
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex flex-col justify-center items-center py-40 gap-4">
                            <div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-gray-400 font-black">목록을 불러오고 있습니다...</p>
                        </div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-40 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 text-lg font-bold">아직 등록된 사진이 없습니다.</p>
                        </div>
                    ) : (
                        <>
                            {/* 5열 그리드 레이아웃 (한 페이지 10개 최적화) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
                                {currentItems.map((item) => (
                                    <div 
                                        key={item.id} 
                                        onClick={() => navigateTo('gallery-detail', item.id)}
                                        className="group cursor-pointer flex flex-col"
                                    >
                                        {/* 이미지 썸네일 */}
                                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100 mb-4 border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-500">
                                            <img 
                                                src={item.img_url} 
                                                alt={item.title} 
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-brand-primary/80 backdrop-blur-md text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                                        </div>
                                        
                                        {/* 게시물 정보 */}
                                        <div className="px-1">
                                            <h3 className="text-[16px] font-black text-gray-900 line-clamp-2 group-hover:text-brand-secondary transition-colors mb-2 leading-[1.4]">
                                                {item.title}
                                            </h3>
                                            <div className="flex items-center text-[12px] font-bold text-gray-400">
                                                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth={2}/></svg>
                                                {new Date(item.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 하단 페이징 (게시판 스타일) */}
                            {totalPages > 1 && (
                                <div className="mt-20 flex justify-center items-center gap-1">
                                    {/* 이전 페이지 버튼 */}
                                    <button 
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 hover:text-gray-900'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    
                                    {/* 페이지 번호들 */}
                                    <div className="flex items-center mx-2 gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`w-10 h-10 rounded-lg text-sm font-black transition-all ${currentPage === pageNum ? 'bg-brand-primary text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200'}`}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}
                                    </div>

                                    {/* 다음 페이지 버튼 */}
                                    <button 
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className={`w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 hover:text-gray-900'}`}
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default GalleryPage;
