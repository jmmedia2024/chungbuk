
import React, { useState, useEffect } from 'react';
import { Page, LEVEL_NAMES } from '../App';
import { HeartIcon, UsersIcon, BookOpenIcon, CalendarDaysIcon, ClockIcon, BuildingLibraryIcon } from '../components/icons';
import { supabase } from '../supabase';

interface AdminPageProps {
  navigateTo: (page: Page) => void;
  user: any;
}

const AdminPage: React.FC<AdminPageProps> = ({ navigateTo, user }) => {
  const [activeMenu, setActiveMenu] = useState('관리홈');
  const [activeSubMenu, setActiveSubMenu] = useState('시스템 현황');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const userLevel = user?.user_metadata?.level || 1;

  // Data States
  const [members, setMembers] = useState<any[]>([]);
  const [slides, setSlides] = useState<any[]>([]);
  const [notices, setNotices] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [organization, setOrganization] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [bankAccounts, setBankAccounts] = useState<any[]>([]);
  const [stats, setStats] = useState({ members: 0, notices: 0, slides: 0, gallery: 0 });

  useEffect(() => {
    fetchStats();
    refreshData();
  }, [activeMenu, activeSubMenu]);

  const fetchStats = async () => {
    try {
      const { count: m } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: n } = await supabase.from('notices').select('*', { count: 'exact', head: true });
      const { count: s } = await supabase.from('main_slides').select('*', { count: 'exact', head: true });
      const { count: g } = await supabase.from('gallery').select('*', { count: 'exact', head: true });
      setStats({ members: m || 0, notices: n || 0, slides: s || 0, gallery: g || 0 });
    } catch (e) { console.error("Stats fetch error", e); }
  };

  const refreshData = async () => {
    setLoading(true);
    try {
      if (activeSubMenu === '전체회원관리') {
        const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        setMembers(data || []);
      } else if (activeSubMenu === '메인슬라이드 관리') {
        const { data } = await supabase.from('main_slides').select('*').order('sort_order', { ascending: true });
        setSlides(data || []);
      } else if (activeSubMenu === '공지사항 등록') {
        const { data } = await supabase.from('notices').select('*').order('created_at', { ascending: false });
        setNotices(data || []);
      } else if (activeSubMenu === '갤러리 업로드') {
        const { data } = await supabase.from('gallery').select('*').order('date', { ascending: false });
        setGallery(data || []);
      } else if (activeSubMenu === '연혁 관리') {
        const { data } = await supabase.from('history').select('*').order('sort_order', { ascending: true });
        setHistory(data || []);
      } else if (activeSubMenu === '조직 관리') {
        const { data } = await supabase.from('organization').select('*').order('sort_order', { ascending: true });
        setOrganization(data || []);
      } else if (activeSubMenu === '파트너 관리') {
        const { data } = await supabase.from('partners').select('*').order('sort_order', { ascending: true });
        setPartners(data || []);
      } else if (activeSubMenu === '은행계좌 및 기타') {
        const { data } = await supabase.from('bank_accounts').select('*').order('sort_order', { ascending: true });
        setBankAccounts(data || []);
      }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const handleUpdate = async (table: string, id: any, updates: any) => {
    const { error } = await supabase.from(table).update(updates).eq('id', id);
    if (error) alert('수정 실패: ' + error.message);
    else refreshData();
  };

  const handleCreate = async (table: string, item: any) => {
    const { error } = await supabase.from(table).insert([item]);
    if (error) alert('추가 실패: ' + error.message);
    else refreshData();
  };

  const handleDelete = async (table: string, id: any) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) alert('삭제 실패: ' + error.message);
    else refreshData();
  };

  const menuItems = [
    { name: '관리홈', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { name: '회원관리', icon: <UsersIcon className="w-5 h-5" /> },
    { name: '콘텐츠관리', icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: '기본정보관리', icon: <BuildingLibraryIcon className="w-5 h-5" /> },
  ];

  const subMenuItems: Record<string, string[]> = {
    '관리홈': ['시스템 현황'],
    '회원관리': ['전체회원관리', '등급 설정 안내'],
    '콘텐츠관리': ['메인슬라이드 관리', '공지사항 등록', '갤러리 업로드'],
    '기본정보관리': ['연혁 관리', '조직 관리', '파트너 관리', '은행계좌 및 기타'],
  };

  const getFilteredSubMenus = (menuName: string) => subMenuItems[menuName] || [];

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName);
    const subs = getFilteredSubMenus(menuName);
    setActiveSubMenu(subs[0] || '준비중');
  };

  const filteredMembers = members.filter(m => 
    m.full_name?.includes(searchTerm) || m.email?.includes(searchTerm)
  );

  const getLevelBadgeColor = (level: number) => {
    if (level === 10) return 'bg-purple-100 text-purple-700 border-purple-200';
    if (level >= 8) return 'bg-amber-100 text-amber-700 border-amber-200';
    if (level >= 3) return 'bg-green-100 text-green-700 border-green-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="flex h-screen bg-[#F1F5F9] overflow-hidden font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-brand-primary text-slate-400 flex flex-col shrink-0 shadow-2xl z-20">
        <div className="p-8 border-b border-slate-800 flex items-center space-x-3">
          <div className="p-2 bg-brand-secondary rounded-lg">
            <HeartIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-black text-xl tracking-tighter uppercase">ADMIN PANEL</span>
        </div>
        <div className="flex-grow overflow-y-auto py-6 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item.name)}
              className={`w-full flex items-center space-x-4 px-6 py-4 text-sm font-bold rounded-2xl transition-all ${activeMenu === item.name ? 'bg-blue-600 text-white shadow-xl' : 'hover:bg-slate-800 hover:text-white'}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        <div className="p-6 border-t border-slate-800">
          <button onClick={() => navigateTo('home')} className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl text-xs font-black tracking-widest uppercase transition-colors">Go to Website</button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{activeMenu} &gt; {activeSubMenu}</span>
          <div className="text-right">
            <p className="text-sm font-black text-slate-900 leading-none">{user?.user_metadata?.full_name || '관리자'}님</p>
            <p className="text-[10px] font-bold text-brand-secondary mt-1">{LEVEL_NAMES[userLevel]}</p>
          </div>
        </header>

        <div className="flex-grow flex overflow-hidden">
          {/* Sub Navigation */}
          <div className="w-64 bg-white border-r border-slate-200 p-3 overflow-y-auto">
             {getFilteredSubMenus(activeMenu).map(sub => (
                <button 
                  key={sub} 
                  onClick={() => setActiveSubMenu(sub)} 
                  className={`w-full text-left px-5 py-4 text-sm font-bold rounded-2xl mb-1 transition-all ${activeSubMenu === sub ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100/50' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                >
                  {sub}
                </button>
              ))}
          </div>

          <div className="flex-grow bg-slate-50 p-10 overflow-y-auto">
             <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                   <div>
                      <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">{activeSubMenu}</h1>
                      <p className="text-slate-500 font-bold">협회 운영을 위한 핵심 데이터를 관리합니다.</p>
                   </div>
                   
                   {/* Actions based on sub-menu */}
                   <div className="flex gap-3">
                     {activeSubMenu === '전체회원관리' && (
                        <div className="relative">
                           <input 
                              type="text" 
                              placeholder="회원 이름 또는 이메일 검색..." 
                              className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm font-bold focus:ring-4 focus:ring-blue-100 outline-none transition-all w-80"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                           />
                           <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                     )}
                     {activeSubMenu === '메인슬라이드 관리' && (
                       <button onClick={() => handleCreate('main_slides', { title: '새 슬라이드 제목', subtitle: '설명 문구', image_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070', sort_order: slides.length + 1, is_active: true })} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-700 transition-all">슬라이드 추가</button>
                     )}
                     {activeSubMenu === '공지사항 등록' && (
                        <button onClick={() => handleCreate('notices', { title: '새 공지사항', content: '공지 내용을 입력하세요.', is_important: false, views: 0 })} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-700 transition-all">공지 등록</button>
                     )}
                     {activeSubMenu === '갤러리 업로드' && (
                        <button onClick={() => handleCreate('gallery', { title: '새 활동 사진', img_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070', category: 'EVENT', date: new Date().toISOString().split('T')[0] })} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-700 transition-all">사진 추가</button>
                     )}
                     {activeSubMenu === '연혁 관리' && (
                        <button onClick={() => handleCreate('history', { year: '2024', content: '주요 성과 내용 입력', sort_order: history.length + 1 })} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-700 transition-all">연혁 추가</button>
                     )}
                     {activeSubMenu === '조직 관리' && (
                        <button onClick={() => handleCreate('organization', { name: '이름', role: '직함', department: '부서', sort_order: organization.length + 1 })} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-700 transition-all">인원 추가</button>
                     )}
                     {activeSubMenu === '파트너 관리' && (
                        <button onClick={() => handleCreate('partners', { name: '파트너사명', logo_url: 'https://via.placeholder.com/150x50', link_url: '#', sort_order: partners.length + 1 })} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-700 transition-all">파트너 추가</button>
                     )}
                   </div>
                </div>

                {loading ? (
                   <div className="flex justify-center py-40"><div className="w-16 h-16 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>
                ) : activeSubMenu === '시스템 현황' ? (
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 text-center hover:shadow-xl transition-all">
                         <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto"><UsersIcon className="w-6 h-6" /></div>
                         <p className="text-slate-400 font-bold text-xs uppercase mb-1">총 회원수</p>
                         <h3 className="text-4xl font-black text-slate-900">{stats.members}</h3>
                      </div>
                      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 text-center hover:shadow-xl transition-all">
                         <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto"><BookOpenIcon className="w-6 h-6" /></div>
                         <p className="text-slate-400 font-bold text-xs uppercase mb-1">공지사항</p>
                         <h3 className="text-4xl font-black text-slate-900">{stats.notices}</h3>
                      </div>
                      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 text-center hover:shadow-xl transition-all">
                         <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 mx-auto"><CalendarDaysIcon className="w-6 h-6" /></div>
                         <p className="text-slate-400 font-bold text-xs uppercase mb-1">슬라이드</p>
                         <h3 className="text-4xl font-black text-slate-900">{stats.slides}</h3>
                      </div>
                      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200 text-center hover:shadow-xl transition-all">
                         <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto"><HeartIcon className="w-6 h-6" /></div>
                         <p className="text-slate-400 font-bold text-xs uppercase mb-1">갤러리</p>
                         <h3 className="text-4xl font-black text-slate-900">{stats.gallery}</h3>
                      </div>
                   </div>
                ) : activeSubMenu === '전체회원관리' ? (
                   <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
                      <table className="w-full text-left">
                         <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">회원명</th>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">이메일</th>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">회원등급</th>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">가입일시</th>
                               <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">관리</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-50">
                            {filteredMembers.length > 0 ? filteredMembers.map(member => (
                               <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                                  <td className="px-8 py-6">
                                     <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-sm">{member.full_name?.[0] || '?'}</div>
                                        <span className="font-black text-slate-900">{member.full_name || '이름없음'}</span>
                                     </div>
                                  </td>
                                  <td className="px-8 py-6 font-bold text-slate-500">{member.email}</td>
                                  <td className="px-8 py-6 text-center">
                                     <select 
                                        value={member.level} 
                                        onChange={(e) => handleUpdate('profiles', member.id, { level: parseInt(e.target.value) })}
                                        className={`px-4 py-1.5 rounded-full text-xs font-black border-2 transition-all cursor-pointer outline-none ${getLevelBadgeColor(member.level)}`}
                                     >
                                        {Object.entries(LEVEL_NAMES).map(([val, name]) => (
                                           <option key={val} value={val}>{name}</option>
                                        ))}
                                     </select>
                                  </td>
                                  <td className="px-8 py-6 text-center text-xs font-bold text-slate-400">
                                     {new Date(member.created_at).toLocaleDateString()}
                                  </td>
                                  <td className="px-8 py-6 text-center">
                                     <button onClick={() => handleDelete('profiles', member.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2}/></svg></button>
                                  </td>
                               </tr>
                            )) : (
                               <tr><td colSpan={5} className="px-8 py-20 text-center font-black text-slate-300 italic">데이터가 없습니다.</td></tr>
                            )}
                         </tbody>
                      </table>
                   </div>
                ) : activeSubMenu === '메인슬라이드 관리' ? (
                    <div className="grid grid-cols-1 gap-6">
                        {slides.map(slide => (
                            <div key={slide.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-64 h-40 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                                    <img src={slide.image_url} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-grow space-y-3">
                                    <div className="flex justify-between">
                                        <input type="text" defaultValue={slide.title} onBlur={(e) => handleUpdate('main_slides', slide.id, { title: e.target.value })} className="flex-grow font-black text-xl outline-none border-b border-transparent focus:border-blue-500" placeholder="제목" />
                                        <button onClick={() => handleDelete('main_slides', slide.id)} className="text-red-400 hover:text-red-600 ml-4"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2}/></svg></button>
                                    </div>
                                    <input type="text" defaultValue={slide.subtitle} onBlur={(e) => handleUpdate('main_slides', slide.id, { subtitle: e.target.value })} className="w-full text-slate-500 font-bold outline-none border-b border-transparent focus:border-blue-500" placeholder="부제목" />
                                    <input type="text" defaultValue={slide.image_url} onBlur={(e) => handleUpdate('main_slides', slide.id, { image_url: e.target.value })} className="w-full text-xs text-blue-500 font-mono bg-slate-50 p-2 rounded outline-none" placeholder="이미지 URL" />
                                    <div className="flex items-center gap-4 pt-2">
                                        <label className="text-xs font-black text-slate-400 uppercase">순서</label>
                                        <input type="number" defaultValue={slide.sort_order} onBlur={(e) => handleUpdate('main_slides', slide.id, { sort_order: parseInt(e.target.value) })} className="w-16 bg-slate-50 rounded px-2 py-1 text-xs font-bold" />
                                        <label className="flex items-center gap-2 cursor-pointer ml-4">
                                            <input type="checkbox" checked={slide.is_active} onChange={(e) => handleUpdate('main_slides', slide.id, { is_active: e.target.checked })} />
                                            <span className="text-xs font-black text-slate-500">활성화</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : activeSubMenu === '공지사항 등록' ? (
                   <div className="space-y-6">
                      {notices.map(notice => (
                         <div key={notice.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <div className="flex justify-between items-start">
                               <div className="flex-grow space-y-3">
                                  <div className="flex items-center gap-3">
                                     <input type="checkbox" checked={notice.is_important} onChange={(e) => handleUpdate('notices', notice.id, { is_important: e.target.checked })} className="w-4 h-4 text-red-500" />
                                     <span className="text-xs font-black text-red-500 uppercase tracking-widest">중요공지</span>
                                     <span className="text-xs text-slate-400 font-bold ml-auto">{new Date(notice.created_at).toLocaleDateString()}</span>
                                  </div>
                                  <input type="text" defaultValue={notice.title} onBlur={(e) => handleUpdate('notices', notice.id, { title: e.target.value })} className="w-full font-black text-xl outline-none focus:text-blue-600 transition-colors" placeholder="공지사항 제목" />
                                  <textarea defaultValue={notice.content} onBlur={(e) => handleUpdate('notices', notice.id, { content: e.target.value })} className="w-full h-32 bg-slate-50 rounded-2xl p-4 font-medium text-slate-600 outline-none border border-transparent focus:border-blue-100 focus:bg-white transition-all" placeholder="공지 상세 내용"></textarea>
                               </div>
                               <button onClick={() => handleDelete('notices', notice.id)} className="text-red-300 hover:text-red-500 ml-6"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2}/></svg></button>
                            </div>
                         </div>
                      ))}
                   </div>
                ) : activeSubMenu === '갤러리 업로드' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {gallery.map(item => (
                          <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex flex-col group">
                             <div className="h-48 overflow-hidden bg-slate-100 relative">
                                <img src={item.img_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute top-4 right-4 flex gap-2">
                                   <button onClick={() => handleDelete('gallery', item.id)} className="p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2}/></svg></button>
                                </div>
                             </div>
                             <div className="p-6 space-y-3">
                                <input type="text" defaultValue={item.title} onBlur={(e) => handleUpdate('gallery', item.id, { title: e.target.value })} className="w-full font-black text-lg outline-none" placeholder="활동 제목" />
                                <div className="grid grid-cols-2 gap-3">
                                   <input type="text" defaultValue={item.category} onBlur={(e) => handleUpdate('gallery', item.id, { category: e.target.value })} className="bg-slate-50 rounded-lg px-3 py-2 text-xs font-black text-slate-500 outline-none" placeholder="카테고리" />
                                   <input type="date" defaultValue={item.date} onBlur={(e) => handleUpdate('gallery', item.id, { date: e.target.value })} className="bg-slate-50 rounded-lg px-3 py-2 text-xs font-bold text-slate-500 outline-none" />
                                </div>
                                <input type="text" defaultValue={item.img_url} onBlur={(e) => handleUpdate('gallery', item.id, { img_url: e.target.value })} className="w-full text-[10px] text-blue-500 font-mono bg-slate-50 p-2 rounded outline-none truncate" placeholder="이미지 URL" />
                             </div>
                          </div>
                       ))}
                    </div>
                ) : activeSubMenu === '연혁 관리' ? (
                   <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                      <table className="w-full text-left">
                         <thead className="bg-slate-50 border-b">
                            <tr>
                               <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">연도</th>
                               <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">활동 내용</th>
                               <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">순서</th>
                               <th className="px-8 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">삭제</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-slate-100">
                            {history.map(item => (
                               <tr key={item.id}>
                                  <td className="px-8 py-4"><input type="text" defaultValue={item.year} onBlur={(e) => handleUpdate('history', item.id, { year: e.target.value })} className="w-20 font-black text-blue-600 outline-none" /></td>
                                  <td className="px-8 py-4"><input type="text" defaultValue={item.content} onBlur={(e) => handleUpdate('history', item.id, { content: e.target.value })} className="w-full font-bold text-slate-700 outline-none" /></td>
                                  <td className="px-8 py-4 text-center"><input type="number" defaultValue={item.sort_order} onBlur={(e) => handleUpdate('history', item.id, { sort_order: parseInt(e.target.value) })} className="w-12 text-center text-xs font-black bg-slate-50 rounded py-1" /></td>
                                  <td className="px-8 py-4 text-center"><button onClick={() => handleDelete('history', item.id)} className="text-red-300 hover:text-red-500 transition-colors"><svg className="w-5 h-5 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2}/></svg></button></td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                ) : activeSubMenu === '조직 관리' ? (
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {organization.map(person => (
                         <div key={person.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 group">
                            <div className="h-40 bg-slate-100 rounded-2xl overflow-hidden relative">
                               {person.image_url ? <img src={person.image_url} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 font-black">NO IMAGE</div>}
                               <div className="absolute top-2 right-2"><button onClick={() => handleDelete('organization', person.id)} className="p-2 bg-white/90 text-red-500 rounded-lg shadow hover:bg-red-500 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2}/></svg></button></div>
                            </div>
                            <div className="space-y-2">
                               <input type="text" defaultValue={person.name} onBlur={(e) => handleUpdate('organization', person.id, { name: e.target.value })} className="w-full font-black text-lg outline-none" placeholder="이름" />
                               <div className="grid grid-cols-2 gap-2">
                                  <input type="text" defaultValue={person.role} onBlur={(e) => handleUpdate('organization', person.id, { role: e.target.value })} className="bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-bold outline-none" placeholder="직함" />
                                  <input type="text" defaultValue={person.department} onBlur={(e) => handleUpdate('organization', person.id, { department: e.target.value })} className="bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-bold outline-none" placeholder="부서" />
                               </div>
                               <input type="text" defaultValue={person.image_url} onBlur={(e) => handleUpdate('organization', person.id, { image_url: e.target.value })} className="w-full text-[10px] text-blue-500 font-mono bg-slate-50 p-2 rounded outline-none" placeholder="이미지 URL" />
                            </div>
                         </div>
                      ))}
                   </div>
                ) : activeSubMenu === '파트너 관리' ? (
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      {partners.map(p => (
                         <div key={p.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <div className="h-20 bg-slate-50 rounded-xl flex items-center justify-center p-4">
                               <img src={p.logo_url} className="max-h-full max-w-full object-contain grayscale" />
                            </div>
                            <div className="space-y-2">
                               <input type="text" defaultValue={p.name} onBlur={(e) => handleUpdate('partners', p.id, { name: e.target.value })} className="w-full font-black text-sm outline-none" placeholder="기관명" />
                               <input type="text" defaultValue={p.logo_url} onBlur={(e) => handleUpdate('partners', p.id, { logo_url: e.target.value })} className="w-full text-[10px] text-blue-500 font-mono outline-none border-b border-transparent focus:border-blue-200" placeholder="로고 URL" />
                               <input type="text" defaultValue={p.link_url} onBlur={(e) => handleUpdate('partners', p.id, { link_url: e.target.value })} className="w-full text-[10px] text-slate-400 font-mono outline-none" placeholder="링크 URL" />
                            </div>
                            <div className="flex justify-between items-center pt-2">
                               <input type="number" defaultValue={p.sort_order} onBlur={(e) => handleUpdate('partners', p.id, { sort_order: parseInt(e.target.value) })} className="w-12 text-center text-[10px] font-black bg-slate-50 rounded py-1" />
                               <button onClick={() => handleDelete('partners', p.id)} className="text-red-300 hover:text-red-500 transition-colors"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2}/></svg></button>
                            </div>
                         </div>
                      ))}
                   </div>
                ) : activeSubMenu === '은행계좌 및 기타' ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {bankAccounts.map(account => (
                        <div key={account.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col gap-6 group hover:shadow-xl transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <BuildingLibraryIcon className="w-6 h-6" />
                             </div>
                             <div className="flex-grow">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Bank Name</label>
                                <input type="text" defaultValue={account.bank_name} onBlur={(e) => handleUpdate('bank_accounts', account.id, { bank_name: e.target.value })} className="w-full bg-transparent font-black text-slate-900 border-none p-0 focus:ring-0 text-xl" />
                             </div>
                             <button onClick={() => handleDelete('bank_accounts', account.id)} className="p-2 text-red-400 hover:text-red-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2}/></svg></button>
                          </div>
                          <div className="space-y-4">
                             <input type="text" defaultValue={account.account_number} onBlur={(e) => handleUpdate('bank_accounts', account.id, { account_number: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none" />
                             <input type="text" defaultValue={account.account_holder} onBlur={(e) => handleUpdate('bank_accounts', account.id, { account_holder: e.target.value })} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-700 outline-none" />
                          </div>
                        </div>
                      ))}
                      <button onClick={() => handleCreate('bank_accounts', { bank_name: '신규은행', account_number: '000-000-000', account_holder: '예금주', sort_order: bankAccounts.length + 1 })} className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-8 text-slate-300 font-black hover:bg-white transition-all hover:border-blue-300 hover:text-blue-500 group flex flex-col items-center justify-center gap-2">
                        <svg className="w-10 h-10 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                        <span>새 계좌 추가</span>
                      </button>
                   </div>
                ) : (
                  <div className="bg-white p-24 rounded-[4rem] text-center border-2 border-dashed border-slate-200 font-black text-slate-300 italic">
                    UI Preparation for {activeSubMenu}... (데이터를 불러오는 중입니다)
                  </div>
                )}
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
