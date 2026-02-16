import { useEffect, useState, useRef } from 'react';
import { yearsOfExperience, yearsWithReact } from '../utils/constants';

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const stats: Stat[] = [
  { value: yearsOfExperience, label: 'Years Experience', suffix: '+' },
  { value: yearsWithReact, label: 'Years with React', suffix: '+' },
  { value: 10, label: 'Projects Completed', suffix: '+' },
  { value: 10, label: 'Tech Stack', suffix: '+' }
];

export const AnimatedStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} isVisible={isVisible} delay={index * 100} />
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  stat,
  isVisible,
  delay
}: {
  stat: Stat;
  isVisible: boolean;
  delay: number;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  return (
    <div
      className={`text-center p-6 bg-white/50 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-200 dark:border-white/10 hover:border-cyan-400/30 transition-all duration-500 hover:-translate-y-1 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
        {stat.label}
      </div>
    </div>
  );
};
