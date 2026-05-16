import React, { useState, useEffect } from 'react';
import './App.css';
import logoUrl from './assets/logo.png';
import terminalImageUrl from './assets/terminal_image.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import clarity from './lib/clarity';

gsap.registerPlugin(ScrollTrigger);

const COMPANIES = [
  { name: 'Airbnb', domain: 'airbnb.com' },
  { name: 'Airtable', domain: 'airtable.com' },
  { name: 'Apple', domain: 'apple.com' },
  { name: 'Binance', domain: 'binance.com' },
  { name: 'BMW', domain: 'bmw.com' },
  { name: 'Bugatti', domain: 'bugatti.com' },
  { name: 'Cal.com', domain: 'cal.com' },
  { name: 'Claude', domain: 'anthropic.com' },
  { name: 'Clay', domain: 'clay.com' },
  { name: 'ClickHouse', domain: 'clickhouse.com' },
  { name: 'Cohere', domain: 'cohere.com' },
  { name: 'Coinbase', domain: 'coinbase.com' },
  { name: 'Composio', domain: 'composio.dev' },
  { name: 'Cursor', domain: 'cursor.com' },
  { name: 'ElevenLabs', domain: 'elevenlabs.io' },
  { name: 'Expo', domain: 'expo.dev' },
  { name: 'Ferrari', domain: 'ferrari.com' },
  { name: 'Figma', domain: 'figma.com' },
  { name: 'Framer', domain: 'framer.com' },
  { name: 'HashiCorp', domain: 'hashicorp.com' },
  { name: 'IBM', domain: 'ibm.com' },
  { name: 'Intercom', domain: 'intercom.com' },
  { name: 'Kraken', domain: 'kraken.com' },
  { name: 'Lamborghini', domain: 'lamborghini.com' },
  { name: 'Linear', domain: 'linear.app' },
  { name: 'Lovable', domain: 'lovable.dev' },
  { name: 'Mastercard', domain: 'mastercard.com' },
  { name: 'Meta', domain: 'meta.com' },
  { name: 'MiniMax', domain: 'minimax.io' },
  { name: 'Mintlify', domain: 'mintlify.com' },
  { name: 'Miro', domain: 'miro.com' },
  { name: 'Mistral AI', domain: 'mistral.ai' },
  { name: 'MongoDB', domain: 'mongodb.com' },
  { name: 'Nike', domain: 'nike.com' },
  { name: 'Notion', domain: 'notion.so' },
  { name: 'NVIDIA', domain: 'nvidia.com' },
  { name: 'Ollama', domain: 'ollama.com' },
  { name: 'Pinterest', domain: 'pinterest.com' },
  { name: 'PlayStation', domain: 'playstation.com' },
  { name: 'PostHog', domain: 'posthog.com' },
  { name: 'Raycast', domain: 'raycast.com' },
  { name: 'Renault', domain: 'renault.com' },
  { name: 'Replicate', domain: 'replicate.com' },
  { name: 'Resend', domain: 'resend.com' },
  { name: 'Revolut', domain: 'revolut.com' },
  { name: 'Sentry', domain: 'sentry.io' },
  { name: 'Together AI', domain: 'together.ai' },
  { name: 'Uber', domain: 'uber.com' },
  { name: 'Vercel', domain: 'vercel.com' },
  { name: 'Vodafone', domain: 'vodafone.com' },
  { name: 'Voltagent', domain: 'voltagent.ai' },
  { name: 'Warp', domain: 'warp.dev' },
  { name: 'Webflow', domain: 'webflow.com' },
  { name: 'WIRED', domain: 'wired.com' },
  { name: 'Wise', domain: 'wise.com' },
  { name: 'xAI', domain: 'x.ai' },
  { name: 'Zapier', domain: 'zapier.com' },
];

