
import React, { useState } from 'react';
import { Page } from '../App';
import { supabase } from '../supabase';
import { HeartIcon } from '../components/icons';

interface LoginPageProps {
  navigateTo: (page: Page) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ navigateTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigateTo('home');
    } catch (err: any) {
      setError(err.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-10 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 bg-brand-secondary rounded-2xl shadow-xl shadow-green-900/20 mb-6">
              <HeartIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-black text-brand-primary">다시 오신 것을 환영합니다</h1>
            <p className="text-gray-400 font-bold mt-2">충북음성새터민협회 서비스 이용을 위해 로그인하세요</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-brand-secondary/10 focus:border-brand-secondary outline-none transition-all font-bold"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-black text-gray-700 uppercase tracking-widest">Password</label>
                <a href="#" className="text-xs font-bold text-brand-secondary hover:underline">비밀번호 찾기</a>
              </div>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-brand-secondary/10 focus:border-brand-secondary outline-none transition-all font-bold"
                placeholder="••••••••"
              />
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">{error}</div>}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-brand-primary text-white font-black py-5 rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 font-bold">
              계정이 없으신가요? 
              <button onClick={() => navigateTo('signup')} className="ml-2 text-brand-secondary font-black hover:underline">회원가입</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
