import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GamificationProvider } from './context/GamificationContext';
import { RoleSwitcherWidget } from './components/common/RoleSwitcherWidget';
import { SoundToggle } from './components/common/SoundToggle';

// Layouts
import { PublicNavbar, PublicFooter } from './components/layout/PublicNavbar';
import { StudentLayout } from './components/layout/StudentLayout';
import { CreatorLayout } from './components/layout/CreatorLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { SubjectsShowcasePage, HowItWorksPage } from './pages/public/SubjectsShowcasePage';
import { ImpactPage } from './pages/public/ImpactPage'; 
import { SignInPage, SignUpPage, CreatorSignInPage, CreatorApplyPage } from './pages/public/AuthPages';
import { UserSetupPage } from './pages/public/UserSetupPage';

// Student Pages
import { StudentDashboardPage, SubjectDetailsPage } from './pages/student/StudentDashboardPage';
import { DiagnosticPage } from './pages/student/DiagnosticPage';
import { CourseLearningPage, QuizPage, SpinTeachPage } from './pages/student/CourseLearningPage';
import { ProgressPage, RewardsPage } from './pages/student/ProgressPage';
import { LeaderboardPage, ProfilePage } from './pages/student/LeaderboardPage';

// Creator Pages
import { CreatorDashboardPage, ResearchLibraryPage, ContentBankPage } from './pages/creator/CreatorDashboardPage';
import { CourseBuilderPage, LessonEditorPage, DiagnosticBuilderPage } from './pages/creator/CourseBuilderPage';
import {
  TopicManagementPage,
  QuestionBankPage,
  AssessmentConfigPage,
  CreatorAnalyticsPage,
  CreatorProfilePage,
} from './pages/creator/CreatorExtraPages';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import {
  UserGovernancePage,
  CreatorApprovalsPage,
  CourseGovernancePage,
  ContentInspectionPage,
  SubjectControlPage,
  GamificationControlPage,
  PlatformSettingsPage,
  AuditTrailPage,
  SystemTelemetryPage,
} from './pages/admin/AdminGovernancePages';

import { ReactLenis } from 'lenis/react';

const PublicLayout: React.FC = () => {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothWheel: true, syncTouch: false }}>
      <div className="min-h-screen flex flex-col bg-[#07080C] text-[#F7F8FC] font-sans selection:bg-[#FF6B61] selection:text-white">
        <PublicNavbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <PublicFooter />
      </div>
    </ReactLenis>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <GamificationProvider>
        <Router>
          <div className="relative min-h-screen bg-[#0a0c10] text-slate-100 selection:bg-lime-400 selection:text-black">
            <Routes>
              {/* Public Routes */}
                            <Route element={<PublicLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/subjects" element={<SubjectsShowcasePage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/impact" element={<ImpactPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/creator/sign-in" element={<CreatorSignInPage />} />
                <Route path="/creator/apply" element={<CreatorApplyPage />} />
              </Route>

              {/* Standalone setup page — no navbar/footer */}
              <Route path="/setup" element={<UserSetupPage />} />
              {/* Student Portal Routes */}
              <Route path="/app" element={<StudentLayout />}>
                <Route index element={<StudentDashboardPage />} />
                <Route path="subjects" element={<SubjectsShowcasePage />} />
                <Route path="subjects/:slug" element={<SubjectDetailsPage />} />
                <Route path="diagnostic/:subject_id" element={<DiagnosticPage />} />
                <Route path="learning/:courseId" element={<CourseLearningPage />} />
                <Route path="quiz/:quizId" element={<QuizPage />} />
                <Route path="spin-teach" element={<SpinTeachPage />} />
                <Route path="progress" element={<ProgressPage />} />
                <Route path="rewards" element={<RewardsPage />} />
                <Route path="leaderboard" element={<LeaderboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>

              {/* Creator / Creator Portal Routes */}
              <Route path="/creator" element={<CreatorLayout />}>
                <Route index element={<CreatorDashboardPage />} />
                <Route path="research" element={<ResearchLibraryPage />} />
                <Route path="content" element={<ContentBankPage />} />
                <Route path="topics" element={<TopicManagementPage />} />
                <Route path="courses" element={<CourseBuilderPage />} />
                <Route path="courses/new" element={<CourseBuilderPage />} />
                <Route path="lessons" element={<LessonEditorPage />} />
                <Route path="diagnostics" element={<DiagnosticBuilderPage />} />
                <Route path="questions" element={<QuestionBankPage />} />
                <Route path="assessments" element={<AssessmentConfigPage />} />
                <Route path="analytics" element={<CreatorAnalyticsPage />} />
                <Route path="profile" element={<CreatorProfilePage />} />
              </Route>

              {/* Admin Governance Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="users" element={<UserGovernancePage />} />
                <Route path="creators" element={<CreatorApprovalsPage />} />
                <Route path="courses" element={<CourseGovernancePage />} />
                <Route path="content" element={<ContentInspectionPage />} />
                <Route path="subjects" element={<SubjectControlPage />} />
                <Route path="gamification" element={<GamificationControlPage />} />
                <Route path="settings" element={<PlatformSettingsPage />} />
                <Route path="audit" element={<AuditTrailPage />} />
                <Route path="system" element={<SystemTelemetryPage />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<LandingPage />} />
            </Routes>

            {/* Dev Multi-Role Switcher Widget */}
            <RoleSwitcherWidget />
            <SoundToggle />
          </div>
        </Router>
      </GamificationProvider>
    </AuthProvider>
  );
};

export default App;
