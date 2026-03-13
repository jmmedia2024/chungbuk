
import React, { useState } from 'react';
import { Page } from '../App';
import { supabase } from '../supabase';
import { HeartIcon } from '../components/icons';

interface SignUpPageProps {
  navigateTo: (page: Page) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ navigateTo }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const lowerEmail = email.toLowerCase();
      const assignedLevel = lowerEmail === 'nkjoy@naver.com' ? 10 : 1;
      const assignedName = lowerEmail === 'nkjoy@naver.com' ? '관리자' : fullName;

      // 1. Supabase Auth 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: assignedName,
            level: assignedLevel,
          }
        }
      });

      if (authError) throw authError;

      // 2. profiles 테이블에 정보 삽입 (DB 연동의 핵심)
      if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').upsert([{
          id: authData.user.id,
          email: lowerEmail,
          full_name: assignedName,
          level: assignedLevel,
        }]);
        
        if (profileError) {
          console.warn("프로필 테이블 저장 실패(RLS 확인 필요):", profileError.message);
        }
      }

      alert(assignedLevel === 10 ? '관리자 계정 등록 성공! 로그인 해주세요.' : '가입 완료! 로그인 해주세요.');
      navigateTo('login');
    } catch (err: any) {
      setError(err.message || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-10 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-brand-secondary rounded-2xl shadow-xl mb-6">
              <HeartIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-brand-primary">새로운 시작</h1>
            <p className="text-gray-400 font-bold mt-2">충북음성새터민협회 가입</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold"
                placeholder="홍길동"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl font-bold"
                placeholder="••••••••"
              />
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">{error}</div>}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-brand-secondary text-white font-black py-5 rounded-2xl shadow-xl hover:bg-green-700 transition-all ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? '처리 중...' : '회원가입 완료'}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 font-bold">
              계정이 있나요? 
              <button onClick={() => navigateTo('login')} className="ml-2 text-brand-secondary font-black hover:underline">로그인</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
