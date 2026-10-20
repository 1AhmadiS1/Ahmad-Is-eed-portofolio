import { useState, useRef } from 'react';
import profileImageWebp from '@/assets/ahmad-profile.webp';
import profileImagePng from '@/assets/ahmad-profile.png';
import { Cpu } from 'lucide-react';

export function HeroVisual() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const wrapRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!wrapRef.current) return;
    const rect = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
    if (!isFlipped) {
      setTilt({
        x: (y - 0.5) * -16,
        y: (x - 0.5) * 16,
      });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setMousePos({ x: 0.5, y: 0.5 });
  };

  // Parallax offset for floating elements based on mouse
  const px = (mousePos.x - 0.5) * 2;
  const py = (mousePos.y - 0.5) * 2;

  return (
    <aside
      ref={wrapRef}
      className="hero-visual-wrap"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Ahmad Is'eed profile card"
    >
      {/* ─── Orbiting Ring ─── */}
      <div className="orbit-ring" />

      {/* ─── Floating 3D Shapes ─── */}
      <div className="float-shape shape-cube" style={{ transform: `translate(${px * -18}px, ${py * -14}px)` }}>
        <div className="cube">
          <div className="cube-face cube-front" />
          <div className="cube-face cube-back" />
          <div className="cube-face cube-left" />
          <div className="cube-face cube-right" />
          <div className="cube-face cube-top" />
          <div className="cube-face cube-bottom" />
        </div>
      </div>

      <div className="float-shape shape-ring" style={{ transform: `translate(${px * 22}px, ${py * 16}px)` }}>
        <div className="spinning-ring" />
      </div>

      <div className="float-shape shape-diamond" style={{ transform: `translate(${px * -14}px, ${py * 20}px)` }}>
        <div className="diamond" />
      </div>

      <div className="float-shape shape-bracket-l" style={{ transform: `translate(${px * 12}px, ${py * -18}px)` }}>
        {'</>'}
      </div>

      <div className="float-shape shape-bracket-r" style={{ transform: `translate(${px * -20}px, ${py * 12}px)` }}>
        {'{ }'}
      </div>

      {/* ─── Floating Dots ─── */}
      <div className="float-dot dot-1" style={{ transform: `translate(${px * 30}px, ${py * -20}px)` }} />
      <div className="float-dot dot-2" style={{ transform: `translate(${px * -25}px, ${py * 25}px)` }} />
      <div className="float-dot dot-3" style={{ transform: `translate(${px * 15}px, ${py * 30}px)` }} />
      <div className="float-dot dot-4" style={{ transform: `translate(${px * -30}px, ${py * -15}px)` }} />

      {/* ─── Glow Backdrop ─── */}
      <div className="hero-glow" />

      {/* ─── The Card ─── */}
      <button
        className={`hero-flip-btn ${isFlipped ? 'flipped' : ''}`}
        type="button"
        onClick={() => setIsFlipped((prev) => !prev)}
        aria-label="Flip profile card"
        style={{
          transform: isFlipped
            ? 'rotateY(180deg)'
            : `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* ── Front ── */}
        <div className="card-face card-front">
          <div className="card-img-wrap">
            <picture className="block h-full w-full">
              <source srcSet={profileImageWebp} type="image/webp" />
              <img
                src={profileImagePng}
                alt="Ahmad Is'eed"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover object-top"
              />
            </picture>
            <div className="card-img-gradient" />
          </div>

          <div className="card-front-info">
            <span>Ahmad Is'eed</span>
            <strong>Full-stack Developer</strong>
            <p>
              <Cpu size={13} className="text-red" />
              Django REST · React
            </p>
            <small>Hover / tap to flip ↺</small>
          </div>
        </div>

        {/* ── Back ── */}
        <div className="card-face card-back">
          <div className="card-back-head">
            <div>
              <span>Ahmad Is'eed</span>
              <strong>Full-stack Developer</strong>
              <p>B.A. Computer Systems Engineering (IoT) — PTUK</p>
            </div>
            <span className="card-badge">Open to Work</span>
          </div>

          <div className="card-back-skills">
            <div className="skill-category">
              <span>Programming</span>
              <div className="skill-tags">
                <span>Python</span><span>JavaScript</span><span>SQL</span><span>HTML5</span><span>CSS3</span>
              </div>
            </div>

            <div className="skill-category">
              <span>Frameworks & Libraries</span>
              <div className="skill-tags">
                <span>Django</span><span>Django REST</span><span>React.js</span><span>Tailwind CSS</span><span>Bootstrap</span>
              </div>
            </div>

            <div className="skill-category">
              <span>Cloud & DevOps</span>
              <div className="skill-tags">
                <span>AWS</span><span>EC2</span><span>RDS</span><span>S3</span><span>ECR</span><span>IAM</span><span>Route 53</span><span>Docker</span><span>GitHub Actions</span>
              </div>
            </div>

            <div className="skill-category">
              <span>Databases</span>
              <div className="skill-tags">
                <span>PostgreSQL</span><span>MySQL</span>
              </div>
            </div>

            <div className="skill-category">
              <span>Tools</span>
              <div className="skill-tags">
                <span>Git</span><span>GitHub</span><span>Postman</span><span>Swagger</span><span>JMeter</span>
              </div>
            </div>
          </div>
        </div>
      </button>
    </aside>
  );
}
