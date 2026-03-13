
import React from 'react';
import KeywordGrid from '../components/KeywordGrid';
import { Page } from '../App';

interface ActivitiesPageProps {
  navigateTo: (page: Page, id?: string) => void;
}

const PageBanner: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
    <div className="bg-brand-light py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold text-brand-primary">{title}</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ navigateTo }) => {
    return (
        <>
            <PageBanner title="주요활동" subtitle="우리는 지역사회의 긍정적 변화를 위해 다음과 같은 핵심 사업들을 전개하고 있습니다." />
            <KeywordGrid navigateTo={navigateTo} />
             <section className="py-20 sm:py-28 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">더 알아보기</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        각 사업에 대한 자세한 내용과 참여 방법은 해당 페이지를 참고하시거나, 협회로 직접 문의해주시기 바랍니다.
                    </p>
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} className="mt-8 inline-block bg-brand-primary hover:bg-blue-800 text-white font-bold py-3.5 px-8 rounded-full text-lg shadow-xl transition-all transform hover:scale-105">
                        문의하기
                    </a>
                </div>
            </section>
        </>
    );
};

export default ActivitiesPage;
