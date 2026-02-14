interface AboutSectionProps {
  scrollY: number;
  yearsOfExperience: number;
  yearsWithReact: number;
}

interface SkillCardProps {
  name: string;
  years: number;
  proficiency: number;
  category: 'frontend' | 'backend' | 'tools';
  icon: React.ReactNode;
}

const SkillCard = ({ name, years, proficiency, category, icon }: SkillCardProps) => {
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
      className={`group relative bg-white/50 dark:bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-gray-200 dark:border-white/10 hover:${colors.border} transition-all duration-500 hover:-translate-y-1`}
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
              {years} year{years !== 1 ? 's' : ''} experience
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

export const AboutSection = ({ scrollY, yearsOfExperience, yearsWithReact }: AboutSectionProps) => {
  // Skills data array
  const skills = [
    {
      name: 'React',
      years: yearsWithReact,
      proficiency: 95,
      category: 'frontend' as const,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9zM8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z" />
        </svg>
      )
    },
    {
      name: 'TypeScript',
      years: yearsWithReact,
      proficiency: 90,
      category: 'frontend' as const,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 12v12h24V0H0zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 0 0 .102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.244-.651-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 0 0 .313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 0 1-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.197 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.821.053zm-5.634 1.002l.008.983H10.59v8.876H8.38v-8.876H5.258v-.964c0-.534.011-.98.026-.99.012-.016 1.913-.024 4.217-.02l4.195.012z" />
        </svg>
      )
    },
    {
      name: 'JavaScript (ES6+)',
      years: yearsOfExperience,
      proficiency: 95,
      category: 'frontend' as const,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
        </svg>
      )
    },
    {
      name: 'GraphQL Client',
      years: 7,
      proficiency: 85,
      category: 'frontend' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M14.051 2.751l4.935 2.85c.816-.859 2.173-.893 3.032-.077.148.14.274.301.377.477.589 1.028.232 2.339-.796 2.928-.174.1-.361.175-.558.223v5.699c1.146.273 1.854 1.423 1.58 2.569-.048.204-.127.4-.232.581-.592 1.023-1.901 1.374-2.927.782-.196-.113-.375-.259-.526-.429l-4.905 2.832c.372 1.124-.238 2.335-1.361 2.706-.217.071-.442.108-.67.108-1.181.001-2.139-.955-2.14-2.136 0-.205.029-.41.088-.609l-4.936-2.847c-.816.854-2.171.887-3.026.07-.854-.816-.886-2.171-.07-3.026.283-.297.646-.506 1.044-.603l.001-5.699c-1.15-.276-1.858-1.433-1.581-2.584.047-.198.123-.389.224-.566.592-1.024 1.902-1.374 2.927-.782.177.101.339.228.48.377l4.938-2.85C9.613 1.612 10.26.423 11.39.088 11.587.029 11.794 0 12 0c1.181-.001 2.139.954 2.14 2.134.001.209-.03.418-.089.617zm-.515.877c-.019.021-.037.039-.058.058l6.461 11.19c.026-.009.056-.016.082-.023V9.146c-1.145-.283-1.842-1.442-1.558-2.588.006-.024.012-.049.019-.072l-4.946-2.858zm-3.015.059l-.06-.06-4.946 2.852c.327 1.135-.327 2.318-1.461 2.645-.026.008-.051.014-.076.021v5.708l.084.023 6.461-11.19-.002.001zm2.076.507c-.39.112-.803.112-1.192 0l-6.46 11.189c.294.283.502.645.6 1.041h12.911c.097-.398.307-.761.603-1.044L12.597 4.194zm.986 16.227l4.913-2.838c-.015-.047-.027-.094-.038-.142H5.542l-.021.083 4.939 2.852c.388-.404.934-.653 1.54-.653.627 0 1.19.269 1.583.698z" />
        </svg>
      )
    },
    {
      name: 'REST APIs',
      years: yearsOfExperience,
      proficiency: 90,
      category: 'backend' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      )
    },
    {
      name: 'TailwindCSS',
      years: 5,
      proficiency: 95,
      category: 'frontend' as const,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6m-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z" />
        </svg>
      )
    },
    {
      name: 'Node.js',
      years: 0.5,
      proficiency: 60,
      category: 'backend' as const,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
        </svg>
      )
    },
    {
      name: 'React Native',
      years: 0.7,
      proficiency: 65,
      category: 'frontend' as const,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9zM8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z" />
        </svg>
      )
    },
    {
      name: 'NestJS',
      years: 0.6,
      proficiency: 70,
      category: 'backend' as const,
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 256 256" fill="currentColor">
          <path d="M165.883 169.428c-1.027.07-2.054.07-3.081.07-9.965-.07-18.095-2.383-24.46-6.516 1.097 4.476 1.861 8.39 2.416 11.768-3.498 1.722-10.014 3.723-17.353 4.13-7.409.477-13.855-.547-16.97-2.826 1.585 5.093 2.9 9.429 3.803 12.586-9.128 4.407-21.327 5.162-30.595 1.932 2.136 6.794 3.873 12.308 5.023 15.953-11.279 3.723-24.74.966-35.102-6.934 2.207 6.864 3.873 12.029 4.846 15.257-11.42-.337-23.059-5.71-30.385-13.96 2.346 6.095 3.943 10.218 4.567 12.238-10.293-3.164-19.91-10.008-25.81-18.398 2.275 4.686 3.803 7.791 4.357 9.233-8.573-6.026-15.927-14.975-19.7-25.192 2.066 3.095 3.943 5.849 5.4 7.92-6.399-8.88-10.433-20.159-10.433-32.189 0-.337 0-.684.07-1.022 1.656 1.863 3.312 3.585 4.686 5.023-3.172-10.358-2.9-21.886 1.166-32.384 1.097 1.442 2.346 3.095 3.522 4.686-1.166-11.14 1.236-22.629 7.355-32.045.896 1.232 2.065 2.755 3.242 4.287 0-11.559 5.188-22.489 13.576-30.07.617.895 1.586 2.205 2.555 3.585 3.312-11.07 10.573-20.709 20.446-27.344.408.826 1.027 2.065 1.656 3.304 6.678-10.218 16.133-18.189 27.064-23.002.198.756.546 1.862.895 3.034 9.058-8.95 20.656-15.256 33.256-17.92.07.756.199 1.933.338 3.175C124.845 4.357 138.306 0 152.564 0c14.328 0 27.789 4.357 38.858 11.768.07-1.242.199-2.42.268-3.175 12.6 2.664 24.199 8.97 33.257 17.92.348-1.172.686-2.278.895-3.034 10.931 4.813 20.385 12.784 27.064 23.002.617-1.239 1.236-2.478 1.655-3.304 9.874 6.635 17.134 16.274 20.446 27.344.966-1.38 1.932-2.69 2.554-3.585 8.384 7.581 13.575 18.511 13.575 30.07 1.168-1.532 2.336-3.055 3.234-4.287 6.119 9.416 8.521 20.905 7.356 32.045 1.166-1.591 2.416-3.244 3.522-4.686 4.077 10.498 4.347 22.026 1.167 32.384 1.373-1.438 3.029-3.16 4.686-5.023 0 .338.07.685.07 1.022 0 12.03-4.037 23.309-10.433 32.189 1.456-2.071 3.333-4.825 5.4-7.92-3.773 10.217-11.127 19.166-19.7 25.192.547-1.442 2.065-4.547 4.356-9.233-5.889 8.39-15.516 15.234-25.81 18.398.625-2.02 2.216-6.143 4.567-12.238-7.336 8.25-18.964 13.623-30.386 13.96.966-3.228 2.645-8.393 4.846-15.257-10.362 7.9-23.823 10.657-35.101 6.934 1.167-3.645 2.9-9.159 5.033-15.953-9.268 3.23-21.467 2.475-30.596-1.932.905-3.157 2.216-7.493 3.803-12.586-3.113 2.279-9.558 3.303-16.97 2.826-7.327-.407-13.843-2.408-17.352-4.13.554-3.378 1.318-7.292 2.416-11.768-6.365 4.133-14.495 6.446-24.46 6.516-1.027 0-2.054 0-3.082-.07 1.028-3.647 2.346-8.322 3.793-13.595-9.975 5.78-22.154 7.711-33.814 4.89 1.168-3.307 2.685-7.573 4.408-12.586-11.837 5.232-25.468 5.163-37.096-.547 1.447-3.237 3.382-7.502 5.5-12.237-12.738 3.733-26.62 1.349-37.691-5.908 1.723-3.026 4.068-7.095 6.684-11.768-5.47 1.582-10.99 2.347-16.442 2.208-7.963-.208-15.656-2.267-22.573-5.78 2.067-2.756 4.895-6.516 8.045-10.844-13.576-.687-26.96-6.377-36.796-16.046 2.486-2.546 5.959-6.108 9.839-10.288-14.049-4.547-26.97-13.417-35.899-25.615 2.834-2.268 6.905-5.502 11.558-9.22-7.057-4.348-13.576-9.779-19.146-16.056-4.636-5.223-8.45-10.924-11.349-16.971 3.173-1.863 7.826-4.616 13.148-7.78C3.723 96.086.55 84.249.48 71.594c3.522-1.442 8.661-3.585 14.606-6.109C10.782 53.48 7.818 40.834 8.235 27.623c3.794-.895 9.288-2.207 15.656-3.723-2.616-12.865-1.452-26.334 3.802-38.402C31.964-10.921 36.4-8.38 41.145-5.763c-.059 16.133 4.775 31.947 14.19 45.307-1.178-6.307-1.591-11.558-1.322-15.256 4.138 3.863 8.731 7.432 13.735 10.636.764-15.385 6.893-30.129 17.626-41.339 3.026 4.765 6.595 10.148 10.641 16.084-1.932-10.781-2.347-19.844-1.522-26.481 3.863 5.311 8.242 10.566 13.249 15.656 3.314-13.833 10.781-26.544 21.468-36.209 2.132 5.789 4.895 12.864 8.174 20.725-3.38-11.837-4.546-21.817-4.008-29.114 3.59 5.84 7.98 11.976 13.328 18.409 6.683-11.708 16.592-21.27 28.638-27.494 1.038 6.238 2.615 14.138 4.765 22.838-4.397-11.628-6.893-21.468-7.976-28.777 3.234 5.67 7.397 12.168 12.587 19.5 9.568-8.9 21.476-15.18 34.355-17.98.34 6.337 1.166 14.754 2.546 24.202-4.826-10.914-8.055-20.734-10.064-28.776 2.755 4.954 6.595 11.409 11.568 19.225 10.97-4.964 23.096-7.188 35.475-6.178-.077 6.238.07 14.635.686 24.55-4.427-9.905-7.84-19.285-10.502-27.355 2.15 4.268 5.391 10.357 9.767 18.041a75.653 75.653 0 0137.145 6.586c-.893 5.998-1.247 14.05-1.107 23.707-3.163-8.73-5.989-17.204-8.472-24.74 1.443 3.378 4.079 8.87 7.851 16.203 12.238 6.168 23.187 15.527 31.5 27.147 5.141-6.433 9.531-12.569 13.12-18.409.547 7.297-.617 17.277-3.998 29.114 3.276-7.861 6.039-14.936 8.171-20.725 10.687 9.665 18.154 22.376 21.468 36.21 5.004-5.091 9.38-10.346 13.248-15.657.825 6.637.407 15.7-1.522 26.48 4.047-5.936 7.616-11.318 10.642-16.083 10.722 11.21 16.86 25.954 17.624 41.339a87.12 87.12 0 0113.734-10.636c.268 3.698-.148 8.949-1.321 15.256 9.414-13.36 14.247-29.174 14.188-45.307 4.756-2.617 9.19-5.158 13.456-7.639 5.243 12.068 6.417 25.537 3.802 38.402 6.368 1.516 11.862 2.828 15.655 3.723.417 13.211-2.546 25.857-6.854 37.862 5.942 2.524 11.08 4.667 14.604 6.109-.07 12.655-3.244 24.492-8.243 35.336 5.311 3.164 9.964 5.917 13.138 7.78-2.901 6.047-6.715 11.748-11.349 16.97-5.571 6.278-12.09 11.709-19.147 16.057 4.655 3.718 8.723 6.952 11.558 9.22-8.939 12.198-21.849 21.068-35.899 25.615 3.883 4.18 7.356 7.742 9.84 10.288-9.837 9.669-23.22 15.359-36.796 16.046 3.154 4.328 5.98 8.088 8.046 10.844-6.914 3.513-14.607 5.572-22.574 5.78-5.451.139-10.971-.626-16.441-2.208 2.615 4.673 4.963 8.742 6.684 11.768-11.072 7.257-24.954 9.641-37.692 5.908 2.116 4.735 4.052 9 5.5 12.237-11.628 5.71-25.259 5.779-37.095.547 1.722 5.013 3.24 9.279 4.407 12.586-11.658 2.821-23.837.89-33.814-4.89 1.454 5.273 2.763 9.948 3.791 13.595z" />
        </svg>
      )
    },
    {
      name: 'Git & JIRA',
      years: yearsOfExperience,
      proficiency: 85,
      category: 'tools' as const,
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.571 4.714h1.715v5.143H11.57zm0 6.857h1.715V16H11.57zM12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0m0 2.571c5.208 0 9.429 4.221 9.429 9.429s-4.221 9.429-9.429 9.429S2.571 17.208 2.571 12 6.792 2.571 12 2.571M8.679 17.143l-1.215-1.215 3.215-3.214 1.215 1.214zM20.571 12c0 4.73-3.841 8.571-8.571 8.571S3.429 16.73 3.429 12 7.27 3.429 12 3.429s8.571 3.841 8.571 8.571z" />
        </svg>
      )
    },
    {
      name: 'Performance Optimization',
      years: yearsWithReact,
      proficiency: 88,
      category: 'frontend' as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      )
    }
  ];

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
        <div className="text-center mb-16">
          <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20 inline-block mb-6">
            Background
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 via-gray-700 to-gray-600 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            About Me
          </h2>
        </div>

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

        {/* Skills Grid */}
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Core Skills & Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={`${skill.name}-${index}`} {...skill} />
            ))}
          </div>
        </div>

        {/* Achievement Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group relative bg-white/50 dark:bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-purple-400/30 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-500"></div>

            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-xl mb-4 flex items-center justify-center">
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
              </div>
              <h4 className="font-semibold text-xl mb-3 text-gray-900 dark:text-white">
                Engineering Approach
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Strong focus on reliability, maintainability, and alignment with backend API
                designs. I emphasize scalable patterns, predictable behavior, readable code, and
                reducing tech debt through thoughtful engineering.
              </p>
            </div>
          </div>

          <div className="group relative bg-white/50 dark:bg-white/5 backdrop-blur-lg p-8 rounded-2xl border border-gray-200 dark:border-white/10 hover:border-green-400/30 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/0 to-teal-500/0 group-hover:from-green-500/5 group-hover:to-teal-500/5 rounded-2xl transition-all duration-500"></div>

            <div className="relative">
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-teal-500 rounded-xl mb-4 flex items-center justify-center">
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
              </div>
              <h4 className="font-semibold text-xl mb-3 text-gray-900 dark:text-white">
                Notable Achievements
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Led frontend architecture for multiple high-traffic applications, implemented design
                systems, reduced bundle sizes significantly, and mentored junior developers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
