"use client";

import { CategoryInfo, PortfolioCategory } from "@/types";
import Link from "next/link";
import React from "react";

interface CategoryNavigationProps {
  categories: CategoryInfo[];
  activeCategory?: PortfolioCategory | "all";
}

export function CategoryNavigation({
  categories,
  activeCategory = "all",
}: CategoryNavigationProps) {
  const allTabs = [
    { id: "all", name: "All Work", href: "/portfolio" },
    ...categories.map((c) => ({
      id: c.id,
      name: c.name,
      href: `/portfolio/${c.slug}`,
    })),
  ];

  return (
    <nav
      aria-label="Portfolio Category Filter"
      className="w-full overflow-x-auto no-scrollbar py-4 mb-10 border-b border-surface-border"
    >
      <ul className="flex items-center space-x-2 sm:space-x-4 min-w-max">
        {allTabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <li key={tab.id}>
              <Link
                href={tab.href}
                className={`text-xs uppercase tracking-[0.2em] px-4 py-2.5 transition-all duration-200 block border ${
                  isActive
                    ? "bg-ivory text-background border-ivory font-medium"
                    : "bg-surface text-ivory-muted border-surface-border hover:border-ivory/30 hover:text-ivory"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold`}
              >
                {tab.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
