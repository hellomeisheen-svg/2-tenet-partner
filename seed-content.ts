import pg from 'pg';
import { getPool } from './src/lib/db.server';

async function seed() {
  const pool = getPool();
  
  console.log('Starting content seeding...');

  try {
    // 1. Site Settings (SEO)
    await pool.query(`
      INSERT INTO site_settings (id, seo_title, seo_description, seo_og_title, seo_og_description, updated_at)
      VALUES (
        'default',
        'TENET для своих — Закрытый клуб партнёрской программы | Восток Моторс',
        'Закрытый клуб «TENET для своих» — персональный бонус 200 000 ₽ и сертификат 5% на сервис для клиентов, пришедших по партнёрской ссылке. Официальный дилер TENET Восток Моторс в Тюмени.',
        'TENET для своих — Закрытый клуб партнёрской программы | Восток Моторс',
        'Закрытый клуб «TENET для своих» — персональный бонус 200 000 ₽ и сертификат 5% на сервис для клиентов, пришедших по партнёрской ссылке. Официальный дилер TENET Восток Моторс в Тюмени.',
        NOW()
      )
      ON CONFLICT (id) DO UPDATE SET
        seo_title = EXCLUDED.seo_title,
        seo_description = EXCLUDED.seo_description,
        seo_og_title = EXCLUDED.seo_og_title,
        seo_og_description = EXCLUDED.seo_og_description,
        updated_at = NOW();
    `);

    // 2. Content Blocks (Hero, Sections)
    const blocks = [
      {
        key: 'hero',
        title: 'Закрытый клуб «TENET для своих»',
        subtitle: 'Партнёрская программа',
        body: 'Для клиентов, пришедших по партнёрской ссылке, действует персональный дополнительный бонус 200 000 ₽ к действующим предложениям от импортёра. Выберите подходящий вариант и получите индивидуальные условия при обращении в дилерский центр.',
        btn: 'Получить персональное предложение'
      },
      {
        key: 'benefits_header',
        title: 'Ваши привилегии в клубе',
        subtitle: 'Привилегии',
        body: 'Акция действует до 31.12.2026',
        btn: ''
      },
      {
        key: 'bonus_choice',
        title: 'Выберите свой персональный бонус',
        subtitle: 'Выбор бонуса',
        body: 'По условиям закрытого клуба «TENET для своих» вы получаете право выбора персонального бонуса при покупке автомобиля.',
        btn: 'Выбрать бонус и оставить заявку'
      },
      {
        key: 'certificate',
        title: 'Сертификат на сервис 5%',
        subtitle: 'Сервис',
        body: 'Каждому участнику программы доступен сертификат 5% на все услуги сервисного центра. Предложение суммируется с другими акциями дилера и помогает сделать обслуживание автомобиля ещё выгоднее.',
        btn: 'Получить сертификат'
      },
      {
        key: 'clients_header',
        title: 'Каждый автомобиль — это не просто покупка. Это начало новой истории.',
        subtitle: 'Клиенты',
        body: '',
        btn: 'Смотреть все моменты'
      },
      {
        key: 'trust_header',
        title: 'Нам доверяют лучшие',
        subtitle: 'Доверие',
        body: 'Официальный партнёр крупнейших мировых брендов в регионе.',
        btn: ''
      },
      {
        key: 'contacts',
        title: 'Контакты дилерского центра',
        subtitle: 'Контакты',
        body: 'г. Тюмень, ул. Алебашевская, д. 11, этаж 1, помещение 38',
        btn: ''
      }
    ];

    for (const b of blocks) {
      await pool.query(`
        INSERT INTO content_blocks (block_key, title, subtitle, body, button_text, is_published, updated_at)
        VALUES ($1, $2, $3, $4, $5, true, NOW())
        ON CONFLICT (block_key) DO UPDATE SET
          title = EXCLUDED.title,
          subtitle = EXCLUDED.subtitle,
          body = EXCLUDED.body,
          button_text = EXCLUDED.button_text,
          is_published = true,
          updated_at = NOW();
      `, [b.key, b.title, b.subtitle, b.body, b.btn]);
    }

    // 3. Content Items (Benefits, Clients, Trust)
    const items = [
      // Benefits
      { section: 'benefit', title: 'Денежная выгода 200 000 ₽', content: 'Прямая дополнительная скидка от дилера при покупке автомобиля TENET по программе «TENET для своих».', icon: 'Tag', order: 10 },
      { section: 'benefit', title: 'Доп. оборудование на 200 000 ₽', content: 'Комплект полезного дополнительного оборудования и услуг на сумму 200 000 ₽ для вашего автомобиля.', icon: 'Gift', order: 20 },
      { section: 'benefit', title: 'Сертификат 5% на сервис', content: 'Сертификат действует на все услуги сервисного центра и суммируется с другими предложениями дилера.', icon: 'Wrench', order: 30 },
      
      // Clients
      { section: 'client', title: 'Алексей и Мария', subtitle: 'Тюмень / TENET T7 Prestige', content: 'Забрали ключи и сразу поехали в путешествие — машина оправдала все ожидания.', icon: 'happy-1.jpg', order: 10 },
      { section: 'client', title: 'Семья Соколовых', subtitle: 'Екатеринбург / TENET T8 Family', content: 'Дети в восторге от простора, а мы — от плавного хода и тишины в салоне.', icon: 'happy-2.jpg', order: 20 },
      { section: 'client', title: 'Дмитрий', subtitle: 'Новосибирск / TENET T7 Business', content: 'Сделка прошла быстро и прозрачно — приятно, когда всё по-человечески.', icon: 'happy-3.jpg', order: 30 },
      
      // Trust
      { section: 'trust', title: 'GWM', subtitle: '', content: '', icon: '', order: 10 },
      { section: 'trust', title: 'HAVAL', subtitle: '', content: '', icon: '', order: 20 },
      { section: 'trust', title: 'TANK', subtitle: '', content: '', icon: '', order: 30 },
      { section: 'trust', title: 'ORA', subtitle: '', content: '', icon: '', order: 40 },
      { section: 'trust', title: 'POER', subtitle: '', content: '', icon: '', order: 50 }
    ];

    for (const item of items) {
      // Use unique constraint on (section, title) if it exists, or just insert
      await pool.query(`
        INSERT INTO content_items (section, title, subtitle, content, image_url, sort_order, is_published, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, true, NOW())
        ON CONFLICT DO NOTHING;
      `, [item.section, item.title, item.subtitle, item.content, item.icon, item.order]);
    }

    console.log('Seeding completed successfully.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await pool.end();
  }
}

seed();
