// pages/api/counter.js
import { incrementAndGetCounter } from '../../lib/counter';

export default async function handler(req, res) {
  try {
    // 直接调用共享的逻辑函数
    const newCount = await incrementAndGetCounter();
    res.status(200).json({ count: newCount });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}