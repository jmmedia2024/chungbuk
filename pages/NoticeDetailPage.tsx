
import React from 'react';
import { Page } from '../App';
// Fixed: Changed from noticeItems to mockNotices as it's the correct exported name in NoticePage.tsx
import { mockNotices } from './NoticePage';

interface NoticeDetailPageProps {
    id: number | null;
    navigateTo: (page: Page, id?: number) => void;
}

const NoticeDetailPage: React.FC<NoticeDetailPageProps> = ({ id, navigateTo }) => {
    // Fixed: Changed from noticeItems to mockNotices
    const item = mockNotices.find(i => i.id === id);

    if (!item) {
        return (
            <div className="py-64 text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-6">게시글을 찾을 수 없습니다.</h2>
                <button 
                    onClick={() => navigateTo('notice')}
                    className="bg-brand-primary text-white font-bold px-10 py-4 rounded-full shadow-xl"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up bg-white min-h-screen py-24">
            <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
                <article className="bg-white">
                    {/* Header */}
                    <div className="border-b-4 border-brand-primary pb-10 mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            {item.isImportant && <span className="bg-red-100 text-red-600 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest">Notice</span>}
                            <span className="text-brand-secondary font-black text-sm uppercase tracking-widest">Announcement</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">{item.title}</h1>
                        <div className="flex items-center justify-between text-gray-500 font-bold">
                            <div className="flex items-center gap-4">
                                <span>작성자: 관리자</span>
                                <span className="text-gray-200">|</span>
                                <span>날짜: {item.date}</span>
                            </div>
                            <div className="hidden sm:block">조회수: {item.views}</div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-xl max-w-none text-gray-700 leading-relaxed font-medium mb-16 min-h-[400px]">
                        <p className="mb-6">안녕하세요, 충북음성새터민협회 사무국입니다.</p>
                        <p className="mb-6">우리 협회는 투명한 운영과 새터민 가족들의 권익 증진을 위해 항상 노력하고 있습니다.</p>
                        <p className="mb-6">공지해 드린 <strong>[{item.title}]</strong>에 대한 상세 내용을 아래와 같이 안내드리오니, 협회 회원 및 후원자 여러분께서는 참고하시기 바랍니다.</p>
                        
                        <div className="my-12 p-10 bg-gray-50 rounded-3xl border border-gray-100">
                            <h3 className="text-2xl font-black text-gray-900 mb-6">상세 안내 사항</h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-start">
                                    <span className="w-4 h-4 bg-brand-secondary rounded-full mt-1.5 mr-3 shrink-0"></span>
                                    내용: {item.title} 관련 세부 지침 및 일정
                                </li>
                                <li className="flex items-start">
                                    <span className="w-4 h-4 bg-brand-secondary rounded-full mt-1.5 mr-3 shrink-0"></span>
                                    대상: 협회 정회원 및 음성군 내 거주 북한이탈주민
                                </li>
                                <li className="flex items-start">
                                    <span className="w-4 h-4 bg-brand-secondary rounded-full mt-1.5 mr-3 shrink-0"></span>
                                    문의: 사무국 043-871-XXXX
                                </li>
                            </ul>
                        </div>

                        <p className="mb-6">더 궁금하신 점이나 지원이 필요하신 경우 언제든지 협회로 연락 주시기 바랍니다. 여러분의 많은 참여와 관심을 부탁드립니다.</p>
                        <p>감사합니다.</p>
                    </div>

                    {/* Footer Nav */}
                    <div className="pt-12 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-6">
                        <button 
                            onClick={() => navigateTo('notice')}
                            className="bg-gray-900 text-white font-black px-12 py-5 rounded-2xl hover:bg-black transition-all shadow-xl flex items-center justify-center"
                        >
                            목록으로 돌아가기
                        </button>
                        <div className="flex gap-4">
                            <button className="flex-1 sm:flex-none px-8 py-5 rounded-2xl border-2 border-gray-100 font-black text-gray-400 hover:border-brand-primary hover:text-brand-primary transition-all">이전 글</button>
                            <button className="flex-1 sm:flex-none px-8 py-5 rounded-2xl border-2 border-gray-100 font-black text-gray-400 hover:border-brand-primary hover:text-brand-primary transition-all">다음 글</button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default NoticeDetailPage;
