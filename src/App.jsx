import { useEffect, useState, useRef } from 'react';

const floatingPetals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${6 + Math.random() * 6}s`,
  size: `${10 + Math.random() * 14}px`,
  color: [
    '#f9a8d4',
    '#fda4af',
    '#c4b5fd',
    '#fbcfe8',
    '#f0abfc',
  ][Math.floor(Math.random() * 5)],
}));

// Use actual photo files placed in `public/photos`
const photoFiles = [
  'WhatsApp Image 2026-05-19 at 11.49.39 AM.jpeg',
  'WhatsApp Image 2026-05-19 at 11.49.38 AM (1).jpeg',
  'WhatsApp Image 2026-05-19 at 11.49.38 AM.jpeg',
  'WhatsApp Image 2026-05-19 at 11.49.37 AM (1).jpeg',
  'WhatsApp Image 2026-05-19 at 11.49.37 AM.jpeg',
];

// Local song file for the first photo. Add more files to public/songs/ and map them here.
const songFiles = [
  '/songs/Aga-Naga-MassTamilan.dev.mp3',
  null,
  null,
  null,
  null,
];

const photos = photoFiles.map((f, i) => ({
  id: i + 1,
  label: `Photo ${i + 1}`,
  src: `/photos/${f}`,
  bg: 'transparent',
  emoji: null,
  song: songFiles[i] || null,
}));

const traits = [
  { word: 'Creative', icon: '🎨' },
  { word: 'Kind', icon: '💝' },
  { word: 'Smart', icon: '📚' },
  { word: 'Fun', icon: '🎉' },
  { word: 'Brave', icon: '🦋' },
  { word: 'Caring', icon: '🌟' },
];

function FloatingPetal({ petal }) {
  return (
    <div
      style={{
        position: 'fixed',
        left: petal.left,
        top: '-20px',
        width: petal.size,
        height: petal.size,
        borderRadius: '50% 0 50% 0',
        background: petal.color,
        opacity: 0.7,
        pointerEvents: 'none',
        animation: `fall ${petal.duration} ${petal.delay} infinite linear`,
        zIndex: 0,
      }}
    />
  );
}

function TypeWriter({ text, speed = 80 }) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < text.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + text[idx]);
        setIdx((i) => i + 1);
      }, speed);
      return () => clearTimeout(t);
    }
  }, [idx, text, speed]);

  return (
    <span>
      {displayed}
      {idx < text.length && (
        <span style={{ animation: 'blink 1s infinite', opacity: 1 }}>|</span>
      )}
    </span>
  );
}

function PhotoCard({ photo, index, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400 + index * 120);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect && onSelect(photo, index)}
      style={{
        background: photo.bg,
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: visible
          ? hovered
            ? 'translateY(-10px) scale(1.03)'
            : 'translateY(0) scale(1)'
          : 'translateY(40px) scale(0.9)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(.22,1,.36,1)',
        boxShadow: hovered
          ? '0 20px 60px rgba(249,168,212,0.45)'
          : '0 4px 20px rgba(0,0,0,0.08)',
        position: 'relative',
        aspectRatio: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        minHeight: '160px',
        border: '2px solid rgba(255,255,255,0.6)',
      }}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s',
            transform: hovered ? 'scale(1.03)' : 'scale(1)'
          }}
        />
      ) : (
        <div
          style={{
            fontSize: '48px',
            transition: 'transform 0.3s',
            transform: hovered ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
          }}
        >
          {photo.emoji}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(6px)',
          padding: '10px',
          textAlign: 'center',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.35s ease',
          borderRadius: '0 0 18px 18px',
        }}
      >
        <span
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '16px',
            color: '#be185d',
            fontWeight: 600,
          }}
        >
          {photo.label}
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          fontWeight: 'bold',
          color: '#be185d',
          fontFamily: 'serif',
        }}
      >
        {photo.id}
      </div>

      <p
        style={{
          fontSize: '11px',
          color: '#9d174d',
          margin: 0,
          fontFamily: 'sans-serif',
          opacity: 0.7,
        }}
      >
        Add your photo here
      </p>
    </div>
  );
}

function TraitCard({ trait, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200 + index * 100);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'linear-gradient(135deg,#fce4ec,#e1bee7)'
          : 'rgba(255,255,255,0.8)',
        border: `1.5px solid ${hovered ? '#f9a8d4' : 'rgba(249,168,212,0.3)'}`,
        borderRadius: '18px',
        padding: '24px 16px',
        textAlign: 'center',
        cursor: 'default',
        transform: visible
          ? hovered
            ? 'translateY(-6px) scale(1.04)'
            : 'translateY(0) scale(1)'
          : 'translateY(30px) scale(0.9)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(.22,1,.36,1)',
        boxShadow: hovered ? '0 12px 40px rgba(249,168,212,0.3)' : 'none',
      }}
    >
      <div
        style={{
          fontSize: '36px',
          marginBottom: '12px',
          transition: 'transform 0.3s',
          transform: hovered ? 'scale(1.2)' : 'scale(1)',
        }}
      >
        {trait.icon}
      </div>
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '17px',
          color: '#9d174d',
          fontWeight: 700,
        }}
      >
        {trait.word}
      </p>
    </div>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const age = 17;

  // Audio / player state
  const [currentIndex, setCurrentIndex] = useState(null); // index in photos
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    // create audio element once
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;

    const a = audioRef.current;
    const onTime = () => setProgress(a.currentTime || 0);
    const onDur = () => setDuration(a.duration || 0);
    const onEnd = () => {
      // auto-advance
      handleNext();
    };

    a.addEventListener('timeupdate', onTime);
    a.addEventListener('durationchange', onDur);
    a.addEventListener('ended', onEnd);

    return () => {
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('durationchange', onDur);
      a.removeEventListener('ended', onEnd);
      a.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    // when currentIndex changes, load its song (if any)
    if (currentIndex === null || !photos[currentIndex]) return;
    const song = photos[currentIndex].song;
    if (!song) return;
    const a = audioRef.current;
    a.src = song;
    a.currentTime = 0;
    setProgress(0);
    setDuration(0);
    if (isPlaying) a.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  function handleSelectPhoto(photo, index) {
    if (photos[index].song) {
      setCurrentIndex(index);
      setIsPlaying(true);
      // will auto-load via effect
      setTimeout(() => audioRef.current && audioRef.current.play().catch(() => {}), 50);
    }
  }

  function togglePlay() {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }

  function handleNext() {
    if (currentIndex === null) return;
    const next = (currentIndex + 1) % photos.length;
    setCurrentIndex(next);
    setIsPlaying(true);
    setTimeout(() => audioRef.current && audioRef.current.play().catch(() => {}), 50);
  }

  function handlePrev() {
    if (currentIndex === null) return;
    const prev = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prev);
    setIsPlaying(true);
    setTimeout(() => audioRef.current && audioRef.current.play().catch(() => {}), 50);
  }

  function handleSeek(e) {
    const x = Number(e.target.value);
    if (!audioRef.current) return;
    audioRef.current.currentTime = x;
    setProgress(x);
  }

  function handleVolume(e) {
    const v = Number(e.target.value);
    setVolume(v);
  }

  function toggleMute() {
    if (!audioRef.current) return;
    const nextMuted = !muted;
    setMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  }

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Nunito:wght@300;400;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #fff0f7;
          min-height: 100vh;
          font-family: 'Nunito', sans-serif;
          overflow-x: hidden;
        }

        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0.7; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        @keyframes float-name {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes heart-beat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.15); }
          28% { transform: scale(1); }
          42% { transform: scale(1.1); }
          70% { transform: scale(1); }
        }

        .sparkle-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f9a8d4;
          animation: sparkle 2s infinite;
        }

        .section-animate {
          animation: slide-up 0.7s ease both;
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #fce7f3; }
        ::-webkit-scrollbar-thumb { background: #f9a8d4; border-radius: 10px; }
      `}</style>

      {floatingPetals.map((p) => (
        <FloatingPetal key={p.id} petal={p} />
      ))}

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(ellipse at 50% 0%, #fce4ec 0%, #f8bbd0 30%, #fff0f7 70%)',
          padding: '40px 20px',
          zIndex: 1,
        }}
      >
        {[200, 340, 480].map((size, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: '1.5px solid rgba(249,168,212,0.3)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              animation: `pulse-ring ${3 + i}s ${i * 0.8}s infinite ease-out`,
            }}
          />
        ))}

        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#fce4ec,#e1bee7)',
            border: '4px solid #f9a8d4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px',
            marginBottom: '28px',
            boxShadow:
              '0 0 0 8px rgba(249,168,212,0.2), 0 20px 60px rgba(249,168,212,0.4)',
            position: 'relative',
            zIndex: 2,
            animation: 'heart-beat 2.5s infinite',
          }}
        >
          🌸
        </div>

        <h1
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: 'clamp(52px, 10vw, 88px)',
            background: 'linear-gradient(90deg, #db2777, #9d174d, #be185d, #db2777)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 3s linear infinite, float-name 4s ease-in-out infinite',
            lineHeight: 1.1,
            textAlign: 'center',
            position: 'relative',
            zIndex: 2,
            marginBottom: '12px',
          }}
        >
          Sindhuja
        </h1>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid #f9a8d4',
            borderRadius: '50px',
            padding: '8px 22px',
            marginBottom: '24px',
            boxShadow: '0 4px 20px rgba(249,168,212,0.25)',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <span style={{ fontSize: '18px' }}>🎂</span>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '20px',
              color: '#9d174d',
              fontWeight: 700,
            }}
          >
            {age} years of magic
          </span>
          <span style={{ fontSize: '18px' }}>✨</span>
        </div>

        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(16px, 3vw, 22px)',
            color: '#be185d',
            fontStyle: 'italic',
            textAlign: 'center',
            maxWidth: '480px',
            lineHeight: 1.6,
            zIndex: 2,
            position: 'relative',
            animation: 'slide-up 1s 0.5s both',
          }}
        >
          <TypeWriter text="A world full of sparkle, grace & endless possibilities 🌷" />
        </p>

        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: scrollY > 50 ? 0 : 1,
            transition: 'opacity 0.4s',
            zIndex: 2,
          }}
        >
          <span style={{ fontSize: '13px', color: '#be185d', opacity: 0.7 }}>
            scroll down
          </span>
          <div
            style={{
              width: '24px',
              height: '38px',
              border: '2px solid #f9a8d4',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '6px',
            }}
          >
            <div
              style={{
                width: '4px',
                height: '8px',
                background: '#db2777',
                borderRadius: '2px',
                animation: 'float-name 1.5s ease-in-out infinite',
              }}
            />
          </div>
        </div>

          {/* Bottom audio player */}
          {currentIndex !== null && (
            <div
              style={{
                position: 'fixed',
                left: 16,
                right: 16,
                bottom: 16,
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid rgba(249,168,212,0.4)',
                borderRadius: 12,
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                zIndex: 9999,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 220 }}>
                <strong style={{ color: '#9d174d' }}>{photos[currentIndex].label}</strong>
                <small style={{ color: '#be185d', opacity: 0.8 }}>{photos[currentIndex].song ? 'Playing song' : 'No song attached'}</small>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button onClick={handlePrev} style={{ padding: '8px 10px' }}>Prev</button>
                <button onClick={togglePlay} style={{ padding: '8px 14px' }}>{isPlaying ? 'Pause' : 'Play'}</button>
                <button onClick={handleNext} style={{ padding: '8px 10px' }}>Next</button>
                <button onClick={toggleMute} style={{ padding: '8px 10px' }}>
                  {muted ? 'Unmute' : 'Mute'}
                </button>
              </div>

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="range" min={0} max={Math.max(duration, 0)} value={progress} onChange={handleSeek} style={{ width: '100%' }} />
                <div style={{ width: 120, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <input type="range" min={0} max={1} step={0.01} value={volume} onChange={handleVolume} />
                </div>
              </div>
            </div>
          )}
      </div>

      <div
        style={{
          background: '#fff',
          padding: '80px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '14px',
                color: '#db2777',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              ✦ Gallery ✦
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(32px, 6vw, 48px)',
                color: '#9d174d',
                marginTop: '8px',
                fontWeight: 700,
              }}
            >
              Moments of Joy
            </h2>
            <p
              style={{
                color: '#be185d',
                opacity: 0.7,
                marginTop: '12px',
                fontSize: '15px',
              }}
            >
              Every picture tells a story 🌸
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {photos.map((p, i) => (
              <PhotoCard key={p.id} photo={p} index={i} onSelect={handleSelectPhoto} />
            ))}
          </div>

          <p
            style={{
              textAlign: 'center',
              marginTop: '32px',
              fontSize: '13px',
              color: '#be185d',
              opacity: 0.6,
              fontStyle: 'italic',
            }}
          >
            💡 Replace the emoji placeholders with Sindhuja's real photos!
          </p>
        </div>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)',
          padding: '80px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '14px',
                color: '#db2777',
                letterSpacing: '3px',
                textTransform: 'uppercase',
              }}
            >
              ✦ About Her ✦
            </span>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(30px, 5vw, 44px)',
                color: '#9d174d',
                marginTop: '8px',
              }}
            >
              What Makes Her Special
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '16px',
            }}
          >
            {traits.map((t, i) => (
              <TraitCard key={t.word} trait={t} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          padding: '80px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div
            style={{
              background: 'linear-gradient(135deg,#fce4ec,#fff)',
              border: '1.5px solid #f9a8d4',
              borderRadius: '24px',
              padding: '48px 40px',
              boxShadow: '0 10px 60px rgba(249,168,212,0.2)',
              position: 'relative',
            }}
          >
            {['top:16px;left:16px', 'top:16px;right:16px', 'bottom:16px;left:16px', 'bottom:16px;right:16px'].map(
              (pos, i) => (
                <span
                  key={i}
                  style={{
                    position: 'absolute',
                    fontSize: '20px',
                    ...Object.fromEntries(pos.split(';').map((s) => s.split(':'))),
                  }}
                >
                  🌸
                </span>
              )
            )}

            <h3
              style={{
                fontFamily: "'Dancing Script', cursive",
                fontSize: '36px',
                color: '#db2777',
                textAlign: 'center',
                marginBottom: '28px',
              }}
            >
              A Note For You 💌
            </h3>

            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '17px',
                color: '#9d174d',
                lineHeight: '1.9',
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              To the most amazing Sindhuja — at {age}, you carry within you a
              universe of dreams, laughter, and warmth. Every room lights up
              when you walk in. Every moment becomes a memory worth keeping.
              Keep shining, keep growing, and always know how deeply you are
              loved. The world is lucky to have you in it. 🌟
            </p>

            <div
              style={{
                textAlign: 'right',
                marginTop: '28px',
                fontFamily: "'Dancing Script', cursive",
                fontSize: '22px',
                color: '#be185d',
              }}
            >
              — With all my love 💖
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg,#9d174d,#be185d)',
          padding: '40px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: '28px',
            color: '#fff',
            marginBottom: '8px',
          }}
        >
          Made with 💝 for Sindhuja
        </p>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
          Forever {age} & fabulous ✨
        </p>
      </div>
    </>
  );
}
