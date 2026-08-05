import prisma from '../src/config/prisma.js';
async function main() {
    console.log('Prisma seed placeholder ready.');
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map