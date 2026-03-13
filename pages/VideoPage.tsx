
import React from 'react';

const videoItems = [
    { title: '"음성군은 제2의 고향" - 선배 정착자 인터뷰', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '05:24', date: '2024-04-10', img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800', views: '1.2K' },
    { title: '2024 협회 홍보 영상: 함께 여는 희망의 길', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '03:15', date: '2024-01-05', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800', views: '3.5K' },
    { title: '[현장기록] 제8회 나눔 바자회 스케치 영상', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '02:40', date: '2023-10-20', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800', views: '850' },
    { title: '북한 실상 제대로 알기: 안보 강연 시리즈 #1', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '12:05', date: '2023-06-15', img: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?q=80&w=800', views: '2.1K' },
    { title: '성공적인 정착을 위한 법률 가이드 강의', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '15:30', date: '2024-02-28', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800', views: '920' },
    { title: '명절의 정을 나누다: 합동 차례 메이킹 필름', youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', duration: '04:12', date: '2024-02-12', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800', views: '1.5K' },
];

const VideoPage: React.FC = () => {
    return (
        <div className="animate-fade-in-up">
            <section className="bg-brand-primary py-24 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-brand-secondary/20 to-transparent"></div>
                <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-6">영상 소식</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-medium">유튜브 채널을 통해 협회의 생생한 소식을 전해드립니다.</p>
                </div>
            </section>

            <section className="py-24 bg-[#F8FAFC]">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {videoItems.map((video, idx) => (
                            <a key={idx} href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="group block">
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl mb-6 aspect-video">
                                    <img src={video.img} alt={video.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                                        <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                                            <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-black/80 text-white text-[10px] font-black px-2 py-1 rounded">YOUTUBE</div>
                                </div>
                                <div className="px-2">
                                    <h3 className="text-xl font-black text-gray-900 mb-3 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">{video.title}</h3>
                                    <div className="flex items-center text-gray-500 font-bold text-sm">
                                        <span>{video.date}</span>
                                        <span className="mx-2">•</span>
                                        <span className="text-red-600">유튜브에서 보기</span>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VideoPage;
