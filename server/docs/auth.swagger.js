/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Kullanıcı kayıt ve yetkilendirme işlemleri
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Yeni kullanıcı kaydı oluşturur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Duhan
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla oluşturuldu
 *       409:
 *         description: Email zaten kullanımda
 *       500:
 *         description: Sunucu hatası
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Kullanıcı girişi yapar ve token döner
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Giriş başarılı
 *       401:
 *         description: Hatalı email veya şifre
 */

/**
 * @swagger
 * /api/auth/current:
 *   get:
 *     summary: Mevcut giriş yapmış kullanıcı bilgilerini getirir
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı bilgileri başarıyla getirildi
 *       401:
 *         description: Yetkisiz erişim (Geçersiz veya eksik token)
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Kullanıcı oturumunu sonlandırır
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       204:
 *         description: Oturum başarıyla kapatıldı
 *       401:
 *         description: Yetkisiz erişim
 */
