import AnalyticsCard from '../AnalyticsCard';
import { DollarSign } from 'lucide-react';

export default function AnalyticsCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <AnalyticsCard
        title="Total Revenue"
        value="$12,345"
        change="+20.1% from last month"
        icon={DollarSign}
        trend="up"
      />
    </div>
  );
}
