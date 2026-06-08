import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    number: '01',
    title: 'LLM-Powered FAQ Chatbot',
    description: 'A production-ready FAQ chatbot combining FastAPI and React with session-based conversations. Uses Generative AI to deliver context-aware, polite answers with persistent SQLite chat history — built with a clean ChatGPT-style UI.',
    skills: ['Python', 'FastAPI', 'React', 'SQLAlchemy', 'SQLite', 'LLM', 'REST APIs'],
    link: 'https://github.com/mohammedanasfl/LLM-Powered-FAQ-Chatbot',
    tag: 'GenAI',
    tagColor: 'bg-purple-600',
    highlights: ['Session-based multi-chat', 'Persistent chat history', 'Prompt-engineered responses'],
  },
  {
    number: '02',
    title: 'Document Q&A RAG Chatbot',
    description: 'Upload PDF, TXT, or DOCX files and ask questions using natural language. Implements a full RAG pipeline — document ingestion, chunking, FAISS vector embeddings, and GPT-powered response generation — all in a clean chat interface.',
    skills: ['Python', 'FastAPI', 'React', 'RAG', 'FAISS', 'OpenAI', 'Vector Embeddings'],
    link: 'https://github.com/mohammedanasfl/Document-Q-A-RAG-Chatbot',
    tag: 'RAG',
    tagColor: 'bg-blue-600',
    highlights: ['PDF / TXT / DOCX upload', 'FAISS vector store', 'OpenAI GPT integration'],
  },
  {
    number: '03',
    title: 'CineReview — Movie Review App',
    description: 'A full-featured movie review platform built with Angular 19 and TypeScript. Features a modern UI for browsing, rating, and reviewing films — demonstrating proficiency with component-based frontend architecture beyond React.',
    skills: ['Angular 19', 'TypeScript', 'HTML', 'CSS', 'Angular CLI'],
    link: 'https://github.com/mohammedanasfl/CineReview-FrontEnd',
    tag: 'Frontend',
    tagColor: 'bg-cyan-600',
    highlights: ['Angular 19 + TypeScript', 'Component-based architecture', 'Modern UI design'],
  },
  {
    number: '04',
    title: 'Saloon Management API',
    description: 'A RESTful backend API for managing a salon business — employees, customers, products, and sales records. Built with Java Spring Boot and MySQL, with full Swagger documentation and JPA/Hibernate ORM integration.',
    skills: ['Java', 'Spring Boot', 'MySQL', 'JPA/Hibernate', 'Swagger', 'Maven'],
    link: 'https://github.com/mohammedanasfl/saloonBackend',
    tag: 'Backend',
    tagColor: 'bg-green-600',
    highlights: ['Full CRUD REST API', 'Swagger docs', 'JPA/Hibernate ORM'],
  },
];

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section id="projects" className="bg-white pt-24 pb-32 px-6 md:px-12 w-full font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div data-aos="fade-up" className="mb-16">
          <div className="inline-block border border-gray-300 rounded-full px-5 py-1.5 text-sm text-gray-600 font-bold mb-6 shadow-sm bg-white">
            My Work
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
            Selected <br />
            <span className="text-transparent [-webkit-text-stroke:2px_#ff2a2a]">Projects</span>
          </h2>
          <p className="mt-4 text-gray-500 text-base max-w-lg leading-relaxed">
            From GenAI pipelines to REST APIs — a selection of real projects across my stack.
          </p>
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              layout
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className={`group rounded-3xl p-7 md:p-10 cursor-pointer transition-colors duration-500 border ${
                activeIndex === i
                  ? 'bg-[#ff2a2a] border-transparent'
                  : 'bg-[#f4f4f4] border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Number */}
                <span className={`text-4xl font-black font-serif italic shrink-0 transition-colors duration-500 ${
                  activeIndex === i ? 'text-red-200' : 'text-gray-200'
                }`}>
                  {project.number}
                </span>

                {/* Main content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-500 ${
                        activeIndex === i ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>
                      <span className={`px-3 py-0.5 rounded-full text-white text-[10px] font-black uppercase tracking-widest ${project.tagColor}`}>
                        {project.tag}
                      </span>
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-9 h-9 rounded-full border flex items-center justify-center shrink-0 hover:bg-white transition-all duration-300 ${
                        activeIndex === i ? 'border-white/40' : 'border-gray-300'
                      }`}
                      onClick={e => e.stopPropagation()}
                    >
                      <svg className={`w-3.5 h-3.5 transition-colors ${activeIndex === i ? 'text-white hover:text-[#ff2a2a]' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                    activeIndex === i ? 'text-red-100' : 'text-gray-500'
                  }`}>
                    {project.description}
                  </p>

                  {/* Expanded highlights */}
                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.highlights.map((h, j) => (
                            <span key={j} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-700/40 text-white text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                              {h}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.skills.map((skill, j) => (
                      <span
                        key={j}
                        className={`px-3 py-1 text-xs font-bold rounded-full border transition-all duration-500 ${
                          activeIndex === i
                            ? 'bg-red-700/40 text-white border-transparent'
                            : 'bg-white text-gray-700 border-gray-200'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div data-aos="fade-up" data-aos-delay="300" className="mt-14 flex justify-center">
          <a
            href="https://github.com/mohammedanasfl"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-[#ff2a2a] transition-all duration-300 group shadow-lg hover:shadow-[0_0_30px_rgba(255,42,42,0.4)]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View All 17 Repos on GitHub
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
