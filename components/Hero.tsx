
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-brand-primary overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-brand-secondary/20 to-transparent"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-brand-secondary/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
              <span className="w-2 h-2 bg-brand-accent rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-bold text-white tracking-widest uppercase">Chungbuk Eumseong Support Center</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 tracking-tight">
              함께 여는 <span className="text-brand-accent">희망의 길,</span><br />
              음성군 새터민의<br className="hidden md:block" /> 든든한 동반자
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              충북음성새터민협회는 북한이탈주민들의 안정적인 지역사회 정착을 돕고, 지역 주민과 하나 되어 더불어 살아가는 행복한 음성군을 만듭니다.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-5">
              <a href="#" className="bg-brand-secondary hover:bg-green-700 text-white font-bold py-5 px-12 rounded-full text-xl shadow-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center">
                협회 소개
              </a>
              <a href="#" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-bold py-5 px-12 rounded-full text-xl shadow-xl transition-all transform hover:scale-105 flex items-center justify-center">
                주요 활동 보기
              </a>
            </div>
          </div>
          <div className="hidden lg:block relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] border-8 border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop" 
                alt="Hopeful Community" 
                className="w-full h-[650px] object-cover transition-transform duration-[2000ms] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                <p className="text-white text-lg font-bold leading-relaxed">
                  "우리는 같은 말을 쓰고 같은 역사를 공유하는 한 민족입니다. 음성군에서 시작하는 새로운 인생, 저희가 끝까지 함께하겠습니다."
                </p>
                <p className="mt-4 text-brand-accent font-bold text-sm">— 충북음성새터민협회 이사장</p>
              </div>
            </div>
            {/* Background shapes */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/20 blur-3xl rounded-full z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
