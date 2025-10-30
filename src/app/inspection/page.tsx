import ComingSoon from '@/components/coming-soon';
import { Wrench } from 'lucide-react';

export default function InspectionPage() {
  return (
    <ComingSoon
      title="Pre-Purchase Inspection"
      description="Our comprehensive AI-powered vehicle inspection service combines cutting-edge neural network analysis with professional mechanical expertise to give you complete confidence before buying any used car in Kenya."
      icon={Wrench}
    />
  );
}
