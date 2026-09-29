import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';

interface MyOrderingGroupProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  data: any;
}

export const MyOrderingGroup: React.FC<MyOrderingGroupProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const isZh = currentLang === 'zh-TW';
  const groupData = data.myGroup;

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '我的點餐團' : 'My Ordering Group'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        <h2 className="section-title">{isZh ? '進行中' : 'In Progress'}</h2>
        <div className="menu-items-list">
          {groupData.inProgress.map((item: any, idx: number) => (
            <div className="list-item" key={idx} onClick={() => onNavigate('order-board')} style={{ cursor: 'pointer' }}>
              <div className="item-title">
                {item.date} &nbsp;&nbsp;&nbsp;&nbsp; 
                <span>{isZh ? item.nameZh : item.nameEn}</span>
              </div>
              <div className="price green">${item.price}</div>
            </div>
          ))}
        </div>

        <h2 className="section-title" style={{ marginTop: '14px' }}>{isZh ? '歷史紀錄' : 'History'}</h2>
        <div className="menu-items-list">
          {groupData.history.map((item: any, idx: number) => (
            <div className="list-item" key={idx}>
              <div className="item-title">
                {item.date} &nbsp;&nbsp;&nbsp;&nbsp; 
                <span>{isZh ? item.nameZh : item.nameEn}</span>
              </div>
              <div className="price green">${item.price}</div>
            </div>
          ))}
        </div>

        <div className="pagination-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px' }}>
          <button type="button" className="btn-primary" style={{ flex: 'initial', width: '32%', padding: '8px 0', fontSize: '13px' }}>
            {isZh ? '上一頁' : 'Previous'}
          </button>
          <span style={{ fontStyle: 'italic', fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}>1 / 1</span>
          <button type="button" className="btn-primary" style={{ flex: 'initial', width: '32%', padding: '8px 0', fontSize: '13px' }}>
            {isZh ? '下一頁' : 'Next'}
          </button>
        </div>

      </Box>

      <BottomNav currentLang={currentLang} currentTheme={currentTheme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} onNavigate={onNavigate} />
    </Box>
  );
};