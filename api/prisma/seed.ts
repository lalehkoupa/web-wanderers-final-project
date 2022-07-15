import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { classDateData } from './classDate'

// handles the database connections for us
const prisma = new PrismaClient()

const run = async () => {
  await Promise.all(
    classDateData.map(async (classDate) => {
      return prisma.classDate.upsert({
        where: { date: classDate.date },
        update: {},
        create: {
          date: classDate.date,
          jobs: {
            create: classDate.jobs.map((job) => ({
              title: job.title,
              timeString: job.timeString,
              slots: job.slots,
              filled: job.filled
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
  })}