"use client";

import { useEffect, useMemo, useState } from "react";
import { Accessibility, RotateCcw, X } from "lucide-react";

type TextSize = "default" | "large" | "xlarge";

type AccessibilitySettings = {
  textSize: TextSize;
  contrast: boolean;
  reduceMotion: boolean;
  focusHighlight: boolean;
};

const STORAGE_KEY = "teragenix-accessibility-settings";

const defaultSettings: AccessibilitySettings = {
  textSize: "default",
  contrast: false,
  reduceMotion: false,
  focusHighlight: false,
};

function applySettings(settings: AccessibilitySettings) {
  const root = document.documentElement;
  root.dataset.textSize = settings.textSize;
  root.dataset.contrast = settings.contrast ? "high" : "default";
  root.dataset.reduceMotion = settings.reduceMotion ? "true" : "false";
  root.dataset.focusHighlight = settings.focusHighlight ? "true" : "false";
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AccessibilitySettings>;
        const next = {
          ...defaultSettings,
          ...parsed,
        } satisfies AccessibilitySettings;
        setSettings(next);
        applySettings(next);
      } else {
        applySettings(defaultSettings);
      }
    } catch {
      applySettings(defaultSettings);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applySettings(settings);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [ready, settings]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const textSizeOptions = useMemo(
    () => [
      { label: "Default", value: "default" },
      { label: "Large", value: "large" },
      { label: "Larger", value: "xlarge" },
    ] as const,
    [],
  );

  const toggle = (key: keyof Omit<AccessibilitySettings, "textSize">) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const reset = () => setSettings(defaultSettings);

  return (
    <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+5.75rem)] right-5 z-[115] flex flex-col items-end gap-3 sm:bottom-5" data-site-chrome="accessibility-widget">
      {open ? (
        <div
          id="teragenix-accessibility-panel"
          className="w-[320px] rounded-[24px] border border-[#dbe6f5] bg-white p-4 shadow-[0_26px_60px_-26px_rgba(13,38,45,0.3)]"
          role="dialog"
          aria-label="Accessibility settings"
          aria-modal="false"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[15px] font-semibold tracking-[-0.02em] text-[#0d262d]">Accessibility</p>
              <p className="mt-1 text-[13px] leading-5 text-[#5a6a79]">Adjust readability and motion for this device.</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#dbe6f5] text-[#0d262d] transition hover:bg-[#f4f8ff]"
              aria-label="Close accessibility settings"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3b6ed6]">Text size</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {textSizeOptions.map((option) => {
                  const active = settings.textSize === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSettings((current) => ({ ...current, textSize: option.value }))}
                      className={`rounded-full px-3 py-2 text-[13px] font-semibold transition ${
                        active
                          ? "bg-[#0d262d] text-white"
                          : "border border-[#dbe6f5] bg-white text-[#0d262d] hover:bg-[#f4f8ff]"
                      }`}
                      aria-pressed={active}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {[
              {
                key: "contrast",
                label: "Higher contrast",
                description: "Stronger contrast and clearer separation.",
              },
              {
                key: "reduceMotion",
                label: "Reduce motion",
                description: "Turns off animations and smooth scrolling.",
              },
              {
                key: "focusHighlight",
                label: "Focus highlight",
                description: "Makes keyboard focus states easier to see.",
              },
            ].map((item) => {
              const enabled = settings[item.key as keyof Omit<AccessibilitySettings, "textSize">] as boolean;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggle(item.key as keyof Omit<AccessibilitySettings, "textSize">)}
                  className="flex w-full items-center justify-between rounded-[18px] border border-[#dbe6f5] px-3 py-3 text-left transition hover:bg-[#f8fbff]"
                  aria-pressed={enabled}
                >
                  <div className="pr-3">
                    <p className="text-[14px] font-semibold text-[#0d262d]">{item.label}</p>
                    <p className="mt-1 text-[12px] leading-5 text-[#5a6a79]">{item.description}</p>
                  </div>
                  <span
                    className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${enabled ? "bg-[#3b6ed6]" : "bg-[#d9e2ec]"}`}
                    aria-hidden="true"
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${enabled ? "left-[22px]" : "left-[2px]"}`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-4 inline-flex h-10 items-center gap-2 rounded-full border border-[#dbe6f5] px-4 text-[13px] font-semibold text-[#0d262d] transition hover:bg-[#f4f8ff]"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#0d262d] text-white shadow-[0_22px_45px_-22px_rgba(13,38,45,0.5)] transition hover:bg-[#143640]"
        aria-label="Open accessibility settings"
        aria-expanded={open}
        aria-controls="teragenix-accessibility-panel"
      >
        <Accessibility className="h-5 w-5" />
      </button>
    </div>
  );
}
