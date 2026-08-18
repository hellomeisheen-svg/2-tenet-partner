# Инструкция по развертыванию TENET CMS на Ubuntu/Timeweb

## 1. Подготовка сервера

### Создание папки для загрузок
```bash
sudo mkdir -p /var/www/tenet/uploads
sudo chown -R $USER:$USER /var/www/tenet/uploads
sudo chmod -R 755 /var/www/tenet/uploads
```

### Настройка PostgreSQL
1. Создайте базу данных `tenet_db`.
2. Выполните SQL из файла `migration.sql`.

## 2. Настройка проекта

### Переменные окружения
Создайте файл `.env` в корне проекта на основе `.env.example`.

### Установка зависимостей и сборка
```bash
npm install
npm run build
```

### Создание первого администратора
```bash
bun run create-admin.ts
```
*(Или `npx ts-node create-admin.ts` если bun не установлен)*

## 3. Запуск и обслуживание

### Настройка Systemd
Создайте файл `/etc/systemd/system/tenet.service`:

```ini
[Unit]
Description=TENET Landing & CMS
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/tenet
ExecStart=/usr/bin/npm run start
Restart=always
Environment=NODE_ENV=production
EnvironmentFile=/var/www/tenet/.env

[Install]
WantedBy=multi-user.target
```

### Команды управления
```bash
sudo systemctl daemon-reload
sudo systemctl enable tenet
sudo systemctl start tenet
sudo systemctl status tenet
```

## 4. Проверка
1. Перейдите по адресу `ваш-домен.ru/admin/login`.
2. Авторизуйтесь под созданным email/паролем.
3. Попробуйте изменить заголовок в разделе "Страницы и блоки".
4. Загрузите тестовое изображение в "Медиафайлы".
