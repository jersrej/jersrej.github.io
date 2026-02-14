import { SkillCard } from './SkillCard';

interface Skill {
  name: string;
  years: number;
  proficiency: number;
  category: 'frontend' | 'backend' | 'tools';
  icon: React.ReactNode;
}

interface SkillCategorySectionProps {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  gradientFrom: string;
  gradientTo: string;
  gridCols?: string;
}

export const SkillCategorySection = ({
  title,
  icon,
  skills,
  gradientFrom,
  gradientTo,
  gridCols = 'lg:grid-cols-3'
}: SkillCategorySectionProps) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`w-10 h-10 bg-gradient-to-br ${gradientFrom} ${gradientTo} rounded-lg flex items-center justify-center`}
        >
          {icon}
        </div>
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h4>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-4`}>
        {skills.map((skill, index) => (
          <SkillCard key={`${skill.name}-${index}`} {...skill} />
        ))}
      </div>
    </div>
  );
};
