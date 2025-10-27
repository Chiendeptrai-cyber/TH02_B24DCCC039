import { useState, useEffect } from 'react';
import axios from 'axios';

interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
  published_at: string;
}

const NewsApp: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get<{ results: NewsArticle[] }>(
          'https://api.spaceflightnewsapi.net/v4/articles?limit=10'
        );
        setArticles(response.data.results);
        setError('');
      } catch (err) {
        setError('Failed to fetch news');
      }
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1>News App</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <img src={article.image_url} alt={article.title} style={{ width: '100px' }} />
            <h3>{article.title}</h3>
            <p>{article.summary}</p>
            <p><a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
            <p><strong>Published:</strong> {new Date(article.published_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsApp;