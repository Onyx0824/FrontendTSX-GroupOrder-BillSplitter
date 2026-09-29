import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';
import { Link, ContentCopy } from '@mui/icons-material';

interface CreateGroupProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
}

export const CreateGroup: React.FC<CreateGroupProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
}) => {
  const [groupName, setGroupName] = useState('');
  const [store, setStore] = useState('');
  const [deadline, setDeadline] = useState('2026-10-31 12:00 PM');
  const [splitRule, setSplitRule] = useState('go-dutch');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const isZh = currentLang === 'zh-TW';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShareModalOpen(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://order.example.com/join?group=888');
    alert(isZh ? '邀請連結已複製！' : 'Invite link copied!');
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '建立點餐團' : 'Create Group'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="form-group">
            <label>{isZh ? '團名' : 'Group Name'}</label>
            <input
              type="text"
              className="input-control"
              placeholder={isZh ? '輸入團名...' : 'Enter group name...'}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>{isZh ? '店家' : 'Store'}</label>
            <input
              type="text"
              className="input-control"
              placeholder={isZh ? '搜尋或輸入店家...' : 'Search or enter store...'}
              value={store}
              onChange={(e) => setStore(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label>{isZh ? '截止時間' : 'Deadline'}</label>
            <input
              type="text"
              className="input-control"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              style={{ cursor: 'pointer' }}
            />
          </div>

          <div className="form-group">
            <label>{isZh ? '分攤規則' : 'Splitting Rules'}</label>
            <select
              className="select-control"
              value={splitRule}
              onChange={(e) => setSplitRule(e.target.value)}
            >
              <option value="go-dutch">{isZh ? '均分' : 'Go Dutch'}</option>
              <option value="by-item">{isZh ? '按品項' : 'By Item'}</option>
            </select>
          </div>

          <div className="btn-group" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="btn-primary" style={{ maxWidth: '200px' }}>
              {isZh ? '建立' : 'Create'}
            </button>
          </div>
        </Box>
      </Box>

      {/* 分享彈窗 */}
      <Modal open={shareModalOpen} onClose={() => setShareModalOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Box className="modal-card" sx={{ width: '100%', maxWidth: 350, p: 3, borderRadius: '26px', textAlign: 'center' }}>
          <Typography variant="h3" className="section-title" sx={{ mt: 0, mb: 2 }}>
            {isZh ? '點餐團已建立！' : 'Group Created!'}
          </Typography>
          <div className="qr-box" style={{ margin: '0 auto 15px auto', width: '150px', height: '150px' }}>
            <div className="dummy-qr-bg"></div>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-placeholder)', marginBottom: '20px' }}>
            {isZh ? '請將此 QR Code 或連結分享給成員點餐。' : 'Share this QR code or link with members.'}
          </p>
          <div className="btn-group" style={{ flexDirection: 'column', gap: '10px' }}>
            <button type="button" className="btn-primary" onClick={handleCopyLink} style={{ width: '100%' }}>
              <ContentCopy sx={{ mr: 1, fontSize: 16 }} />
              {isZh ? '複製邀請連結' : 'Copy Invite Link'}
            </button>
            <button type="button" className="btn-primary" style={{ background: 'rgba(255, 255, 255, 0.5)', width: '100%' }} onClick={() => onNavigate('order-board')}>
              {isZh ? '進入訂單看板' : 'Go to Dashboard'}
            </button>
          </div>
        </Box>
      </Modal>

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