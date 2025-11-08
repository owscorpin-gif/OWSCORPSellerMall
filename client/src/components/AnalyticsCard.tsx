import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export default function AnalyticsCard({
  title,
  value,
  change,
  icon: Icon,
  trend = "neutral"
}: AnalyticsCardProps) {
  const trendColor = {
    up: "text-green-600",
    down: "text-red-600",
    neutral: "text-muted-foreground"
  }[trend];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold" data-testid="text-analytics-value">
          {value}
        </div>
        {change && (
          <p className={`text-xs ${trendColor} mt-1`} data-testid="text-analytics-change">
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
