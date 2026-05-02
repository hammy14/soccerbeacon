import { formatDistanceToNow } from 'date-fns';

interface Match {
  id: number;
  home_team_name: string;
  away_team_name: string;
  match_date: string;
  status: string;
  home_score?: number;
  away_score?: number;
}

export default function MatchCard({ match }: { match: Match }) {
  const isFinished = match.status === 'finished';
  const isLive = match.status === 'live';

  return (
    <div className="card p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-gray-600">
          {formatDistanceToNow(new Date(match.match_date), { addSuffix: true })}
        </span>
        <span className={`badge ${isLive ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
          {isLive ? '🔴 LIVE' : isFinished ? 'Finished' : 'Upcoming'}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 text-right pr-4">
          <p className="font-bold">{match.home_team_name}</p>
        </div>

        <div className="text-center">
          {isFinished || isLive ? (
            <div className="text-2xl font-bold">
              {match.home_score} - {match.away_score}
            </div>
          ) : (
            <div className="text-gray-600">vs</div>
          )}
        </div>

        <div className="flex-1 text-left pl-4">
          <p className="font-bold">{match.away_team_name}</p>
        </div>
      </div>
    </div>
  );
}
