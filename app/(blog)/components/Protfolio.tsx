"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const Portfolio = () => {
  return (
    <div className="font-sans text-gray-900 bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <h1 className="text-5xl font-bold mb-4">Hi, I’m Mahmud Hasan</h1>
        <p className="text-lg mb-6">
          Web Developer | React | Next.js | Node.js
        </p>
        <div className="flex gap-4">
          <a
            href="#projects"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg shadow"
          >
            Hire Me
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-gray-700">
          I am a passionate web developer with expertise in building modern,
          responsive, and scalable web applications. I love working with
          JavaScript, React, Next.js, and Node.js. Beyond coding, I enjoy
          sharing knowledge through blogs.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="bg-gray-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-white rounded-lg shadow">React</div>
            <div className="p-4 bg-white rounded-lg shadow">Next.js</div>
            <div className="p-4 bg-white rounded-lg shadow">Node.js</div>
            <div className="p-4 bg-white rounded-lg shadow">Express.js</div>
            <div className="p-4 bg-white rounded-lg shadow">MongoDB</div>
            <div className="p-4 bg-white rounded-lg shadow">Tailwind CSS</div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-4">
            <img
              src="https://via.placeholder.com/400x200"
              alt="Project 1"
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold">Blog Website</h3>
            <p className="text-gray-600 mb-2">
              A modern blog website built with Next.js and Tailwind CSS.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                Live Demo
              </a>
              <a
                href="#"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <img
              src="https://via.placeholder.com/400x200"
              alt="Project 2"
              className="rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold">E-commerce Website</h3>
            <p className="text-gray-600 mb-2">
              Full-stack e-commerce platform with cart, checkout, and filters.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                Live Demo
              </a>
              <a
                href="#"
                className="text-blue-500 hover:underline"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gray-100 py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
        <p className="text-gray-700 mb-4">
          I’m open to freelance projects or full-time opportunities.
        </p>
        <div className="flex justify-center gap-6 text-2xl">
          <a href="mailto:your@email.com" className="hover:text-blue-500">
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/yourusername"
            className="hover:text-gray-800"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            className="hover:text-blue-700"
          >
            <FaLinkedin />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4">
        <p>© 2025 Mahmud Hasan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
