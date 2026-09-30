import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';
import { validateRequiredFields } from '../utils/validation';

interface SignInProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
}

export const SignIn: React.FC<SignInProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const isZh = currentLang === 'zh-TW';

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRequiredFields(
      [
        { value: email, label: isZh ? '電子郵件' : 'Email' },
        { value: password, label: isZh ? '密碼' : 'Password' },
      ],
      isZh,
    )) {
      return;
    }

    onNavigate('order-entry');
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(
      isZh
        ? '前端示範已完成；目前尚未連接寄信服務，需串接後端重設密碼 API 才能寄出連結。'
        : 'Demo complete. Email delivery is not connected yet; a password-reset API is needed.'
    );
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      {/* 頁頭大標題 */}
      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '登入' : 'Sign In'}
        </Typography>
      </Box>

      {/* 玻璃卡片 */}
      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column' }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSignInSubmit}
          sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          
          <div className="form-group">
            <label htmlFor="email">{isZh ? '電子郵件' : 'Email'}</label>
            <input
              type="email"
              id="email"
              className="input-control"
              placeholder={isZh ? '輸入你的電子郵件...' : 'Enter your email...'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{isZh ? '密碼' : 'Password'}</label>
            <input
              type="password"
              id="password"
              className="input-control"
              placeholder={isZh ? '輸入你的密碼...' : 'Enter your password...'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="forgot-password-link" onClick={() => { setResetEmail(email); setForgotOpen(true); }}>
              {isZh ? '忘記密碼？' : 'Forgot password?'}
            </button>
          </div>

          <div className="btn-group">
            <button type="button" className="btn-primary" onClick={() => onNavigate('sign-up')}>
              {isZh ? '註冊' : 'Sign up'}
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => onNavigate('join-group')}
            >
              {isZh ? '加入點餐團' : 'Join Group'}
            </button>
            <button type="submit" className="btn-primary">
              {isZh ? '確認' : 'Confirm'}
            </button>
          </div>
        </Box>
      </Box>

      {/* 忘記密碼 Modal */}
      <Modal open={forgotOpen} onClose={() => setForgotOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Box className="modal-card" sx={{ width: '100%', maxWidth: 350, p: 3, borderRadius: '26px', position: 'relative' }}>
          <button type="button" className="modal-close-btn" onClick={() => setForgotOpen(false)}>
            ×
          </button>
          <Typography variant="h2" className="section-title forgot-password-title" sx={{ fontSize: '16px', mb: 2 }}>
            {isZh ? '重設密碼' : 'Reset password'}
          </Typography>
          <p className="forgot-password-copy" style={{ fontSize: '13px', marginBottom: '18px' }}>
            {isZh ? '請輸入註冊帳號使用的電子郵件。' : 'Enter the email address associated with your account.'}
          </p>
                    <form onSubmit={handleForgotSubmit} className="forgot-password-form">
            <label>{isZh ? '電子郵件' : 'Email'}</label>
            <input
              type="email"
              className="input-control"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary" style={{ marginTop: '10px' }}>
              {isZh ? '送出' : 'Continue'}
            </button>
          </form>
          {statusMsg && <p className="forgot-password-status">{statusMsg}</p>}
        </Box>
      </Modal>

      {/* 底部導覽列 */}
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