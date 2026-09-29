import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Language, SplitRule, SplitMember } from '../types';
import { BottomNav } from '../components/BottomNav';

interface SplitSettingsProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  data: any;
}

export const SplitSettings: React.FC<SplitSettingsProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const isZh = currentLang === 'zh-TW';
  const splitData = data.splitSettings;

  const handleConfirmSplit = () => {
    alert(isZh ? '拆帳結果已確認並成功發送收款通知給所有成員！' : 'Split bill confirmed and payment notices sent!');
    onNavigate('my-group');
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '拆帳設定' : 'Split Settings'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        <div className="menu-section-header" style={{ marginBottom: '8px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '分攤規則' : 'Splitting Rules'}</h2>
        </div>

        <div className="menu-items-list" style={{ marginBottom: '16px' }}>
          {splitData.rules.map((rule: SplitRule, index: number) => {
            const amtText = rule.amount !== null ? (rule.amount < 0 ? `-$${Math.abs(rule.amount)}` : `+$${rule.amount}`) : '';
            return (
              <div className="list-item" key={index} style={{ padding: '10px 16px' }}>
                <span className="item-title">
                  {isZh ? `${rule.nameZh} ${amtText}` : `${rule.nameEn} ${amtText}`}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-placeholder)', fontStyle: 'italic' }}>
                  {isZh ? rule.ruleZh : rule.ruleEn}
                </span>
              </div>
            );
          })}
        </div>

        <div className="menu-section-header" style={{ marginBottom: '8px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '拆帳結果' : 'Split Result'}</h2>
        </div>

        <div className="menu-items-list">
          {splitData.members.map((member: SplitMember, index: number) => (
            <div className="list-item" key={index} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span className="item-title" style={{ fontWeight: 600 }}>{isZh ? member.nameZh : member.nameEn}</span>
                <span className="price green" style={{ fontSize: '16px' }}>${member.total}</span>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-placeholder)' }}>{isZh ? member.detailsZh : member.detailsEn}</div>
            </div>
          ))}
        </div>

        <div className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px', marginTop: '10px', backgroundColor: 'rgba(255, 255, 255, 0.28)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <span className="item-title" style={{ fontWeight: 'bold' }}>{isZh ? '應付總額' : 'Total Due'}</span>
            <span className="price green" style={{ fontSize: '17px' }}>${splitData.totalDue}</span>
          </div>
        </div>

        <button type="button" className="btn-primary invoice-confirm-btn" onClick={handleConfirmSplit} style={{ marginTop: '16px' }}>
          {isZh ? '確認並送出' : 'Confirm & Send'}
        </button>

      </Box>

      <BottomNav currentLang={currentLang} currentTheme={currentTheme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} onNavigate={onNavigate} />
    </Box>
  );
};