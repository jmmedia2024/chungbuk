
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ActivitiesPage from './pages/ActivitiesPage';
import NewsPage from './pages/NewsPage';
import NoticePage from './pages/NoticePage';
import NoticeDetailPage from './pages/NoticeDetailPage';
import SupportPage from './pages/SupportPage';
import ContactPage from './pages/ContactPage';
import ActivityDetailPage from './pages/ActivityDetailPage';
import GalleryPage from './pages/GalleryPage';
import VideoPage from './pages/VideoPage';
import GalleryDetailPage from './pages/GalleryDetailPage';
import WebzinePage from './pages/WebzinePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AdminPage from './pages/AdminPage';
import { supabase } from './supabase';

export type Page = 'home' | 'about' | 'activities' | 'webzine' | 'news' | 'notice' | 'notice-detail' | 'support' | 'contact' | 'activity-detail' | 'gallery' | 'videos' | 'gallery-detail' | 'login' | 'signup' | 'admin';

export const LEVEL_NAMES: Record<number, string> = {
  1: '비회원',
  2: '일반회원',
  3: '새터민회원',
  4: '활동회원',
  5: '우수회원',
  6: '특별회원',
  7: '후원회원(S)',
  8: '후원회원(G)',
  9: '운영위원',
  10: '최고관리자'
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentActivityId, setCurrentActivityId] = useState<string | null>(null);
  const [currentGalleryId, setCurrentGalleryId] = useState<number | null>(null);
  const [currentNoticeId, setCurrentNoticeId] = useState<number | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 세션 체크 및 특정 이메일 권한 강제 적용 (nkjoy@naver.com)
    const checkAndSetUser = (sessionUser: any) => {
      if (sessionUser && sessionUser.email === 'nkjoy@naver.com') {
        if (!sessionUser.user_metadata) sessionUser.user_metadata = {};
        sessionUser.user_metadata.level = 10;
        sessionUser.user_metadata.full_name = '관리자';
      }
      setUser(sessionUser);
    };

    supabase.auth.getSession().then(({ data: { session } }) => {
      checkAndSetUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkAndSetUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigateTo = (page: Page, id?: string | number) => {
    // 관리자 페이지 접근 제어 (레벨 2 이상 진입 가능, 세부 메뉴는 AdminPage 내부에서 제어)
    const userLevel = user?.user_metadata?.level || 1;
    if (page === 'admin' && userLevel < 2) {
      alert('관리자 대시보드에 접근할 권한이 없습니다.');
      setCurrentPage('login');
      return;
    }

    setCurrentPage(page);
    if (page === 'activity-detail' && typeof id === 'string') {
      setCurrentActivityId(id);
    } else if (page === 'gallery-detail' && typeof id === 'number') {
      setCurrentGalleryId(id);
    } else if (page === 'notice-detail' && typeof id === 'number') {
      setCurrentNoticeId(id);
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} />;
      case 'about':
        return <AboutPage />;
      case 'activities':
        return <ActivitiesPage navigateTo={navigateTo} />;
      case 'webzine':
        return <WebzinePage />;
      case 'news':
        return <NewsPage />;
      case 'gallery':
        return <GalleryPage navigateTo={navigateTo} />;
      case 'gallery-detail':
        return <GalleryDetailPage id={currentGalleryId} navigateTo={navigateTo} />;
      case 'videos':
        return <VideoPage />;
      case 'notice':
        return <NoticePage navigateTo={navigateTo} />;
      case 'notice-detail':
        return <NoticeDetailPage id={currentNoticeId} navigateTo={navigateTo} />;
      case 'support':
        return <SupportPage />;
      case 'contact':
        return <ContactPage />;
      case 'activity-detail':
        return <ActivityDetailPage id={currentActivityId} navigateTo={navigateTo} />;
      case 'login':
        return <LoginPage navigateTo={navigateTo} />;
      case 'signup':
        return <SignUpPage navigateTo={navigateTo} />;
      case 'admin':
        return <AdminPage navigateTo={navigateTo} user={user} />;
      default:
        return <HomePage navigateTo={navigateTo} />;
    }
  };

  const isAdminView = currentPage === 'admin';

  return (
    <div className="bg-white font-sans text-gray-800">
      {!isAdminView && <Header navigateTo={navigateTo} user={user} />}
      <main className={isAdminView ? "" : "pt-[80px]"}>
        {renderPage()}
      </main>
      {!isAdminView && <Footer navigateTo={navigateTo} />}
    </div>
  );
};

export default App;
