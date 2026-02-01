'use client';

import { useState } from 'react';
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
    description: ''
  },
  {
    title: 'Engineer II',
    company: 'ASOS',
    period: '2020 - 2025',
    description: 'Building scalable Warehousing solutions for the ASOS logistics platform'
  },
  {
    title: 'Product Engineer',
    company: 'Sky',
    period: '2021 - 2022',
    description: 'Delivering digital capabilities for Sky Glass.'
  },
  {
    title: 'Product Engineer',
    company: 'AND Digital',
    period: '2021 - 2022',
    description: 'Delivering digital capabilities for a range of clients within AND Digital.'
  },
  {
    title: 'Full Stack Engineer',
    company: 'TUI',
    period: '2018 - 2021',
    description: 'Delivering digital capabilities for TUI Travel.'
  }
];

const education: EducationItem[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University Name',
    period: '2014 - 2018',
    description: 'Focused on software engineering and system design.'
  },
  {
    degree: 'High School Diploma',
    institution: 'School Name',
    period: '2012 - 2014'
  }
];

const AboutTabs = () => {
  const [activeTab, setActiveTab] = useState<'work' | 'education'>('work');

  return (
    <section id="about-tabs" className="about-tabs">
      <div className="about-tabs__container">
        <div className="about-tabs__layout">
          <div className="about-tabs__sidebar">
            <h2 className="about-tabs__title">
              My Experience
              <span className="about-tabs__arrow">→</span>
            </h2>
            <p className="about-tabs__description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <a href="https://www.linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="about-tabs__button">Connect with me on LinkedIn</a>
          </div>

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
        </div>
      </div>
    </section>
  );
};

export default AboutTabs;
