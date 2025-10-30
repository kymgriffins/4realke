import ComingSoon from '@/components/coming-soon';
import { MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact Us"
      description="Have questions about our AI-powered vehicle inspection services? Reach out to our team of automotive experts in Nairobi, Kenya. We're here to help with your vehicle buying journey."
      icon={MessageCircle}
    />
  );
}
