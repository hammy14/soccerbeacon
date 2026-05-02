import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Pitch Passport</h3>
            <p className="text-gray-400">
              Your source for global football news, standings, and analysis
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/leagues" className="hover:text-white">
                  Leagues
                </Link>
              </li>
              <li>
                <Link href="/teams" className="hover:text-white">
                  Teams
                </Link>
              </li>
              <li>
                <Link href="/matches" className="hover:text-white">
                  Matches
                </Link>
              </li>
              <li>
                <Link href="/articles" className="hover:text-white">
                  Articles
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Leagues</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/leagues/1" className="hover:text-white">
                  Premier League
                </Link>
              </li>
              <li>
                <Link href="/leagues/2" className="hover:text-white">
                  La Liga
                </Link>
              </li>
              <li>
                <Link href="/leagues/3" className="hover:text-white">
                  Serie A
                </Link>
              </li>
              <li>
                <Link href="/leagues/4" className="hover:text-white">
                  MLS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Pitch Passport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
