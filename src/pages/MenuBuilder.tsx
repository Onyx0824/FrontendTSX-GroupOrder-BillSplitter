import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import type { Language, MenuItem } from '../types';
import { BottomNav } from '../components/BottomNav';
import { Edit, Image, CameraAlt } from '@mui/icons-material';/* , Close */
import { validateRequiredFields } from '../utils/validation';

interface MenuBuilderProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
  data: any;
}

export const MenuBuilder: React.FC<MenuBuilderProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
  data,
}) => {
  const isZh = currentLang === 'zh-TW';
  const [mode, setMode] = useState<'paste' | 'manual' | 'scan'>('scan');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(data.menuItems || []);
  
  // Manual Inputs
  const [manualName, setManualName] = useState('');
  const [manualPrice, setManualPrice] = useState('');
  const [pasteText, setPasteText] = useState('');

  // Edit Modal State
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [modalName, setModalName] = useState('');
  const [modalPrice, setModalPrice] = useState('');

  const handleAddManual = () => {
    const priceNum = Number(manualPrice);
    
    if (!validateRequiredFields(
      [
        { value: manualName, label: isZh ? '品項名稱' : 'Item name' },
        { value: manualPrice, label: isZh ? '單價' : 'Price' },
      ],
      isZh,
    )) return;
    
    if (!Number.isFinite(priceNum) || priceNum <= 0) {
      alert(isZh ? '單價必須大於 0。' : 'Price must be greater than 0.');
      return;
    }
  };

  const handleParseText = () => {
    if (!pasteText.trim()) return;
    const lines = pasteText.split('\n');
    const newItems: MenuItem[] = [];
    lines.forEach(line => {
      const match = line.match(/^(.+?)\s+(\d+)$/);
      if (match) {
        newItems.push({ nameEn: match[1].trim(), nameZh: match[1].trim(), price: parseInt(match[2], 10) });
      }
    });
    if (newItems.length > 0) {
      setMenuItems([...menuItems, ...newItems]);
      setPasteText('');
    }
  };

  const openEdit = (index: number) => {
    setEditIndex(index);
    setModalName(menuItems[index].nameZh);
    setModalPrice(String(menuItems[index].price));
  };

  const handleSaveEdit = () => {
    if (editIndex !== null) {
      const priceNum = parseInt(modalPrice, 10);
      const updated = [...menuItems];
      updated[editIndex] = { nameEn: modalName, nameZh: modalName, price: priceNum };
      setMenuItems(updated);
      setEditIndex(null);
    }
  };

  const handleDeleteItem = () => {
    if (editIndex !== null) {
      const updated = menuItems.filter((_, i) => i !== editIndex);
      setMenuItems(updated);
      setEditIndex(null);
    }
  };

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '菜單建立與維護' : 'Menu Builder'}
        </Typography>
      </Box>

      {/* 頁籤選擇區塊 */}
      <div className="tab-group">
        <button className={`tab-btn ${mode === 'paste' ? 'active' : ''}`} onClick={() => setMode('paste')}>
          {isZh ? '貼上文字' : 'Paste Text'}
        </button>
        <button className={`tab-btn ${mode === 'manual' ? 'active' : ''}`} onClick={() => setMode('manual')}>
          {isZh ? '手動輸入' : 'Manual Input'}
        </button>
        <button className={`tab-btn ${mode === 'scan' ? 'active' : ''}`} onClick={() => setMode('scan')}>
          {isZh ? '拍照辨識' : 'Scan Photo'}
        </button>
      </div>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        
        {/* 模式 1: 貼上文字 */}
        {mode === 'paste' && (
          <div className="mode-panel">
            <div className="form-group">
              <label>{isZh ? '貼上菜單文字 (例: 綠茶 35)' : 'Paste Menu Text'}</label>
              <textarea 
                className="input-control textarea-control" 
                rows={4} 
                value={pasteText}
                onChange={(e) => setPasteText(e.target.value)}
                placeholder={isZh ? '例：紅茶 30\n奶茶 45' : 'e.g. Coffee 50'} 
              />
            </div>
            <button type="button" className="btn-primary" onClick={handleParseText}>
              {isZh ? '解析 / 辨識' : 'Parse Text'}
            </button>
          </div>
        )}

        {/* 模式 2: 手動輸入 */}
        {mode === 'manual' && (
          <div className="mode-panel">
            <div className="form-group">
              <label>{isZh ? '品項名稱' : 'Item Name'}</label>
              <input type="text" className="input-control" value={manualName} onChange={(e) => setManualName(e.target.value)} placeholder={isZh ? '輸入品項名稱...' : 'Item name...'} />
            </div>
            <div className="form-group">
              <label>{isZh ? '單價' : 'Price'}</label>
              <input type="number" className="input-control" value={manualPrice} onChange={(e) => setManualPrice(e.target.value)} placeholder={isZh ? '輸入金額...' : 'Price...'} />
            </div>
            <button type="button" className="btn-primary" onClick={handleAddManual}>
              {isZh ? '新增品項' : 'Add Item'}
            </button>
          </div>
        )}

        {/* 模式 3: 拍照辨識 */}
        {mode === 'scan' && (
          <div className="mode-panel">
            <div className="scan-upload-group" style={{ marginBottom: '15px', display: 'flex', gap: '8px' }}>
              <label className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                <Image />
                <span>{isZh ? '選擇相片' : 'Upload Photo'}</span>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={() => {
                  setMenuItems([...menuItems, { nameEn: 'Scanned Drink', nameZh: '掃描飲品', price: 60 }]);
                }} />
              </label>
              <label className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}>
                <CameraAlt />
                <span>{isZh ? '拍攝照片' : 'Take Photo'}</span>
                <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={() => {
                  setMenuItems([...menuItems, { nameEn: 'Camera Item', nameZh: '相機品項', price: 90 }]);
                }} />
              </label>
            </div>
          </div>
        )}

        <div className="menu-section-header">
          <h2 className="section-title" style={{ margin: 0 }}>{isZh ? '菜單項目' : 'Menu Items'}</h2>
          <span className="count-badge">{menuItems.length} {isZh ? '項' : 'Added'}</span>
        </div>

        <div className="menu-items-list" style={{ marginTop: '8px' }}>
          {menuItems.map((item, idx) => (
            <div className="list-item" key={idx}>
              <div className="item-title"><span>{isZh ? item.nameZh : item.nameEn}</span></div>
              <div className="price-edit-group">
                <div className="price green">${item.price}</div>
                <button className="edit-icon-btn" onClick={() => openEdit(idx)}>
                  <Edit fontSize="small" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="btn-group" style={{ marginTop: 'auto', paddingTop: '15px', justifyContent: 'center' }}>
          <button type="button" className="btn-primary" onClick={() => onNavigate('order-entry')} style={{ maxWidth: '200px' }}>
            {isZh ? '完成建立' : 'Complete'}
          </button>
        </div>

      </Box>

      {/* 編輯 Modal */}
      <Modal open={editIndex !== null} onClose={() => setEditIndex(null)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Box className="modal-card" sx={{ width: '100%', maxWidth: 350, p: 3, borderRadius: '26px', position: 'relative' }}>
          <button className="modal-close-btn" onClick={() => setEditIndex(null)}>×</button>
          <Typography variant="h3" className="section-title" sx={{ mt: 0, mb: 2 }}>{isZh ? '編輯品項' : 'Edit Item'}</Typography>
          <div className="form-group">
            <label>{isZh ? '品項名稱' : 'Item Name'}</label>
            <input type="text" className="input-control" value={modalName} onChange={(e) => setModalName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>{isZh ? '單價' : 'Price'}</label>
            <input type="number" className="input-control" value={modalPrice} onChange={(e) => setModalPrice(e.target.value)} />
          </div>
          <div className="btn-group" style={{ marginTop: '15px' }}>
            <button type="button" className="btn-primary btn-danger" onClick={handleDeleteItem}>{isZh ? '刪除' : 'Delete'}</button>
            <button type="button" className="btn-primary" onClick={handleSaveEdit}>{isZh ? '儲存' : 'Save'}</button>
          </div>
        </Box>
      </Modal>

      <BottomNav currentLang={currentLang} currentTheme={currentTheme} onToggleLang={onToggleLang} onToggleTheme={onToggleTheme} onNavigate={onNavigate} />
    </Box>
  );
};