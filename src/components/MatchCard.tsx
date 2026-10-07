import React, { useState } from 'react';
import { 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  ChevronDown, 
  ChevronUp, 
  Flame,
  Activity
} from 'lucide-react';
import { Match, BetSelection } from '../types';
import { playClickSound } from '../utils/soundEffects';

interface MatchCardProps {
  match: Match;
  selectedBets: BetSelection[];
  onToggleSelection: (bet: BetSelection) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  selectedBets,
  onToggleSelection,
}) => {
  const [expandedMarkets, setExpandedMarkets] = useState(false);

  // Check if a specific selection is currently in the bet slip
  const isSelected = (selectionId: string) => {
    return selectedBets.some((b) => b.matchId === match.id && b.selectionId === selectionId);
  };

  const handleOddClick = (
    marketName: string, 
    selectionId: string, 
    selectionName: string, 
    odds: number
  ) => {
    playClickSound();
    onToggleSelection({
      matchId: match.id,
      matchTitle: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      sport: match.sport,
      marketName,
      selectionId,
      selectionName,
      odds,
    });
  };

  const primaryMarket = match.markets[0];
  const additionalMarkets = match.markets.slice(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 transition-all shadow-xs hover:shadow-md p-4 sm:p-5 flex flex-col gap-4">
      {/* Card Header: League & Status */}
      <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/60">
            {match.sport === 'football' ? '⚽ Football' : match.sport === 'basketball' ? '🏀 Basketball' : match.sport === 'tennis' ? '🎾 Tennis' : match.sport === 'cs2' ? '🎯 CS2' : '⚔️ Dota 2'}
          </span>
          <span className="font-bold text-slate-800">{match.league}</span>
          {match.isHot && (
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
              <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              HOT
            </span>
          )}
        </div>

        {match.status === 'live' ? (
          <div className="flex items-center gap-1.5 font-bold text-red-600">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-mono-nums">
              {match.minute ? `${match.minute}'` : match.period || 'LIVE'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{match.period}</span>
          </div>
        )}
      </div>

      {/* Teams & Scores Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Teams Display */}
        <div className="flex-1 space-y-2.5">
          {/* Home Team */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
                {match.homeTeam.logo ? (
                  <img
                    src={match.homeTeam.logo}
                    alt={match.homeTeam.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-[11px] font-extrabold text-slate-600">
                    {match.homeTeam.shortName.slice(0, 3)}
                  </span>
                )}
              </div>
              <span className="font-bold text-sm text-slate-900 truncate">
                {match.homeTeam.name}
              </span>
            </div>
            <span className="text-base font-extrabold text-slate-900 font-mono-nums">
              {match.status === 'live' ? match.homeScore : '-'}
            </span>
          </div>

          {/* Away Team */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
                {match.awayTeam.logo ? (
                  <img
                    src={match.awayTeam.logo}
                    alt={match.awayTeam.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-[11px] font-extrabold text-slate-600">
                    {match.awayTeam.shortName.slice(0, 3)}
                  </span>
                )}
              </div>
              <span className="font-bold text-sm text-slate-900 truncate">
                {match.awayTeam.name}
              </span>
            </div>
            <span className="text-base font-extrabold text-slate-900 font-mono-nums">
              {match.status === 'live' ? match.awayScore : '-'}
            </span>
          </div>
        </div>

        {/* Live Match Mini-Stats */}
        {match.status === 'live' && match.stats && (
          <div className="hidden sm:flex flex-col items-end gap-1 text-[11px] text-slate-500 font-medium border-l border-slate-100 pl-4">
            {match.stats.possession && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Possession:</span>
                <span className="font-bold text-slate-700 font-mono-nums">
                  {match.stats.possession[0]}% - {match.stats.possession[1]}%
                </span>
              </div>
            )}
            {match.stats.shotsOnTarget && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Shots on goal:</span>
                <span className="font-bold text-slate-700 font-mono-nums">
                  {match.stats.shotsOnTarget[0]} - {match.stats.shotsOnTarget[1]}
                </span>
              </div>
            )}
            {match.stats.kills && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Kills:</span>
                <span className="font-bold text-slate-700 font-mono-nums">
                  {match.stats.kills[0]} - {match.stats.kills[1]}
                </span>
              </div>
            )}
            {match.stats.currentMap && (
              <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                <Activity className="w-3 h-3" />
                <span>{match.stats.currentMap}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Primary Odds Grid (e.g. 1X2 or Match Winner) */}
      {primaryMarket && (
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {primaryMarket.name}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {primaryMarket.selections.map((sel) => {
              const active = isSelected(sel.id);
              const isUp = sel.trend === 'up';
              const isDown = sel.trend === 'down';

              return (
                <button
                  key={sel.id}
                  type="button"
                  onClick={() => handleOddClick(primaryMarket.name, sel.id, sel.name, sel.value)}
                  className={`relative flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    active
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/20'
                      : isUp
                      ? 'odd-flash-up bg-emerald-50/60 text-slate-800 border-emerald-300'
                      : isDown
                      ? 'odd-flash-down bg-rose-50/60 text-slate-800 border-rose-300'
                      : 'bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                  }`}
                >
                  <span className={`truncate max-w-[70%] ${active ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {sel.name}
                  </span>

                  <div className="flex items-center gap-0.5 font-bold font-mono-nums text-sm">
                    {isUp && !active && <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 stroke-3" />}
                    {isDown && !active && <ArrowDownRight className="w-3.5 h-3.5 text-rose-600 stroke-3" />}
                    <span>{sel.value.toFixed(2)}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Additional Markets Accordion (Over/Under, Handicaps) */}
      {additionalMarkets.length > 0 && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setExpandedMarkets(!expandedMarkets)}
            className="flex items-center justify-between w-full text-xs font-bold text-slate-500 hover:text-slate-800 py-1 transition-colors"
          >
            <span>More Markets ({additionalMarkets.length})</span>
            {expandedMarkets ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {expandedMarkets && (
            <div className="mt-3 space-y-3 pt-3 border-t border-slate-100">
              {additionalMarkets.map((market) => (
                <div key={market.id} className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {market.name}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {market.selections.map((sel) => {
                      const active = isSelected(sel.id);
                      const isUp = sel.trend === 'up';
                      const isDown = sel.trend === 'down';

                      return (
                        <button
                          key={sel.id}
                          type="button"
                          onClick={() => handleOddClick(market.name, sel.id, sel.name, sel.value)}
                          className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold transition-all ${
                            active
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                              : isUp
                              ? 'odd-flash-up bg-emerald-50/60 text-slate-800 border-emerald-300'
                              : isDown
                              ? 'odd-flash-down bg-rose-50/60 text-slate-800 border-rose-300'
                              : 'bg-slate-50/70 hover:bg-slate-100 text-slate-700 border-slate-200/90'
                          }`}
                        >
                          <span className={`truncate max-w-[70%] ${active ? 'text-emerald-100' : 'text-slate-500'}`}>
                            {sel.name}
                          </span>
                          <span className="font-bold font-mono-nums text-sm">
                            {sel.value.toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
