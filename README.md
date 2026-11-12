# TaskFlow Dashboard

TaskFlow Dashboard — namunaviy topshiriqlarni to‘rt bosqichli doskada ko‘rish, boshqarish va o‘zgarishlarni joriy brauzerda saqlash uchun mo‘ljallangan, serverga ulanmaydigan demo ilova.

## Havolalar

- **Jonli demo:** [taskflow-dashboard-demo-668s.netlify.app](https://taskflow-dashboard-demo-668s.netlify.app)
- **GitHub repository:** [Abdulvoh1d/taskflow-dashboard-demo](https://github.com/Abdulvoh1d/taskflow-dashboard-demo)

## Loyiha nimani ko‘rsatadi

Loyiha vazifalarni bosqichlar bo‘yicha joylashtiradigan Kanban uslubidagi boshqaruv paneli, moslashuvchan interfeys hamda brauzerning o‘zida ishlaydigan oddiy interaksiyalarni namoyish etadi. Boshlang‘ich doskada to‘qqizta namunaviy topshiriq bor.

## Tasdiqlangan funksiyalar

- Topshiriqlarni **To do**, **In progress**, **In review** va **Done** ustunlarida ko‘rsatish; ustunlardagi sonlar barcha vazifalar bo‘yicha hisoblanadi.
- Yangi topshiriq yaratish: sarlavha kiritish, ixtiyoriy tavsif berish, ustuvorlikni (yuqori, o‘rta yoki past), mas’ulni va boshlang‘ich statusni tanlash. Ustun ichidagi qo‘shish tugmasi shu statusni oldindan tanlaydi.
- Sarlavha, tavsif, mas’ul yoki teglar bo‘yicha qidirish; status va ustuvorlik bo‘yicha alohida filtrlash; filtrlarni birgalikda tozalash.
- Kartani sudrab boshqa ustunga tashlash yoki karta fokusda turganda **← / →** tugmalari bilan oldingi/keyingi statusga ko‘chirish. Doska chegarasida status o‘zgarmaydi.
- **`/`** tugmasi bilan qidiruv maydoniga o‘tish (matn kiritiladigan element fokusda bo‘lsa, bu yorliq ishlamaydi).
- Topshiriq qo‘shish va status ko‘chirish o‘zgarishlarini `localStorage` orqali joriy brauzerda saqlash. Brauzer saqlashga ruxsat bermasa, ilova joriy seans davomida ishlaydi, ammo o‘zgarishlar saqlanmasligi mumkin.
- Ekran o‘quvchi uchun jonli e’lonlar va klaviatura fokus ko‘rsatkichlari.

## Texnologiyalar

- **HTML5** — sahifa tuzilishi, forma va dialog.
- **CSS3** — interfeys ko‘rinishi va ekran kengligiga moslashuvchan joylashuv.
- **Vanilla JavaScript** — doska, topshiriqlar, qidiruv va filtrlash logikasi.
- **Brauzer imkoniyatlari:** DOM, `localStorage`, HTML dialog, HTML Drag and Drop, klaviatura hodisalari, `FormData`, `requestAnimationFrame` va `CSS.escape`.

Framework, server tomoni, ma’lumotlar bazasi, tashqi API, to‘lov yoki WebSocket ishlatilmaydi.

## Talablar va mahalliy ishga tushirish

Zamonaviy, HTML dialog, `localStorage` va Drag and Drop’ni qo‘llaydigan brauzer hamda Python 3 kerak. Bog‘liqliklarni o‘rnatish yoki build qilish shart emas; `npm install` talab qilinmaydi.

```bash
git clone https://github.com/Abdulvoh1d/taskflow-dashboard-demo.git
cd taskflow-dashboard-demo
python3 -m http.server 8765
```

So‘ng brauzerda [http://localhost:8765](http://localhost:8765) manzilini oching. Server ishlayotgan terminal oynasini ilovadan foydalanish davomida ochiq qoldiring.

## Fayl tuzilishi

```text
taskflow-dashboard-demo/
├── index.html   # Sahifa tuzilishi va interfeys elementlari
├── styles.css   # Ko‘rinish, moslashuvchan dizayn va fokus holatlari
├── app.js       # Namunaviy ma’lumotlar va mijoz tomondagi funksiyalar
└── README.md    # Loyiha tavsifi va ishga tushirish yo‘riqnomasi
```

## Ma’lumotlar, maxfiylik va demo chegaralari

Boshlang‘ich topshiriqlar hamda Studio North jamoasi haqidagi ko‘rinadigan ma’lumotlar namuna uchun kiritilgan; ular haqiqiy ish maydoni yoki jamoani bildirmaydi. Yaratgan topshiriqlaringiz va status o‘zgarishlari faqat shu brauzer profilidagi, shu manzil uchun ajratilgan `localStorage`’da saqlanadi. Ular boshqa qurilma yoki foydalanuvchilar bilan sinxronlanmaydi. Brauzer ma’lumotlarini tozalaganda saqlangan demo topshiriqlari ham o‘chishi mumkin. Saqlash imkoni bo‘lmasa, o‘zgarishlar faqat joriy seansga tegishli bo‘ladi.

Bu — mahalliy demo, hamkorlik xizmati emas: **Invite** tugmasi haqiqiy taklif yubormaydi, jamoa va profil ma’lumotlari namuna ko‘rinishidir. Menyu tugmalari ham haqiqiy sozlamalarni ochmaydi, **List** ko‘rinishi esa o‘chirilgan. Ilovada topshiriqlarni tahrirlash yoki o‘chirish amali yo‘q. Serverga asoslangan sinxronlash, akkaunt yoki tashqi servis ulanishi taqdim etilmaydi.

## Litsenziya

Repository’da `LICENSE` fayli yo‘q. Ochiq (public) repository bo‘lishi koddan foydalanish yoki uni tarqatishga avtomatik ravishda ochiq litsenziya bermaydi.
