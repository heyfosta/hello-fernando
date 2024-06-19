import React from 'react';

const Experience: React.FC = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-4">Work Experience</h2>
      <ul>
        <li className="mb-4">
          <h3 className="text-xl font-bold">Company Name</h3>
          <p className="text-lg">Position, Date Range</p>
          <p>Description of your role and responsibilities.</p>
        </li>
        {/* Add more work experience items */}
      </ul>
    </section>
  );
};

export default Experience;
