import React, { useState } from 'react';
import { Box, Typography } from '@mui/material'; /* , Button */
import type { Language, MenuItem } from '../types';
import { BottomNav } from '../components/BottomNav';

interface OrderEntryProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string, state?: any) => void;
  data: any;
}

export const OrderEntry: React.FC<OrderEntryProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const [orderText, setOrderText] = useState('');
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const isZh = currentLang === 'zh-TW';
  const menuItems: MenuItem[] = data.menuItems;

  const handleQtyChange = (index: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[index] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [index]: next };
    });
  };

  const handleParse = () => {
    if (!orderText.trim()) {
      alert(isZh ? '請先輸入點餐內容！' : 'Please enter order text!');
      return;
    }
    menuItems.forEach((item, index) => {
      if (orderText.includes(item.nameZh) || (item.nameEn && orderText.toLowerCase().includes(item.nameEn.toLowerCase()))) {
        setQuantities(prev => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
      }
    });
    alert(isZh ? '已完成自然語言解析並更新草稿！' : 'Order parsed and draft updated!');
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '我要點餐' : 'Order Entry'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        <div className="form-group" style={{ marginBottom: '8px' }}>
          <label>{isZh ? '自然語言點餐 (文字輸入)' : 'Natural Language Order'}</label>
          <textarea
            className="input-control textarea-control"
            rows={3}
            placeholder={isZh ? '例如：我要一杯珍珠奶茶 微冰半糖...' : 'e.g. Bubble Tea x1, Less Ice...'}
            value={orderText}
            onChange={(e) => setOrderText(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" className="btn-primary" onClick={handleParse} style={{ flex: 'none', padding: '6px 18px', fontSize: '13px' }}>
            {isZh ? '解析送出' : 'Submit Text'}
          </button>
        </div>

        <div className="sample-prompt-group" style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button type="button" className="tab-btn sample-prompt-btn" onClick={() => setOrderText('珍珠奶茶 微冰半糖')} style={{ flex: 'none', padding: '5px 12px', fontSize: '12px' }}>珍珠奶茶 微冰半糖</button>
          <button type="button" className="tab-btn sample-prompt-btn" onClick={() => setOrderText('拿鐵去冰 + 綠茶')} style={{ flex: 'none', padding: '5px 12px', fontSize: '12px' }}>拿鐵去冰 + 綠茶</button>
        </div>

        <div className="menu-section-header">
          <h2 className="section-title" style={{ margin: 0 }}>
            {isZh ? '從菜單挑選' : 'Select from Menu'}
          </h2>
        </div>

        <div className="menu-items-list" style={{ marginTop: '10px' }}>
          {menuItems.map((item: MenuItem, index: number) => {
            const qty = quantities[index] || 0;
            return (
              <div className="list-item" key={index}>
                <div className="item-title">
                  <span>{isZh ? item.nameZh : item.nameEn}</span>
                </div>
                <div className="price-edit-group">
                  <div className="price green" style={{ marginRight: '6px' }}>${item.price}</div>
                  <div className="quantity-control">
                    <button className="qty-btn" onClick={() => handleQtyChange(index, -1)}>-</button>
                    <span className="qty-val">{qty}</span>
                    <button className="qty-btn" onClick={() => handleQtyChange(index, 1)}>+</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="btn-group" style={{ marginTop: 'auto', paddingTop: '15px', justifyContent: 'center' }}>
          <button type="button" className="btn-primary" onClick={() => onNavigate('order-draft')} style={{ maxWidth: '220px' }}>
            {isZh ? '確認訂單草稿' : 'Confirm Order Draft'}
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