import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CreatorApi } from '../../services/creatorApi';
import { ResearchPaper } from '../../types';
import {
  Sparkles,
  BookOpen,
  FolderKanban,
  FileText,
  Users,
  CheckCircle2,
  Clock,
  PlusCircle,
  UploadCloud,
  ArrowRight,
  TrendingUp,
  Award,
  Search,
  ExternalLink,
  Bot,
} from 'lucide-react';

export const CreatorDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [research, setResearch] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [dRes, rRes] = await Promise.all([
          CreatorApi.getCreatorDashboard(),
          CreatorApi.getResearchPapers(),
        ]);
        setStats(dRes.data);
        setResearch(rRes.data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div id="creator-dashboard" className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-rose-100 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Curriculum Research Studio</h1>
          <p className="text-sm text-slate-500 mt-1">
            Author ground-truth research, design diagnostic rubrics, and publish verified life-skill courses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/creator/courses/new"
            className="flex items-center gap-2 rounded-full bg-[#BE123C] px-5 py-2.5 text-sm font-bold text-white hover:bg-rose-800 transition shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Course</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-rose-100 bg-white p-5 space-y-2 shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Learners Taught</span>
          <div className="text-3xl font-black text-[#BE123C]">1,480</div>
          <span className="text-xs text-slate-500">Across 3 live tracks</span>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-white p-5 space-y-2 shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Research Grounding</span>
          <div className="text-3xl font-black text-rose-600">100%</div>
          <span className="text-xs text-slate-500">Peer-reviewed citations</span>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-white p-5 space-y-2 shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Teach-Back Pass</span>
          <div className="text-3xl font-black text-rose-500">92.4%</div>
          <span className="text-xs text-slate-500">Feynman mastery index</span>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-white p-5 space-y-2 shadow-sm">
          <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">Agent Grounding</span>
          <div className="text-3xl font-black text-orange-600">Synced</div>
          <span className="text-xs text-slate-500">Google ADK indexed</span>
        </div>
      </div>

      {/* Research Papers Grounding List */}
      <div className="rounded-3xl border border-rose-100 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#4C0519]">Grounded Research Papers</h3>
            <p className="text-sm text-slate-500">All courses in your portfolio draw authority from these verified documents.</p>
          </div>
          <Link
            to="/creator/research"
            className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-[#BE123C] hover:bg-rose-100 transition"
          >
            <UploadCloud className="h-4 w-4" />
            <span>Upload Paper</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 pt-2">
          {research.map((paper) => (
            <div
              key={paper.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-5 gap-4 hover:border-rose-200 hover:shadow-sm transition group"
            >
              <div className="space-y-2 flex-1 min-w-0">
                 <div className="flex items-center gap-3">
                   <span className="rounded bg-rose-100 text-rose-800 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                     {paper.subjectCategory}
                   </span>
                   <span className="flex items-center gap-1 text-[11px] font-bold text-[#BE123C]">
                     <CheckCircle2 className="h-3.5 w-3.5" />
                     <span>Peer Verified</span>
                   </span>
                 </div>
                 <h4 className="text-base font-bold text-[#4C0519] truncate">{paper.title}</h4>
                 <p className="text-sm text-slate-500 line-clamp-1">{paper.abstract}</p>
              </div>
              
              <div className="shrink-0 flex items-center gap-6 text-sm text-slate-500">
                <div className="text-right hidden md:block">
                   <div className="font-bold text-[#4C0519]">{paper.citationsCount}</div>
                   <div className="text-xs">Citations</div>
                </div>
                <div className="text-right hidden sm:block">
                   <div className="font-bold text-[#4C0519] flex items-center justify-end gap-1">
                      <Bot className="h-4 w-4 text-[#BE123C]" />
                      <span>Active</span>
                   </div>
                   <div className="text-xs">Grounding</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ResearchLibraryPage: React.FC = () => {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAbstract, setNewAbstract] = useState('');
  const [newCategory, setNewCategory] = useState('first_aid');

  useEffect(() => {
    CreatorApi.getResearchPapers().then((res) => setPapers(res.data));
  }, []);

  const handleCreatePaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: ResearchPaper = {
      id: `res_paper_${Date.now()}`,
      creatorId: 'creator_marcus_vance',
      title: newTitle,
      abstract: newAbstract || 'Peer-reviewed clinical guidelines and protocol.',
      subjectCategory: newCategory,
      tags: ['Clinical', 'Evidence-Based', 'Recall Grounding'],
      citationsCount: 14,
      publishedDate: '2026-03-24',
      status: 'approved',
      verificationStatus: 'verified',
      keyFindings: ['Calibrated response timing', 'Reduced civilian hesitation'],
      fileUrl: 'https://recall.edu/research/sample.pdf',
    };

    setPapers([created, ...papers]);
    setUploadModalOpen(false);
    setNewTitle('');
    setNewAbstract('');
  };

  const filteredPapers = papers.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.subjectCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="research-library-page" className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-rose-100 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Creator Research Library</h1>
          <p className="text-sm text-slate-500 mt-1">
            Institutional knowledge grounding and peer-reviewed whitepapers powering Recall curriculum.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center gap-2 rounded-full bg-[#BE123C] px-5 py-2.5 text-sm font-bold text-white hover:bg-rose-800 transition shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <UploadCloud className="h-4 w-4" />
          <span>Upload New Research</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search research papers, topics, citations..."
          className="w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 py-3 text-sm text-[#4C0519] placeholder-slate-400 focus:border-[#BE123C] focus:ring-1 focus:ring-[#BE123C] focus:outline-none shadow-sm"
        />
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPapers.map((p) => (
          <div key={p.id} className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm hover:shadow-md hover:border-rose-200 transition">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-rose-50 px-2.5 py-1 text-[10px] font-bold text-[#BE123C] uppercase tracking-wider">
                {p.subjectCategory}
              </span>
              <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700 flex items-center gap-1 border border-green-200">
                <CheckCircle2 className="h-3 w-3" />
                <span>Verified</span>
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#4C0519]">{p.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">{p.abstract}</p>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Grounded Findings:</span>
              <ul className="space-y-1.5">
                {p.keyFindings.map((f, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#BE123C] shrink-0 mt-1.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>{p.citationsCount} Citations Indexed</span>
              <span>{p.publishedDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Paper Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-[#4C0519]">Upload Grounded Research</h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition">✕</button>
            </div>

            <form onSubmit={handleCreatePaper} className="space-y-5">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Paper Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Cognitive Biases in Consumer Credit Adoption"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-[#4C0519] placeholder-slate-400 focus:border-[#BE123C] focus:ring-1 focus:ring-[#BE123C] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Subject Domain</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-[#4C0519] focus:border-[#BE123C] focus:ring-1 focus:ring-[#BE123C] focus:outline-none transition appearance-none"
                >
                  <option value="finance">Financial Literacy</option>
                  <option value="digital_safety">Digital Safety & Threat Defense</option>
                  <option value="first_aid">First Aid & Trauma Response</option>
                  <option value="communication">High-Stakes Communication</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Abstract & Methodology</label>
                <textarea
                  rows={4}
                  value={newAbstract}
                  onChange={(e) => setNewAbstract(e.target.value)}
                  placeholder="Summarize the core experimental findings, citations, and actionable takeaways..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-[#4C0519] placeholder-slate-400 focus:border-[#BE123C] focus:ring-1 focus:ring-[#BE123C] focus:outline-none transition resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#BE123C] px-6 py-2.5 text-sm font-bold text-white hover:bg-rose-800 transition shadow-sm hover:shadow"
                >
                  Save & Index
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export const ContentBankPage: React.FC = () => {
  return (
    <div id="content-bank-page" className="space-y-8 pb-12">
      <div className="border-b border-rose-100 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4C0519]">Content & Scenario Bank</h1>
        <p className="text-sm text-slate-500 mt-1">
          Reusable clinical case studies, simulation blueprints, and diagnostic vignettes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm hover:shadow-md transition">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-[#BE123C]">
            <FileText className="h-6 w-6" />
          </div>
          <h4 className="text-lg font-bold text-[#4C0519]">42 Scenario Blueprints</h4>
          <p className="text-sm text-slate-500">Interactive crisis vignettes formatted for instant diagnostic embedding.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm hover:shadow-md transition">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-[#BE123C]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h4 className="text-lg font-bold text-[#4C0519]">18 Rubric Matrixes</h4>
          <p className="text-sm text-slate-500">Pre-calibrated evaluation criteria for Google ADK teach-back grading.</p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-sm hover:shadow-md transition">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-[#BE123C]">
            <Sparkles className="h-6 w-6" />
          </div>
          <h4 className="text-lg font-bold text-[#4C0519]">96 Cognitive Analogies</h4>
          <p className="text-sm text-slate-500">Tested metaphors explaining complex mathematical & security mechanisms.</p>
        </div>
      </div>
    </div>
  );
};
