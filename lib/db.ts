import { PrismaClient } from "@prisma/client" 

declare global {
    var prisma: PrismaClient | undefined;
}


const db = globalThis.prisma || new PrismaClient();

export default  db  

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db;
}



// import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'

// const prismaClientSingleton = () => {
//   return new PrismaClient().$extends(withAccelerate())
// }

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>
// } & typeof global

// const db = globalThis.prismaGlobal ?? prismaClientSingleton()

// export default db


// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = db