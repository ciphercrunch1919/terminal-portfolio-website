import { useEffect, useState } from 'react';

const Resume: React.FC = () => {
  const file = "/ELENACOLEMAN_RESUME_2024.pdf" //Resume pdf file

  return (
    <>
      <p style={{color:'#0077aa'}}>NAME</p>
      <p>&emsp;Elena Coleman - Software Engineer<br /><br /></p>
      <p style={{color:'#0077aa'}}>SYNOPSIS</p>
      <p>&emsp;elena_coleman [OPTIONS]<br /><br /></p>
      <p style={{color:'#0077aa'}}>DESCRIPTION</p>
      <p>&emsp;Elena Coleman is a skilled Software Engineer with expertise in software development, data analysis, and communication solutions. She has a strong background in crafting seamless communication solutions and is adept at collaborating with teams to drive innovation and efficiency.<br /><br /></p>
      <p style={{color:'#0077aa'}}>PROFESSIONAL EXPERIENCE</p>
      <p>&emsp;DISH NETWORK</p>
      <p>&emsp;&emsp;Location: Englewood, CO<br /><br /></p>
      <p>&emsp;&emsp;Software Engineer II (2021-Present)</p>
      <p>&emsp;&emsp;&emsp;Actively participates in team meetings, brainstorming sessions, and code reviews, fostering a collaborative and innovative environment.</p>
      <p>&emsp;&emsp;&emsp;Designs and implements transactional email solutions for Boost Mobile, Boost Infinite, and Genesis product lines.</p>
      <p>&emsp;&emsp;&emsp;Utilizes Responsys and Knak to architect, craft, and disseminate marketing and transactional emails.<br /><br /></p>
      <p>&emsp;&emsp;Entry Java Developer (Contract)</p>
      <p>&emsp;&emsp;&emsp;Specialized in creating automated email solutions using Java for the Email Design team.</p>
      <p>&emsp;&emsp;&emsp;Engaged in code reviews and quality assurance processes, ensuring reliability and performance of Java-based email solutions.<br /><br /></p>
      <p>&emsp;CHARTER COMMUNICATIONS</p>
      <p>&emsp;&emsp;Location: Town and Country, MO<br /><br /></p>
      <p>&emsp;&emsp;Data Analyst Intern (2019)</p>
      <p>&emsp;&emsp;&emsp;Provided valuable support to the business data analyst team, contributing to various data-related tasks and projects.</p>
      <p>&emsp;&emsp;&emsp;Acquired proficiency in utilizing Tableau and Postgres for data analysis and visualization.</p>
      <p>&emsp;&emsp;&emsp;Delivered presentations to Vice Presidents at Spectrum, offering insights and recommendations on data management practices.<br /><br /></p>
      <p style={{color:'#0077aa'}}>EDUCATION</p>
      <p>&emsp;COLORADO TECHNICAL UNIVERSITY</p>
      <p>&emsp;&emsp;Location: Denver, CO</p>
      <p>&emsp;&emsp;egree: Master of Science, Computer Science (2022-2023)<br /><br /></p>
      <p>&emsp;SAINT LOUIS UNIVERSITY</p>
      <p>&emsp;&emsp;Location: St. Louis, MO</p>
      <p>&emsp;&emsp;Degree: Bachelor of Art, Computer Science and Criminology (2017-2021)<br /><br /></p>
      <p style={{color:'#0077aa'}}>AWARDS</p>
      <p>&emsp;- Saint Louis University Dean’s List: 2017 & 2020</p>
      <p>&emsp;- Coursera Cybersecurity</p>
      <p>&emsp;- AT&T Summer Learning Academy Extern<br /><br /></p>
      <p style={{color:'#0077aa'}}>PORTFOLIO</p>
      <p>&emsp;Personal Heardle - JavaScript</p>
      <p>&emsp;&emsp;A daily music game built with JavaScript, hosted on glitch.com.<br /><br /></p>
      <p>&emsp;RPS Game - Java</p>
      <p>&emsp;&emsp;A variation of the Rock Paper Scissors game implemented in Java.<br /><br /></p>
      <p>&emsp;SuguruSolverAI - Python</p>
      <p>&emsp;&emsp;A Python project utilizing AI heuristics to solve Suguru puzzles.<br /><br /></p>
      <p style={{color:'#0077aa'}}>CORE COMPETENCIES</p>
      <p>&emsp;- Front End: HTML, JavaScript, CSS, React</p>
      <p>&emsp;- Programming: Python, Java, C++, C</p>
      <p>&emsp;- Database: PostgreSQL, MySQL, AWS</p>
      <p>&emsp;- Frameworks: Spring Boot</p>

      <p><a href={file} target="_blank" rel="nonopener noreferrer">CLICK HERE TO DOWNLOAD LATEST RESUME</a></p>
    </>
  );
};

export default Resume;