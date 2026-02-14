import { SkillCategorySection } from '../SkillCategorySection';
import { AchievementCard } from '../AchievementCard';
import { getSkillsData } from '../../data/skillsData';
import { yearsOfExperience, yearsWithReact } from '../../utils/constants';

interface AboutSectionProps {
  scrollY: number;
}

export const AboutSection = ({ scrollY }: AboutSectionProps) => {
  const skills = getSkillsData({ yearsOfExperience, yearsWithReact });

  const frontendSkills = skills.filter((s) => s.category === 'frontend');
  const backendSkills = skills.filter((s) => s.category === 'backend');
  const toolsSkills = skills.filter((s) => s.category === 'tools');

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div
        className="absolute inset-0 opacity-10"
        style={{ transform: `translateY(${(scrollY - 1600) * 0.15}px)` }}
      >
        <div className="absolute top-20 right-20 w-96 h-96 bg-linear-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="text-center mb-16">
          <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20 inline-block mb-6">
            Background
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>
        </header>

        {/* Main Bio Card */}
        <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl p-10 md:p-12 rounded-3xl border border-gray-200 dark:border-white/10 mb-12 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-500 shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-purple-500/5 rounded-3xl"></div>

          <div className="relative space-y-6">
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
              I am a <span className="text-cyan-400 font-medium">Senior Frontend Engineer</span>{' '}
              with <span className="text-cyan-400 font-medium">{yearsOfExperience} years</span> of
              industry experience and over{' '}
              <span className="text-cyan-400 font-medium">{yearsWithReact} years</span> specializing
              in{' '}
              <span className="text-gray-900 dark:text-white font-medium">React, TypeScript,</span>{' '}
              and modern JavaScript ecosystems. Throughout my career, I've delivered
              enterprise-grade applications across healthcare, logistics, SaaS, e-commerce, and
              automotive platforms.
            </p>

            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
              My work centers on building{' '}
              <span className="text-gray-900 dark:text-white font-medium">
                scalable UI architectures
              </span>
              , establishing reusable component systems, owning frontend delivery, and collaborating
              closely with backend and product teams to ensure technical alignment. I bring strong
              experience across{' '}
              <span className="text-gray-900 dark:text-white font-medium">
                GraphQL, REST, CI/CD pipelines, cloud deployments,
              </span>{' '}
              and multi-environment release workflows.
            </p>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              Beyond hands-on engineering, I advocate for clean code, predictable state management,
              accessibility, meaningful developer experience improvements, and long-term
              maintainability. I enjoy taking ambiguous requirements, shaping the technical
              direction, and driving features from concept to production with reliability and
              attention to detail.
            </p>
          </div>
        </div>

        {/* Skills Grid - Row-Based Layout */}
        <div className="mb-12 space-y-10">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Core Skills & Expertise
          </h3>

          {/* Frontend Development */}
          <SkillCategorySection
            title="Frontend Development"
            skills={frontendSkills}
            gradientFrom="from-cyan-500"
            gradientTo="to-blue-500"
            icon={
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            }
          />

          {/* Backend & APIs */}
          <SkillCategorySection
            title="Backend & APIs"
            skills={backendSkills}
            gradientFrom="from-purple-500"
            gradientTo="to-pink-500"
            icon={
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            }
          />

          {/* Tools & Workflow */}
          <SkillCategorySection
            title="Tools & Workflow"
            skills={toolsSkills}
            gradientFrom="from-green-500"
            gradientTo="to-teal-500"
            icon={
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Achievement Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AchievementCard
            title="Engineering Approach"
            description="Strong focus on reliability, maintainability, and alignment with backend API designs. I emphasize scalable patterns, predictable behavior, readable code, and reducing tech debt through thoughtful engineering."
            gradientFrom="from-purple-500/0"
            gradientTo="to-pink-500/0"
            borderColor="border-purple-400/30"
            icon={
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            }
          />

          <AchievementCard
            title="Notable Achievements"
            description="Led frontend architecture for multiple high-traffic applications, implemented design systems, reduced bundle sizes significantly, and mentored junior developers."
            gradientFrom="from-green-500/0"
            gradientTo="to-teal-500/0"
            borderColor="border-green-400/30"
            icon={
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};
