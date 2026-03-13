
import React from 'react';

const DonateCTA: React.FC = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-cover bg-center rounded-3xl p-10 md:p-20 text-center shadow-2xl overflow-hidden" style={{backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop')"}}>
            <div className="absolute inset-0 bg-brand-primary opacity-80"></div>
            <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  당신의 나눔이 한 사람의 내일을 바꿉니다.
                </h2>
                <p className="text-lg text-blue-200 mb-10 max-w-2xl mx-auto">
                  여러분의 소중한 후원과 따뜻한 봉사의 손길이 모여, 우리 이웃에게는 희망의 씨앗이, 지역사회에는 긍정적인 변화의 바람이 됩니다.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <a href="#" className="bg-brand-accent hover:bg-amber-500 text-white font-bold py-3.5 px-10 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto">
                    정기후원 시작하기
                  </a>
                  <a href="#" className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-bold py-3.5 px-10 rounded-full text-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto">
                    자원봉사 신청
                  </a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default DonateCTA;
