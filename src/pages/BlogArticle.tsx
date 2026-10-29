import { useParams } from 'react-router-dom';
import { articles } from '../data/articles';
import { ArticleContent } from '../components/EditorialContent';
import NotFound from './NotFound';
export default function BlogArticle() {
  const { slug } = useParams();
  const article = articles.find(article => article.slug === slug);
  return article ? <ArticleContent article={article} /> : <NotFound />;
}
