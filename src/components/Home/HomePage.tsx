import { Section, Paragraph, Subheading, TextLink } from './Section';
import HeroHeading from './HeroHeading';
import HomeBlog from './HomeBlog';
import SiteFooter from './SiteFooter';
import PersonJsonLd from './PersonJsonLd';
import ValuesAccordion from './ValuesAccordion';
import WorkAccordion from './WorkAccordion';
import AvailabilityBadge from './AvailabilityBadge';
import ScrollIndicator from './ScrollIndicator';

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <main id="main-content">
        <div className="container lg:ml-32 max-w-5xl flex flex-col gap-32 lg:gap-44 pt-28 lg:pt-40 px-8">
          <section
            className="flex flex-col min-h-[calc(100vh-7rem)] lg:min-h-[calc(100vh-10rem)]"
            aria-labelledby="hero-heading"
          >
            <div className="site-dot" aria-hidden="true" />
            <div className="flex-1 flex flex-col justify-center gap-8">
              <HeroHeading />
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#get-in-touch"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--accent)] text-[var(--accent)] text-base font-medium
                    hover:bg-[var(--accent)] hover:text-[var(--bg-matte)] transition-colors
                    focus-visible:outline-[3px] focus-visible:outline-solid focus-visible:outline-[var(--accent)] focus-visible:outline-offset-[3px]"
                >
                  Get in touch
                </a>
                <AvailabilityBadge />
              </div>
              <ScrollIndicator />
            </div>
          </section>

          <Section title="Values." id="values">
            <ValuesAccordion
              items={[
                {
                  value: 'accessibility',
                  title: 'Accessibility',
                  children: (
                    <Paragraph>
                      The web should work for everyone, but right now only 3.7% the web
                      are free of detectable WCAG failures. That means the
                      vast majority of the web is shutting people out without even
                      realising it. I think that&apos;s worth caring about, and it&apos;s
                      something I actively try to fix in everything I build.
                    </Paragraph>
                  ),
                },
                {
                  value: 'people',
                  title: 'People',
                  children: (
                    <Paragraph>
                      The best technical work happens when people can talk openly,
                      share context and push back without it becoming personal. I value
                      psychological safety, clear ownership and teams that can sustain
                      good work without burning out.
                    </Paragraph>
                  ),
                },
                {
                  value: 'ai-in-practice',
                  title: 'AI in practice',
                  children: (
                    <Paragraph>
                      AI is changing how we build, and I think the answer is somewhere
                      between hype and ignoring it. I&apos;m interested in where it
                      actually helps, where it gets in the way, and how teams adjust as
                      the tools keep shifting.
                    </Paragraph>
                  ),
                },
              ]}
            />
          </Section>

          <Section title="Work." id="work">
            <WorkAccordion
              items={[
                {
                  value: 'frasers-group',
                  title: 'Frasers Group',
                  date: 'Present',
                  children: (
                    <Paragraph>
                      Right now I&apos;m in the Digital Data Team at Frasers, building
                      rich data pipelines that feed digital experiences across Sports
                      Direct, Frasers, GAME, Evans Cycles and Jack Wills.
                    </Paragraph>
                  ),
                },
                {
                  value: 'heatly',
                  title: 'Heatly',
                  date: "Dec '25 – Mar '26",
                  children: (
                    <Paragraph>
                      Before that I was Staff Engineer at Heatly, a SaaS platform for
                      heat pump installations. I worked on architecture and tooling
                      from the first survey through to project completion.
                    </Paragraph>
                  ),
                },
                {
                  value: 'asos',
                  title: 'ASOS',
                  date: "Aug '22 – Dec '25",
                  children: (
                    <Paragraph>
                      At ASOS I built warehousing software for their logistics platform,
                      covering stock intake, reconciliation, returns and orders with
                      tracking across the global supply chain.
                    </Paragraph>
                  ),
                },
                {
                  value: 'sky',
                  title: 'Sky',
                  date: "Nov '21 – Aug '22",
                  children: (
                    <Paragraph>
                      At Sky I worked on Glass, mainly streaming and entertainment
                      features for their next-generation TV platform.
                    </Paragraph>
                  ),
                },
                {
                  value: 'tui',
                  title: 'TUI',
                  date: "Aug '18 – Aug '21",
                  children: (
                    <Paragraph>
                      At TUI I helped build booking platforms used by millions of
                      travellers, including a dedicated travel site for the NHS.
                    </Paragraph>
                  ),
                },
              ]}
            />
            <div className="mt-10">
              <Paragraph>
                <TextLink href="https://www.linkedin.com/in/peteratkinson1" external>
                  View full work history on LinkedIn
                </TextLink>
              </Paragraph>
            </div>
          </Section>

          <Section title="About Me." id="about-me">
            <div className="flex flex-col">
              <Paragraph>
                I&apos;ve been in tech for over ten years. I enjoy the work most
                when there&apos;s a genuine problem to solve and the codebase still
                makes sense when you return to it months later.
              </Paragraph>

              <Subheading>Where I&apos;ve been</Subheading>
              <Paragraph>
                I graduated with a first in Computer Science from{' '}
                <TextLink href="https://www.tees.ac.uk/" external>
                  Teesside University
                </TextLink>
                , something I&apos;m still quietly proud of, and jumped straight
                into the industry with an internship at a startup building niche
                travel websites. From there I spent time at various startups,
                which was a world away from anything I knew but taught me a lot.
              </Paragraph>
              <Paragraph>
                Things moved quickly after that. I joined TUI and got to work on
                some of the biggest travel websites in Europe, then spent time in
                consultancy helping launch Sky Glass, one of those rare projects
                that actually makes the news. My favourite chapter was ASOS, where
                I worked deep in the logistics and warehousing systems that keep
                millions of orders moving.
              </Paragraph>
              <Paragraph>
                I&apos;m back in the fashion and ecommerce world now, working at
                Frasers Group in Digital Data, building the data pipelines that
                power some of the biggest fashion names out there.
              </Paragraph>

              <Subheading>Outside work</Subheading>
              <Paragraph>
                Martial arts, ice hockey and motorsport fill most of my spare
                time. I live with my dog, love the outdoors, and try to see the
                world as much as possible. I write here occasionally about my
                thoughts and whatever I&apos;m picking up as the world spins, if
                you want to follow along.
              </Paragraph>
            </div>
          </Section>

          <Section title="My Thoughts." id="my-thoughts">
            <HomeBlog />
          </Section>

          <Section title="Get in touch." id="get-in-touch" stickyTop="top-6">
            <div className="flex flex-col">
              <Paragraph>
                I&apos;m happy to talk about work, side projects or engineering in
                general.{' '}
                <TextLink href="mailto:peter@peteratkinson.co.uk">Email me</TextLink>{' '}
                or say hi on{' '}
                <TextLink href="https://www.linkedin.com/in/peteratkinson1" external>
                  LinkedIn
                </TextLink>
                .
              </Paragraph>
            </div>
          </Section>

        </div>
      </main>
      <div className="container lg:ml-32 max-w-5xl px-8 pb-16 lg:pb-24 mt-32 lg:mt-44">
        <SiteFooter />
      </div>
    </>
  );
}
