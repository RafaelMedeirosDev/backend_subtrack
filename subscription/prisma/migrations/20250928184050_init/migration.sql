-- CreateTable
CREATE TABLE "subscription"."Subscription" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "platformName" VARCHAR(100) NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "billingDay" INTEGER NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);
