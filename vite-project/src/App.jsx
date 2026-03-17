import { useEffect, useRef } from "react";
import crispy from "./assets/crispy.jpg";
import drapzy from "./assets/drapzy.jpg";
import nyrrox from "./assets/nyrrox.jpg";
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

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        if (mouse.x) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            p.x -= dx * 0.01;
            p.y -= dy * 0.01;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "#f97316";
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }, []);

  return (
    <div className="main-container">

      <canvas ref={canvasRef} className="particles"></canvas>

      <Navbar />

      {/* ================= HOME ================= */}

      <section id="home" className="section hero">
        <img src={crispy} alt="Coach Crispy" className="profile-pic" />
        <h1>Coach Crispy</h1>
        <p className="subtitle">Fortnite Coach for One Prodige</p>
      </section>

      {/* ================= COLLAB ================= */}

      <section id="collab" className="section">

        <h2>Collaboration</h2>
        <p className="collab-subtitle">Joueurs du jour</p>

        <div className="collab-grid">

          {/* ===== DRAPZY ===== */}
          <a
            href="https://x.com/drapzybot"
            target="_blank"
            rel="noopener noreferrer"
            className="player-card-link"
          >
            <div className="player-card">
              <img src={drapzy} alt="Drapzy" className="player-pic" />
              <h3>Drapzy</h3>
              <p className="team">Haikoo Esport</p>
            </div>
          </a>

          {/* ===== NYRROX ===== */}
          <a
            href="https://x.com/gotstii"
            target="_blank"
            rel="noopener noreferrer"
            className="player-card-link"
          >
            <div className="player-card">
              <img src={nyrrox} alt="Nyrrox" className="player-pic" />
              <h3>Nyrrox</h3>
              <p className="team">R4C Esport</p>
            </div>
          </a>

        </div>

      </section>

      {/* ================= RÉSEAUX ================= */}

      <section id="social" className="section">
        <h2>Réseaux</h2>
        <p>Instagram — TikTok — YouTube — Discord</p>
      </section>

      <footer>© 2026 Coach Crispy — Tous droits réservés</footer>

    </div>
  );
}