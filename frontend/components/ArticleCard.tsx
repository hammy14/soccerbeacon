import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  published_at: string;
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/articles/${article.slug}`}>
      <div className="card overflow-hidden cursor-pointer">
        {article.featured_image && (
          <img
            src={article.featured_image}
            alt={article.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {article.excerpt}
          </p>
          <p className="text-gray-500 text-xs">
            {formatDistanceToNow(new Date(article.published_at), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
}
