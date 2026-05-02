import Link from 'next/link';

interface League {
  id: number;
  name: string;
  country: string;
  logo_url?: string;
}

export default function LeagueCard({ league }: { league: League }) {
  return (
    <Link href={`/leagues/${league.id}`}>
      <div className="card p-6 text-center cursor-pointer">
        {league.logo_url && (
          <img
            src={league.logo_url}
            alt={league.name}
            className="w-16 h-16 mx-auto mb-4 object-contain"
          />
        )}
        <h3 className="font-bold text-lg mb-2">{league.name}</h3>
        <p className="text-gray-600 text-sm">{league.country}</p>
      </div>
    </Link>
  );
}
