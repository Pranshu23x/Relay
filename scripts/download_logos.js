import fs from 'fs';
import path from 'path';
import https from 'https';

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

const dir = './public/logos';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Handle redirects
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      
      if (res.statusCode !== 200) {
        reject(new Error(`Status Code: ${res.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(dest, { flags: 'wx' });
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadLogos() {
  for (const company of COMPANIES) {
    const filename = company.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.png';
    const dest = path.join(dir, filename);
    
    if (fs.existsSync(dest)) continue;

    console.log(`Fetching ${company.name}...`);
    try {
      await download(`https://logo.clearbit.com/${company.domain}`, dest);
      console.log(`Saved ${filename}`);
    } catch (e) {
      console.error(`Error with ${company.name}:`, e.message);
      
      // Fallback to icon.horse
      try {
        console.log(`Trying fallback for ${company.name}...`);
        await download(`https://icon.horse/icon/${company.domain}`, dest);
        console.log(`Saved ${filename} (fallback)`);
      } catch (e2) {
        console.error(`Fallback failed for ${company.name}:`, e2.message);
      }
    }
  }
}

downloadLogos();
