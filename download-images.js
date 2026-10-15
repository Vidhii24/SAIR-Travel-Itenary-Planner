import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, 'client', 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const imagesToDownload = [
  {
    filename: 'hero-udaipur.jpg',
    url: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1400',
    description: 'Golden hour reflection of Udaipur palace across tranquil lake water'
  },
  {
    filename: 'udaipur.jpg',
    url: 'https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Udaipur City Palace overlooking Lake Pichola with Mewar architecture'
  },
  {
    filename: 'jaipur.jpg',
    url: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Jaipur historic Hawa Mahal pink terracotta facade'
  },
  {
    filename: 'kerala.jpg',
    url: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Alleppey backwaters Kerala houseboat lined with emerald coconut palms'
  },
  {
    filename: 'manali.jpg',
    url: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Snow-capped Himalayan peaks and pine valleys in Manali Himachal Pradesh'
  },
  {
    filename: 'goa.jpg',
    url: 'https://images.pexels.com/photos/1078983/pexels-photo-1078983.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Serene golden sand beach in Goa with tropical palms and sunset'
  },
  {
    filename: 'rishikesh.jpg',
    url: 'https://images.pexels.com/photos/2474690/pexels-photo-2474690.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Sacred Ganges river valley and Himalayan foothills in Rishikesh'
  },
  {
    filename: 'varanasi.jpg',
    url: 'https://images.pexels.com/photos/8112574/pexels-photo-8112574.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Ancient river ghats and sunrise boats in Varanasi along the Ganges'
  },
  {
    filename: 'ladakh.jpg',
    url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'High altitude azure lake and dramatic mountain ranges in Ladakh'
  }
];

async function downloadImage(item) {
  const destPath = path.join(targetDir, item.filename);
  return new Promise((resolve, reject) => {
    https.get(item.url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${item.filename}: HTTP ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        const stats = fs.statSync(destPath);
        console.log(`✓ Downloaded ${item.filename} (${Math.round(stats.size / 1024)} KB)`);
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function run() {
  console.log('Downloading high-quality travel photographs to client/public/images/...\n');
  for (const item of imagesToDownload) {
    try {
      await downloadImage(item);
    } catch (err) {
      console.error(`✗ Error downloading ${item.filename}:`, err.message);
    }
  }
  console.log('\nAll images downloaded successfully.');
}

run();
