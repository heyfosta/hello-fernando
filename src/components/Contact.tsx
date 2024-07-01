// src/components/Contact.tsx
import React from 'react';
import { ContactProps } from '../types/SectionTypes';

const Contact: React.FC<ContactProps> = () => {
  return (
    <section className="h-screen bg-[#FF9FF3] text-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-12 text-center">Contact Me</h2>
        <div className="bg-white text-[#FF9FF3] p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <p className="text-2xl mb-6 text-center font-bold">You can reach me at:</p>
          <ul className="space-y-4 text-xl">
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
              john.doe@example.com
            </li>
            <li className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
              123-456-7890
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contact;