import { useEffect, useState } from "react";

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

interface StatsSectionProps {
  stats?: Stat[];
}

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}</>;
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const defaultStats: Stat[] = [
    { label: "Years Experience", value: 10, suffix: "+" },
    { label: "Skilled Developers", value: 175 },
    { label: "Total Products", value: 1350, suffix: "+" },
    { label: "Happy Customers", value: 9357, suffix: "+" }
  ];

  const displayStats = stats || defaultStats;

  return (
    <div className="bg-primary py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => (
            <div key={index} className="text-center text-primary-foreground">
              <h3 className="text-4xl md:text-5xl font-bold mb-2" data-testid={`stat-value-${index}`}>
                <CountUp end={stat.value} />
                {stat.suffix}
              </h3>
              <p className="text-lg md:text-xl opacity-90" data-testid={`stat-label-${index}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
