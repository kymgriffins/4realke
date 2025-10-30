import ComingSoon from '@/components/coming-soon';
import { DollarSign } from 'lucide-react';

export default function ValuationPage() {
  return (
    <ComingSoon
      title="Used Car Valuation"
      description="Get accurate market valuations for any used vehicle in Kenya's automotive market. Our AI-driven pricing algorithm analyzes thousands of comparable sales across East Africa to ensure you get a fair price."
      icon={DollarSign}
    />
  );
}
