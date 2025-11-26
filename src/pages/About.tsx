export default function About() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <section className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold">About — Jerson Q. Conmigo</h2>

        <p className="mt-3 text-sm text-gray-700 leading-relaxed">
          I am a Senior Frontend Engineer with 14 years of industry experience and over 8 years
          specializing in React, TypeScript, and modern JavaScript ecosystems. Throughout my career,
          I’ve delivered enterprise-grade applications across healthcare, logistics, SaaS,
          e-commerce, and automotive platforms.
          <br />
          <br />
          My work centers on building scalable UI architectures, establishing reusable component
          systems, owning frontend delivery, and collaborating closely with backend and product
          teams to ensure technical alignment. I bring strong experience across GraphQL, REST, CI/CD
          pipelines, cloud deployments, and multi-environment release workflows.
        </p>

        <p className="mt-4 text-sm text-gray-700 leading-relaxed">
          Beyond hands-on engineering, I advocate for clean code, predictable state management,
          accessibility, meaningful developer experience improvements, and long-term
          maintainability. I enjoy taking ambiguous requirements, shaping the technical direction,
          and driving features from concept to production with reliability and attention to detail.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold">Core Skills</h4>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              React · TypeScript · GraphQL · REST APIs · TailwindCSS · UI Architecture · Component
              Libraries · State Management · Performance Optimization
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold">Engineering Approach</h4>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Strong focus on reliability, maintainability, and alignment with backend API designs.
              I emphasize scalable patterns, predictable behavior, readable code, and reducing tech
              debt through thoughtful engineering.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="font-semibold">Professional Focus</h4>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Frontend leadership roles, complex system interfaces, cross-functional collaboration,
              and delivering stable production-ready applications at scale.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="/Jerson-Conmigo-CV.pdf"
            target="_blank"
            className="px-4 py-2 bg-[#075985] text-white rounded text-sm"
          >
            Download My Resume
          </a>
        </div>
      </section>
    </main>
  );
}
