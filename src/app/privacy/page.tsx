import ComingSoon from '@/components/coming-soon';
import { Lock } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <ComingSoon
      title="Privacy Policy"
      description="Learn how we protect and manage your personal information and vehicle data. Our privacy practices ensure your information is secure while providing you with professional inspection services."
      icon={Lock}
    />
  );
}
