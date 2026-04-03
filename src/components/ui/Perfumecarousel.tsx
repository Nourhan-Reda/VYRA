import { useState, useEffect, useCallback } from "react";

const items = [
  {
    name: "Velvet Noir",
    tagline: "Midnight mystery in every drop",
    notes: ["Black Oud", "Dark Rose", "Amber Musk"],
    price: "$189",
    accent: "#c4a2e7",
    glow: "rgba(191, 129, 183, 0.35)",
    img: "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
  },
  {
    name: "Aura Lumière",
    tagline: "Radiance woven into silk",
    notes: ["Iris Blanche", "Violet Petal", "Sandalwood"],
    price: "$245",
    accent: "#9d5ea65b",
    glow: "rgba(232,121,249,0.35)",
    img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&q=80",
  },
  {
    name: "Soir Enchanté",
    tagline: "The hour before midnight",
    notes: ["Bergamot", "Plum Noir", "Vetiver"],
    price: "$210",
    accent: "#a080ae",
    glow: "rgba(221, 145, 223, 0.35)",
    img: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=600&q=80",
  },
];

export default function PerfumeCarousel() {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const p = items[idx];

  const goTo = useCallback(
    (next: number, direction: 1 | -1) => {
      if (animating) return;
      setDir(direction);
      setAnimating(true);
      setTimeout(() => {
        setIdx(next);
        setAnimating(false);
      }, 420);
    },
    [animating],
  );

  useEffect(() => {
    const t = setInterval(() => goTo((idx + 1) % 3, 1), 5000);
    return () => clearInterval(t);
  }, [idx, goTo]);

  const slide = (axis: 1 | -1): React.CSSProperties => ({
    opacity: animating ? 0 : 1,
    transform: animating ? `translateX(${dir * axis * 22}px)` : "translateX(0)",
    transition: "opacity 0.38s ease, transform 0.38s ease",
  });

  const arrowBtn = (hoverAccent: string): React.CSSProperties => ({
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.04)",
    color: "rgba(255,255,255,0.5)",
    fontSize: 16,
    cursor: "pointer",
    transition: "all 0.2s",
  });

  return (
    <div
      style={{
        fontFamily: "Georgia,serif",
        background:
          "radial-gradient(ellipse at 50% 0%,#1a0533,#0a0014 60%,#000)",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        padding: "64px 80px 80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle,${p.glow},transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-55%)",
          pointerEvents: "none",
          transition: "background 0.8s",
        }}
      />

      <div
        style={{
          position: "relative",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 420,
              height: 480,
              borderRadius: 18,
              overflow: "hidden",
              border: `1px solid ${p.accent}44`,
              boxShadow: `0 0 48px ${p.glow}`,
              ...slide(-1),
            }}
          >
            <img
              src={p.img}
              alt={p.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > idx ? 1 : -1)}
                style={{
                  width: i === idx ? 32 : 10,
                  height: 10,
                  borderRadius: 5,
                  border: "none",
                  background: i === idx ? p.accent : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            ...slide(1),
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase" as const,
              color: p.accent,
            }}
          >
            Parfum · Édition Limitée
          </span>
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 52,
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              {p.name}
            </h2>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 15,
                color: "rgba(255,255,255,0.45)",
                fontStyle: "italic",
              }}
            >
              {p.tagline}
            </p>
          </div>
          <div
            style={{
              height: 1,
              background: `linear-gradient(to right,${p.accent}66,transparent)`,
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p
              style={{
                margin: "0 0 6px",
                fontSize: 10,
                letterSpacing: 3,
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.3)",
              }}
            >
              Fragrance Notes
            </p>
            {p.notes.map((n, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: p.accent,
                    opacity: 1 - i * 0.25,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.7)" }}>
                  {n}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginTop: 8,
            }}
          >
            <span style={{ fontSize: 40, fontWeight: 300, color: p.accent }}>
              {p.price}
            </span>
            <button
              style={{
                flex: 1,
                maxWidth: 260,
                padding: "16px 0",
                borderRadius: 12,
                border: `1px solid ${p.accent}`,
                background: `${p.accent}18`,
                color: "#fff",
                fontSize: 12,
                letterSpacing: 3,
                textTransform: "uppercase" as const,
                cursor: "pointer",
                fontFamily: "Georgia,serif",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = `${p.accent}44`)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = `${p.accent}18`)
              }
            >
              Add to Cart
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 8,
            }}
          >
            {([-1, 1] as const).map((d, i) => (
              <button
                key={i}
                onClick={() => goTo((idx + d + 3) % 3, d)}
                style={arrowBtn(p.accent)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = p.accent;
                  e.currentTarget.style.color = p.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                }}
              >
                {d === -1 ? "←" : "→"}
              </button>
            ))}
            <span
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: 2,
              }}
            >
              {String(idx + 1).padStart(2, "0")} / 03
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
