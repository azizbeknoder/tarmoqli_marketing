import { PrismaService } from "src/prisma/prisma.service";

export async function createAboutWithTranslations() {
    const prisma = new PrismaService()
    const oldAbout = await prisma.about.findFirst()
    if(oldAbout){
        return 0
    }
    const translations = [
      {
        language: 'uz',
        heroTitle: 'Biz haqimizda',
        heroDescription: 'Bizning tizim qanday ishlaydi',
        howWorkSystem: 'Tizim haqida',
        withPlansTitle: 'Rejalar bilan ishlash',
        withPlansDescription: 'Siz rejalarni tanlashingiz mumkin',
        referalTitle: 'Referal tizimi',
        referalDescription: 'Do‘stlaringizni taklif qiling',
        levelTitle: 'Darajalar',
        levelDescription: 'Har bir daraja o‘z imkoniyatlariga ega',
        USDTTitle: 'USDT haqida',
        USDTDescription: 'To‘lovlar USDT orqali amalga oshiriladi',
      },
      {
        language: 'ru',
        heroTitle: 'О нас',
        heroDescription: 'Как работает наша система',
        howWorkSystem: 'О системе',
        withPlansTitle: 'Работа с планами',
        withPlansDescription: 'Вы можете выбрать план',
        referalTitle: 'Реферальная система',
        referalDescription: 'Приглашайте друзей',
        levelTitle: 'Уровни',
        levelDescription: 'Каждый уровень имеет свои преимущества',
        USDTTitle: 'О USDT',
        USDTDescription: 'Платежи через USDT',
      },
      {
        language: 'en',
        heroTitle: 'About us',
        heroDescription: 'How our system works',
        howWorkSystem: 'About the system',
        withPlansTitle: 'Working with plans',
        withPlansDescription: 'You can choose plans',
        referalTitle: 'Referral system',
        referalDescription: 'Invite your friends',
        levelTitle: 'Levels',
        levelDescription: 'Each level has its own features',
        USDTTitle: 'About USDT',
        USDTDescription: 'Payments are made via USDT',
      },
      {
        language: 'kk',
        heroTitle: 'Біз туралы',
        heroDescription: 'Біздің жүйе қалай жұмыс істейді',
        howWorkSystem: 'Жүйе туралы',
        withPlansTitle: 'Жоспарлармен жұмыс',
        withPlansDescription: 'Сіз жоспарларды таңдай аласыз',
        referalTitle: 'Рефералдық жүйе',
        referalDescription: 'Достарыңызды шақырыңыз',
        levelTitle: 'Деңгейлер',
        levelDescription: 'Әрбір деңгейдің өз артықшылықтары бар',
        USDTTitle: 'USDT туралы',
        USDTDescription: 'Төлемдер USDT арқылы жүзеге асырылады',
      },
      {
        language: 'ky',
        heroTitle: 'Биз жөнүндө',
        heroDescription: 'Биздин система кантип иштейт',
        howWorkSystem: 'Система жөнүндө',
        withPlansTitle: 'Пландар менен иштөө',
        withPlansDescription: 'Сиз пландарды тандай аласыз',
        referalTitle: 'Рефералдык система',
        referalDescription: 'Досторуңузду чакырыңыз',
        levelTitle: 'Деңгээлдер',
        levelDescription: 'Ар бир деңгээл өзгөчөлүктөргө ээ',
        USDTTitle: 'USDT жөнүндө',
        USDTDescription: 'Төлөмдөр USDT аркылуу жүргүзүлөт',
      },
      {
        language: 'zh',
        heroTitle: '关于我们',
        heroDescription: '我们的系统如何运作',
        howWorkSystem: '系统介绍',
        withPlansTitle: '计划使用',
        withPlansDescription: '您可以选择计划',
        referalTitle: '推荐系统',
        referalDescription: '邀请您的朋友',
        levelTitle: '等级制度',
        levelDescription: '每个等级都有不同的特权',
        USDTTitle: '关于USDT',
        USDTDescription: '支付通过USDT进行',
      },
      
      {
        language: 'tg',
        heroTitle: 'Дар бораи мо',
        heroDescription: 'Чӣ гуна низоми мо кор мекунад',
        howWorkSystem: 'Дар бораи низом',
        withPlansTitle: 'Кор бо нақшаҳо',
        withPlansDescription: 'Шумо метавонед нақшаҳоро интихоб кунед',
        referalTitle: 'Низоми даъватӣ',
        referalDescription: 'Дӯстони худро даъват кунед',
        levelTitle: 'Зинаҳо',
        levelDescription: 'Ҳар як зина афзалиятҳои худро дорад',
        USDTTitle: 'Дар бораи USDT',
        USDTDescription: 'Пардохт тавассути USDT анҷом дода мешавад',
      }
      
    ];
  
    const about = await prisma.about.create({
      data: {
        aboutTranslation: {
          create: translations
        }
      },
      include: {
        aboutTranslation: true
      }
    });
    console.log(1);
    
    return about;
  }