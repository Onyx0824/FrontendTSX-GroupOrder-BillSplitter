import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { Language, DashboardOrder } from '../types';
import { BottomNav } from '../components/BottomNav';
import { AccessTime } from '@mui/icons-material';

interface OrderDashboardProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  data: any;
}

export const OrderDashboard: React.FC<OrderDashboardProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const isZh = currentLang === 'zh-TW';
  const [isClosed, setIsClosed] = useState(false);
  const orders: DashboardOrder[] = data.dashboardOrders;

  const handleCloseOrders = () => {
    if (confirm(isZh ? '確定要提前截單嗎？截單後團員將無法修改訂單。' : 'Close orders early? Members will not be able to modify.')) {
      setIsClosed(true);
      alert(isZh ? '已鎖定訂單並發送截單推播！\n即將為您整理「店家下單總表」...' : 'Orders closed! Generating summary...');
      onNavigate('store-summary');
    }
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '訂單看板' : 'Order Dashboard'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        {/* 頂部統計指標數據條 */}
        <div className="dashboard-summary">
          <div className="summary-col">
            <div className="summary-label">TOTAL ORDERS</div>
            <div className="summary-value">5 Members</div>
          </div>
          <div className="summary-col">
            <div className="summary-label">TOTAL AMOUNT</div>
            <div className="summary-value green">$530</div>
          </div>
          <div className="summary-col">
            <div className="summary-label">STATUS / TIME LEFT</div>
            <div className="summary-value status-dot" style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="dot green" style={{ width: '8px', height: '8px', backgroundColor: isClosed ? '#c62828' : '#2e7d32', borderRadius: '50%', display: 'inline-block' }}></span>
                <span>{isClosed ? (isZh ? '已截單' : 'Closed') : (isZh ? '進行中' : 'Open')}</span>
              </div>
              <span style={{ fontSize: '11px', color: '#e67e22', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                <AccessTime sx={{ fontSize: 12 }} />
                {isZh ? '剩 2 小時 15 分' : '2h 15m left'}
              </span>
            </div>
          </div>
        </div>

        {/* 訂單列表 */}
        <div className="dashboard-orders-list">
          {orders.map((order, index) => (
            <div className="board-item-card" key={index}>
              <div className="board-item-info">
                <div className="board-item-name">
                  <span>{isZh ? order.nameZh : order.nameEn}</span>
                </div>
                <div className="board-item-details">{order.items}</div>
              </div>
              <div className="board-item-right">
                <div className="board-item-price">${order.price}</div>
                <span className={`status-badge ${order.status}`}>
                  {order.status === 'confirmed' ? (isZh ? '已確認' : 'Confirmed') : (isZh ? '待確認' : 'Pending')}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 底部操作按鈕 */}
        <div className="btn-group" style={{ marginTop: 'auto', paddingTop: '15px', justifyContent: 'center' }}>
          <button 
            type="button" 
            className="btn-primary" 
            id="btn-close-orders" 
            onClick={handleCloseOrders}
            disabled={isClosed}
            style={{ opacity: isClosed ? 0.5 : 1 }}
          >
            {isZh ? '關閉訂單' : 'Close Orders'}
          </button>
        </div>

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