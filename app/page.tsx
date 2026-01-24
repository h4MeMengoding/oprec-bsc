'use client';

import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import acceptedData from '@/data/accepted.json';

// Type definition
type Candidate = {
  nim: string;
  nama: string;
  status: 'diterima' | 'ditolak';
};

const acceptedCandidates = acceptedData as Candidate[];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Candidate[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const whatsappGroupLink = 'https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK';

  const fireConfetti = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ['#FBA302', '#021550', '#ffffff'],
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    fire(0.2, {
      spread: 60,
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  const handleSearch = useCallback(() => {
    const trimmedQuery = searchQuery.trim();
    
    if (!trimmedQuery) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    // Validate NIM format (10 digits)
    if (!/^\d{10}$/.test(trimmedQuery)) {
      setSearchResults([]);
      setHasSearched(true);
      return;
    }

    const results = acceptedCandidates.filter(
      (candidate) => candidate.nim === trimmedQuery
    );

    setSearchResults(results);
    setHasSearched(true);

    // Fire confetti if results found
    if (results.length > 0) {
      setTimeout(() => {
        fireConfetti();
      }, 300);
    }
  }, [searchQuery, fireConfetti]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-[#021550] flex flex-col">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FBA302] opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FBA302] opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#FBA302] rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/logo.jpg" alt="BSC UNNES" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">BSC UNNES</h1>
              <p className="text-sm text-white/60">Broadcasting Students Club</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 grow">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#FBA302]/10 border border-[#FBA302]/20 rounded-full mb-6">
            <span className="text-[#FBA302] text-sm font-semibold">Periode Recruitment 2026</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Pengumuman Hasil<br />
            <span className="text-[#FBA302]">Recruitment</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Selamat kepada seluruh pendaftar yang telah lolos seleksi BSC UNNES 2026
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-5 h-5 text-[#FBA302]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <label htmlFor="search" className="block text-sm font-semibold text-white">
                Cari Hasil Recruitment
              </label>
            </div>
            <p className="text-white/60 text-sm mb-4">Masukkan NIM Anda (10 digit angka)</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Contoh: 2405100000"
                maxLength={10}
                pattern="\d{10}"
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FBA302] focus:border-transparent transition-all"
              />
              <button
                onClick={handleSearch}
                className="px-8 py-3.5 bg-[#FBA302] text-[#021550] rounded-xl hover:bg-[#FBA302]/90 transition-all font-semibold shadow-lg shadow-[#FBA302]/20 hover:shadow-[#FBA302]/40 transform hover:scale-105"
              >
                Cari Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* View All Button - REMOVED */}
      </main>

      {/* Search Results Modal */}
      {hasSearched && (
        <div className="fixed inset-0 z-50 bg-[#021550] flex items-center justify-center overflow-hidden p-4">
          {/* Background Pattern */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#FBA302] opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#FBA302] opacity-5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative w-full max-w-lg">
            {searchResults.length > 0 ? (
              <div className="animate-slideUp">
                {searchResults.map((candidate) => (
                  candidate.status === 'diterima' ? (
                    // SUCCESS - DITERIMA
                    <div key={candidate.nim}>
                      {/* Success Header - Minimalist */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-full mb-4">
                          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Selamat!</h3>
                        <p className="text-white/60">Anda diterima di BSC UNNES 2026</p>
                      </div>

                      {/* Results Card - Minimalist */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-6 text-center">
                        {/* Photo from API */}
                        <div className="inline-flex items-center justify-center mb-6">
                          <img 
                            src={`https://duanol.unnes.ac.id/v2/primer/user_ava/${candidate.nim}`}
                            alt={candidate.nama}
                            className="w-24 h-32 rounded-2xl object-cover border-4 border-[#FBA302]/30"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="hidden w-24 h-32 bg-[#FBA302]/10 border-4 border-[#FBA302]/30 rounded-2xl flex items-center justify-center">
                            <svg className="w-14 h-14 text-[#FBA302]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>

                        {/* Name */}
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {candidate.nama}
                        </h4>

                        {/* NIM */}
                        <p className="text-white/50 font-mono mb-6">
                          {candidate.nim}
                        </p>

                        {/* Divider */}
                        <div className="w-20 h-px bg-white/10 mx-auto mb-6"></div>

                        {/* WhatsApp Button - Minimalist */}
                        <a
                          href={whatsappGroupLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] rounded-full transition-all shadow-lg hover:shadow-xl transform hover:scale-105 mb-6"
                        >
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                          <span className="text-white font-semibold text-sm">Bergabung ke Grup WhatsApp</span>
                        </a>

                        {/* Divider */}
                        <div className="w-20 h-px bg-white/10 mx-auto mb-4"></div>

                        {/* Back Button */}
                        <button
                          onClick={() => {
                            setHasSearched(false);
                            setSearchResults([]);
                            setSearchQuery('');
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Kembali
                        </button>
                      </div>

                      {/* Info Note - Minimalist */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                        <p className="text-white/60 text-xs leading-relaxed">
                          Segera bergabung ke grup WhatsApp untuk mendapatkan informasi lebih lanjut.
                        </p>
                      </div>
                    </div>
                  ) : (
                    // REJECTED - DITOLAK
                    <div key={candidate.nim}>
                      {/* Rejected Header */}
                      <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-500/20 border-2 border-red-500/40 rounded-full mb-4">
                          <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-2">Mohon Maaf</h3>
                        <p className="text-white/60">Anda belum lolos seleksi kali ini</p>
                      </div>

                      {/* Results Card */}
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 mb-6 text-center">
                        {/* Photo from API */}
                        <div className="inline-flex items-center justify-center mb-6">
                          <img 
                            src={`https://duanol.unnes.ac.id/v2/primer/user_ava/${candidate.nim}`}
                            alt={candidate.nama}
                            className="w-24 h-32 rounded-2xl object-cover border-4 border-white/20 opacity-60"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="hidden w-24 h-32 bg-white/5 border-4 border-white/20 rounded-2xl flex items-center justify-center">
                            <svg className="w-14 h-14 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>

                        {/* Name */}
                        <h4 className="text-2xl font-bold text-white mb-2">
                          {candidate.nama}
                        </h4>

                        {/* NIM */}
                        <p className="text-white/50 font-mono mb-6">
                          {candidate.nim}
                        </p>

                        {/* Divider */}
                        <div className="w-20 h-px bg-white/10 mx-auto mb-6"></div>

                        {/* Message */}
                        <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed mb-6">
                          Jangan berkecil hati! Tetap semangat dan terus berusaha untuk kesempatan selanjutnya.
                        </p>

                        {/* Divider */}
                        <div className="w-20 h-px bg-white/10 mx-auto mb-4"></div>

                        {/* Back Button */}
                        <button
                          onClick={() => {
                            setHasSearched(false);
                            setSearchResults([]);
                            setSearchQuery('');
                          }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white text-sm"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                          </svg>
                          Kembali
                        </button>
                      </div>

                      {/* Info Note */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                        <p className="text-white/60 text-xs leading-relaxed">
                          Pantau terus informasi recruitment BSC UNNES untuk periode selanjutnya.
                        </p>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              <div className="animate-slideUp">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                  {/* Photo from API */}
                  <div className="inline-flex items-center justify-center mb-6">
                    <img 
                      src={`https://duanol.unnes.ac.id/v2/primer/user_ava/${searchQuery}`}
                      alt="User"
                      className="w-24 h-32 rounded-2xl object-cover border-4 border-white/20"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <div className="hidden w-24 h-32 bg-white/5 border-4 border-white/20 rounded-2xl flex items-center justify-center">
                      <svg className="w-14 h-14 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Message */}
                  <h3 className="text-2xl font-bold text-white mb-4">Tidak Ditemukan</h3>
                  <p className="text-white/60 mb-2">
                    NIM <span className="text-white font-mono font-semibold">{searchQuery}</span>
                  </p>
                  <p className="text-white/60 mb-8">
                    tidak terdaftar dalam daftar penerimaan
                  </p>

                  {/* Divider */}
                  <div className="w-20 h-px bg-white/10 mx-auto mb-6"></div>

                  {/* Helper Text */}
                  <p className="text-white/40 text-sm max-w-md mx-auto leading-relaxed mb-6">
                    Pastikan Anda memasukkan 10 digit NIM dengan benar.
                  </p>

                  {/* Back Button */}
                  <button
                    onClick={() => {
                      setHasSearched(false);
                      setSearchResults([]);
                      setSearchQuery('');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative border-t border-white/10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-center">
          <p className="text-white/40 text-sm">&copy; 2026 BSC UNNES</p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 163, 2, 0.3);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 163, 2, 0.5);
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}
