
import React, { useState, useEffect } from 'react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './icons';
import { Page } from '../App';
import { supabase } from '../supabase';

interface FooterProps {
  navigateTo: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const [partners, setPartners] = useState<any[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      const { data } = await supabase
        .from('partners')
        .select('*')
        .order('sort_order', { ascending: true });
      if (data) setPartners(data);
    };
    fetchPartners();
  }, []);

  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon className="w-5 h-5" />, href: 'https://facebook.com' },
    { name: 'Instagram', icon: <InstagramIcon className="w-5 h-5" />, href: 'https://instagram.com' },
    { name: 'YouTube', icon: <YoutubeIcon className="w-5 h-5" />, href: 'https://youtube.com' },
  ];
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, page: Page) => {
    e.preventDefault();
    navigateTo(page);
  };

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="border-b border-gray-700 pb-10 mb-10">
            <h3 className="text-center text-gray-500 font-semibold mb-8 text-sm tracking-widest uppercase">함께하는 파트너</h3>
            <div className="flex flex-wrap justify-center items-center gap-10">
              {partners.length > 0 ? (
                partners.map(p => (
                  <a key={p.id} href={p.link_url || '#'} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={p.logo_url} 
                      alt={p.name} 
                      className="h-10 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 max-w-[180px] object-contain" 
                    />
                  </a>
                ))
              ) : (
                <p className="text-gray-600 text-sm font-bold italic">협력 기관 정보를 불러오는 중입니다...</p>
              )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">충북음성새터민협회</h2>
            <p className="text-base leading-relaxed space-y-2">
                고유번호: 123-45-67890 | 이사장: 남기영<br />
                주소: 충청북도 음성군 음성읍 군청길 38 (우: 27634)<br />
                전화: 043-871-XXXX | 팩스: 043-871-XXXX <br />
                이메일: eumseong_seter@korea.kr
            </p>
             <div className="flex space-x-4 mt-8">
               {socialLinks.map(link => (
                 <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" title={link.name} className="w-10 h-10 border border-gray-700 hover:border-brand-secondary hover:bg-brand-secondary text-gray-400 hover:text-white rounded-full flex items-center justify-center transition-all duration-300">
                   {link.icon}
                 </a>
               ))}
             </div>
             
             {/* 국세청 배너 추가 */}
             <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">관련 사이트 (Official Links)</p>
                <div className="flex flex-wrap gap-3">
                    <a href="https://www.nts.go.kr/" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-gray-800 hover:bg-white hover:text-brand-primary rounded-lg transition-colors border border-gray-700 group">
                        <span className="font-black text-sm">국세청 (NTS)</span>
                        <svg className="w-3 h-3 ml-2 text-gray-500 group-hover:text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                    <a href="https://www.hometax.go.kr/" target="_blank" rel="noopener noreferrer" className="flex items-center px-4 py-2 bg-gray-800 hover:bg-white hover:text-brand-primary rounded-lg transition-colors border border-gray-700 group">
                        <span className="font-black text-sm">국세청 홈택스</span>
                        <svg className="w-3 h-3 ml-2 text-gray-500 group-hover:text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                </div>
             </div>
          </div>
          
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
              <div>
                <h3 className="text-lg font-bold text-white mb-6">협회소개</h3>
                <ul className="text-base md:text-lg space-y-3">
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">이사장 인사말</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">설립취지 및 비전</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">연혁</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors">조직도</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-white transition-colors">오시는 길</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-6">주요사업</h3>
                <ul className="text-base md:text-lg space-y-3">
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'activities')} className="hover:text-white transition-colors">정착지원</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'activities')} className="hover:text-white transition-colors">교육·문화</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'activities')} className="hover:text-white transition-colors">상담·연계</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'activities')} className="hover:text-white transition-colors">지역협력</a></li>
                </ul>
              </div>
               <div>
                <h3 className="text-lg font-bold text-white mb-6">참여안내</h3>
                <ul className="text-base md:text-lg space-y-3">
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'support')} className="hover:text-white transition-colors">후원안내</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'support')} className="hover:text-white transition-colors">자원봉사</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-white transition-colors">문의하기</a></li>
                    <li><a href="#" onClick={(e) => handleNavClick(e, 'news')} className="hover:text-white transition-colors">재정보고</a></li>
                </ul>
              </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-800 text-sm md:text-base flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-500 mb-4 sm:mb-0">&copy; {new Date().getFullYear()} 충북음성새터민협회. All Rights Reserved.</p>
          <div className="flex space-x-6 text-gray-500">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
