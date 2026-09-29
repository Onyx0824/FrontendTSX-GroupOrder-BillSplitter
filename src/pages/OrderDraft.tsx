import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { Language, DraftItem } from '../types';
import { BottomNav } from '../components/BottomNav';
import { Warning } from '@mui/icons-material';

interface OrderDraftProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  data: any;
}

export const OrderDraft: React.FC<OrderDraftProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const isZh = currentLang === 'zh-TW';
  const [items, setItems] = useState<DraftItem[]>(data.orderDraft.items || []);

  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const pendingCount = items.filter(i => i.needsInput).length;

  const handleFixItem = (index: number) => {
    const item = items[index];
    if (item.needsInput) {
      const input = prompt(isZh ? `請補充 ${item.nameZh} 的規格（大小與冰量）：` : `Please enter options:`, "大杯、少冰");
      if (input) {
        const updated = [...items];
        updated[index] = {
          ...item,
          needsInput: false,
          price: 70,
          detailsEn: 'Qty: 1 · Size: Large · Ice: Less',
          detailsZh: `數量: 1 · 規格: ${input}`
        };
        setItems(updated);
      }
    }
  };

  const handleConfirmSend = () => {
    if (items.some(i => i.needsInput)) {
      alert(isZh ? '還有餐點尚未補充完整規格，請先補充完畢！' : 'Please complete item details first!');
      return;
    }
    alert(isZh ? '訂單已成功送出給團長！' : 'Order submitted successfully!');
    onNavigate('my-orders');
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <div className="header-group" style={{ justifyContent: 'space-between', padding: '0 10px', width: '100%' }}>
        <div style={{ width: '60px' }}></div>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '訂單草稿' : 'Draft Order'}
        </Typography>
        <div style={{ width: '60px', textAlign: 'right' }}>
          <span className="edited-badge">EDITED</span>
        </div>
      </div>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        <div className="menu-section-header" style={{ marginBottom: '8px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '訂單項目' : 'Order Items'}</h2>
        </div>

        <div className="menu-items-list" style={{ marginBottom: '12px' }}>
          {items.map((item, index) => (
            <div className="list-item" key={index} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span className="item-title" style={{ fontWeight: 600 }}>{isZh ? item.nameZh : item.nameEn}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="price green" style={{ fontSize: '15px' }}>${item.price}</span>
                  <span className="item-check-square"></span>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-placeholder)' }}>{isZh ? item.detailsZh : item.detailsEn}</div>
              {item.needsInput && (
                <div className="warning-text" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: '6px', background: 'rgba(211, 47, 47, 0.08)', padding: '6px 10px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Warning sx={{ fontSize: 13 }} />
                    <span>{isZh ? item.warningZh : item.warningEn}</span>
                  </div>
                  <button type="button" className="btn-primary btn-danger" onClick={() => handleFixItem(index)} style={{ flex: 'none', minWidth: 'auto', padding: '4px 14px', fontSize: '11px', borderRadius: '12px', margin: 0 }}>
                    {isZh ? '點擊補齊' : 'Fix'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="list-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px', backgroundColor: 'rgba(255, 255, 255, 0.28)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <span className="item-title" style={{ fontWeight: 'bold' }}>{isZh ? '小計' : 'Subtotal'}</span>
            <span className="price green" style={{ fontSize: '17px' }}>${subtotal}</span>
          </div>
          <div style={{ fontSize: '11px', color: '#e67e22', fontWeight: 500 }}>
            {pendingCount} {isZh ? '項待確認' : 'item needs review'}
          </div>
        </div>

      </Box>

      <div className="btn-group" style={{ marginBottom: '15px' }}>
        <button type="button" className="btn-primary" onClick={() => onNavigate('order-entry')} style={{ background: 'rgba(255, 255, 255, 0.65)' }}>
          {isZh ? '編輯項目' : 'Edit Items'}
        </button>
        <button type="button" className="btn-primary" onClick={handleConfirmSend}>
          {isZh ? '確認送出' : 'Confirm & Send'}
        </button>
      </div>

      <BottomNav currentLang={currentLang} currentTheme={currentTheme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} onNavigate={onNavigate} />
    </Box>
  );
};