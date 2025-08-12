-- DropForeignKey
ALTER TABLE "public"."Book" DROP CONSTRAINT "Book_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Book" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
