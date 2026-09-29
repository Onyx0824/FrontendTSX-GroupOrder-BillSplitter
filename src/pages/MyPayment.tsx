import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';
import { ContentCopy } from '@mui/icons-material';

interface MyPaymentProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  data: any;
}

export const MyPayment: React.FC<MyPaymentProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const isZh = currentLang === 'zh-TW';
  const paymentData = data.myPayment;
  const [status, setStatus] = useState(paymentData.status);

  const handleMarkPaid = () => {
    setStatus('PAID');
    alert(isZh ? '已成功通知團長你已完成付款！' : 'Notified leader that you have paid!');
  };

  const copyAccount = () => {
    navigator.clipboard.writeText(paymentData.paymentInfo.account);
    alert(isZh ? '帳號已複製！' : 'Account copied!');
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '我要付多少' : 'My Payment'}
        </Typography>
      </Box>

      {/* 上方應付總額突出卡片 */}
      <div className="payment-hero-card">
        <div className="hero-label">{isZh ? '你需要付' : 'You Owe'}</div>
        <div className="hero-amount">${paymentData.totalAmount}</div>
        <div className="hero-subtext">{isZh ? paymentData.groupNameZh : paymentData.groupNameEn}</div>
        <span className={`status-badge ${status === 'PAID' ? 'confirmed' : 'pending'}`} style={{ fontSize: '10px', padding: '2px 8px', marginTop: '4px' }}>
          {status === 'PAID' ? (isZh ? '已付款' : 'PAID') : (isZh ? '未付款' : 'UNPAID')}
        </span>
      </div>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        <div className="menu-section-header" style={{ marginBottom: '8px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '金額明細' : 'Breakdown'}</h2>
        </div>

        <div className="menu-items-list">
          {paymentData.items.map((item: any, idx: number) => (
            <div className="list-item" key={idx} style={{ padding: '9px 16px' }}>
              <span className="item-title" style={{ fontSize: '14px' }}>{isZh ? item.nameZh : item.nameEn}</span>
              <span className="price green" style={{ fontSize: '14px' }}>${item.price}</span>
            </div>
          ))}
        </div>

        <div className="menu-items-list" style={{ marginTop: '4px', marginBottom: '12px' }}>
          <div className="list-item" style={{ padding: '9px 16px' }}>
            <span className="item-title" style={{ fontWeight: 600, fontSize: '14px' }}>{isZh ? '餐點小計' : 'Food Subtotal'}</span>
            <span className="price green" style={{ fontSize: '14px' }}>${paymentData.foodSubtotal}</span>
          </div>
          <div className="list-item" style={{ padding: '9px 16px' }}>
            <span className="item-title" style={{ fontSize: '13px', color: 'var(--text-placeholder)' }}>{isZh ? paymentData.deliveryFee.nameZh : paymentData.deliveryFee.nameEn}</span>
            <span className="price green" style={{ fontSize: '13px' }}>+${paymentData.deliveryFee.amount}</span>
          </div>
          <div className="list-item" style={{ padding: '9px 16px' }}>
            <span className="item-title" style={{ fontSize: '13px', color: '#387b28' }}>{isZh ? paymentData.discount.nameZh : paymentData.discount.nameEn}</span>
            <span className="price green" style={{ fontSize: '13px', color: '#387b28' }}>-${Math.abs(paymentData.discount.amount)}</span>
          </div>
        </div>

        <div className="list-item" style={{ justifyContent: 'space-between', backgroundColor: 'rgba(255, 255, 255, 0.28)', marginBottom: '14px' }}>
          <span className="item-title" style={{ fontWeight: 'bold' }}>{isZh ? '應付總額' : 'Total Due'}</span>
          <span className="price green" style={{ fontSize: '17px' }}>${paymentData.totalAmount}</span>
        </div>

        <div className="menu-section-header" style={{ marginBottom: '8px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '收款資訊' : 'Payment Info'}</h2>
        </div>

        <div className="payment-info-box">
          <div className="payment-info-row">
            <span className="label">{isZh ? '付款對象' : 'Pay to'}</span>
            <span className="value">{isZh ? paymentData.paymentInfo.payToZh : paymentData.paymentInfo.payToEn}</span>
          </div>
          <div className="payment-info-row">
            <span className="label">{isZh ? '付款方式' : 'Method'}</span>
            <span className="value">{isZh ? paymentData.paymentInfo.methodZh : paymentData.paymentInfo.methodEn}</span>
          </div>
          <div className="payment-info-row">
            <span className="label">{isZh ? '帳號' : 'Account'}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="value" style={{ fontFamily: 'monospace', fontSize: '13px' }}>{paymentData.paymentInfo.account}</span>
              <button type="button" className="edit-icon-btn" onClick={copyAccount} style={{ color: 'var(--price-green)' }}>
                <ContentCopy sx={{ fontSize: 14 }} />
              </button>
            </div>
          </div>
        </div>

        <button 
          type="button" 
          className="btn-primary invoice-confirm-btn" 
          id="btn-mark-paid"
          onClick={handleMarkPaid}
          disabled={status === 'PAID'}
          style={{ opacity: status === 'PAID' ? 0.6 : 1 }}
        >
          {isZh ? '標記已付款' : 'Mark as Paid'}
        </button>

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