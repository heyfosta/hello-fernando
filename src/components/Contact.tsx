//components/cotact.tsx
import React from 'react';
import { ContactProps } from '../types/types';
import Card from './UI/Card';
import { EmailIcon, PhoneIcon, GitHubIcon, LinkedInIcon, DownloadIcon } from '../components/Icons/Icons';
import '../styles/sections.css';


const TEXT_COLOR = 'text-gray-800'; 
const BUTTON_TEXT_COLOR = 'text-gray-800'; 

const Contact: React.FC<ContactProps> = () => {
    // console.log('Email:', process.env.REACT_APP_EMAIL);
    // console.log('Phone:', process.env.REACT_APP_PHONE);
    
    return (
        <section className={`section-container ${TEXT_COLOR}`}>
            <div className="section-content">
                <div className="section-scrollable">
                    <div className="section-inner">
                        <h2 className="section-title">Contact Me</h2>
                        <Card className="p-8 max-w-md mx-auto hover:scale-105 transition-transform duration-300">
                            <p className="text-2xl mb-6 text-center font-bold">You can reach me at:</p>
                            <ul className="space-y-4 text-xl mb-8">
                                <ContactItem 
                                    Icon={EmailIcon} 
                                    href={process.env.REACT_APP_EMAIL ? `mailto:${process.env.REACT_APP_EMAIL}` : undefined} 
                                    text={process.env.REACT_APP_EMAIL || 'Email'}
                                />
                                <ContactItem 
                                    Icon={PhoneIcon} 
                                    href={process.env.REACT_APP_PHONE ? `tel:${process.env.REACT_APP_PHONE}` : undefined} 
                                    text={process.env.REACT_APP_PHONE || 'Phone'}
                                />
                                <ContactItem 
                                    Icon={GitHubIcon} 
                                    href={process.env.REACT_APP_GITHUB_URL}
                                    text="GitHub"
                                />
                                <ContactItem 
                                    Icon={LinkedInIcon} 
                                    href={process.env.REACT_APP_LINKEDIN_URL}
                                    text="LinkedIn"
                                />
                            </ul>
                            <div className="text-center">
                                <a 
                                    href={process.env.REACT_APP_CV_PATH} 
                                    download 
                                    className={`${BUTTON_TEXT_COLOR} py-2 px-4 rounded-full hover:bg-pink-500 transition-colors duration-300 inline-flex items-center`}
                                    onClick={(e) => {
                                        if (!process.env.REACT_APP_CV_PATH) {
                                            e.preventDefault();
                                            alert('CV is currently unavailable. Please try again later.');
                                        }
                                    }}
                                >
                                    <DownloadIcon className={`w-5 h-5 mr-2 ${BUTTON_TEXT_COLOR}`} />
                                    Download CV
                                </a>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface ContactItemProps {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    href: string | undefined;
    text: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ Icon, href, text }) => (
    <li className="flex items-center">
        <Icon className={`w-6 h-6 mr-2 ${TEXT_COLOR}`} aria-hidden="true" />
        {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={TEXT_COLOR}>{text}</a>
        ) : (
            <span className={TEXT_COLOR}>{text}</span>
        )}
    </li>
);

export default Contact;
