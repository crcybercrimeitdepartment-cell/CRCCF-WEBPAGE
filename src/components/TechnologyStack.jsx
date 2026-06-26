import {
  SiReact, SiAngular, SiVuedotjs, SiNextdotjs,
  SiJavascript, SiTailwindcss, SiHtml5,
  SiPython, SiMongodb, SiMysql, SiNodedotjs,
  SiDocker, SiKubernetes, SiGithub, SiFigma,
  SiDjango, SiFastapi, SiFlask, SiExpress,
  SiSpring, SiHibernate,
  SiJenkins, SiCanva, SiTensorflow, SiPytorch, 
  SiOpenai, SiGoogle, 
  SiPostgresql, 
  SiGooglecloud
} from "react-icons/si";

import { 
  FaJava, FaDatabase, FaCloud, FaPaintBrush, FaBrain, FaRobot, FaDatabase as FaDataEng, 
  FaSearchDollar, FaChartBar, FaGlobe, FaShieldAlt, FaLock, FaKey, FaUserShield, FaUsersCog, FaLink
} from "react-icons/fa";

import { MdAnimation, MdAutoGraph } from "react-icons/md";
import { FiCode, FiPenTool, FiCpu, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import { motion, useMotionValue, useAnimationFrame, useTransform, wrap } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const MarqueeRow = ({ items, direction, speedFactor }) => {
  const baseX = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate width of one set of items (we repeat 4 times)
      setContentWidth(containerRef.current.scrollWidth / 4);
    }
  }, [items]);

  const speed = direction === "left" ? -speedFactor : speedFactor;

  useAnimationFrame((t, delta) => {
    if (isDragging || isHovered || !contentWidth) return;
    
    let moveBy = (speed * delta) / 30; // Scale speed for delta
    baseX.set(baseX.get() + moveBy);
  });

  // Infinite wrapping logic
  const x = useTransform(baseX, (v) => {
    if (!contentWidth) return 0;
    return wrap(-contentWidth, 0, v);
  });

  return (
    <div 
      className="marquee-wrapper" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        className="marquee-track"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // Let it be free but clamped via wrapping
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        onDrag={(e, info) => {
          // Update baseX by the drag delta to maintain the loop offset
          baseX.set(baseX.get() + info.delta.x);
        }}
      >
        {[...items, ...items, ...items, ...items].map((tech, i) => (
          <div className="tech-pill" key={i}>
            <span className="tech-icon" style={{ color: tech.color }}>
              {tech.icon}
            </span>
            {tech.name}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const techData = [
  {
    category: "Frontend Development",
    direction: "left",
    items: [
      { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
      { name: "CSS", icon: <FiCode />, color: "#1572B6" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "Vue", icon: <SiVuedotjs />, color: "#4FC08D" },
      { name: "Angular", icon: <SiAngular />, color: "#DD0031" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
    ]
  },
  {
    category: "Backend Development",
    direction: "right",
    items: [
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { name: "Java", icon: <FaJava />, color: "#007396" },
      { name: "Django", icon: <SiDjango />, color: "#092E20" },
      { name: "FastAPI", icon: <SiFastapi />, color: "#009688" },
      { name: "Flask", icon: <SiFlask />, color: "#000000" },
      { name: "Express", icon: <SiExpress />, color: "#000000" },
      { name: "Spring", icon: <SiSpring />, color: "#6DB33F" },
      { name: "Spring Boot", icon: <FaJava />, color: "#6DB33F" },
      { name: "Hibernate", icon: <SiHibernate />, color: "#59666C" },
    ]
  },
  {
    category: "Database Systems",
    direction: "left",
    items: [
      { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
      { name: "SQL Databases", icon: <FaDatabase />, color: "#F29111" },
      { name: "PL/SQL", icon: <FaDatabase />, color: "#F00000" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
      { name: "NoSQL Databases", icon: <FaDatabase />, color: "#2E2E2E" },
    ]
  },
  {
    category: "DevOps & Cloud",
    direction: "right",
    items: [
      { name: "GitHub", icon: <SiGithub />, color: "#181717" },
      { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
      { name: "CI/CD Pipelines", icon: <SiJenkins />, color: "#D24939" },
      { name: "Kubernetes", icon: <SiKubernetes />, color: "#326CE5" },
      { name: "Cloud Platforms", icon: <FaCloud />, color: "#2C3E50" },
    ]
  },
  {
    category: "AI & Machine Learning",
    direction: "left",
    items: [
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
      { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
      { name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C" },
      { name: "Scikit-learn", icon: <FiCpu />, color: "#F7931E" },
      { name: "OpenCV", icon: <FiCpu />, color: "#5C3EE8" },
      { name: "OpenAI API", icon: <SiOpenai />, color: "#412991" },
      { name: "Claude API", icon: <FaRobot />, color: "#D97757" },
      { name: "Google Gemini", icon: <SiGoogle />, color: "#4285F4" },
      { name: "LangChain", icon: <FiCpu />, color: "#121011" },
      { name: "RAG Systems", icon: <FaBrain />, color: "#FFD700" },
      { name: "Computer Vision", icon: <FaRobot />, color: "#00FF00" },
      { name: "NLP", icon: <FaBrain />, color: "#00BFFF" },
    ]
  },
  {
    category: "Data Engineering",
    direction: "right",
    items: [
      { name: "Pandas", icon: <FaDataEng />, color: "#150458" },
      { name: "NumPy", icon: <FiCpu />, color: "#013243" },
      { name: "Apache Spark", icon: <FaDataEng />, color: "#E25A1C" },
      { name: "ETL Pipelines", icon: <FaDataEng />, color: "#5D6D7E" },
      { name: "Snowflake", icon: <FaCloud />, color: "#29B6F6" },
      { name: "BigQuery", icon: <SiGooglecloud />, color: "#4285F4" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791" },
      { name: "Power BI", icon: <FaChartBar />, color: "#F2C811" },
      { name: "Tableau", icon: <FaChartBar />, color: "#E97627" },
      { name: "Looker Studio", icon: <SiGooglecloud />, color: "#4285F4" },
      { name: "Apache Airflow", icon: <FaDataEng />, color: "#017CEE" },
    ]
  },
  {
    category: "Growth & SEO Technology",
    direction: "left",
    items: [
      { name: "Technical SEO", icon: <FaSearchDollar />, color: "#4CAF50" },
      { name: "Core Web Vitals", icon: <FiTrendingUp />, color: "#F44336" },
      { name: "Google Analytics 4", icon: <FaChartBar />, color: "#E37400" },
      { name: "Search Console", icon: <FaSearchDollar />, color: "#4285F4" },
      { name: "Ahrefs", icon: <FaGlobe />, color: "#000000" },
      { name: "SEMrush", icon: <FaSearchDollar />, color: "#FF6210" },
      { name: "HubSpot", icon: <FaGlobe />, color: "#FF7A59" },
      { name: "Mailchimp", icon: <FaGlobe />, color: "#FFE01B" },
      { name: "Growth Optimization", icon: <FiTrendingUp />, color: "#2196F3" },
      { name: "Marketing Automation", icon: <MdAutoGraph />, color: "#9C27B0" },
      { name: "Conversion Rate", icon: <FaChartBar />, color: "#FF9800" },
    ]
  },
  {
    category: "UI/UX & Design",
    direction: "right",
    items: [
      { name: "Figma", icon: <SiFigma />, color: "#F24E1E" },
      { name: "Adobe XD", icon: <FiPenTool />, color: "#FF61F6" },
      { name: "Canva", icon: <SiCanva />, color: "#00C4CC" },
      { name: "UI/UX Principles", icon: <FaPaintBrush />, color: "#E83E8C" },
      { name: "Motion Design", icon: <MdAnimation />, color: "#6F42C1" },
    ]
  },
  {
    category: "Cyber Security",
    direction: "left",
    items: [
      { name: "Secure Coding", icon: <FiCode />, color: "#10B981" },
      { name: "OWASP Top 10", icon: <FaShieldAlt />, color: "#EF4444" },
      { name: "OAuth 2.0", icon: <FaLock />, color: "#3B82F6" },
      { name: "JWT Auth", icon: <FaKey />, color: "#F59E0B" },
      { name: "API Security", icon: <FaLink />, color: "#8B5CF6" },
      { name: "RBAC", icon: <FaUsersCog />, color: "#EC4899" },
      { name: "Session Security", icon: <FaUserShield />, color: "#6366F1" },
      { name: "Input Validation", icon: <FiCheckCircle />, color: "#10B981" },
    ]
  }
];

const TechStack = () => {
  return (
    <section className="tech-stack-container">
      <style>{`
        .tech-stack-container {
          font-family: 'Inter', system-ui, sans-serif;
          padding: 100px 0;
          background: radial-gradient(circle at center top, #ffffff, #f1f5f9);
          overflow: hidden;
        }

        .tech-header {
          margin-bottom: 70px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 8%;
        }

        .tech-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #2563eb;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
          background: rgba(37, 99, 235, 0.08);
          padding: 8px 16px;
          border-radius: 30px;
        }

        .tech-badge::before {
          content: "";
          width: 8px;
          height: 8px;
          background: #2563eb;
          border-radius: 50%;
          box-shadow: 0 0 10px #2563eb;
        }

        .tech-title {
          font-size: 52px;
          font-weight: 900;
          color: #0f172a;
          margin-bottom: 24px;
          letter-spacing: -1px;
        }

        .tech-desc {
          color: #64748b;
          font-size: 18px;
          line-height: 1.6;
          max-width: 700px;
        }

        .tech-sections {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .tech-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .tech-category-name {
          font-size: 24px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 30px;
          text-align: center;
        }

        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          position: relative;
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          padding: 10px 0;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          gap: 24px;
        }

        .marquee-wrapper:hover .marquee-track {
          cursor: grab;
        }
        
        .marquee-wrapper:active .marquee-track {
          cursor: grabbing;
        }

        .tech-pill {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(226, 232, 240, 0.8);
          font-size: 16px;
          font-weight: 700;
          color: #334155;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .tech-pill:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
          border-color: #cbd5e1;
          background: #ffffff;
        }

        .tech-icon {
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .tech-pill:hover .tech-icon {
          transform: scale(1.15);
        }

        @media (max-width: 768px) {
          .tech-title {
            font-size: 36px;
          }
          .tech-category-name {
            font-size: 20px;
          }
          .tech-pill {
            padding: 12px 20px;
            font-size: 14px;
          }
          .tech-icon {
            font-size: 20px;
          }
        }
      `}</style>

      <div className="tech-header">
        <div className="tech-badge">Our Tech Stack</div>

      <h2 className="section-title">
            Technologies{" "}
            <span className="section-title-accent">
              We Work With
            </span>
          </h2>


        <p className="tech-desc">
          We leverage modern, scalable, and industry-standard technologies to build secure, high-performance, and user-friendly digital solutions across platforms.
        </p>
      </div>

      <div className="tech-sections">
        {techData.map((section) => (
          <div className="tech-row" key={section.category}>
            <div className="tech-category-name">{section.category}</div>

            <MarqueeRow 
              items={section.items} 
              direction={section.direction} 
              speedFactor={1} 
            />

          </div>
        ))}
      </div>
    </section>
  );
};


export default TechStack;