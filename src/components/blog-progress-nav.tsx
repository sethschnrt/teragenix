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
    <aside className="sticky top-28 rounded-[1.6rem] border border-[#dbe6f5] bg-white/92 p-4 shadow-[0_18px_44px_rgba(13,38,45,0.08)] backdrop-blur-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#3b6ed6]">On this page</p>
      <div className="mt-3">
        <div className="flex items-center justify-between text-[12px] text-[#64748b]">
          <span>Reading progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e7eef8]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#3b6ed6_0%,#74a2ff_100%)] transition-[width] duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <ul className="mt-4 space-y-1.5">
        {sections.map((section, index) => {
          const active = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`flex items-start gap-2 rounded-[1rem] px-3 py-2.5 text-sm leading-5 transition ${
                  active
                    ? "bg-[#eef4ff] text-[#173f85] ring-1 ring-[#dbe6f5]"
                    : "text-[#5b6b80] hover:bg-[#f8fbff] hover:text-[#173f85]"
                }`}
              >
                <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a8eae]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">{section.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
