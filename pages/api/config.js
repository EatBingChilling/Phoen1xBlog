import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cfg = (await kv.get('site_config')) || { title: '默认站点标题', desc: '默认描述' };
    return res.status(200).json(cfg);
  }

  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    await kv.set('site_config', JSON.stringify(body));
    return res.status(200).json({ ok: true });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end('Method Not Allowed');
}