const TESTIMONIALS = [
  {
    name: 'Harsha Darshita Ojha',
    feedback: "Relay is such a useful tool! Setting up a website usually takes hours of boilerplate work, but Relay lets you do it with a single command and a template of your choice. I love that it's built to work with AI agents - just point them to the Relay.md file and you're done. It's a huge time-saver for developers and indie hackers shipping fast. Pranshu's clearly built something that fits right into how people are coding today. Amazing work!",
    note: 'ML learner passionate about neural networks, NLP, and building thoughtful AI-powered web apps. Always experimenting, always building.',
    linkedin: 'https://www.linkedin.com/in/harsha-ojha-9530a4346/',
  },
  {
    name: 'Shridipa Dhar',
    feedback: "It's a great idea and really helpful",
    linkedin: 'https://www.linkedin.com/in/shridipa-dhar-373b6231b/',
  },
  {
    name: 'Abhisek Padhy',
    feedback: 'It is just amazing...',
    linkedin: 'https://www.linkedin.com/in/abhisekpadhy?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    name: 'Piyush Shukla',
    feedback: 'Great app, significantly reduces friction while setting up the boiler plate',
  },
  {
    name: 'Shreyan Paul',
    feedback: 'When I first discovered this tool, I was skeptical if it really works as promised but it really does while being free!',
  },
  {
    name: 'Akash',
    feedback: 'Simply. Amazing.',
  },
  {
    name: 'Raj Verma',
    feedback: 'Great tool, you get an instant clarity and inspiration about how your product should be',
  },
];

const TESTIMONIAL_ROWS = [
  [TESTIMONIALS[0], TESTIMONIALS[2], TESTIMONIALS[4], TESTIMONIALS[6]],
  [TESTIMONIALS[1], TESTIMONIALS[3], TESTIMONIALS[5]],
];

