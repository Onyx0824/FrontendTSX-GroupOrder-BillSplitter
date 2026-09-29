import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';
import { ContentCopy, ArrowForward } from '@mui/icons-material';

interface StoreSummaryProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
}

export const StoreSummary: React.FC<StoreSummaryProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
}) => {
  const isZh = currentLang === 'zh-TW';

  const handleCopySummary = () => {
    const orderText = "您好，我要外帶：\n1. 珍珠奶茶(大/少冰/半糖) x3\n2. 拿鐵(去冰) x2";
    navigator.clipboard.writeText(orderText);
    alert(isZh ? '下單明細已複製到剪貼簿！' : 'Order summary copied!');
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '下單總表' : 'Order Summary'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        <div className="menu-section-header">
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '向店家下單品項' : 'Items to Order'}</h2>
          <span className="count-badge">Total: 5 items</span>
        </div>

        <div className="menu-items-list" style={{ marginTop: '10px' }}>
          <div className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span className="item-title" style={{ fontWeight: 600 }}>珍珠奶茶 (大杯/少冰/半糖)</span>
              <span className="price green" style={{ fontSize: '16px' }}>× 3</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-placeholder)' }}>小美, 小依, 團長</div>
          </div>
          <div className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span className="item-title" style={{ fontWeight: 600 }}>拿鐵 (去冰)</span>
              <span className="price green" style={{ fontSize: '16px' }}>× 2</span>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-placeholder)' }}>小明, 小華</div>
          </div>
        </div>

        <div className="btn-group" style={{ flexDirection: 'column', gap: '12px', marginTop: 'auto', paddingTop: '15px' }}>
          <button type="button" className="btn-primary" onClick={handleCopySummary} style={{ background: 'rgba(255, 255, 255, 0.75)', width: '100%' }}>
            <ContentCopy sx={{ mr: 1, fontSize: 16 }} />
            {isZh ? '複製下單文字' : 'Copy Order Text'}
          </button>
          <button type="button" className="btn-primary invoice-confirm-btn" onClick={() => onNavigate('invoice-match')} style={{ width: '100%' }}>
            {isZh ? '拿到發票，開始對帳' : 'Next: Invoice Match'}
            <ArrowForward sx={{ ml: 1, fontSize: 16 }} />
          </button>
        </div>

      </Box>

      <BottomNav currentLang={currentLang} currentTheme={currentTheme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} onNavigate={onNavigate} />
    </Box>
  );
};