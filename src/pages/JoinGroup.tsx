import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';
import React, { useEffect, useState } from 'react';
import {
  Html5QrcodeScanType,
  Html5QrcodeScanner,
} from 'html5-qrcode';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Typography, Modal } from '@mui/material';

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
  const [displayName, setDisplayName] = useState('');
  const isZh = currentLang === 'zh-TW';
  const [scannerOpen, setScannerOpen] = useState(false);

  const getInviteGroupId = (value: string) => {
    try {
      const url = new URL(value.trim());
      if (url.origin !== window.location.origin) return null;
      return url.searchParams.get('group');
    } catch {
      return null;
    }
  };
  
  useEffect(() => {
    if (!scannerOpen) return;

    let scanner: Html5QrcodeScanner | undefined;

    const timer = window.setTimeout(() => {
      scanner = new Html5QrcodeScanner(
        'join-qr-reader',
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
          supportedScanTypes: [
            Html5QrcodeScanType.SCAN_TYPE_CAMERA,
            Html5QrcodeScanType.SCAN_TYPE_FILE,
          ],
        },
        false,
      );

      scanner.render(
        (decodedText) => {
          if (!getInviteGroupId(decodedText)) {
            alert(isZh ? '這不是有效的點餐團邀請連結。' : 'Invalid group invite link.');
            return;
          }

          setInviteLink(decodedText);
          setScannerOpen(false);
        },
        (error) => console.error('QR scanner error:', error),
      );
    }, 0);

    return () => {
      window.clearTimeout(timer);
      if (scanner) {
        void scanner.clear().catch((error) =>
          console.error('QR scanner cleanup error:', error),
        );
      }
    };
  }, [scannerOpen, isZh]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!displayName.trim()) {
      alert(isZh ? '請輸入顯示名稱以加入點餐團！' : 'Please enter your display name!');
      return;
    }

    const joinedGroupId = getInviteGroupId(inviteLink);
    
    if (!joinedGroupId) {
      alert(isZh ? '請輸入有效的點餐團邀請連結。' : 'Please enter a valid group invite link.');
      return;
    }

    localStorage.setItem('user_display_name', displayName);
    localStorage.setItem('active_group_id', joinedGroupId);
    onNavigate('order-entry');
  };

  const [groupId] = useState(
    () => new URLSearchParams(window.location.search).get('group'),
  );

  const [inviteLink, setInviteLink] = useState(() =>
    groupId ? window.location.href : '',
  );

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
          <div className="qr-container">
            {inviteLink ? (
              <button
                type="button"
                className="join-qr-trigger"
                onClick={() => setScannerOpen(true)}
                aria-label={isZh ? '點擊以掃描 QR Code' : 'Tap to scan a QR code'}
              >
                <span className="join-qr-paper">
                  <QRCodeSVG value={inviteLink} size={142} level="M" />
                </span>
                <span>{isZh ? '點擊 QR Code 開啟相機或相簿' : 'Tap QR code to open camera or photos'}</span>
              </button>
            ) : (
              <p className="join-qr-empty">
                {isZh ? '請貼上邀請連結以顯示 QR Code' : 'Paste an invite link to show its QR code'}
              </p>
            )}
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

            <Modal
              open={scannerOpen}
              onClose={() => setScannerOpen(false)}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
            >
              <Box className="modal-card join-scanner-modal">
                <Typography className="section-title">
                  {isZh ? '掃描點餐團 QR Code' : 'Scan Group QR Code'}
                </Typography>
                <div id="join-qr-reader" />
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => setScannerOpen(false)}
                >
                  {isZh ? '取消' : 'Cancel'}
                </button>
              </Box>
            </Modal>

      <BottomNav currentLang={currentLang} currentTheme={currentTheme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} onNavigate={onNavigate} />
    </Box>
  );
};