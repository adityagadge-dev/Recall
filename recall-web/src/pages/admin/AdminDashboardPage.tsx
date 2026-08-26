import React, { useEffect, useState } from 'react';
import { AdminApi } from '../../services/adminApi';
import {
  Activity,
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
  Clock,
  Shield,
  Zap,
  AlertTriangle,
  Bot,
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [pendingCreators, setPendingCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [sRes, mRes] = await Promise.all([
          AdminApi.getSystemStats(),
          AdminApi.getPendingCreatorApprovals(),
        ]);
        setStats(sRes.data);
        setPendingCreators(mRes.data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleApproveCreator = (id: string) => {
    setPendingCreators(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div id="admin-dashboard-page" className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-purple-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#352A4D]">Platform Command Center</h1>
          <p className="text-sm text-slate-600 mt-1">
            Global telemetry, institutional Creator approvals, and curriculum verification.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-xs font-bold text-[#7B61B5] shadow-sm">
          <Shield className="h-4 w-4" />
          <span>Super-Admin Mode</span>
        </div>
      </div>

      {/* Integration Telemetry Status Matrix */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Clerk Auth</span>
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-green-100">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#352A4D]">100% Uptime</div>
          <span className="text-xs text-slate-500">14,240 Total Accounts</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Flask REST API</span>
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-green-100">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </span>
          </div>
          <div className="text-2xl font-black text-[#352A4D]">14ms Latency</div>
          <span className="text-xs text-slate-500">2.4M Daily Requests</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">MongoDB Cluster</span>
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-green-100">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </span>
          </div>
          <div className="text-xl font-black text-[#352A4D]">Healthy (3 Nodes)</div>
          <span className="text-xs text-slate-500">98.4 GB Sharded Storage</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Google ADK Agent</span>
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-purple-100">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
            </span>
          </div>
          <div className="text-xl font-black text-[#352A4D]">Grounded & Active</div>
          <span className="text-xs text-slate-500">0 Hallucination Flags</span>
        </div>
      </div>

      {/* Pending Creator Approvals */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#352A4D]">Pending Creator Fellow Applications</h3>
            <p className="text-sm text-slate-600">Verify credentials, clinical licensing, and institutional affiliations.</p>
          </div>
          <span className="rounded-full bg-purple-50 px-3 py-1 border border-purple-100 text-xs font-bold text-[#7B61B5]">
            {pendingCreators.length} Pending
          </span>
        </div>

        <div className="space-y-4">
          {pendingCreators.map((creator) => (
            <div
              key={creator.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-purple-200 hover:shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#7B61B5] border border-purple-100 shadow-sm">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#352A4D]">{creator.name}</h4>
                  <p className="text-sm text-slate-600">{creator.credentials} • {creator.domain}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleApproveCreator(creator.id)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-purple-50 hover:text-purple-700 transition"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApproveCreator(creator.id)}
                  className="flex items-center gap-1.5 rounded-xl bg-[#7B61B5] px-5 py-2.5 text-sm font-bold text-white hover:bg-purple-800 transition shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Verify & Approve</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
