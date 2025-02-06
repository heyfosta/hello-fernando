import React from 'react';
import Skill from '../components/UI/Skill';
import '../styles/sections.css';

const skills = [
  'Process Analysis',
  'Technical Solutions',
  'Agile Methodology',
  'Front-end Development',
  'Automation',
  'SQL'
];

const About: React.FC = () => {
  return (
    <section className="section-container text-white">
      <div className="section-content">
        <div className="section-scrollable">
          <div className="section-inner">
            <h2 className="section-title">About Me</h2>
            <div className="space-y-8 text-xl md:text-3xl md:leading-relaxed font-medium mb-16 text-center max-w-5xl mx-auto">
              <p>
                I love crafting innovative digital solutions. Working in a fast-paced agency environment, I analyze business challenges and transform them into powerful technical builds - from AI-powered campaign tools to automated content systems.
              </p>
              <p>
                My role involves deep collaboration with creative teams, producers, technical leads, and stakeholders to understand requirements and deliver solutions that exceed campaign objectives.
              </p>
              <p>
                Through developing complex digital projects for brands like Cadbury and KIA, I've developed a keen eye for analyzing business processes and identifying opportunities where technology can create real impact. This combination of technical expertise and business analysis helps me turn ambitious creative concepts into reality.
              </p>
            </div>
            <ul className="flex flex-wrap justify-center max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <Skill key={index} name={skill} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;