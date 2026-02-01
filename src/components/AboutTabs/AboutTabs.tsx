'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import './AboutTabs.css';

interface WorkItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

const workExperience: WorkItem[] = [
  {
    title: 'Staff Engineer',
    company: 'Heatly',
    period: '2025 - Present',
    description: 'Building a SaaS platform for heat pump installations. Leading the technical architecture and developing tools that streamline the process from initial surveys through to project completion.'
  },
  {
    title: 'Engineer II',
    company: 'ASOS',
    period: '2020 - 2025',
    description: 'Built scalable warehousing solutions for ASOS\'s logistics platform. Designed systems managing stock intake, reconciliation, returns, and orders with end-to-end tracking across the global supply chain.'
  },
  {
    title: 'Product Developer',
    company: 'Sky',
    period: '2021 - 2022',
    description: 'Worked on streaming and entertainment features for Sky Glass, focusing on user experience and performance for Sky\'s next-generation TV platform.'
  },
  {
    title: 'Product Developer',
    company: 'AND Digital',
    period: '2021 - 2022',
    description: 'Partnered with clients to build custom digital solutions across multiple industries, from enterprise applications to consumer-facing platforms.'
  },
  {
    title: 'Full Stack Developer',
    company: 'TUI',
    period: '2018 - 2021',
    description: 'Built large-scale booking platforms serving millions of travelers worldwide, including launching a dedicated travel website for the NHS.'
  },
  {
    title: 'Full Stack Developer',
    company: 'Unasys',
    period: '2017 - 2018',
    description: 'Built end-to-end completions management solutions for the Oil and Gas industry, including building a digital twin of the North Sea.'
  },
  {
    title: 'Software Developer',
    company: 'Clicksco',
    period: '2015 - 2016',
    description: 'Developed niche travel websites as part of a software incubator.'
  }
];

const education: EducationItem[] = [
  {
    degree: 'BSc in Computer Science',
    institution: 'Teesside University',
    period: '2013 - 2017',
    description: 'Graded a 1st Class Hons. Focused on core fundamentals including algorithms, mathematics for computing, and artificial intelligence.'
  }
];

const AboutTabs = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  return (
    <section id="experience" className="about-tabs">
      <div className="about-tabs__container">
        <div className="about-tabs__layout">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="about-tabs__sidebar">
              <h2 className="about-tabs__title">
                My Experience
                <span className="about-tabs__arrow">→</span>
              </h2>
              <p className="about-tabs__description">
              I've spent the past 10+ years in tech, building up experience across software engineering and digital platforms. I've mainly focused on engineering large-scale enterprise applications for millions of customers worldwide, working with companies like ASOS, TUI, and Sky UK.
              </p>
              <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="about-tabs__button">Connect with me on LinkedIn</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="about-tabs__content">
              <div className="about-tabs__tabs">
                <button
                  className={`about-tabs__tab ${activeTab === 'work' ? 'about-tabs__tab--active' : ''}`}
                  onClick={() => setActiveTab('work')}
                >
                  Work Experience
                </button>
                <button
                  className={`about-tabs__tab ${activeTab === 'education' ? 'about-tabs__tab--active' : ''}`}
                  onClick={() => setActiveTab('education')}
                >
                  My Education
                </button>
              </div>

              {activeTab === 'work' && (
                <div className="about-tabs__list">
                  {workExperience.map((work, index) => (
                    <div key={index} className="about-tabs__item">
                      <div className="about-tabs__item-header">
                        <h3 className="about-tabs__item-title">
                          {work.title} at {work.company}
                        </h3>
                        <span className="about-tabs__item-period">{work.period}</span>
                      </div>
                      {work.description && (
                        <p className="about-tabs__item-description">{work.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'education' && (
                <div className="about-tabs__list">
                  {education.map((item, index) => (
                    <div key={index} className="about-tabs__item">
                      <div className="about-tabs__item-header">
                        <h3 className="about-tabs__item-title">
                          {item.degree} at {item.institution}
                        </h3>
                        <span className="about-tabs__item-period">{item.period}</span>
                      </div>
                      {item.description && (
                        <p className="about-tabs__item-description">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTabs;
