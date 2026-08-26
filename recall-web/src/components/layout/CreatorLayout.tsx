import React from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, FolderKanban, BookOpen, Layers, FileText, ClipboardList, Sliders, HelpCircle, BarChart3, User, Sparkles, ChevronRight } from 'lucide-react';
import { RecallLogo } from '../brand/RecallLogo';
import LineSidebar from '../visuals/LineSidebar';

export const CreatorLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/creator', icon: FolderKanban },
    { name: 'Research Library', path: '/creator/research', icon: BookOpen },
    { name: 'Content Bank', path: '/creator/content', icon: Layers },
    { name: 'Topic Management', path: '/creator/topics', icon: FileText },
    { name: 'Courses', path: '/creator/courses', icon: ClipboardList },
    { name: 'Lesson Editor', path: '/creator/lessons', icon: FileText },
    { name: 'Diagnostic Builder', path: '/creator/diagnostics', icon: Sliders },
    { name: 'Questions & AI', path: '/creator/questions', icon: HelpCircle },
    { name: 'Assessments', path: '/creator/assessments', icon: Sliders },
    { name: 'Creator Analytics', path: '/creator/analytics', icon: BarChart3 },
    { name: 'Creator Profile', path: '/creator/profile', icon: User },
  ];

  const getActiveIndex = () => {
    return navItems.findIndex(item => location.pathname === item.path || (item.path !== '/creator' && location.pathname.startsWith(item.path)));
  };

  const handleSidebarClick = (index: number) => {
    navigate(navItems[index].path);
  };

  return (
    <div id="creator-portal-root" className="min-h-screen bg-[#FCFBFF] text-[#24213A] flex flex-col md:flex-row font-sans selection:bg-[#8B72C9] selection:text-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-[#E8E0FA]/50 bg-white p-4 justify-between h-screen sticky top-0 shadow-sm z-40">
        <div>
          <Link to="/" className="flex items-center px-2 py-3 mb-6">
            <RecallLogo color="#8B72C9" />
          </Link>
          
          <div className="mb-6 rounded-2xl border border-[#E8E0FA] bg-[#FCFBFF] p-4 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-tr from-[#60479C] to-[#8B72C9]" />
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-sm font-bold text-[#24213A]">Creator Studio</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#8B72C9]/10 text-[#60479C] text-xs border border-[#8B72C9]/30">
                <Sparkles className="w-3 h-3" />
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 font-medium">Manage research & curriculum</div>
          </div>

          <div className="px-2 h-[calc(100vh-320px)] overflow-y-auto overflow-x-hidden [scrollbar-width:none]">
            <LineSidebar 
              items={navItems.map(item => item.name)}
              defaultActive={Math.max(0, getActiveIndex())}
              onItemClick={handleSidebarClick}
              accentColor="#8B72C9"
              textColor="#64748b"
              markerColor="#E8E0FA"
              showIndex={false}
              fontSize={0.9}
              itemGap={10}
              markerLength={16}
              maxShift={8}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E0FA]/50 space-y-2">
          <Link
            to="/creator/profile"
            className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-[#FCFBFF] border border-transparent hover:border-[#E8E0FA]"
          >
            <img
              src={user?.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'}
              alt={user?.name || 'Elena'}
              className="h-9 w-9 rounded-full border-2 border-[#8B72C9] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#24213A] truncate">{user?.name || 'Dr. Elena Rostova'}</p>
              <p className="text-xs text-slate-500 truncate">Senior Creator</p>
            </div>
          </Link>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-500 transition hover:bg-[#60479C]/10 hover:text-[#60479C]"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0 h-screen overflow-y-auto">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E8E0FA]/50 bg-white/80 px-4 sm:px-6 lg:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#24213A] uppercase tracking-wider">{navItems[Math.max(0, getActiveIndex())]?.name || 'Dashboard'}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/creator/courses/new"
              className="hidden sm:flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#60479C] to-[#8B72C9] px-5 py-2 text-xs font-bold text-white shadow-md shadow-[#8B72C9]/30 hover:shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>New Course</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl w-full mx-auto relative z-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
