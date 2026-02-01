import './WorkExperience.css';

interface WorkItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

const workExperience: WorkItem[] = [
  {
    title: 'Staff Engineer',
    company: 'Heatly',
    period: '2025 - Present',
    description: 'Leading engineering initiatives and building scalable systems.'
  },
  {
    title: 'Senior Software Engineer',
    company: 'Previous Company',
    period: '2020 - 2022',
    description: 'Developed and maintained critical features for the platform.'
  },
  {
    title: 'Software Engineer',
    company: 'Another Company',
    period: '2018 - 2020',
    description: 'Built user-facing features and improved system performance.'
  }
];

const WorkExperience = () => {
  return (
    <section id="work-experience" className="work-experience">
      <div className="work-experience__container">
        <h2 className="work-experience__title">Work Experience</h2>
        <div className="work-experience__list">
          {workExperience.map((work, index) => (
            <div key={index} className="work-experience__item">
              <div className="work-experience__header">
                <div className="work-experience__title-company">
                  <h3 className="work-experience__job-title">{work.title}</h3>
                  <span className="work-experience__company">{work.company}</span>
                </div>
                <span className="work-experience__period">{work.period}</span>
              </div>
              <p className="work-experience__description">{work.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
