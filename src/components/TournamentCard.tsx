import React, { useState } from 'react';
import { Trophy, Clock, Users, CheckCircle2 } from 'lucide-react';
import { currentTournament } from '../data/gamesCatalog';
import { playWinCoinsSound } from '../utils/casinoAudio';

interface TournamentCardProps {
  isRu: boolean;
}

export const TournamentCard: React.FC<TournamentCardProps> = ({ isRu }) => {
  const [hasJoined, setHasJoined] = useState(false);
  const [participants, setParticipants] = useState(currentTournament.participantsCount);

  const handleJoin = () => {
    if (!hasJoined) {
      playWinCoinsSound();
      setHasJoined(true);
      setParticipants((p) => p + 1);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-amber-200/90 shadow-md p-5 sm:p-7 overflow-hidden relative">
      {/* Background Graphic Watermark */}
      <div 
        className="absolute top-0 right-0 w-2/3 h-full bg-cover bg-right opacity-[0.06] pointer-events-none mix-blend-multiply"
        style={{ backgroundImage: `url("${import.meta.env.BASE_URL}banners/hero-tournament.webp")` }}
      />
      {/* Top Banner Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Trophy className="w-6 h-6 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                {isRu ? 'АКТИВЕН' : 'ACTIVE'}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {currentTournament.subtitle}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {currentTournament.title}
            </h3>
          </div>
        </div>

        {/* Prize Pool & Timer */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              {isRu ? 'Призовой Фонд' : 'Prize Pool'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-600 font-mono">
              {currentTournament.prizePool}
            </span>
          </div>

          <div className="pl-4 border-l border-slate-200 text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block flex items-center gap-1 justify-end">
              <Clock className="w-3 h-3 text-rose-500" />
              {isRu ? 'До конца' : 'Ends In'}
            </span>
            <span className="text-sm sm:text-base font-extrabold text-slate-800 font-mono">
              35h : 14m : 22s
            </span>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-3 px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>{isRu ? 'Лидеры турнира' : 'Top Contenders'}</span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{participants} {isRu ? 'игроков' : 'players'}</span>
          </span>
        </div>

        <div className="space-y-2">
          {currentTournament.leaderboard.map((item) => (
            <div
              key={item.rank}
              className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                item.rank === 1
                  ? 'bg-linear-to-r from-amber-50 to-yellow-50/60 border-amber-300 shadow-xs'
                  : 'bg-slate-50/60 hover:bg-amber-50/40 border-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  item.rank === 1 ? 'bg-amber-500 text-white' :
                  item.rank === 2 ? 'bg-slate-400 text-white' :
                  item.rank === 3 ? 'bg-amber-700 text-white' :
                  'bg-slate-200 text-slate-600'
                }`}>
                  {item.rank}
                </span>
                <span className="text-base">{item.avatar}</span>
                <div>
                  <span className="text-xs font-black text-slate-900 block">{item.user}</span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {item.points.toLocaleString()} pts
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-emerald-600 block">
                  {item.prize}
                </span>
                <span className="text-[10px] text-slate-400">
                  {isRu ? 'Награда' : 'Prize'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join Action button */}
      <div className="mt-5 pt-4 border-t border-amber-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          {isRu 
            ? 'Делайте спины в турнирных слотах для набора очков' 
            : 'Spin any participating slot to climb the live leaderboard'}
        </span>

        <button
          onClick={handleJoin}
          disabled={hasJoined}
          className={`px-6 py-2.5 rounded-2xl text-xs font-black tracking-wide transition-all cursor-pointer ${
            hasJoined
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
              : 'bg-linear-to-r from-amber-500 to-rose-500 hover:brightness-105 active:scale-95 text-white shadow-md shadow-amber-500/25'
          }`}
        >
          {hasJoined ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {isRu ? 'ВЫ УЧАСТВУЕТЕ' : 'YOU ARE REGISTERED'}
            </span>
          ) : (
            <span>{isRu ? 'ПРИНЯТЬ УЧАСТИЕ' : 'ENTER TOURNAMENT'}</span>
          )}
        </button>
      </div>
    </div>
  );
};
