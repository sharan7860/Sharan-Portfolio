import { useLayoutEffect, useRef } from 'react';
import { Award, BookOpen, BriefcaseBusiness, CheckCircle2, Code2, ShieldCheck } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const roles = [
  {
    period: 'Jul 2026 - Present',
    title: 'Freelance AI Trainer',
    company: 'Self-employed',
    accent: 'cyan',
    platforms: ['xAI-Grok', 'Handshake AI'],
    highlights: [
      'Create and evaluate programming tasks, code examples, test cases, and technical explanations that improve AI coding performance.',
      'Review AI-generated code for correctness, efficiency, reliability, style, and alignment with technical requirements.',
      'Design edge-case scenarios and quality checks across Python and JavaScript/TypeScript workflows.'
    ]
  },
  {
    period: 'Jan 2026 - Jun 2026',
    title: 'Software Development Intern',
    company: 'Sonit Brilliance',
    accent: 'purple',
    highlights: [
      'Built a full-stack stock-analysis platform combining market data, forecasting, AI recommendations, portfolio insights, and interactive dashboards.',
      'Developed ARIMA time-series pipelines using ADF testing and decomposition to support buy/hold/sell workflows.',
      'Delivered analytics, alerts, chatbot features, Firebase Authentication, and deployments through Vercel and Render.'
    ]
  }
];

const capabilities = [
  'AI code evaluation', 'Prompt engineering', 'Code review', 'Test generation',
  'Unit & integration testing', 'Performance profiling', 'Secure authentication', 'Monitoring & logging'
];

export default function Experience() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from('.experience-reveal', {
        opacity: 0,
        y: 44,
        duration: 0.8,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%'
        }
      });

      gsap.fromTo(timelineRef.current, { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          end: 'bottom 55%',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience-section">
      <div className="experience-orbit experience-orbit-one" />
      <div className="experience-orbit experience-orbit-two" />
      <div className="content-container experience-container">
        <header className="experience-heading experience-reveal">
          <div className="section-kicker"><BriefcaseBusiness size={15} /> 02 // Field Notes</div>
          <h2>Experience that ships<br /><span>reliable AI systems.</span></h2>
          <p>From training and evaluating coding models to building data-driven software, I work across the product lifecycle.</p>
        </header>

        <div className="experience-layout">
          <div className="role-timeline">
            <div className="timeline-progress" ref={timelineRef} aria-hidden="true" />
            {roles.map((role, index) => (
              <article className={`role-card role-card-${role.accent} experience-reveal`} key={role.title}>
                <div className="role-index">0{index + 1}</div>
                <div className="role-meta"><span>{role.period}</span><span>{role.company}</span></div>
                <h3>{role.title}</h3>
                {role.platforms && (
                  <div className="role-platforms" aria-label="Freelance platforms">
                    <span>Platforms</span>
                    {role.platforms.map((platform) => <em key={platform}>{platform}</em>)}
                  </div>
                )}
                <ul>
                  {role.highlights.map((item) => <li key={item}><CheckCircle2 size={15} />{item}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <aside className="experience-side">
            <div className="education-card glass-panel experience-reveal">
              <BookOpen size={19} />
              <span className="micro-label">Education</span>
              <h3>B.Tech in Computer Science Engineering</h3>
              <p>DAV Institute of Engineering and Technology, Jalandhar <strong>// 2026</strong></p>
              <div className="training-line">Front-End Development (2024) · Python for Data Science, YBI (2023)</div>
            </div>

            <div className="quality-card glass-panel experience-reveal">
              <div className="quality-card-heading"><ShieldCheck size={19} /><span className="micro-label">Code quality toolkit</span></div>
              <div className="capability-cloud">
                {capabilities.map((capability) => <span key={capability}>{capability}</span>)}
              </div>
              <div className="quality-footer"><Code2 size={15} /> Python · TypeScript · JavaScript · SQL · Docker · Git</div>
            </div>
          </aside>
        </div>

        <div className="experience-stamp experience-reveal"><Award size={16} /> Build · test · review · deploy · iterate</div>
      </div>
    </section>
  );
}
