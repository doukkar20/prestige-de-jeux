import { useLocation } from 'react-router-dom';
import { InformationContent } from '../components/EditorialContent';
export default function Information() {
  return <InformationContent path={useLocation().pathname.replace(/\/$/, '') || '/'} />;
}
