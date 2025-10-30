import ComingSoon from '@/components/coming-soon';
import { Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <ComingSoon
      title="About 4RealKE"
      description="Learn about our mission to revolutionize vehicle buying in Kenya through AI-powered inspections, transparent processes, and data-driven confidence for every automotive transaction."
      icon={Users}
    />
  );
}