function App() {
  const [copiedArea, setCopiedArea] = useState(null);
  const [hoverContact, setHoverContact] = useState(false);
  const howItWorksRef = React.useRef(null);
  const comingSoonRef = React.useRef(null);
  const sandCanvasRef = React.useRef(null);
  const command = "npx getrelay@latest";
  const email = "pranshukr006@gmail.com";

  useEffect(() => {
    // Split the text into characters
    const text = new SplitType('.render-text', { types: 'chars, words' });
    
    // Animate characters using GSAP
    gsap.from(text.chars, {
      duration: 0.3,
      opacity: 0,
      y: 15,
      stagger: {
        each: 0.01,        // Faster increments per character
        from: "start"
      },
      ease: "power2.out"   // Slightly smoother/snappier than linear
    });

    // Cleanup split elements on unmount
    return () => text.revert();
  }, []);

  useEffect(() => {
    const section = howItWorksRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const panel = section.querySelector('.how-panel');
      const viewport = section.querySelector('.clone-grid-viewport');
      const grid = section.querySelector('.clone-grid');
      const scrollDistance = () => {
        if (!viewport || !grid) return 0;
        return Math.min(0, viewport.clientHeight - grid.scrollHeight);
      };

      gsap.set('.how-copy, .how-placeholder, .clone-content, .clone-card', { autoAlpha: 0 });
      gsap.set('.clone-grid', { y: 0 });

      const revealTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * 2.35, 1800)}`,
          scrub: 0.65,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => gsap.set('.clone-grid', { y: 0 }),
        },
      });

      revealTimeline
        .to(panel, {
          '--how-radius': '34px',
          '--how-side': '18px',
          '--how-scale': '1',
          '--how-y': '0px',
          duration: 0.58,
          ease: 'none',
        })
        .fromTo(
          '.how-copy',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.28, ease: 'none' },
          '<0.08',
        )
        .fromTo(
          '.how-placeholder',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.28, ease: 'none' },
          '<0.04',
        )
        .to('.how-content', {
          autoAlpha: 0,
          duration: 0.22,
          ease: 'none',
        }, '+=0.2')
        .to(panel, {
          '--clone-darkness': '1',
          duration: 0.34,
          ease: 'none',
        }, '<')
        .fromTo(
          '.clone-content',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.22, ease: 'none' },
          '-=0.12',
        )
        .fromTo(
          '.clone-card',
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.24, stagger: 0.006, ease: 'none' },
          '<0.06',
        )
        .to(
          '.clone-grid',
          {
            y: scrollDistance,
            duration: 1.08,
            ease: 'none',
          },
          '+=0.12',
        );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = comingSoonRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.coming-soon-text',
        { autoAlpha: 0, y: 52, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 72%',
            toggleActions: 'restart none restart reset',
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = sandCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles = [];
    let frameId = null;
    let isVisible = false;
    let tick = 0;
    let wordFont = '';
    let wordBaselineY = 0;
    let wordGradient = null;
    const pointer = {
      x: 0,
      y: 0,
      active: false,
      pressed: false,
      radius: 118,
    };

    const getGradientColor = (x, maxWidth) => {
      const band = Math.round((x / maxWidth) * 10) / 10;
      const greenToBlue = band < 0.5 ? band * 2 : (band - 0.5) * 2;
      const start = band < 0.5 ? [35, 211, 141] : [64, 224, 208];
      const end = band < 0.5 ? [64, 224, 208] : [58, 166, 255];
      const r = Math.round(start[0] + (end[0] - start[0]) * greenToBlue);
      const g = Math.round(start[1] + (end[1] - start[1]) * greenToBlue);
      const b = Math.round(start[2] + (end[2] - start[2]) * greenToBlue);

      return `rgba(${r}, ${g}, ${b}, 0.96)`;
    };

    const buildTargets = () => {
      const mask = document.createElement('canvas');
      const maskWidth = Math.max(1, Math.floor(width));
      const maskHeight = Math.max(1, Math.floor(height));
      mask.width = maskWidth;
      mask.height = maskHeight;

      const maskCtx = mask.getContext('2d');
      if (!maskCtx) {
        particles = [];
        return;
      }

      const fontSize = Math.min(maskWidth * 0.3, maskHeight * 0.94, 340);
      wordFont = `760 ${fontSize}px Geist, Inter, system-ui, sans-serif`;
      wordBaselineY = maskHeight * 0.54;
      maskCtx.clearRect(0, 0, maskWidth, maskHeight);
      maskCtx.fillStyle = '#ffffff';
      maskCtx.font = wordFont;
      maskCtx.textAlign = 'center';
      maskCtx.textBaseline = 'middle';
      maskCtx.fillText('Relay', maskWidth / 2, wordBaselineY);

      const pixels = maskCtx.getImageData(0, 0, maskWidth, maskHeight).data;
      const sampleStep = maskWidth < 640 ? 5 : 4;
      const targets = [];

      for (let y = 0; y < maskHeight; y += sampleStep) {
        for (let x = 0; x < maskWidth; x += sampleStep) {
          const alpha = pixels[(y * maskWidth + x) * 4 + 3];
          if (alpha > 90) {
            targets.push({ x, y });
          }
        }
      }

      const maxParticles = maskWidth < 640 ? 1200 : 2600;
      const keepEvery = Math.max(1, Math.ceil(targets.length / maxParticles));

      particles = targets
        .filter((_, index) => index % keepEvery === 0)
        .map((target) => {
          return {
            x: Math.random() * maskWidth,
            y: Math.random() * maskHeight - maskHeight * 0.35,
            targetX: target.x,
            targetY: target.y,
            vx: 0,
            vy: 0,
            size: Math.random() * 1.2 + 1.6,
            drift: (Math.random() - 0.5) * 0.02,
            fill: getGradientColor(target.x, maskWidth),
          };
        });
    };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      wordGradient = ctx.createLinearGradient(width * 0.18, 0, width * 0.82, 0);
      wordGradient.addColorStop(0, '#23d38d');
      wordGradient.addColorStop(0.5, '#40e0d0');
      wordGradient.addColorStop(1, '#3aa6ff');
      buildTargets();
    };

    const draw = () => {
      tick += 0.018;
      ctx.clearRect(0, 0, width, height);

      if (wordGradient) {
        ctx.save();
        ctx.globalAlpha = pointer.active ? 0.2 : 0.28;
        ctx.fillStyle = wordGradient;
        ctx.font = wordFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Relay', width / 2, wordBaselineY);
        ctx.restore();
      }

      const globalWind = Math.sin(tick) * 0.025;
      const interactionRadius = pointer.pressed ? pointer.radius * 1.35 : pointer.radius;
      const interactionRadiusSq = interactionRadius * interactionRadius;

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];

        if (pointer.active) {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq > 0 && distanceSq < interactionRadiusSq) {
            const distance = Math.sqrt(distanceSq);
            const pressure = (1 - distance / interactionRadius) ** 2;
            const force = pointer.pressed ? 13 : 7;
            particle.vx += (dx / distance) * pressure * force;
            particle.vy += (dy / distance) * pressure * force;
          }
        }

        particle.vx += (particle.targetX - particle.x) * 0.03 + globalWind + particle.drift;
        particle.vy += (particle.targetY - particle.y) * 0.03;
        particle.vx *= 0.78;
        particle.vy *= 0.78;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.fillStyle = particle.fill;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
      }

      frameId = isVisible ? requestAnimationFrame(draw) : null;
    };

    const start = () => {
      if (frameId === null) {
        frameId = requestAnimationFrame(draw);
      }
    };

    const stop = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    };

    const updatePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.x <= rect.width && pointer.y >= 0 && pointer.y <= rect.height;
    };

    const handlePointerMove = (event) => {
      updatePointer(event);
    };

    const handlePointerDown = (event) => {
      updatePointer(event);
      pointer.pressed = true;
    };

    const handlePointerUp = () => {
      pointer.pressed = false;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.pressed = false;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          start();
        } else {
          stop();
        }
      },
      { threshold: 0.08 },
    );

    resizeCanvas();
    observer.observe(canvas);
    window.addEventListener('resize', resizeCanvas);
    canvas.parentElement?.addEventListener('pointermove', handlePointerMove);
    canvas.parentElement?.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.parentElement?.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      canvas.parentElement?.removeEventListener('pointermove', handlePointerMove);
      canvas.parentElement?.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.parentElement?.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  const handleCopy = (area) => {
    try {
      navigator.clipboard.writeText(command);
      setCopiedArea(area);
      clarity.event('copy_command');
      setTimeout(() => {
        setCopiedArea((current) => (current === area ? null : current));
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="app" style={{ 
      backgroundColor: '#050505', 
      color: '#f7f5f0', 
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Navigation */}
      <nav style={{ 
        padding: '16px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        zIndex: 50,
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(5, 5, 5, 0.72)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={logoUrl} alt="Relay Logo" style={{ width: '56px', height: 'auto', display: 'block' }} />
          <span style={{ fontSize: '24px', fontWeight: 500, letterSpacing: '-0.5px' }}>Relay</span>
        </div>
        
        <button 
          onMouseEnter={() => setHoverContact(true)}
          onMouseLeave={() => setHoverContact(false)}
          style={{ 
            background: hoverContact ? '#171717' : 'transparent', 
            color: '#f7f5f0', 
            border: '1px solid #242424',
            padding: '10px 20px',
            borderRadius: '99px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            minWidth: '140px'
          }}
        >
          {hoverContact ? email : 'Contact me'}
        </button>
      </nav>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* Hero Section */}
        <section className="container" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          gap: '60px',
          padding: '0 40px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          {/* Description Side (Left) */}
          <div style={{ flex: '1 1 560px', minWidth: '520px' }}>
            <h1 className="render-text" style={{ 
              fontSize: '60px', 
              fontWeight: 400, 
              lineHeight: 1.1, 
              marginBottom: '16px',
              letterSpacing: '-2px'
            }}>
              Clone any{' '}
              <span style={{ whiteSpace: 'nowrap' }}>
                websites{' '}
                <span style={{ fontStyle: 'italic', color: '#dad2c1', fontFamily: 'serif' }}>in seconds.</span>
              </span>
            </h1>
            <p className="render-text" style={{ fontSize: '18px', color: '#c9c0ad', marginBottom: '32px', maxWidth: '520px', lineHeight: '1.6' }}>
              Install Relay right from your terminal using the CLI command below. Then pick your favorite website template and point your AI agent to the Relay.md file for setup and customization.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={() => handleCopy('hero')}
                style={{
                  backgroundColor: copiedArea === 'hero' ? '#a3e635' : '#f7f5f0',
                  color: '#050505',
                  padding: '12px 28px',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {copiedArea === 'hero' ? 'Copied!' : 'Copy Command'}
              </button>
            </div>
          </div>

          {/* CLI Side (Right) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <div className="cli-box" style={{ 
              backgroundColor: '#101010',
              border: '1px solid #242424',
              borderRadius: '16px',
              position: 'relative',
              padding: '24px',
              paddingTop: '48px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 'auto',
              justifyContent: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              width: '100%',
              maxWidth: '450px' // Added max width to make it less stretched
            }}>
              {/* Window Controls */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #303030' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #303030' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #303030' }}></div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '15px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#aea69c' }}>$</span>
                  <span style={{ letterSpacing: '0.5px' }}>{command}</span>
                </div>
                
                <button 
                  onClick={() => handleCopy('hero')}
                  style={{ 
                    background: copiedArea === 'hero' ? 'rgba(163, 230, 53, 0.1)' : 'transparent',
                    border: '1px solid #303030',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: copiedArea === 'hero' ? '#a3e635' : '#c9c0ad',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {copiedArea === 'hero' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Carousel */}
        <section style={{ 
          padding: '24px 0', 
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'transparent'
        }}>
          {/* Fades for smooth edges */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '200px', height: '100%',
            background: 'linear-gradient(to right, #050505, transparent)',
            zIndex: 2
          }}></div>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '200px', height: '100%',
            background: 'linear-gradient(to left, #050505, transparent)',
            zIndex: 2
          }}></div>

          <div className="marquee" style={{
            display: 'flex',
            width: 'fit-content',
            animation: 'marquee 120s linear infinite'
          }}>
            {[...COMPANIES, ...COMPANIES].map((company, idx) => {
              const filename = company.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.png';
              
              return (
                <div key={idx} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  margin: '0 18px',
                  minWidth: 'max-content',
                  padding: '9px 14px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.035)',
                  opacity: 0.8,
                  transition: 'all 0.3s ease'
                }} onMouseEnter={e => {
                  e.currentTarget.style.opacity = 1;
                  e.currentTarget.style.transform = 'scale(1.05)';
                }} onMouseLeave={e => {
                  e.currentTarget.style.opacity = 0.8;
                  e.currentTarget.style.transform = 'scale(1)';
                }}>
                  <img 
                    src={`/logos/${filename}`} 
                    alt={company.name} 
                    style={{ 
                      height: '26px', 
                      width: '26px', 
                      objectFit: 'contain',
                      borderRadius: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      padding: '2px'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span style={{ 
                    display: 'block', 
                    fontSize: '15px', 
                    fontWeight: 500, 
                    color: '#ffffff',
                    letterSpacing: '0'
                  }}>{company.name}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Feedback Carousel */}
        <section className="feedback-section" aria-labelledby="feedback-heading">
          <div className="feedback-header">
            <span>Community feedback</span>
            <h2 id="feedback-heading">What builders are saying about Relay</h2>
          </div>

          <div className="feedback-carousel-stack" aria-label="Relay user feedback">
            {TESTIMONIAL_ROWS.map((row, rowIndex) => (
              <div className="feedback-carousel" key={`feedback-row-${rowIndex}`}>
                <div className={`feedback-track ${rowIndex === 1 ? 'feedback-track-reverse' : ''}`}>
                  {[0, 1].map((loopIndex) => (
                    <div className="feedback-loop" key={`feedback-loop-${rowIndex}-${loopIndex}`} aria-hidden={loopIndex === 1}>
                      {row.map((testimonial) => (
                        <article className="feedback-card" key={`${testimonial.name}-${loopIndex}`}>
                          <div className="feedback-card-heading">
                            <h3>{testimonial.name}</h3>
                            {testimonial.linkedin && (
                              <a href={testimonial.linkedin} target="_blank" rel="noopener noreferrer">
                                LinkedIn
                              </a>
                            )}
                          </div>
                          <p className="feedback-quote">{testimonial.feedback}</p>
                          {testimonial.note && <p className="feedback-note">{testimonial.note}</p>}
                        </article>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            </div>
        </section>

        <section
          ref={howItWorksRef}
          className="how-shell"
          aria-labelledby="how-heading"
        >
          <div className="how-panel">
            <div className="how-content">
              <div className="how-layout">
                <div className="how-copy">
                  <div className="how-intro">
                    <h2 id="how-heading">Install Relay. It's free.</h2>
                    <p>Install Relay, choose the website you want to clone, then let your AI agent use the generated Relay.md file to build a tailored version aligned with your brand and design preferences.</p>
                  </div>

                  <div className="how-command">
                    <span>$</span>
                    <code>{command}</code>
                    <button type="button" onClick={() => handleCopy('how')}>
                      {copiedArea === 'how' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="how-placeholder">
                  <img className="how-terminal-image" src={terminalImageUrl} alt="Relay terminal website selection" />
                </div>
              </div>
            </div>

            <div className="clone-content" aria-labelledby="clone-heading">
              <div className="clone-header">
                <span>Available templates</span>
                <h2 id="clone-heading">Websites You Can Clone Right now!</h2>
              </div>

              <div className="clone-grid-viewport">
                <div className="clone-grid">
                  {COMPANIES.map((company) => {
                    const filename = company.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.png';

                    return (
                      <div className="clone-card" key={company.name}>
                        <img
                          src={`/logos/${filename}`}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <span>{company.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={comingSoonRef} className="coming-soon-section" aria-labelledby="coming-soon-heading">
          <h2 className="coming-soon-text" id="coming-soon-heading">More Websites Coming Soon</h2>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-topline">
            <p>Let's Connect and contribute together</p>
            <div className="footer-links">
              <a href="https://www.instagram.com/pranshu23x/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.linkedin.com/in/pranshukumar23/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="footer-made">Made By Pranshu</div>
          <div className="footer-brand footer-sand-word" role="img" aria-label="Relay written in sand particles">
            <canvas ref={sandCanvasRef} className="sand-canvas" />
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default App;
