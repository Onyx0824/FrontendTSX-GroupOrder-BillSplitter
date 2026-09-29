import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { Language, InvoiceItem } from '../types';
import { BottomNav } from '../components/BottomNav';
import { Delete, Add, Warning } from '@mui/icons-material';

interface InvoiceMatchProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  data: any;
}

export const InvoiceMatch: React.FC<InvoiceMatchProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const isZh = currentLang === 'zh-TW';
  const invoiceData = data.invoiceMatch;
  const [tabMode, setTabMode] = useState<'manual' | 'scan'>('scan');
  const [items, setItems] = useState<InvoiceItem[]>(invoiceData.items || []);

  // Manual inputs
  const [manName, setManName] = useState('');
  const [manQty, setManQty] = useState('1');
  const [manPrice, setManPrice] = useState('');

  const invoiceTotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const orderTotal = invoiceData.orderTotal || 530;
  const mismatch = invoiceTotal - orderTotal;

  const handleAddItem = () => {
    const qtyNum = parseInt(manQty, 10) || 1;
    const priceNum = parseInt(manPrice, 10);
    if (manName.trim() && !isNaN(priceNum)) {
      setItems([...items, { nameEn: manName, nameZh: manName, qty: qtyNum, unitPrice: priceNum, totalPrice: qtyNum * priceNum }]);
      setManName('');
      setManQty('1');
      setManPrice('');
    }
  };

  const handleDelete = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '發票明細與比對' : 'Invoice Match'}
        </Typography>
      </Box>

      <div className="invoice-tab-group">
        <button className={`invoice-tab-btn ${tabMode === 'manual' ? 'active' : ''}`} onClick={() => setTabMode('manual')}>
          {isZh ? '手動輸入' : 'Manual Input'}
        </button>
        <button className={`invoice-tab-btn ${tabMode === 'scan' ? 'active' : ''}`} onClick={() => { setTabMode('scan'); alert(isZh ? '已完成發票影像 OCR 辨識！' : 'Invoice recognized!'); }}>
          {isZh ? '掃描發票' : 'Scan Receipt'}
        </button>
      </div>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        {tabMode === 'manual' && (
          <div style={{ marginBottom: '12px' }}>
            <div className="form-group">
              <label>{isZh ? '品項名稱' : 'Item Name'}</label>
              <input type="text" className="input-control" value={manName} onChange={(e) => setManName(e.target.value)} placeholder={isZh ? '輸入品項名稱...' : 'Item name...'} />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>{isZh ? '數量' : 'Quantity'}</label>
                <input type="number" className="input-control" value={manQty} onChange={(e) => setManQty(e.target.value)} min="1" />
              </div>
              <div className="form-group" style={{ flex: 1.2 }}>
                <label>{isZh ? '單價' : 'Price'}</label>
                <input type="number" className="input-control" value={manPrice} onChange={(e) => setManPrice(e.target.value)} placeholder={isZh ? '單價...' : 'Price...'} />
              </div>
            </div>
            <button type="button" className="btn-primary" onClick={handleAddItem} style={{ width: '100%', padding: '8px 0', fontSize: '13px', marginTop: '2px' }}>
              {isZh ? '新增發票品項' : 'Add Item'}
            </button>
          </div>
        )}

        <div className="menu-section-header">
          <div className="section-title" style={{ margin: 0 }}>{isZh ? '發票明細' : 'Receipt Line Items'}</div>
          <span className="count-badge" style={{ fontWeight: 600 }}>{isZh ? '餐廳' : 'Restaurant'}</span>
        </div>

        <div className="menu-items-list" style={{ marginTop: '8px' }}>
          {items.map((item, index) => (
            <div className="list-item" key={index} style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <span className="item-title">{isZh ? item.nameZh : item.nameEn}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="price green">${item.totalPrice}</span>
                  <button className="edit-icon-btn" onClick={() => handleDelete(index)} style={{ color: '#c62828' }}>
                    🗑️
                  </button>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-placeholder)' }}>
                {isZh ? `數量: ${item.qty} × $${item.unitPrice}` : `Qty: ${item.qty} × $${item.unitPrice}`}
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-summary" style={{ marginTop: '16px', marginBottom: '8px' }}>
          <div className="summary-col">
            <span className="summary-label">INVOICE TOTAL</span>
            <span className="summary-value green">${invoiceTotal}</span>
          </div>
          <div className="summary-col">
            <span className="summary-label">ORDER TOTAL</span>
            <span className="summary-value green">${orderTotal}</span>
          </div>
          <div className="summary-col">
            <span className="summary-label">MISMATCH</span>
            <span className="summary-value" style={{ color: '#c62828' }}>
              {mismatch < 0 ? `-$${Math.abs(mismatch)}` : `+$${mismatch}`}
            </span>
          </div>
        </div>

        {mismatch !== 0 && (
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#d32f2f', marginBottom: '14px', fontWeight: 500 }}>
            {isZh ? `團購訂單超出發票金額 $${Math.abs(mismatch)}` : `Mismatch by $${Math.abs(mismatch)}`}
          </div>
        )}

        <button type="button" className="btn-primary invoice-confirm-btn" onClick={() => onNavigate('split-settings')}>
          {isZh ? '確認並繼續' : 'Confirm & Proceed'}
        </button>

      </Box>

      <BottomNav currentLang={currentLang} currentTheme={currentTheme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} onNavigate={onNavigate} />
    </Box>
  );
};