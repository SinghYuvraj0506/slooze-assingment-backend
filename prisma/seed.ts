import { Country, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password123', 10);

  // Create users
  await prisma.user.createMany({
    data: [
      {
        email: 'nick@avengers.com',
        name: 'Nick Fury',
        password: hash,
        role: 'ADMIN',
        country: Country.INDIA,
      },
      {
        email: 'marvel@avengers.com',
        name: 'Captain Marvel',
        password: hash,
        role: 'MANAGER',
        country: Country.INDIA,
      },
      {
        email: 'america@avengers.com',
        name: 'Captain America',
        password: hash,
        role: 'MANAGER',
        country: Country.AMERICA,
      },
      {
        email: 'thor@avengers.com',
        name: 'Thor',
        password: hash,
        role: 'MEMBER',
        country: Country.INDIA,
      },
      {
        email: 'thanos@avengers.com',
        name: 'Thanos',
        password: hash,
        role: 'MEMBER',
        country: Country.INDIA,
      },
      {
        email: 'travis@avengers.com',
        name: 'Travis',
        password: hash,
        role: 'MEMBER',
        country: Country.AMERICA,
      },
    ],
  });

  // Create restaurants and menu items
  const restaurantsData = [
    {
      name: 'Mumbai Masala',
      country: Country.INDIA,
      menuItems: {
        create: [
          { name: 'Butter Chicken', price: 350 },
          { name: 'Paneer Tikka', price: 250 },
          { name: 'Garlic Naan', price: 50 },
        ],
      },
    },
    {
      name: 'Delhi Darbar',
      country: Country.INDIA,
      menuItems: {
        create: [
          { name: 'Chole Bhature', price: 120 },
          { name: 'Rajma Chawal', price: 100 },
          { name: 'Lassi', price: 60 },
        ],
      },
    },
    {
      name: 'New York Bites',
      country: Country.AMERICA,
      menuItems: {
        create: [
          { name: 'Cheeseburger', price: 10 },
          { name: 'Fries', price: 4 },
          { name: 'Coke', price: 2 },
        ],
      },
    },
    {
      name: 'Texas Grillhouse',
      country: Country.AMERICA,
      menuItems: {
        create: [
          { name: 'BBQ Ribs', price: 18 },
          { name: 'Grilled Chicken', price: 15 },
          { name: 'Cornbread', price: 5 },
        ],
      },
    },
  ];

  const nick = await prisma.user.findUnique({
    where: { email: 'nick@avengers.com' },
  });

  // Add payment method for Nick Fury
  if (nick) {
    await prisma.paymentMethod.create({
      data: {
        userId: nick.id,
        type: 'VISA',
        cardLast4: '1234',
        isDefault: true,
      },
    });
  }

  for (const restaurant of restaurantsData) {
    await prisma.restaurant.create({
      data: restaurant,
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
