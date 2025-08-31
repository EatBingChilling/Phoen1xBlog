// lib/counter.js
import { kv } from '@vercel/kv';

/**
 * 增加并返回网站计数器的值
 * @returns {Promise<number>} 最新计数值
 */
export async function incrementAndGetCounter() {
  const newCount = await kv.incr('site_counter');
  return newCount;
}