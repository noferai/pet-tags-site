"use client";

import { motion } from "motion/react"
import PageIllustration from "@/components/page-illustration";

export default function HeroHome() {
  return (
    <section className="relative">
      <PageIllustration />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="pb-12 pt-32 md:pb-20 md:pt-40">
          {/* Section header */}
          <div className="pb-12 text-center md:pb-16">
            <motion.h1
              className="mb-6 border-y text-5xl font-bold [border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1] md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              Уникальный адресник для вашего любимца
            </motion.h1>
            <div className="mx-auto max-w-3xl">
              <motion.p
                className="mb-8 text-lg text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Адресник — это необходимый элемент для идентификации вашего питомца в случае ЧП, чтобы он вернулся домой в целости и сохранности. Но вдвойне приятнее, что он может нести не только прикладную функцию с контактными данными хозяина, но и быть красивым аксессуаром для вашего любимца.
              </motion.p>
              <motion.div
                className="relative before:absolute before:inset-0 before:border-y before:[border-image:linear-gradient(to_right,transparent,theme(colors.slate.300/.8),transparent)1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
              >
                <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                  {/* Add content here */}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
