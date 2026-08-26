import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert, Server, LogOut, Activity, Users, Award, BookCheck, Flag, Globe, Sliders, Settings, History } from 'lucide-react';
import LineSidebar from '../visuals/LineSidebar';
import { RecallLogo } from '../brand/RecallLogo';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Command Center', path: '/admin', icon: Activity },
    { name: 'User Management', path: '/admin/users', icon: Users },
    { name: 'Creator Approvals', path: '/admin/creators', icon: Award },
    { name: 'Course Governance', path: '/admin/courses', icon: BookCheck },
    { name: 'Content Inspection', path: '/admin/content', icon: Flag },
    { name: 'Subject Control', path: '/admin/subjects', icon: Globe },
    { name: 'Gamification Engine', path: '/admin/gamification', icon: Sliders },
    { name: 'Platform Settings', path: '/admin/settings', icon: Settings },
    { name: 'Audit Trail', path: '/admin/audit', icon: History },
    { name: 'System Telemetry', path: '/admin/system', icon: Server },
  ];

  const getActiveIndex = () => {
    return navItems.findIndex(item => location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path)));
  };

  const handleSidebarClick = (index: number) => {
    navigate(navItems[index].path);
  };

  return (
    <div id="admin-portal-root" className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col md:flex-row font-sans selection:bg-[#475569] selection:text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white border-r border-slate-200 p-4 justify-between h-screen sticky top-0 overflow-hidden shadow-sm z-40">
        <div>
          <Link to="/" className="flex items-center gap-2.5 px-2 py-3 mb-6">
            <RecallLogo color="#475569" />
          </Link>
          
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-between text-xs text-slate-700 font-bold shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-slate-500" />
              <span>Governance</span>
            </div>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>
          
          <div className="px-2 h-[calc(100vh-300px)] overflow-y-auto overflow-x-hidden [scrollbar-width:none]">
            <LineSidebar 
              items={navItems.map(item => item.name)}
              defaultActive={Math.max(0, getActiveIndex())}
              onItemClick={handleSidebarClick}
              accentColor="#334155"
              textColor="#64748b"
              markerColor="#e2e8f0"
              showIndex={false}
              fontSize={0.9}
              itemGap={10}
              markerLength={16}
              maxShift={8}
            />
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-200 space-y-2">
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50 border border-transparent hover:border-slate-200"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'}
              alt={user?.name || 'Admin'}
              className="h-9 w-9 rounded-full border-2 border-slate-400 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-800 truncate">{user?.name || 'System Admin'}</p>
              <p className="text-xs text-slate-500 truncate">Platform Administrator</p>
            </div>
          </Link>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
      
      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-800 uppercase tracking-wider">{navItems[Math.max(0, getActiveIndex())]?.name || 'Platform Governance'}</span>
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200">
              Super-Admin Tier
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/system"
              className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 transition shadow-sm"
            >
              <Server className="h-4 w-4 text-slate-500" />
              <span>System Health: 100%</span>
            </Link>
          </div>
        </header>
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
