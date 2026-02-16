interface SkillCardProps {
  name: string;
  years: number;
  proficiency: number;
  category: 'frontend' | 'backend' | 'tools';
  icon: React.ReactNode;
}

export const SkillCard = ({ name, years, proficiency, category, icon }: SkillCardProps) => {
  const categoryColors = {
    frontend: {
      border: 'border-cyan-400/30',
      gradient: 'from-cyan-500/5 to-blue-500/5',
      iconBg: 'from-cyan-500 to-blue-500',
      barBg: 'from-cyan-500 to-blue-500',
      text: 'text-cyan-600 dark:text-cyan-400'
    },
    backend: {
      border: 'border-purple-400/30',
      gradient: 'from-purple-500/5 to-pink-500/5',
      iconBg: 'from-purple-500 to-pink-500',
      barBg: 'from-purple-500 to-pink-500',
      text: 'text-purple-600 dark:text-purple-400'
    },
    tools: {
      border: 'border-green-400/30',
      gradient: 'from-green-500/5 to-teal-500/5',
      iconBg: 'from-green-500 to-teal-500',
      barBg: 'from-green-500 to-teal-500',
      text: 'text-green-600 dark:text-green-400'
    }
  };

  const colors = categoryColors[category];

  return (
    <div
      className={`group relative bg-white/50 dark:bg-white/5 backdrop-blur-lg p-4 md:p-6 rounded-xl border border-gray-200 dark:border-white/10 hover:${colors.border} transition-all duration-500 hover:-translate-y-1 h-full`}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br from-transparent to-transparent group-hover:${colors.gradient} rounded-xl transition-all duration-500`}
      ></div>

      <div className="relative">
        {/* Icon and Title */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`w-10 h-10 bg-linear-to-br ${colors.iconBg} rounded-lg flex items-center justify-center shrink-0`}
          >
            <div className="text-white">{icon}</div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-base text-gray-900 dark:text-white truncate">
              {name}
            </h4>
            <p className={`text-xs ${colors.text} font-medium`}>
              {years < 1 ? 'Less than a year of' : `${years} year${years > 1 ? 's' : ''}`}{' '}
              experience
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
            <span className={`font-semibold ${colors.text}`}>{proficiency}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-linear-to-r ${colors.barBg} rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${proficiency}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
