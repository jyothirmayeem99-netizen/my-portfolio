import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Server,
  Sparkles
} from "lucide-react";
import "./styles.css";

const api = {
  async get(path) {
    const response = await fetch(`${apiBase()}/api/${path}`);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return response.json();
  },
  async post(path, body) {
    const response = await fetch(`${apiBase()}/api/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Request failed");
    return data;
  }
};

function apiBase() {
  return import.meta.env.DEV ? "http://127.0.0.1:5000" : "";
}

function App() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    Promise.all([api.get("profile"), api.get("projects"), api.get("skills")])
      .then(([profileData, projectData, skillData]) => {
        setProfile(profileData);
        setProjects(projectData);
        setSkills(skillData);
      })
      .catch(() => {
        setStatus("Unable to load portfolio data. Check the API connection.");
      });
  }, []);

  const featuredProjects = useMemo(() => projects.filter((project) => project.featured), [projects]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("Sending...");

    try {
      const result = await api.post("contact", form);
      setStatus(result.message);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus(error.message);
    }
  }

  if (!profile) {
    return <main className="loading">Loading portfolio...</main>;
  }

  return (
    <main>
      <nav className="topbar" aria-label="Primary navigation">
        <a className="brand" href="#home">
          <Sparkles size={18} />
          {profile.name}
        </a>
        <div className="navlinks">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">{profile.location} · Available for internships</p>
          <h1>{profile.name}</h1>
          <h2>{profile.role}</h2>
          <p>{profile.summary}</p>
          <div className="actions">
            <a className="button primary" href="#projects">
              <BriefcaseBusiness size={18} />
              View Work
            </a>
            <a className="button ghost" href={`mailto:${profile.email}`}>
              <Mail size={18} />
              Contact Me
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Portfolio highlights">
          {profile.highlights.map((highlight) => (
            <div className="highlight" key={highlight}>
              <span />
              {highlight}
            </div>
          ))}
        </div>
      </section>

      <section className="stats" aria-label="Portfolio stats">
        <Stat value={`${projects.length}+`} label="Projects" />
        <Stat value={`${skills.reduce((total, group) => total + group.items.length, 0)}+`} label="Skills" />
        <Stat value="4" label="Core stacks" />
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <p className="eyebrow">Selected builds</p>
          <h2>Projects backed by real API data</h2>
        </div>
        <div className="project-grid">
          {(featuredProjects.length ? featuredProjects : projects).map((project) => (
            <article className="project-card" key={project.slug || project.title}>
              <img src={project.image} alt={`${project.title} preview`} />
              <div className="project-body">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.techStack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Github size={17} />
                    Code
                  </a>
                  <a href={project.live} target="_blank" rel="noreferrer">
                    <ArrowUpRight size={17} />
                    Live
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="skills">
        <div className="section-heading">
          <p className="eyebrow">Skill map</p>
          <h2>Tools I use to ship full-stack products</h2>
        </div>
        <div className="skills-grid">
          {skills.map((skillGroup) => (
            <article className="skill-card" key={skillGroup.group}>
              <SkillIcon group={skillGroup.group} />
              <h3>{skillGroup.group}</h3>
              <div className="tags">
                {skillGroup.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Let’s build something useful.</h2>
          <div className="contact-list">
            <a href={`mailto:${profile.email}`}>
              <Mail size={18} />
              {profile.email}
            </a>
            <span>
              <MapPin size={18} />
              {profile.location}
            </span>
            <a href={profile.socials.github} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Your name"
            />
          </label>
          <label>
            Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="you@example.com"
            />
          </label>
          <label>
            Message
            <textarea
              required
              rows="5"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="Tell me about your project"
            />
          </label>
          <button className="button primary" type="submit">
            <Send size={18} />
            Send Message
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </section>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function SkillIcon({ group }) {
  const normalized = group.toLowerCase();
  if (normalized.includes("front")) return <Code2 size={24} />;
  if (normalized.includes("back")) return <Server size={24} />;
  if (normalized.includes("database")) return <Database size={24} />;
  return <BriefcaseBusiness size={24} />;
}

createRoot(document.getElementById("root")).render(<App />);
