import React, { useState, useEffect } from 'react';
import type { Language, ThemeMode } from './types';
import { initialMockData } from './data/mockData';

// 引入各頁面元件
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { CreateGroup } from './pages/CreateGroup';
import { JoinGroup } from './pages/JoinGroup';
import { MenuBuilder } from './pages/MenuBuilder';
import { OrderEntry } from './pages/OrderEntry';
import { OrderDraft } from './pages/OrderDraft';
import { OrderDashboard } from './pages/OrderDashboard';
import { StoreSummary } from './pages/StoreSummary';
import { InvoiceMatch } from './pages/InvoiceMatch';
import { SplitSettings } from './pages/SplitSettings';
import { PaymentTracking } from './pages/PaymentTracking';
import { MyOrderingGroup } from './pages/MyOrderingGroup';
import { MyOrders } from './pages/MyOrders';
import { MyPayment } from './pages/MyPayment';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    return (localStorage.getItem('user_lang') as Language) || 'en';
  });

  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('user_theme') as ThemeMode) || 'light';
  });

  const [currentPage, setCurrentPage] = useState<string>('sign-in');
  const [appData, setAppData] = useState(initialMockData);

  // 同步 HTML 屬性
  useEffect(() => {
    document.documentElement.setAttribute('lang', currentLang);
    localStorage.setItem('user_lang', currentLang);
  }, [currentLang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('user_theme', currentTheme);
  }, [currentTheme]);

  const toggleLang = () => {
    setCurrentLang(prev => (prev === 'en' ? 'zh-TW' : 'en'));
  };

  const toggleTheme = () => {
    setCurrentTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 根據目前頁面路由渲染對應元件
  const renderPage = () => {
    const props = {
      currentLang,
      currentTheme,
      onToggleLang: toggleLang,
      onToggleTheme: toggleTheme,
      onNavigate: setCurrentPage,
      data: appData,
      setData: setAppData,
    };

    switch (currentPage) {
      case 'sign-in': return <SignIn {...props} />;
      case 'sign-up': return <SignUp {...props} />;
      case 'create-group': return <CreateGroup {...props} />;
      case 'join-group': return <JoinGroup {...props} />;
      case 'menu-builder': return <MenuBuilder {...props} />;
      case 'order-entry': return <OrderEntry {...props} />;
      case 'order-draft': return <OrderDraft {...props} />;
      case 'order-board': return <OrderDashboard {...props} />;
      case 'store-summary': return <StoreSummary {...props} />;
      case 'invoice-match': return <InvoiceMatch {...props} />;
      case 'split-settings': return <SplitSettings {...props} />;
      case 'payment-tracking': return <PaymentTracking {...props} />;
      case 'my-group': return <MyOrderingGroup {...props} />;
      case 'my-orders': return <MyOrders {...props} />;
      case 'my-payment': return <MyPayment {...props} />;
      default: return <SignIn {...props} />;
    }
  };

  return <>{renderPage()}</>;
}