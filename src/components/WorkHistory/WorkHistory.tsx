import './WorkHistory.css';

interface WorkItem {
  role: string;
  company: string;
  period: string;
  description: string;
}

const workHistory: WorkItem[] = [
  {
    role: "Senior Product Designer",
    company: "Horizon Labs",
    period: "2022 — Present",
    description: "Leading design for consumer products, focusing on intuitive interfaces and delightful user experiences. Building and scaling the design system."
  },
  {
    role: "Product Designer",
    company: "Craft Studio",
    period: "2019 — 2022",
    description: "Designed digital products for startups and established brands. Collaborated closely with engineering teams to ship impactful features."
  },
  {
    role: "UX Designer",
    company: "Basecamp Agency",
    period: "2017 — 2019",
    description: "Started my career crafting user experiences for web and mobile applications. Learned the fundamentals of user research and interaction design."
  },
  {
    role: "Freelance Designer",
    company: "Independent",
    period: "2015 — 2017",
    description: "Built websites and brand identities for small businesses and creative entrepreneurs. Developed a strong foundation in visual design."
  }
];

const WorkHistory = () => {
  return (
    <section id="work" className="work">
      <div className="work__container container">
        <h2 className="work__title">Work History</h2>
        <ul className="work__list">
          {workHistory.map((item, index) => (
            <li key={index} className="work__item">
              <div className="work__header">
                <div className="work__role-info">
                  <h3 className="work__role">{item.role}</h3>
                  <span className="work__company">{item.company}</span>
                </div>
                <span className="work__period">{item.period}</span>
              </div>
              <p className="work__description">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default WorkHistory;
