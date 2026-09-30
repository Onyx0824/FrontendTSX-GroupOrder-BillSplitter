import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';
import {
  isStrongPassword,
  validateRequiredFields,
} from '../utils/validation';

interface SignUpProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
}

export const SignUp: React.FC<SignUpProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
}) => {
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isZh = currentLang === 'zh-TW';

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateRequiredFields(
      [
        { value: nickname, label: isZh ? '暱稱' : 'Nickname' },
        { value: phone, label: isZh ? '電話號碼' : 'Phone number' },
        { value: email, label: isZh ? '電子郵件' : 'Email' },
        { value: password, label: isZh ? '密碼' : 'Password' },
        { value: confirmPassword, label: isZh ? '確認密碼' : 'Confirm password' },
      ],
      isZh,
    )) {
      return;
    }
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert(isZh ? '請輸入有效的電子郵件。' : 'Please enter a valid email address.');
      return;
    }
  
    if (!isStrongPassword(password)) {
      alert(
        isZh
          ? '密碼至少 12 個字元，並包含英文大小寫、數字及符號。'
          : 'Password must be at least 12 characters and include uppercase, lowercase, a number, and a symbol.',
      );
      return;
    }
  
    if (password !== confirmPassword) {
      alert(isZh ? '兩次輸入的密碼不一致。' : 'Passwords do not match.');
      return;
    }
  
    onNavigate('sign-in');
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '註冊' : 'Sign Up'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <Box component="form" onSubmit={handleSignUpSubmit} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="form-group">
            <label>{isZh ? '暱稱' : 'Nickname'}</label>
            <input type="text" className="input-control" placeholder={isZh ? '輸入你的暱稱...' : 'Enter your nickname...'} value={nickname} onChange={(e) => setNickname(e.target.value)} />
          </div>

          <div className="form-group">
            <label>{isZh ? '電話號碼' : 'Phone Number'}</label>
            <input type="tel" className="input-control" placeholder={isZh ? '輸入你的電話號碼...' : 'Enter your phone number...'} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="form-group">
            <label>{isZh ? '電子郵件' : 'Email'}</label>
            <input type="email" className="input-control" placeholder={isZh ? '輸入你的電子郵件...' : 'Enter your email...'} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label>{isZh ? '密碼' : 'Password'}</label>
            <input type="password" className="input-control" placeholder={isZh ? '輸入你的密碼...' : 'Enter your password...'} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <label>{isZh ? '確認密碼' : 'Confirm Password'}</label>
            <input type="password" className="input-control" placeholder={isZh ? '確認你的密碼...' : 'Confirm your password...'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>

          <div className="btn-group">
            <button type="button" className="btn-primary" onClick={() => onNavigate('sign-in')}>
              {isZh ? '登入' : 'Sign in'}
            </button>
            <button type="submit" className="btn-primary">
              {isZh ? '確認' : 'Confirm'}
            </button>
          </div>
        </Box>
      </Box>

      <BottomNav
        currentLang={currentLang}
        currentTheme={currentTheme}
        onToggleLang={onToggleLang}
        onToggleTheme={onToggleTheme}
        onNavigate={onNavigate}
      />
    </Box>
  );
};