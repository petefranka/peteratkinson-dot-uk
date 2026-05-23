import { Section, Article, Paragraph, Subheading, TextLink } from './Section';
import HomeBlog from './HomeBlog';
import PageNav from './PageNav';
import SiteFooter from './SiteFooter';
import PersonJsonLd from './PersonJsonLd';

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <main id="main-content">
        <div className="container lg:ml-32 max-w-5xl flex flex-col gap-32 lg:gap-44 pt-28 pb-16 lg:pb-24 lg:pt-40 px-8">
          <section className="flex flex-col gap-12" aria-labelledby="hero-heading">
            <div className="site-dot" aria-hidden="true" />
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-[3.375rem] leading-[1.2] site-heading flex flex-col gap-4 tracking-tight z-10"
            >
              <span>Hey</span>
              <span>I&apos;m Pete, a Senior Engineer from Yorkshire, UK.</span>
            </h1>
            <PageNav />
          </section>

          <Section title="I care about." id="i-care-about">
            <div className="flex flex-col gap-8 divide-y site-divide">
              <Article title="Building Reliability">
                <Paragraph>
                  I want software that still does what it promised once real users
                  and real traffic show up. That means caring about architecture,
                  failure modes and maintainability early, not patching them in
                  after something breaks in production.
                </Paragraph>
              </Article>
              <Article title="Health in Teams">
                <Paragraph>
                  The best technical work happens when people can talk openly,
                  share context and push back without it becoming personal. I value
                  psychological safety, clear ownership and teams that can sustain
                  good work without burning out.
                </Paragraph>
              </Article>
              <Article title="AI in practice">
                <Paragraph>
                  AI is changing how we build, and I think the answer is somewhere
                  between hype and ignoring it. I&apos;m interested in where it
                  actually helps, where it gets in the way, and how teams adjust as
                  the tools keep shifting.
                </Paragraph>
              </Article>
            </div>
          </Section>

          <Section title="Work." id="work">
            <div className="flex flex-col gap-8 divide-y site-divide">
              <Article title="Frasers Group">
                <Paragraph>
                  Right now I&apos;m in the Digital Data Team at Frasers, building
                  rich data pipelines that feed digital experiences across Sports
                  Direct, Frasers, GAME, Evans Cycles and Jack Wills.
                </Paragraph>
              </Article>
              <Article title="Heatly">
                <Paragraph>
                  Before that I was Staff Engineer at Heatly, a SaaS platform for
                  heat pump installations. I worked on architecture and tooling
                  from the first survey through to project completion.
                </Paragraph>
              </Article>
              <Article title="ASOS">
                <Paragraph>
                  At ASOS I built warehousing software for their logistics platform,
                  covering stock intake, reconciliation, returns and orders with
                  tracking across the global supply chain.
                </Paragraph>
              </Article>
              <Article title="Sky">
                <Paragraph>
                  At Sky I worked on Glass, mainly streaming and entertainment
                  features for their next-generation TV platform.
                </Paragraph>
              </Article>
              <Article title="TUI">
                <Paragraph>
                  At TUI I helped build booking platforms used by millions of
                  travellers, including a dedicated travel site for the NHS.
                </Paragraph>
              </Article>
              <Article title="Unasys">
                <Paragraph>
                  Earlier at Unasys I built completions management software for
                  oil and gas, including a digital twin of the North Sea.
                </Paragraph>
              </Article>
            </div>
          </Section>

          <Section title="About Me." id="about-me">
            <div className="flex flex-col">
              <Paragraph>
                I&apos;ve been in tech for over ten years. I enjoy the work most
                when there&apos;s a genuine problem to solve and the codebase still
                makes sense when you return to it months later.
              </Paragraph>
              <Paragraph>
                I&apos;m not chasing the latest framework for the sake of it. I
                prefer shipping something useful and keeping it running well.
              </Paragraph>

              <Subheading>Where I&apos;ve been</Subheading>
              <Paragraph>
                I got a first in Computer Science from{' '}
                <TextLink href="https://www.tees.ac.uk/" external>
                  Teesside University
                </TextLink>
                , then started at Clicksco on travel sites before moving into
                enterprise work at Unasys and TUI. ASOS was the longest chapter:
                logistics and warehousing at scale. Along the way I picked up
                shorter stints at Sky, AND Digital and Heatly.
              </Paragraph>

              <Subheading>Outside work</Subheading>
              <Paragraph>
                Fashion, motorsport, MMA and ice hockey fill a lot of my spare
                time. I&apos;m also still working on making a decent cup of coffee
                at home. I write here occasionally about engineering and whatever
                I&apos;m learning on the job, if you want to follow along.
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
                <TextLink href="https://www.linkedin.com/in/peteratkinson" external>
                  LinkedIn
                </TextLink>
                .
              </Paragraph>
            </div>
          </Section>

          <SiteFooter />
        </div>
      </main>
    </>
  );
}
