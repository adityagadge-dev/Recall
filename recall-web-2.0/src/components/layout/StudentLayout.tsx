import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGamification } from '../../context/GamificationContext';
import { XPNotificationContainer, BadgeUnlockModal } from '../common/XPNotification';
import { LogOut, ChevronRight, Flame } from 'lucide-react';
import { RecallLogo } from '../brand/RecallLogo';
import { motion } from 'motion/react';
import LineSidebar from '../visuals/LineSidebar';

export const StudentLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { currentXp, nextLevelXp, level, levelTitle, streakDays } = useGamification();

  const navItems = [
    { name: 'Dashboard', path: '/app' },
    { name: 'Subjects', path: '/app/subjects' },
    { name: 'Progress', path: '/app/progress' },
    { name: 'Rewards', path: '/app/rewards' },
    { name: 'Leaderboard', path: '/app/leaderboard' },
    { name: 'Profile', path: '/app/profile' },
  ];

  const getActiveIndex = () => {
    return navItems.findIndex(item => location.pathname === item.path || (item.path !== '/app' && location.pathname.startsWith(item.path)));
  };

  const handleSidebarClick = (index: number) => {
    navigate(navItems[index].path);
  };

  return (
    <div id="student-portal-root" className="min-h-screen bg-[#07080C] text-[#F7F8FC] flex flex-col md:flex-row font-sans selection:bg-[#FF6B61]">
      <XPNotificationContainer />
      <BadgeUnlockModal />
      
      {/* Desktop Sidebar */}
      <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="hidden md:flex flex-col w-64 shrink-0 border-r border-[#1A2030] bg-[#0D1017] p-4 justify-between h-screen sticky top-0 z-40">
        <div>
          {/* Brand */}
          <Link to="/" className="flex items-center px-2 py-3 mb-6">
            <RecallLogo color="#F7F8FC" />
          </Link>
          
          {/* Quick XP Summary Widget */}
          <div className="mb-6 rounded-2xl border border-[#323B4E] bg-[#11151F] p-4 shadow-sm relative overflow-hidden group hover:shadow-[0_0_20px_rgba(255,107,97,0.1)] transition-shadow">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-tr from-[#FF6B61] to-[#FFD166]" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FF6B61]/10 text-[#FF6B61] text-xs font-bold border border-[#FF6B61]/30">
                    L{level}
                  </span>
                  <span className="text-sm font-bold text-[#F7F8FC] truncate">{levelTitle}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#FFD166]">
                  <Flame className="h-4 w-4 fill-[#FFD166] text-[#FFD166]" />
                  <span>{streakDays}d</span>
                </div>
              </div>
              
              <div className="w-full bg-[#1A2030] rounded-full h-2 mb-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#FF6B61] to-[#FFD166] h-2 rounded-full transition-all duration-1000 ease-out relative"
                  style={{ width: `${Math.min(100, (currentXp / nextLevelXp) * 100)}%` }}
                >
                  <div className="absolute top-0 right-0 bottom-0 w-4 bg-[#11151F]/30 animate-pulse" />
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[11px] text-[#9AA4B8] font-medium">
                <span>{currentXp} XP</span>
                <span>Next: {nextLevelXp} XP</span>
              </div>
            </div>
          </div>

          {/* Navigation Links using LineSidebar */}
          <div className="px-2">
            <LineSidebar 
              items={navItems.map(item => item.name)}
              defaultActive={Math.max(0, getActiveIndex())}
              onItemClick={handleSidebarClick}
              accentColor="#FF6B61"
              textColor="#9AA4B8"
              markerColor="#323B4E"
              showIndex={false}
              fontSize={0.9}
              itemGap={12}
              markerLength={20}
              maxShift={10}
            />
          </div>
        </div>

        {/* User Card & Sign Out */}
        <div className="pt-4 border-t border-[#1A2030] space-y-2">
          <Link
            to="/app/profile"
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#11151F] border border-transparent hover:border-[#323B4E]"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={user?.name || 'Aria'}
              className="h-9 w-9 rounded-full border-2 border-[#FF6B61] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#F7F8FC] truncate">{user?.name || 'Aria Chen'}</p>
              <p className="text-xs text-[#9AA4B8] truncate">{user?.email || 'aria@recall.edu'}</p>
            </div>
          </Link>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-[#9AA4B8] transition hover:bg-[#FF4D5A]/10 hover:text-[#FF4D5A]"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0 h-screen overflow-y-auto">
        {/* Top Header */}
        <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }} className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#1A2030] bg-[#07080C]/80 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#F7F8FC] uppercase tracking-wider">{navItems[Math.max(0, getActiveIndex())]?.name || 'Dashboard'}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/app/learning/crs_finance_foundations"
              className="hidden sm:flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#FF4D5A] to-[#FF6B61] px-5 py-2 text-xs font-bold text-white shadow-[0_0_15px_rgba(255,107,97,0.3)] hover:shadow-[0_0_25px_rgba(255,107,97,0.5)] transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Continue Journey</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto relative z-10">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-[#1A2030] bg-[#0D1017] px-2 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] pb-safe">
        {navItems.map((item, index) => {
          const isActive = index === getActiveIndex();
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-medium transition ${
                isActive ? 'text-[#FF6B61] font-bold' : 'text-[#687286]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full mb-0.5 ${isActive ? 'bg-[#FF6B61]' : 'bg-transparent'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
