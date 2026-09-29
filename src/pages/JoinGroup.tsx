import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';
import { CameraAlt } from '@mui/icons-material';

interface JoinGroupProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
}

export const JoinGroup: React.FC<JoinGroupProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
}) => {
  const [inviteLink, setInviteLink] = useState('');
  const [displayName, setDisplayName] = useState('');
  const isZh = currentLang === 'zh-TW';

  const handleScanQr = () => {
    setInviteLink('https://order.example.com/join?group=888');
    alert(isZh ? '相機掃描成功！已自動帶入點餐團邀請連結。' : 'Camera QR Code scanned successfully!');
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      alert(isZh ? '請輸入顯示名稱以加入點餐團！' : 'Please enter your display name!');
      return;
    }
    localStorage.setItem('user_display_name', displayName);
    alert(isZh ? `歡迎 ${displayName}！已成功加入點餐團。` : `Welcome ${displayName}! Joined group successfully.`);
    onNavigate('order-entry');
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '加入點餐團' : 'Join Group'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column' }}>
        <Box component="form" onSubmit={handleJoin} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

          <div className="qr-container" onClick={handleScanQr} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '12px', cursor: 'pointer' }}>
            <div className="qr-box" style={{ width: '170px', height: '170px', background: '#ffffff', borderRadius: '32px', padding: '14px', border: '3px solid #ffde9c', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div className="dummy-qr-bg"></div>
            </div>
            <div className="qr-hint" style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.95)', fontWeight: 'bold', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CameraAlt sx={{ fontSize: 14 }} />
              <span>TAP TO SCAN QR CODE</span>
            </div>
          </div>

          <div className="divider-text" style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-placeholder)', margin: '6px 0 12px 0', fontStyle: 'italic' }}>
            {isZh ? '或' : 'or'}
          </div>

          <div className="form-group">
            <label>{isZh ? '邀請連結' : 'Invite Link'}</label>
            <input 
              type="text" 
              className="input-control" 
              placeholder={isZh ? '貼上連結...' : 'Paste link here...'} 
              value={inviteLink}
              onChange={(e) => setInviteLink(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>{isZh ? '顯示名稱' : 'Display Name'}</label>
            <input 
              type="text" 
              className="input-control" 
              placeholder={isZh ? '輸入你的名稱...' : 'Enter your name...'} 
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-placeholder)', margin: '4px 0 14px 0', fontStyle: 'italic' }}>
            {isZh ? '不需要帳號，填名字就能加入！' : 'No account needed — just enter a name to join!'}
          </div>

          <button type="submit" className="btn-primary invoice-confirm-btn" style={{ marginTop: 'auto', width: '100%' }}>
            {isZh ? '加入點餐團' : 'Join Group'}
          </button>

        </Box>
      </Box>

      <BottomNav currentLang={currentLang} currentTheme={currentTheme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} onNavigate={onNavigate} />
    </Box>
  );
};