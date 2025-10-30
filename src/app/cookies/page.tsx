import ComingSoon from '@/components/coming-soon';
import { Cookie } from 'lucide-react';

export default function CookiesPage() {
  return (
    <ComingSoon
      title="Cookie Policy"
      description="Learn about how we use cookies and similar technologies to enhance your experience on our platform. Manage your preferences and understand our data practices."
      icon={Cookie}
    />
  );
}
