import { useEffect, useRef } from "react";
import "./styles.css";

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

    // Création des particules
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

      // Dessin des particules
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // rebond bord
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // interaction souris
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

      // Lignes entre particules proches
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = "rgba(249,115,22,0.2)";
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

      {/* 🌌 CANVAS PARTICULES */}
      <canvas ref={canvasRef} className="particles"></canvas>

      {/* HERO */}
      <section className="section hero">
        <h1>Coach Performance & Mindset</h1>
        <p>Une transformation puissante et moderne</p>
        <button>Réserver un appel gratuit</button>
      </section>

      {/* À propos */}
      <section className="section">
        <h2>À propos</h2>
        <p>Coaching stratégique pour discipline et résultats durables.</p>
      </section>

      {/* Services */}
      <section className="section">
        <h2>Mes programmes</h2>
        <p>Individuel — Business — Performance</p>
      </section>

      <footer>© 2026 Coach Performance</footer>

    </div>
  );
}