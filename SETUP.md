# Proje Kurulum Rehberi

Bu rehber, takım üyelerinin projeyi yerel ortamlarında çalıştırabilmesi için gerekli adımları açıklamaktadır.

---

## 1. MongoDB Atlas — Bağlantı Bilgilerini Edinme

Proje için ortak bir Atlas cluster'ı hazırlandı. Takım liderinden aldığın şifreyi aşağıdaki connection string'e ekle:

```
mongodb+srv://slimmoms:<şifre>@cluster0.phkjtvk.mongodb.net/slimmoms
```

`<şifre>` kısmını takım liderinden aldığın şifreyle değiştir.

> **IP Erişimi:** Atlas'a ilk bağlanmadan önce kendi IP adresini izin verilenler listesine eklemen gerekebilir. [cloud.mongodb.com](https://cloud.mongodb.com) → **Database & Network Access** → **Network Access** → **Add IP Address** → **Add Current IP Address**.

---

## 2. Products Verisi

Products verisi takım lideri tarafından cluster'a yüklenmiştir. Herhangi bir import yapmanıza gerek yoktur — bağlantıyı kurduğunuzda `slimmoms` database'i altındaki `products` koleksiyonuna erişebilirsiniz.

Veriyi Compass üzerinden doğrulamak istersen:

1. [MongoDB Compass](https://www.mongodb.com/try/download/compass)'ı aç
2. **+ New Connection** → connection string'i yapıştır → **Connect**
3. Sol panelden `slimmoms` → `products` koleksiyonunu kontrol et

---

## 3. Yerel `.env` Dosyalarını Oluşturma

Her takım üyesi kendi bilgisayarında ayrı `.env` dosyaları oluşturmalıdır. Bu dosyalar Git'e dahil edilmez (`.gitignore` tarafından hariç tutulur), bu yüzden her kişi kendi ortamı için ayrı dosya oluşturur.

### 3.1 Server `.env` Dosyası

`server/` klasörü içinde `.env` adında bir dosya oluşturun:

```bash
# server/.env
PORT=5000
MONGO_URI=mongodb+srv://slimmoms:<şifre>@cluster0.phkjtvk.mongodb.net/slimmoms
JWT_SECRET=guclu_bir_secret_buraya_yazin
JWT_EXPIRES_IN=7d
```

| Değişken         | Açıklama                                                 |
| ---------------- | -------------------------------------------------------- |
| `PORT`           | Sunucunun çalışacağı port (varsayılan: `5000`)           |
| `MONGO_URI`      | Atlas bağlantı URI'si (1. adımda edindiğiniz)            |
| `JWT_SECRET`     | Token imzalama için rastgele, tahmin edilemez bir string |
| `JWT_EXPIRES_IN` | Token geçerlilik süresi (örn. `7d`, `24h`)               |

> Referans için [server/.env.example](server/.env.example) dosyasına bakabilirsiniz.

### 3.2 Client `.env` Dosyası

`client/` klasörü içinde `.env` adında bir dosya oluşturun:

```bash
# client/.env
VITE_API_URL=http://localhost:5000/api
```

| Değişken       | Açıklama                                 |
| -------------- | ---------------------------------------- |
| `VITE_API_URL` | Frontend'in istek atacağı backend adresi |

> Referans için [client/.env.example](client/.env.example) dosyasına bakabilirsiniz.

---

## 4. Projeyi Başlatma

Bağımlılıkları yükleyip projeyi ayağa kaldırmak için sırasıyla şu komutları çalıştırın:

```bash
# Server
cd server
npm install
npm run dev

# Client (yeni terminal)
cd client
npm install
npm run dev
```

---

## Sık Karşılaşılan Sorunlar

| Sorun                          | Çözüm                                                         |
| ------------------------------ | ------------------------------------------------------------- |
| `MongooseServerSelectionError` | IP adresinizin Atlas Network Access'e eklendiğinden emin olun |
| `Authentication failed`        | `.env` dosyasındaki kullanıcı adı ve şifreyi kontrol edin     |
| `Cannot find module`           | `npm install` komutunu çalıştırdığınızdan emin olun           |
| Client API'ye ulaşamıyor       | `VITE_API_URL`'nin doğru porta işaret ettiğini kontrol edin   |
