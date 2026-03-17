import { useEffect, useRef } from "react";
import "./styles.css";

/* ================= NAVBAR ================= */

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">Coach Crispy</div>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#collab">Collaboration</a></li>
        <li><a href="#social">Réseaux</a></li>
      </ul>

      {/* ⭐ ÉTOILES NAVBAR */}
      <div className="nav-stars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    </nav>
  );
}

/* ================= APP ================= */

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    /* ===== Création particules ===== */

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    /* ===== Animation ===== */

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {

        p.x += p.vx;
        p.y += p.vy;

        /* rebond bord */
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        /* interaction souris */
        if (mouse.x) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            p.x -= dx * 0.01;
            p.y -= dy * 0.01;
          }
        }

        /* dessin étoile */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#f97316";
        ctx.fill();
      });

      /* lignes entre particules proches */

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {

          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = "rgba(249,115,22,0.15)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <div className="main-container">

      {/* 🌌 PARTICULES BACKGROUND */}
      <canvas ref={canvasRef} className="particles"></canvas>

      <Navbar />

      {/* ================= HOME ================= */}

      <section id="home" className="section hero">
        <h1>Coach Performance & Mindset</h1>
        <p>Une transformation puissante, moderne et durable</p>
        <button>Réserver un appel gratuit</button>
      </section>

      {/* ================= COLLAB ================= */}

      <section id="collab" className="section">
        <h2>Collaboration</h2>
        <p>
          Programme personnalisé pour t’aider à atteindre tes objectifs
          physiques, mentaux ou professionnels.
        </p>
      </section>

      {/* ================= RÉSEAUX ================= */}

      <section id="social" className="section">
        <h2>Réseaux</h2>
        <p>Instagram — TikTok — YouTube — Discord</p>
      </section>

      {/* ================= FOOTER ================= */}

      <footer>© 2026 Coach Crispy — Tous droits réservés</footer>

    </div>
  );
}