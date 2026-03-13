
import React, { useState, useEffect, useRef } from 'react';
import { CalendarDaysIcon, BuildingLibraryIcon, UsersIcon, ClockIcon } from './icons';

const stats = [
  { label: '프로그램 운영', value: 1200, suffix: '+ 회', icon: <CalendarDaysIcon className="w-8 h-8" /> },
  { label: '협력기관', value: 50, suffix: '+ 곳', icon: <BuildingLibraryIcon className="w-8 h-8" /> },
  { label: '참여자', value: 5000, suffix: '+ 명', icon: <UsersIcon className="w-8 h-8" /> },
  { label: '봉사시간', value: 30000, suffix: '+ 시간', icon: <ClockIcon className="w-8 h-8" /> },
];

const CountUp: React.FC<{ end: number, duration?: number }> = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const frameRef = useRef<number>();
    
    useEffect(() => {
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };
        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current!);
    }, [end, duration]);

    return <span>{count.toLocaleString()}</span>;
};

const Stats: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-gray-900 text-white" style={{backgroundImage: 'linear-gradient(rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.9)), url(https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop)', backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">함께 만들어온 발자취</h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">여러분의 참여와 후원으로 이룬 의미 있는 성과입니다.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="text-brand-accent mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-brand-accent/10 rounded-full">
                  {stat.icon}
              </div>
              <p className="text-4xl lg:text-5xl font-extrabold text-white">
                <CountUp end={stat.value} />{stat.suffix.split(' ')[0]}
              </p>
              <p className="mt-2 text-lg font-medium text-gray-300">{stat.label} {stat.suffix.split(' ')[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
