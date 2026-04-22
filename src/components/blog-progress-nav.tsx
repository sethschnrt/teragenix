"use client";

import { useEffect, useMemo, useState } from "react";

type BlogProgressNavProps = {
  sections: { id: string; title: string }[];
};

export function BlogProgressNav({ sections }: BlogProgressNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    const updateState = () => {
      const scrollPosition = window.scrollY + 180;
      let currentId = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          currentId = id;
        }
      }

      setActiveId(currentId);

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
      setProgress(Math.max(0, Math.min(100, nextProgress)));
    };

    updateState();
    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      window.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [sectionIds]);

  if (sections.length === 0) return null;

  return (
    <aside className="sticky top-30 w-full max-w-[160px]">
      <div className="flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7b8aa0]">
        <span>On this page</span>
        <span>{Math.round(progress)}%</span>
      </div>

      <div className="mt-4 flex items-stretch gap-3">
        <div className="relative w-2 shrink-0">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#dbe6f5]" />
          <div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#3b6ed6_0%,#74a2ff_100%)] transition-[height] duration-200"
            style={{ height: `${progress}%` }}
          />
        </div>

        <ul className="min-w-0 flex-1 space-y-1.5">
        {sections.map((section, index) => {
          const active = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`group flex items-start gap-2 py-1.5 text-xs leading-4 transition ${
                  active
                    ? "text-[#173f85]"
                    : "text-[#6c7d92] hover:text-[#173f85]"
                }`}
              >
                <span
                  className={`mt-[3px] h-1.5 w-1.5 shrink-0 rounded-full transition ${
                    active ? "bg-[#3b6ed6]" : "bg-[#c6d4e8] group-hover:bg-[#7aa1e8]"
                  }`}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8ba0bc]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-0.5 block line-clamp-3">{section.title}</span>
                </span>
              </a>
            </li>
          );
        })}
        </ul>
      </div>
    </aside>
  );
}
