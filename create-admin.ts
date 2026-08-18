#!/usr/bin/env node
import { createInterface } from 'readline';
import { hashPassword } from './src/lib/auth.server';
import { query } from './src/lib/db.server';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

async function run() {
  console.log('--- Создание администратора ---');
  
  const email = await new Promise<string>((resolve) => rl.question('Email: ', resolve));
  const password = await new Promise<string>((resolve) => rl.question('Пароль: ', resolve));

  if (!email || !password) {
    console.error('Email и пароль обязательны.');
    process.exit(1);
  }

  try {
    const hash = await hashPassword(password);
    await query('INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)', [email, hash]);
    console.log('Администратор успешно создан!');
  } catch (err) {
    console.error('Ошибка при создании администратора:', err);
  } finally {
    rl.close();
    process.exit();
  }
}

run();
