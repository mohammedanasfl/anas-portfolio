import React from 'react';

const experiences = [
  {
    company: 'Tarka Labs',
    role: 'Software Developer',
    period: 'October 2025 – Present',
    location: 'Chennai',
    points: [
      'Built end-to-end applications across backend, frontend, and AI-assisted features.',
      'Implemented GenAI workflows focused on document understanding and retrieval-based Q&A.',
      'Worked on RAG pipelines covering document ingestion, retrieval, and response generation.',
      'Improved full-stack applications through iterative development and testing.',
    ],
    current: true,
  },
  {
    company: 'Infotel IT Consulting Pvt. Ltd.',
    role: 'Trainee Software Developer',
    period: 'June 2024 – October 2025',
    location: 'Chennai',
    points: [
      'Contributed to backend system development and automation on enterprise projects.',
      'Built and maintained backend services to process large-scale invoice and attendance data.',
      'Developed REST APIs for dealer and internal user access with secure data retrieval.',
      'Automated data processing tasks, significantly reducing manual effort.',
    ],
    current: false,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="bg-white pt-24 pb-32 px-6 md:px-12 w-full font-sans border-t border-gray-100">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-6 shadow-sm bg-white">
            Career
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
            Work <br />
            <span className="text-transparent [-webkit-text-stroke:2px_#ff2a2a]">Experience</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-[220px] top-0 bottom-0 w-px bg-gray-200"></div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 150}
                className="flex flex-col md:flex-row gap-6 md:gap-12"
              >
                {/* Left: Period */}
                <div className="md:w-[220px] shrink-0 flex md:flex-col md:items-end md:text-right gap-2 md:gap-1 pt-1">
                  <span className="text-xs font-black text-[#ff2a2a] uppercase tracking-widest">{exp.period}</span>
                  <span className="text-xs text-gray-400 font-medium">{exp.location}</span>
                </div>

                {/* Dot */}
                <div className="hidden md:flex shrink-0 items-start pt-1.5">
                  <div className={`w-3 h-3 rounded-full border-2 ${exp.current ? 'bg-[#ff2a2a] border-[#ff2a2a]' : 'bg-white border-gray-400'} -translate-x-[7px] mt-0.5`}></div>
                </div>

                {/* Right: Content */}
                <div className="flex-1 bg-[#f4f4f4] rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-black text-gray-900">{exp.company}</h3>
                      <p className="text-sm font-semibold text-gray-500 mt-0.5">{exp.role}</p>
                    </div>
                    {exp.current && (
                      <span className="px-3 py-1 rounded-full bg-[#ff2a2a] text-white text-[10px] font-black uppercase tracking-widest">
                        Current
                      </span>
                    )}
                  </div>
                  <ul className="flex flex-col gap-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                        <span className="text-[#ff2a2a] font-black mt-0.5 shrink-0">→</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
