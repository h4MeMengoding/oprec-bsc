'use client';

import acceptedData from '@/data/accepted.json';
import Link from 'next/link';

// Type definition
type Candidate = {
  nim: string;
  nama: string;
  status: 'diterima' | 'ditolak';
};

const acceptedCandidates = (acceptedData as Candidate[]).filter(
  (candidate) => candidate.status === 'diterima'
);

export default function LolosPage() {
  return (
    <div className="min-h-screen bg-[#021550]">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBA302] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FBA302] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#FBA302] rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/logo.jpg" alt="BSC UNNES" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">BSC UNNES</h1>
                <p className="text-sm text-white/60">Broadcasting Students Club</p>
              </div>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white text-sm"
            >
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#FBA302]/10 border border-[#FBA302]/20 rounded-full mb-6">
            <span className="text-[#FBA302] text-sm font-semibold">Periode Recruitment 2026</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Daftar Calon Anggota<br />
            <span className="text-[#FBA302]">Yang Lolos</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-4">
            Selamat kepada {acceptedCandidates.length} mahasiswa yang telah lolos seleksi BSC UNNES 2026
          </p>
        </div>

        {/* Grid of Accepted Candidates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {acceptedCandidates.map((candidate) => (
            <div 
              key={candidate.nim}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#FBA302]/30 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-[#FBA302]/10"
            >
              {/* Photo from API */}
              <div className="relative mb-4 flex justify-center">
                <img 
                  src={`https://duanol.unnes.ac.id/v2/primer/user_ava/${candidate.nim}`}
                  alt={candidate.nama}
                  className="w-24 h-32 rounded-xl object-cover border-4 border-[#FBA302]/30"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.classList.remove('hidden');
                      fallback.classList.add('flex');
                    }
                  }}
                />
                <div className="hidden w-24 h-32 bg-[#FBA302]/10 border-4 border-[#FBA302]/30 rounded-xl items-center justify-center">
                  <svg className="w-12 h-12 text-[#FBA302]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold text-white mb-2 text-center line-clamp-2 min-h-[3.5rem]">
                {candidate.nama}
              </h3>

              {/* NIM */}
              <p className="text-white/50 font-mono text-sm text-center mb-3">
                {candidate.nim}
              </p>

              {/* Status Badge */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-emerald-400 text-xs font-semibold">Diterima</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {acceptedCandidates.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 rounded-full mb-6">
              <svg className="w-10 h-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Belum Ada Data</h3>
            <p className="text-white/60">Belum ada kandidat yang diterima</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-white/40 text-sm">&copy; 2026 BSC UNNES</p>
        </div>
      </footer>
    </div>
  );
}
