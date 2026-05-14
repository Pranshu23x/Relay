import React, { useState, useEffect } from 'react';
import './App.css';
import logoUrl from './assets/logo.png';
import gsap from 'gsap';
import SplitType from 'split-type';
import clarity from './lib/clarity';

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

function App() {
  const [copied, setCopied] = useState(false);
  const [hoverContact, setHoverContact] = useState(false);
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

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(command);
      setCopied(true);
      clarity.event('copy_command');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="app" style={{ 
      backgroundColor: '#2b2622', 
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
        backgroundColor: 'rgba(43, 38, 34, 0.7)',
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
            background: hoverContact ? '#383330' : 'transparent', 
            color: '#f7f5f0', 
            border: '1px solid #3f3a36',
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
          <div style={{ flex: 1 }}>
            <h1 className="render-text" style={{ 
              fontSize: '64px', 
              fontWeight: 400, 
              lineHeight: 1.1, 
              marginBottom: '16px',
              letterSpacing: '-2px'
            }}>
              Clone any websites{' '}
              <span style={{ fontStyle: 'italic', color: '#dad2c1', fontFamily: 'serif' }}>in seconds.</span>
            </h1>
            <p className="render-text" style={{ fontSize: '18px', color: '#c9c0ad', marginBottom: '32px', maxWidth: '520px', lineHeight: '1.6' }}>
              Install Relay right from your terminal using the CLI command below. Then pick your favorite website template and point your AI agent to the Relay.md file for setup and customization. ⚡
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                onClick={handleCopy}
                style={{
                  backgroundColor: copied ? '#a3e635' : '#f7f5f0',
                  color: '#2b2622',
                  padding: '12px 28px',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {copied ? 'Copied!' : 'Copy Command'}
              </button>
            </div>
          </div>

          {/* CLI Side (Right) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <div className="cli-box" style={{ 
              backgroundColor: '#383330',
              border: '1px solid #3f3a36',
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
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #3f3a36' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #3f3a36' }}></div>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #3f3a36' }}></div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ fontFamily: 'monospace', fontSize: '15px', display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#aea69c' }}>$</span>
                  <span style={{ letterSpacing: '0.5px' }}>{command}</span>
                </div>
                
                <button 
                  onClick={handleCopy}
                  style={{ 
                    background: copied ? 'rgba(163, 230, 53, 0.1)' : 'transparent',
                    border: '1px solid #3f3a36',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: copied ? '#a3e635' : '#c9c0ad',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {copied ? 'Copied' : 'Copy'}
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
          backgroundColor: '#2b2622'
        }}>
          {/* Fades for smooth edges */}
          <div style={{
            position: 'absolute', top: 0, left: 0, width: '200px', height: '100%',
            background: 'linear-gradient(to right, #2b2622, transparent)',
            zIndex: 2
          }}></div>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '200px', height: '100%',
            background: 'linear-gradient(to left, #2b2622, transparent)',
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
                  gap: '12px',
                  margin: '0 40px',
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
                      height: '32px', 
                      width: 'auto', 
                      borderRadius: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      padding: '2px'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <span style={{ 
                    display: 'none', 
                    fontSize: '18px', 
                    fontWeight: 600, 
                    color: '#ffffff',
                    letterSpacing: '-0.5px'
                  }}>{company.name}</span>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer style={{ 
        padding: '24px 40px', 
        borderTop: '1px solid #3f3a36', 
        marginTop: 'auto'
      }}>
        <div className="container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          color: '#aea69c', 
          fontSize: '13px' 
        }}>
          <div>&copy; Made By Pranshu</div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="https://www.instagram.com/pranshu23x/" target="_blank" rel="noopener noreferrer" style={{ color: '#aea69c', textDecoration: 'none' }}>Instagram</a>
            <a href="https://www.linkedin.com/in/pranshukumar23/" target="_blank" rel="noopener noreferrer" style={{ color: '#aea69c', textDecoration: 'none' }}>LinkedIn</a>
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
