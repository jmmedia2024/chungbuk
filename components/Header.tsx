
import React, { useState, useEffect } from 'react';
import { MenuIcon, HeartIcon } from './icons';
import { Page, LEVEL_NAMES } from '../App';
import { supabase } from '../supabase';

interface SubLink {
  name: string;
  page: Page;
  id?: string;
}

interface NavLink {
  name: string;
  page: Page;
  subLinks?: SubLink[];
}

interface HeaderProps {
  navigateTo: (page: Page, id?: string) => void;
  user?: any;
}

const Header: React.FC<HeaderProps> = ({ navigateTo, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // 로고 URL 가져오기
    const fetchLogo = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'logo_url')
        .single();
      if (data) setLogoUrl(data.value);
    };
    fetchLogo();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { 
      name: '협회소개', 
      page: 'about',
      subLinks: [
        { name: '이사장 인사말', page: 'about' },
        { name: '설립취지 및 비전', page: 'about' },
        { name: '연혁', page: 'about' },
        { name: '조직 안내', page: 'about' },
      ]
    },
    { 
      name: '주요활동', 
      page: 'activities',
      subLinks: [
        { name: '정착지원 사업', page: 'activity-detail', id: 'support' },
        { name: '지역사회 봉사', page: 'activity-detail', id: 'volunteer' },
        { name: '문화 체험 행사', page: 'activity-detail', id: 'education' },
        { name: '상담 및 권익보호', page: 'activity-detail', id: 'counseling' },
        { name: '통일 안보 교육', page: 'activity-detail', id: 'unification' },
      ]
    },
    { 
      name: '소식', 
      page: 'gallery',
      subLinks: [
        { name: '포토 갤러리', page: 'gallery' },
        { name: '영상 소식', page: 'videos' },
        { name: '언론 보도', page: 'webzine' },
      ]
    },
    { name: '공지사항', page: 'notice' },
    { name: '후원안내', page: 'support' },
    { name: '오시는 길', page: 'contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, page: Page, id?: string) => {
    e.preventDefault();
    navigateTo(page, id);
    setIsMenuOpen(false);
    setActiveMobileSub(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigateTo('home');
  };

  const userLevel = user?.user_metadata?.level || 1;
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0];
  const isAdmin = userLevel === 10;

  return (
    <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2 border-b-0' : 'bg-white/95 backdrop-blur-md py-4 border-b border-gray-100'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo Area */}
          <div className="flex-shrink-0">
            <a href="#" onClick={(e) => handleNavClick(e, 'home')} className="flex items-center space-x-3 group">
              {logoUrl ? (
                <img src={logoUrl} alt="충북음성새터민협회" className="h-10 md:h-12 w-auto object-contain transition-transform group-hover:scale-105" />
              ) : (
                <>
                  <div className="p-2 rounded-xl bg-brand-secondary shadow-lg shadow-green-900/20 group-hover:scale-110 transition-transform">
                    <HeartIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-black tracking-tighter leading-none text-brand-primary">충북음성새터민협회</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1 text-gray-500">Eumseong Settlement Support</span>
                  </div>
                </>
              )}
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group px-1">
                <a 
                  href="#" 
                  onClick={(e) => handleNavClick(e, link.page)}
                  className="px-4 py-2 rounded-xl font-bold transition-all text-[17px] flex items-center text-gray-700 hover:text-brand-secondary hover:bg-gray-50"
                >
                  {link.name}
                  {link.subLinks && <svg className="w-4 h-4 ml-1 opacity-50 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                </a>

                {link.subLinks && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 min-w-[200px] ring-1 ring-black/5">
                      {link.subLinks.map((sub) => (
                        <a
                          key={sub.name}
                          href="#"
                          onClick={(e) => handleNavClick(e, sub.page, sub.id)}
                          className="block px-5 py-3 text-[15px] font-semibold text-gray-600 hover:bg-brand-secondary/5 hover:text-brand-secondary rounded-xl transition-colors"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="ml-6 flex items-center space-x-3 border-l pl-6 border-gray-200">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900 leading-none">{userName}님</p>
                    <p className="text-[10px] font-bold text-brand-secondary mt-1">{LEVEL_NAMES[userLevel]}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {isAdmin && (
                      <button 
                        onClick={() => navigateTo('admin')}
                        className="text-[10px] bg-brand-primary text-white font-black px-2 py-1 rounded hover:bg-black transition-colors"
                      >
                        ADMIN PANEL
                      </button>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <a href="#" onClick={(e) => handleNavClick(e, 'login')} className="text-sm font-bold text-gray-500 hover:text-brand-primary">로그인</a>
                  <a href="#" onClick={(e) => handleNavClick(e, 'signup')} className="bg-gray-100 text-brand-primary text-sm font-bold py-2.5 px-5 rounded-full hover:bg-brand-primary hover:text-white transition-all">회원가입</a>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center space-x-4">
             {!user && (
               <button onClick={() => navigateTo('login')} className="text-xs font-black text-brand-primary uppercase tracking-tighter">Login</button>
             )}
            <button onClick={() => setIsMenuOpen(true)} className="p-2 rounded-xl text-brand-primary hover:bg-gray-100 transition-colors">
              <MenuIcon className="h-8 w-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-[110] lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-transparent" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex items-center justify-between border-b bg-gray-50">
            {user ? (
              <div className="flex items-center space-x-3">
                 <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                    <span className="text-brand-secondary font-black">{userName[0]}</span>
                 </div>
                 <div>
                    <p className="text-sm font-black text-gray-900">{userName}님</p>
                    <p className="text-[10px] font-bold text-brand-secondary">{LEVEL_NAMES[userLevel]}</p>
                 </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="p-1.5 bg-brand-secondary rounded-lg">
                  <HeartIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black text-brand-primary">협회 메뉴</span>
              </div>
            )}
            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:bg-white rounded-full transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-grow overflow-y-auto py-6">
            <ul className="px-3 space-y-1">
              {isAdmin && (
                <li className="mb-4">
                  <button 
                    onClick={() => { navigateTo('admin'); setIsMenuOpen(false); }}
                    className="w-full text-left px-6 py-4 bg-brand-primary text-white font-black rounded-2xl flex items-center justify-between"
                  >
                    <span>관리자 대시보드</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </li>
              )}
              {navLinks.map((link) => (
                <li key={link.name} className="rounded-2xl overflow-hidden">
                  <div 
                    onClick={() => link.subLinks ? setActiveMobileSub(activeMobileSub === link.name ? null : link.name) : handleNavClick({preventDefault:()=>null} as any, link.page)}
                    className={`flex items-center justify-between px-6 py-4 text-xl font-bold transition-colors cursor-pointer ${activeMobileSub === link.name ? 'text-brand-secondary bg-green-50' : 'text-gray-800 hover:bg-gray-50'}`}
                  >
                    {link.name}
                    {link.subLinks && <svg className={`w-6 h-6 transition-transform duration-300 ${activeMobileSub === link.name ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>}
                  </div>
                  {link.subLinks && activeMobileSub === link.name && (
                    <ul className="bg-green-50 py-2 px-8 space-y-1 border-y border-green-100">
                      {link.subLinks.map((sub) => (
                        <li key={sub.name}>
                          <a href="#" onClick={(e) => handleNavClick(e, sub.page, sub.id)} className="block py-3.5 text-lg font-semibold text-gray-600 border-l-2 border-transparent hover:border-brand-secondary hover:pl-3 transition-all">{sub.name}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 border-t bg-gray-50/50 space-y-4">
            {user ? (
               <button onClick={handleLogout} className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl text-xl shadow-xl active:scale-95 transition-transform">로그아웃</button>
            ) : (
              <>
                <button onClick={() => navigateTo('login')} className="w-full bg-white border-2 border-gray-200 text-brand-primary font-bold py-4 rounded-2xl text-xl active:scale-95 transition-transform">로그인</button>
                <button onClick={() => navigateTo('signup')} className="w-full bg-brand-secondary text-white font-bold py-4 rounded-2xl text-xl shadow-xl shadow-green-900/20 active:scale-95 transition-transform">회원가입</button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
