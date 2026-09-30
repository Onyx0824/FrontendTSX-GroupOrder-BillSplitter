import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import type { Language } from '../types';
import { BottomNav } from '../components/BottomNav';
import { ChevronLeft, ChevronRight, ContentCopy } from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';
import { validateRequiredFields } from '../utils/validation';

const formatLocalDateTime = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

interface CreateGroupProps {
  currentLang: Language;
  currentTheme: 'light' | 'dark';
  onToggleLang: () => void;
  onToggleTheme: () => void;
  onNavigate: (page: string) => void;
}

export const CreateGroup: React.FC<CreateGroupProps> = ({
  currentLang,
  currentTheme,
  onToggleLang,
  onToggleTheme,
  onNavigate,
}) => {
  const [groupName, setGroupName] = useState('');
  const [store, setStore] = useState('');
  const [deadline, setDeadline] = useState('2026-10-31T12:00');
  const [splitRule, setSplitRule] = useState('go-dutch');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  /*const isZh = currentLang === 'zh-TW';*/

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRequiredFields(
      [
        { value: groupName, label: isZh ? '團名' : 'Group name' },
        { value: store, label: isZh ? '店家' : 'Store' },
        { value: deadline, label: isZh ? '截止時間' : 'Deadline' },
      ],
      isZh,
    )) {
      return;
    }
    setShareModalOpen(true);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(inviteLink);
    alert(isZh ? '邀請連結已複製！' : 'Invite link copied!');
  };

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2026, 9, 1));

  const isZh = currentLang === 'zh-TW';
  const locale = isZh ? 'zh-TW' : 'en-US';
  const selectedDate = new Date(deadline);

  const monthTitle = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
  }).format(calendarMonth);

  const weekdays = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(
      new Date(2024, 0, 7 + index),
    ),
  );

  const firstWeekday = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1,
  ).getDay();

  const daysInMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0,
  ).getDate();

  const calendarDays: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const deadlineLabel = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(selectedDate);

  const changeMonth = (offset: number) => {
    setCalendarMonth(
      (month) => new Date(month.getFullYear(), month.getMonth() + offset, 1),
    );
  };

  const selectCalendarDay = (day: number) => {
    const date = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    );
    const [hours, minutes] = (deadline.split('T')[1] ?? '12:00')
      .split(':')
      .map(Number);

    date.setHours(hours, minutes, 0, 0);
    setDeadline(formatLocalDateTime(date));
  };

  const adjustDeadline = (unit: 'hour' | 'minute', amount: number) => {
    const updatedDate = new Date(deadline);

    if (unit === 'hour') {
      updatedDate.setHours(updatedDate.getHours() + amount);
    } else {
      updatedDate.setMinutes(updatedDate.getMinutes() + amount);
    }

    setDeadline(formatLocalDateTime(updatedDate));
  };

  const [groupId] = useState(() => window.crypto.randomUUID());

  const inviteUrl = new URL(window.location.href);
  inviteUrl.search = '';
  inviteUrl.hash = '';
  inviteUrl.searchParams.set('page', 'join-group');
  inviteUrl.searchParams.set('group', groupId);

  const inviteLink = inviteUrl.toString();

  return (
    <Box className="app-container" sx={{ width: '100%', maxWidth: 414, height: '100vh', p: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', mx: 'auto' }}>
      <div className="notch"></div>

      <Box className="header-group" sx={{ width: '100%', textAlign: 'center', my: 2 }}>
        <Typography variant="h1" className="page-title" sx={{ fontSize: '32px', fontStyle: 'italic', fontWeight: 500 }}>
          {isZh ? '建立點餐團' : 'Create Group'}
        </Typography>
      </Box>

      <Box className="glass-card" sx={{ width: '100%', flex: 1, p: 3, borderRadius: '26px', display: 'flex', flexDirection: 'column' }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="form-group">
            <label>{isZh ? '團名' : 'Group Name'}</label>
            <input
              type="text"
              className="input-control"
              placeholder={isZh ? '輸入團名...' : 'Enter group name...'}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>{isZh ? '店家' : 'Store'}</label>
            <input
              type="text"
              className="input-control"
              placeholder={isZh ? '搜尋或輸入店家...' : 'Search or enter store...'}
              value={store}
              onChange={(e) => setStore(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label>{isZh ? '截止時間' : 'Deadline'}</label>
            <button
              type="button"
              className="input-control deadline-trigger"
              aria-label={isZh ? '選擇截止時間' : 'Choose deadline'}
              aria-haspopup="dialog"
              onClick={() => {
                setCalendarMonth(
                  new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
                );
                setCalendarOpen(true);
              }}
            >
              {deadlineLabel}
            </button>
          </div>

          <div className="form-group">
            <label>{isZh ? '分攤規則' : 'Splitting Rules'}</label>
            <select
              className="select-control"
              value={splitRule}
              onChange={(e) => setSplitRule(e.target.value)}
            >
              <option value="go-dutch">{isZh ? '均分' : 'Go Dutch'}</option>
              <option value="by-item">{isZh ? '按品項' : 'By Item'}</option>
            </select>
          </div>

          <div className="btn-group" style={{ justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="btn-primary" style={{ maxWidth: '200px' }}>
              {isZh ? '建立' : 'Create'}
            </button>
          </div>
        </Box>
      </Box>

      <Modal
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
      >
        <Box
          className="modal-card calendar-modal"
          role="dialog"
          aria-modal="true"
          aria-label={isZh ? '選擇截止日期' : 'Choose deadline date'}
        >
          <div className="calendar-header">
            <button type="button" className="calendar-nav" onClick={() => changeMonth(-1)}
              aria-label={isZh ? '上個月' : 'Previous month'}>
              <ChevronLeft />
            </button>
            <Typography className="calendar-month">{monthTitle}</Typography>
            <button type="button" className="calendar-nav" onClick={() => changeMonth(1)}
              aria-label={isZh ? '下個月' : 'Next month'}>
              <ChevronRight />
            </button>
          </div>

          <div className="calendar-grid calendar-weekdays">
            {weekdays.map((day, index) => <span key={index}>{day}</span>)}
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day, index) => {
              if (day === null) return <span className="calendar-empty" key={`empty-${index}`} />;

              const isSelected =
                selectedDate.getFullYear() === calendarMonth.getFullYear() &&
                selectedDate.getMonth() === calendarMonth.getMonth() &&
                selectedDate.getDate() === day;

              return (
                <button
                  type="button"
                  key={day}
                  className={`calendar-day${isSelected ? ' is-selected' : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => selectCalendarDay(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="calendar-time-picker">
            <div className="calendar-time-unit">
              <span>{isZh ? '小時' : 'Hour'}</span>
              <div className="time-stepper">
                <button type="button" onClick={() => adjustDeadline('hour', -1)}
                  aria-label={isZh ? '減少一小時' : 'Decrease hour'}>−</button>
                <output>{String(selectedDate.getHours()).padStart(2, '0')}</output>
                <button type="button" onClick={() => adjustDeadline('hour', 1)}
                  aria-label={isZh ? '增加一小時' : 'Increase hour'}>+</button>
              </div>
            </div>

            <div className="calendar-time-unit">
              <span>{isZh ? '分鐘' : 'Minute'}</span>
              <div className="time-stepper">
                <button type="button" onClick={() => adjustDeadline('minute', -1)}
                  aria-label={isZh ? '減少一分鐘' : 'Decrease minute'}>−</button>
                <output>{String(selectedDate.getMinutes()).padStart(2, '0')}</output>
                <button type="button" onClick={() => adjustDeadline('minute', 1)}
                  aria-label={isZh ? '增加一分鐘' : 'Increase minute'}>+</button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn-primary calendar-done"
            onClick={() => setCalendarOpen(false)}
          >
            {isZh ? '完成' : 'Done'}
          </button>
        </Box>
      </Modal>

      {/* 分享彈窗 */}
      <Modal open={shareModalOpen} onClose={() => setShareModalOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        <Box className="modal-card" sx={{ width: '100%', maxWidth: 350, p: 3, borderRadius: '26px', textAlign: 'center' }}>
          <Typography variant="h3" className="section-title" sx={{ mt: 0, mb: 2 }}>
            {isZh ? '點餐團已建立！' : 'Group Created!'}
          </Typography>
          <div className="qr-box" style={{ margin: '0 auto 15px', width: 150, height: 150 }}>
            <QRCodeSVG value={inviteLink} size={150} level="M" includeMargin />
          </div>
          
          <p style={{ fontSize: '13px', color: 'var(--text-placeholder)', marginBottom: '20px' }}>
            {isZh ? '請將此 QR Code 或連結分享給成員點餐。' : 'Share this QR code or link with members.'}
          </p>
          <div className="btn-group" style={{ flexDirection: 'column', gap: '10px' }}>
            <button type="button" className="btn-primary" onClick={handleCopyLink} style={{ width: '100%' }}>
              <ContentCopy sx={{ mr: 1, fontSize: 16 }} />
              {isZh ? '複製邀請連結' : 'Copy Invite Link'}
            </button>
            <button type="button" className="btn-primary" style={{ background: 'rgba(255, 255, 255, 0.5)', width: '100%' }} onClick={() => onNavigate('order-board')}>
              {isZh ? '進入訂單看板' : 'Go to Dashboard'}
            </button>
          </div>
        </Box>
      </Modal>

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