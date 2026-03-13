
import React from 'react';
import { ArrowRightIcon } from './icons';

const channels = [
  { 
    title: '[포토] 2024 여름 희망 나눔 캠프 현장 스케치', 
    category: 'GALLERY', 
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop',
    link: '#'
  },
  { 
    title: '[영상] "혼자가 아니었어요" - 김민준 님의 자립 이야기', 
    category: 'YOUTUBE', 
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
    link: '#'
  },
  { 
    title: '[보도자료] 나눔과 비전, 2024 대한민국 사회공헌대상 수상', 
    category: 'NEWS', 
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop',
    link: '#'
  },
];

const Channels: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">협회 채널</h2>
          <p className="mt-4 text-lg text-gray-600">다양한 채널에서 협회의 생생한 소식을 만나보세요.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {channels.map((channel, index) => (
            <a href={channel.link} key={index} className="group block rounded-2xl shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative">
                <img src={channel.image} alt={channel.title} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4 bg-brand-accent text-white text-xs font-bold py-1 px-3 rounded-full">{channel.category}</div>
                <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{channel.title}</h3>
                    <div className="flex items-center text-amber-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>바로가기</span>
                      <ArrowRightIcon className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Channels;
