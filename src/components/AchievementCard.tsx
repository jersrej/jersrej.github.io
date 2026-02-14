interface AchievementCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  borderColor: string;
}

export const AchievementCard = ({
  title,
  description,
  icon,
  gradientFrom,
  gradientTo,
  borderColor
}: AchievementCardProps) => {
  return (
    <div
      className={`group relative bg-white/50 dark:bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:${borderColor} transition-all duration-500 hover:-translate-y-1`}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${gradientFrom} ${gradientTo} group-hover:${gradientFrom.replace('/0', '/5')} group-hover:${gradientTo.replace('/0', '/5')} rounded-2xl transition-all duration-500`}
      ></div>

      <div className="relative">
        <div
          className={`w-12 h-12 bg-linear-to-br ${gradientFrom.replace('/0', '')} ${gradientTo.replace('/0', '')} rounded-xl mb-4 flex items-center justify-center`}
        >
          {icon}
        </div>
        <h4 className="font-semibold text-xl mb-3 text-gray-900 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
