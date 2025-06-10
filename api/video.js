import { exec } from 'child_process';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: 'Missing URL' });

  exec(`yt-dlp -f 18 -g "${url}"`, (err, stdout) => {
    if (err) {
      return res.status(500).json({ error: 'yt-dlp failed' });
    }
    return res.status(200).json({ direct: stdout.trim() });
  });
}
