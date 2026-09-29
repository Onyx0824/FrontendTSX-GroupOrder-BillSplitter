import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { Language, PaymentPerson } from '../types';
import { BottomNav } from '../components/BottomNav';

interface PaymentTrackingProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  data: any;
}

export const PaymentTracking: React.FC<PaymentTrackingProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const isZh = currentLang === 'zh-TW';
  const paymentTrackingData = data.paymentTracking;

  const [collected, setCollected] = useState<PaymentPerson[]>(paymentTrackingData.collected || []);
  const [pending, setPending] = useState<PaymentPerson[]>(paymentTrackingData.pending || []);

  const sumCollected = collected.reduce((acc, item) => acc + item.amount, 0);
  const sumPending = pending.reduce((acc, item) => acc + item.amount, 0);
  const sumTotal = sumCollected + sumPending;

  const markAsPaid = (index: number) => {
    const paidItem = pending[index];
    if (paidItem) {
      setPending(pending.filter((_, i) => i !== index));
      setCollected([...collected, paidItem]);
    }
  };

  const handleSendReminder = () => {
    if (pending.length === 0) {
      alert(isZh ? '所有成員皆已完成付款！' : 'All members have paid!');
    } else {
      const names = pending.map(i => isZh ? i.nameZh : i.nameEn).join('、');
      alert(isZh ? `已向待付款成員（${names}）發送催款提醒！` : `Payment reminder sent to ${names}!`);
    }
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '收款追蹤' : 'Payment Tracking'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        <div className="dashboard-summary" style={{ marginBottom: '16px' }}>
          <div className="summary-col">
            <span className="summary-label">{isZh ? '已收' : 'COLLECTED'}</span>
            <span className="summary-value green">${sumCollected}</span>
          </div>
          <div className="summary-col">
            <span className="summary-label">{isZh ? '待收' : 'PENDING'}</span>
            <span className="summary-value" style={{ color: '#e67e22' }}>${sumPending}</span>
          </div>
          <div className="summary-col">
            <span className="summary-label">{isZh ? '總計' : 'TOTAL'}</span>
            <span className="summary-value" style={{ fontWeight: 'bold' }}>${sumTotal}</span>
          </div>
        </div>

        <div className="menu-section-header" style={{ marginBottom: '8px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '已收款' : 'Collected'}</h2>
        </div>

        <div className="menu-items-list" style={{ marginBottom: '14px' }}>
          {collected.map((item, idx) => (
            <div className="list-item" key={idx}>
              <span className="item-title" style={{ fontWeight: 500 }}>{isZh ? item.nameZh : item.nameEn}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="price green" style={{ fontSize: '15px' }}>${item.amount}</span>
                <span className="status-badge confirmed">{isZh ? '已付' : 'Paid'}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="menu-section-header" style={{ marginBottom: '8px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '待收款' : 'Pending'}</h2>
        </div>

        <div className="menu-items-list">
          {pending.map((item, idx) => (
            <div className="list-item" key={idx} style={{ cursor: 'pointer' }} onClick={() => markAsPaid(idx)}>
              <span className="item-title" style={{ fontWeight: 500 }}>{isZh ? item.nameZh : item.nameEn}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="price green" style={{ fontSize: '15px' }}>${item.amount}</span>
                <span className="status-badge pending">{isZh ? '未付' : 'Unpaid'}</span>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn-primary invoice-confirm-btn" onClick={handleSendReminder} style={{ marginTop: 'auto' }}>
          {isZh ? '發送催款' : 'Send Reminder'}
        </button>

      </Box>

      <BottomNav currentLang={currentLang} currentTheme={currentTheme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} onNavigate={onNavigate} />
    </Box>
  );
};