import React from 'react';
import './App.css';

const Navbar = () => (
  <nav className="nav">
    <a href="#about">About</a>
    <a href="#education">Education</a>
    <a href="#skills">Skills</a>
    <a href="#contact">Contact</a>
  </nav>
);

const Header = () => (
  <header className="header">
    <h1>Arghadip Khearu</h1>
    <p>Computer Science Student & Web Developer</p>
    <Navbar />
  </header>
);

const AboutMe = () => (
  <section id="about" className="card">
    <h2>About Me</h2>
    <p>I am a passionate CS student building responsive web applications.</p>
  </section>
);

const Education = () => (
  <section id="education" className="card">
    <h2>Education</h2>
    <p>BCA / B.Tech in Computer Science & Applications</p>
  </section>
);

const Skills = () => (
  <section id="skills" className="card">
    <h2>Skills</h2>
    <ul>
      <li>React.js & JavaScript</li>
      <li>HTML5 & CSS3</li>
      <li>Database Management (SQL)</li>
    </ul>
  </section>
);

const Contact = () => (
  <section id="contact" className="card">
    <h2>Contact</h2>
    <p>Email: contact@example.com</p>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <p>© 2026 Arghadip Khearu. All Rights Reserved.</p>
  </footer>
);

export default function App() {
  return (
    <div className="container">
      <Header />
      <main>
        <AboutMe />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}