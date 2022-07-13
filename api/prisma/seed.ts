import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { classData } from './jobsData'

// handles the database connections for us
const prisma = new PrismaClient()

const run = async () => {
  await Promise.all(
    classData.map(async (class) => {
      return prisma.class.upsert({
        where: { date: class.date },
        update: {},
        create: {
          date: class.date,
          jobs: {
            create: class.jobs.map((job) => ({
              title: job.title,
              slots: job.slots,
              filled: job.filled,
            })),
          },
        },
      })
    })
  )

run()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })