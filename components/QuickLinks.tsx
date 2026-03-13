
import React from 'react';
import { HandshakeIcon, BookOpenIcon, HeartIcon, ChatBubbleLeftRightIcon, CalendarDaysIcon, UsersIcon, ClockIcon } from './icons';
import { Page } from '../App';

interface QuickLinksProps {
  navigateTo: (page: Page, id?: string) => void;
}

const links = [
  { name: '정착지원', id: 'support', icon: <HandshakeIcon className="w-7 h-7" /> },
  { name: '교육', id: 'education', icon: <BookOpenIcon className="w-7 h-7" /> },
  { name: '행사', id: 'activities', icon: <CalendarDaysIcon className="w-7 h-7" /> },
  { name: '봉사', id: 'volunteer', icon: <HeartIcon className="w-7 h-7" /> },
  { name: '상담', id: 'counseling', icon: <ChatBubbleLeftRightIcon className="w-7 h-7" /> },
  { name: '후원', id: 'support-nav', icon: <UsersIcon className="w-7 h-7" />, page: 'support' as const },
  /* Fixed: Removed redundant type cast as 'news' is now a valid Page type in App.tsx */
  { name: '자료실', id: 'news-nav', icon: <ClockIcon className="w-7 h-7" />, page: 'news' as const },
  { name: '문의하기', id: 'contact-nav', icon: <HandshakeIcon className="w-7 h-7" />, page: 'contact' as const }
];

const QuickLinks: React.FC<QuickLinksProps> = ({ navigateTo }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">프로그램 바로가기</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-5">
          {links.map((link) => (
            <a
              key={link.name}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (link.page) navigateTo(link.page as Page);
                else navigateTo('activity-detail', link.id);
              }}
              className="group flex flex-col items-center justify-center bg-white text-center p-5 rounded-xl shadow-md hover:shadow-xl text-brand-primary hover:bg-brand-primary hover:text-white font-semibold transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mb-3 p-3 bg-brand-light rounded-full group-hover:bg-white/20 transition-colors">
                {React.cloneElement(link.icon, { className: 'w-8 h-8 text-brand-primary group-hover:text-white transition-colors' })}
              </div>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
