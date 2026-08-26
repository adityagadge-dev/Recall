import React, { useState } from 'react';
import {
  Users,
  Award,
  BookCheck,
  Flag,
  Globe,
  Sliders,
  Settings,
  History,
  Server,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Shield,
  Bot,
  Layers,
} from 'lucide-react';

export const UserGovernancePage: React.FC = () => {
  const users = [
    { id: 'usr_1', name: 'Aria Chen', email: 'aria@recall.edu', role: 'learner', level: 12, status: 'active' },
    { id: 'usr_2', name: 'Dr. Marcus Vance', email: 'marcus@recall.institute', role: 'creator', level: 45, status: 'active' },
    { id: 'usr_3', name: 'Elena Rostova', email: 'elena@recall.admin', role: 'admin', level: 99, status: 'active' },
    { id: 'usr_4', name: 'Leo Martinez', email: 'leo@stanford.edu', role: 'learner', level: 8, status: 'active' },
  ];

  return (
    <div id="user-governance-page" className="space-y-8 pb-12">
      <div className="border-b border-[#323B4E] pb-6">
        <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#7B61B5]">
          <span>IDENTITY_&_RBAC_GOVERNANCE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">User & Role Management</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">
          Governed via Clerk Auth integration layer with synchronized role scopes.
        </p>
      </div>

      <div className="rounded-3xl border border-[#323B4E] bg-[#11151F] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#323B4E] bg-[#0D1017] text-[#9AA4B8] font-mono uppercase text-[10px]">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Level</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-[#F7F8FC]">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[#0D1017] transition">
                <td className="p-4 font-bold text-[#352A4D]">{u.name}</td>
                <td className="p-4 text-[#9AA4B8] font-mono">{u.email}</td>
                <td className="p-4">
                  <span className="rounded bg-[#0D1017] px-2 py-0.5 font-mono text-[10px] uppercase font-bold text-purple-500">
                    {u.role}
                  </span>
                </td>
                <td className="p-4 font-mono font-bold text-[#7B61B5]">L{u.level}</td>
                <td className="p-4">
                  <span className="text-[#7B61B5] font-bold">Active</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-[#9AA4B8] hover:text-[#352A4D] font-semibold">Edit Permissions</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const CreatorApprovalsPage: React.FC = () => {
  return (
    <div id="creator-approvals-page" className="space-y-8 pb-12">
      <div className="border-b border-[#323B4E] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">Creator Fellow Approvals</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">Review institutional credentials and peer endorsements.</p>
      </div>
      <div className="rounded-3xl border border-[#323B4E] bg-[#11151F] p-8 text-center text-[#9AA4B8] text-xs">
        All pending Creator applicant queues have been verified and processed.
      </div>
    </div>
  );
};

export const CourseGovernancePage: React.FC = () => {
  return (
    <div id="course-governance-page" className="space-y-8 pb-12">
      <div className="border-b border-[#323B4E] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">Course Governance & Audit</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">Verify clinical citations and cognitive load standards before public publishing.</p>
      </div>
      <div className="rounded-3xl border border-[#323B4E] bg-[#11151F] p-6 space-y-4">
        <div className="flex items-center justify-between p-4 rounded-2xl border border-[#323B4E] bg-[#0D1017]">
          <div>
            <h4 className="text-sm font-bold text-[#352A4D]">Advanced Compound Interest & Asset Defense</h4>
            <p className="text-xs text-[#9AA4B8]">Authored by Dr. Marcus Vance • Subject: Financial Literacy</p>
          </div>
          <button className="rounded-xl bg-[#7B61B5] px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 transition">
            Verify & Publish to Live App
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContentInspectionPage: React.FC = () => {
  return (
    <div id="content-inspection-page" className="space-y-8 pb-12">
      <div className="border-b border-[#323B4E] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">Content Inspection & Telemetry</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">Automated fact-checking and Google ADK hallucination telemetry.</p>
      </div>
      <div className="rounded-3xl border border-purple-50 bg-[#11151F] p-6 space-y-2">
        <div className="flex items-center gap-2 text-[#7B61B5] font-bold text-xs">
          <CheckCircle2 className="h-4 w-4" />
          <span>Zero Hallucination Violations in Past 30 Days</span>
        </div>
        <p className="text-xs text-[#9AA4B8]">All AI-generated assessment prompts passed strict grounding validation against Creator whitepapers.</p>
      </div>
    </div>
  );
};

export const SubjectControlPage: React.FC = () => {
  return (
    <div id="subject-control-page" className="space-y-8 pb-12">
      <div className="border-b border-[#323B4E] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">Subject Domain Control</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">Configure the 4 core life-skill domains and neural constellation geometry.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {['Financial Literacy', 'Digital Safety', 'First Aid & Trauma', 'Communication Skills'].map((s, i) => (
          <div key={i} className="rounded-2xl border border-[#323B4E] bg-[#0D1017] p-5">
            <h4 className="text-sm font-bold text-[#352A4D]">{s}</h4>
            <span className="text-[11px] font-mono text-[#7B61B5]">Status: Active & Constellation-Bound</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GamificationControlPage: React.FC = () => {
  return (
    <div id="gamification-control-page" className="space-y-8 pb-12">
      <div className="border-b border-[#323B4E] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">Gamification Economy Engine</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">Calibrate XP rewards, level thresholds, and streak multiplier rules.</p>
      </div>
      <div className="rounded-3xl border border-[#323B4E] bg-[#11151F] p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#0D1017] border border-[#323B4E]">
            <span className="text-[10px] text-[#9AA4B8] font-bold uppercase">Lesson Base XP</span>
            <div className="text-xl font-bold text-[#7B61B5] font-mono">+60 XP</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0D1017] border border-[#323B4E]">
            <span className="text-[10px] text-[#9AA4B8] font-bold uppercase">Spin & Teach Mastery Bonus</span>
            <div className="text-xl font-bold text-[#7B61B5] font-mono">+100 XP</div>
          </div>
          <div className="p-4 rounded-xl bg-[#0D1017] border border-[#323B4E]">
            <span className="text-[10px] text-[#9AA4B8] font-bold uppercase">Streak Shield Max</span>
            <div className="text-xl font-bold text-[#7B61B5] font-mono">3 Shields</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PlatformSettingsPage: React.FC = () => {
  return (
    <div id="platform-settings-page" className="space-y-8 pb-12">
      <div className="border-b border-[#323B4E] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">Platform Configuration</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">Environment parameters, secret rotation, and Clerk / ADK tokens.</p>
      </div>
      <div className="rounded-3xl border border-[#323B4E] bg-[#11151F] p-6 space-y-3 font-mono text-xs">
        <div className="flex justify-between p-3 rounded-xl bg-[#0D1017]">
          <span className="text-[#9AA4B8]">FLASK_API_BASE_URL:</span>
          <span className="text-purple-500">https://api.recall.edu/v1</span>
        </div>
        <div className="flex justify-between p-3 rounded-xl bg-[#0D1017]">
          <span className="text-[#9AA4B8]">MONGODB_CONNECTION_URI:</span>
          <span className="text-purple-500">mongodb+srv://cluster-0.recall.internal</span>
        </div>
        <div className="flex justify-between p-3 rounded-xl bg-[#0D1017]">
          <span className="text-[#9AA4B8]">GOOGLE_ADK_AGENT_VERSION:</span>
          <span className="text-purple-300">adk-agent-v2.4-grounded</span>
        </div>
      </div>
    </div>
  );
};

export const AuditTrailPage: React.FC = () => {
  const logs = [
    { time: '12:24 UTC', actor: 'Elena Rostova', action: 'Approved Creator Application (Dr. Marcus Vance)' },
    { time: '11:15 UTC', actor: 'System Auto-Audit', action: 'Verified Research Grounding Sync (42 Papers)' },
    { time: '09:40 UTC', actor: 'Clerk Auth Webhook', action: 'Synchronized Learner RBAC Scopes' },
  ];

  return (
    <div id="audit-trail-page" className="space-y-8 pb-12">
      <div className="border-b border-[#323B4E] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">Security & Audit Trail</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">Immutable administrative action logs and compliance records.</p>
      </div>
      <div className="rounded-3xl border border-[#323B4E] bg-[#11151F] p-6 space-y-3">
        {logs.map((l, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#0D1017] border border-[#323B4E] text-xs">
            <span className="font-mono text-[#9AA4B8]">{l.time}</span>
            <span className="font-bold text-[#352A4D]">{l.actor}</span>
            <span className="text-[#9AA4B8]">{l.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SystemTelemetryPage: React.FC = () => {
  return (
    <div id="system-telemetry-page" className="space-y-8 pb-12">
      <div className="border-b border-[#323B4E] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">System Telemetry & Health</h1>
        <p className="text-xs text-[#9AA4B8] mt-1">Real-time infrastructure latency and node metrics.</p>
      </div>
      <div className="rounded-3xl border border-purple-50 bg-[#11151F] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#352A4D]">All Systems Operational</span>
          <span className="h-3 w-3 rounded-full bg-[#7B61B5] animate-pulse" />
        </div>
        <p className="text-xs text-[#9AA4B8]">Container reverse proxy listening on 0.0.0.0:3000. Static build ready.</p>
      </div>
    </div>
  );
};
