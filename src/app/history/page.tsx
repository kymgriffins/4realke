import ComingSoon from '@/components/coming-soon';
import { FileText } from 'lucide-react';

export default function HistoryPage() {
  return (
    <ComingSoon
      title="Car History Report"
      description="Access comprehensive vehicle history reports with accident records, service history, ownership changes, and mileage verification across Kenya and East African databases."
      icon={FileText}
    />
  );
}
