import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    text: 'Jerson consistently delivered high-quality frontend solutions that exceeded our expectations. His expertise in React and TypeScript was instrumental in our product success.'
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'StartupXYZ',
    text: 'Working with Jerson was a game-changer. His ability to architect scalable UI systems and mentor the team elevated our entire frontend infrastructure.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Engineering Lead',
    company: 'Enterprise Solutions',
    text: 'Jerson brings a rare combination of technical excellence and collaborative spirit. His attention to detail and commitment to best practices set a high standard for the team.'
  }
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="text-sm font-mono text-cyan-400 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20 inline-block mb-6">
            Testimonials
          </span>
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            What People Say
          </h3>
        </div>

        <div className="relative min-h-[280px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ${
                index === activeIndex
                  ? 'opacity-100 translate-x-0'
                  : index < activeIndex
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
              }`}
            >
              <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/10">
                <div className="mb-6">
                  <svg
                    className="w-10 h-10 text-cyan-400 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8 font-light">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'bg-cyan-400 w-8' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
