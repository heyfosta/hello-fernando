import React from 'react';

const Experience: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Work Experience</h2>
        <ul className="space-y-8">
          <li>
            <h3 className="text-2xl font-bold mb-2">Company Name</h3>
            <p className="text-lg text-gray-600 mb-2">Position, Date Range</p>
            <p className="text-gray-700">Description of your role and responsibilities.</p>
          </li>
          {/* Add more work experience items */}
        </ul>
      </div>
    </section>
  );
};

export default Experience;