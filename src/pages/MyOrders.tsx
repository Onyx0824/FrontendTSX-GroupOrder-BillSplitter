import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';

interface MyOrdersProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  data: any;
}

export const MyOrders: React.FC<MyOrdersProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const isZh = currentLang === 'zh-TW';
  const myOrdersData = data.myOrders;
  const [activeItems, setActiveItems] = useState(myOrdersData.activeGroup.items);

  const subtotal = activeItems.reduce((sum: number, i: any) => sum + i.price, 0);

  const handleCancelOrder = () => {
    if (confirm(isZh ? '確定要取消這筆訂單嗎？' : 'Are you sure you want to cancel this order?')) {
      setActiveItems([]);
      alert(isZh ? '訂單已成功取消。' : 'Order cancelled successfully.');
    }
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <div className="header-group" style={{ justifyContent: 'space-between', padding: '0 10px', width: '100%' }}>
        <div style={{ width: '70px' }}></div>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '我的訂單' : 'My Orders'}
        </Typography>
        <div style={{ width: '70px', textAlign: 'right' }}>
          <span className="status-badge confirmed" style={{ fontSize: '10px', padding: '3px 8px' }}>
            {isZh ? '已確認' : 'CONFIRMED'}
          </span>
        </div>
      </div>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        <div className="menu-section-header" style={{ marginBottom: '8px' }}>
          <h2 className="section-title" style={{ margin: 0, fontSize: '15px' }}>
            {isZh ? '陽光咖啡 • 10/31' : 'Sunny Café • 10/31'}
          </h2>
        </div>

        <div className="menu-items-list" style={{ marginBottom: '12px' }}>
          {activeItems.length === 0 ? (
            <p style={{ fontSize: '13px', color: 'var(--text-placeholder)', textAlign: 'center', padding: '10px' }}>
              {isZh ? '目前無進行中的點餐' : 'No active items'}
            </p>
          ) : (
            activeItems.map((item: any, idx: number) => (
              <div className="list-item" key={idx} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <span className="item-title" style={{ fontWeight: 600 }}>
                    {isZh ? item.nameZh : item.nameEn}
                  </span>
                  <span className="price green" style={{ fontSize: '15px' }}>${item.price}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-placeholder)' }}>
                  {isZh ? item.detailsZh : item.detailsEn}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="list-item" style={{ justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.28)', marginBottom: '16px' }}>
          <span className="item-title" style={{ fontWeight: 'bold' }}>{isZh ? '小計' : 'Subtotal'}</span>
          <span className="price green" style={{ fontSize: '17px' }}>${subtotal}</span>
        </div>

        <div className="menu-section-header" style={{ marginBottom: '8px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '歷史訂單' : 'Order History'}</h2>
        </div>

        <div className="menu-items-list">
          {myOrdersData.history.map((item: any, index: number) => (
            <div className="list-item" key={index} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span className="item-title">{isZh ? item.nameZh : item.nameEn}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="price green" style={{ fontSize: '15px' }}>${item.price}</span>
                  <span className="status-badge closed">{isZh ? item.statusZh : item.statusEn}</span>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-placeholder)' }}>{item.date}</div>
            </div>
          ))}
        </div>

      </Box>

      <div className="btn-group" style={{ marginBottom: '15px' }}>
        <button type="button" className="btn-primary" onClick={() => onNavigate('order-entry')} style={{ background: 'rgba(255, 255, 255, 0.75)' }}>
          {isZh ? '修改' : 'Modify'}
        </button>
        <button type="button" className="btn-primary btn-danger" onClick={handleCancelOrder}>
          {isZh ? '取消' : 'Cancel'}
        </button>
      </div>

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