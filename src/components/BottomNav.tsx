// src/components/BottomNav.tsx
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { 
  DarkMode, 
  LightMode, 
  AttachMoney, 
  ListAlt, 
  AddBox, 
  Person 
} from '@mui/icons-material';
import type { Language, ThemeMode } from '../types';

interface BottomNavProps {
  currentLang: Language;
  currentTheme: ThemeMode;
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
}) => {
  const isDark = currentTheme === 'dark';

  return (
    <Box
      component="nav"
      className="bottom-nav"
      sx={{
        width: '100vw',
        maxWidth: 414,
        height: 52,
        background: isDark ? 'rgba(35, 47, 54, 0.9)' : 'rgba(230, 240, 242, 0.55)',
        backdropFilter: 'blur(14px)',
        borderRadius: '26px',
        border: '1px solid rgba(255, 255, 255, 0.7)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: '10px',
        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.25)',
        flexShrink: 0,
        my: 1,
      }}
    >
      {/* 主題切換按鈕 */}
      <IconButton
        className="nav-item theme-btn"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
        sx={{ width: 48, height: 38, borderRadius: '12px', background: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)', color: 'var(--text-main)' }}
      >
        {isDark ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
      </IconButton>

      <IconButton className="nav-item" onClick={() => onNavigate('my-payment')} sx={{ color: 'var(--text-main)' }}>
        <AttachMoney />
      </IconButton>

      <IconButton className="nav-item" onClick={() => onNavigate('my-group')} sx={{ color: 'var(--text-main)' }}>
        <ListAlt />
      </IconButton>

      <IconButton className="nav-item" onClick={() => onNavigate('create-group')} sx={{ color: 'var(--text-main)' }}>
        <AddBox />
      </IconButton>

      <IconButton className="nav-item" onClick={() => onNavigate('sign-in')} sx={{ color: 'var(--text-main)' }}>
        <Person />
      </IconButton>

      {/* 語言切換按鈕 */}
      <Box
        component="button"
        className="nav-item lang-btn"
        onClick={onToggleLang}
        sx={{
          fontSize: '12px',
          fontWeight: 'bold',
          background: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
          flex: '0 0 48px',
          width: 48,
          height: 38,
          border: 'none',
          borderRadius: '12px',
          cursor: 'pointer',
          color: 'var(--text-main)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {currentLang === 'en' ? '中文' : 'EN'}
      </Box>
    </Box>
  );
};