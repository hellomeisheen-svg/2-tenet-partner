import { query } from './db.server';

export interface SiteContent {
  settings: any;
  blocks: Record<string, any>;
  items: Record<string, any[]>;
}

export async function getPublicContent(): Promise<SiteContent> {
  const content: SiteContent = {
    settings: {},
    blocks: {},
    items: {}
  };

  // If no DATABASE_URL, we return empty structure and components will use fallbacks
  if (!process.env['DATABASE_URL']) {
    return content;
  }

  try {
    // 1. Settings
    const settingsRes = await query('SELECT * FROM site_settings LIMIT 1');
    content.settings = settingsRes.rows[0] || {};

    // 2. Blocks
    const blocksRes = await query('SELECT * FROM content_blocks WHERE is_published = true');
    if (blocksRes && blocksRes.rows) {
      blocksRes.rows.forEach(block => {
        content.blocks[block.block_key] = block;
      });
    }

    // 3. Items
    const itemsRes = await query('SELECT * FROM content_items WHERE is_published = true ORDER BY sort_order ASC, created_at DESC');
    if (itemsRes && itemsRes.rows) {
      itemsRes.rows.forEach(item => {
        if (!content.items[item.section]) {
          content.items[item.section] = [];
        }
        content.items[item.section].push(item);
      });
    }

  } catch (err) {
    console.error('Error fetching public content from DB, using fallbacks', err);
  }

  return content;
}

export async function getAdminStats() {
  const [blocks, items, media] = await Promise.all([
    query('SELECT count(*) FROM content_blocks'),
    query('SELECT count(*) FROM content_items'),
    query('SELECT count(*) FROM media'),
  ]);

  const lastUpdate = await query('SELECT max(updated_at) FROM (SELECT updated_at FROM content_blocks UNION SELECT updated_at FROM content_items UNION SELECT updated_at FROM site_settings) as combined');

  return {
    blocksCount: parseInt(blocks.rows[0].count),
    itemsCount: parseInt(items.rows[0].count),
    mediaCount: parseInt(media.rows[0].count),
    lastUpdate: lastUpdate.rows[0].max
  };
}
