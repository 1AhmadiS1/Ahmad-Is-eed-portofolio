const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer id="footer" className="relative border-t-2 border-ink bg-ink px-4 py-8 sm:px-6 md:px-8 lg:px-12 w-full max-w-full overflow-x-hidden text-white">
      <div className="mx-auto flex max-w-[1580px] flex-col justify-between items-center gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em] sm:flex-row text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="text-red font-black">●</span>
          <span className="text-white">AHMAD IS'EED</span>
          <span className="text-white/40">//</span>
          <span className="text-acid">HEBRON, PALESTINE 🇵🇸</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-white/70">
          <a
            href="mailto:ahmad.imad.iseed@gmail.com"
            className="hover:text-red transition-colors underline decoration-red underline-offset-4"
          >
            ahmad.imad.iseed@gmail.com
          </a>
          <span className="text-white/30">•</span>
          <a
            href="tel:+972592124252"
            className="hover:text-acid transition-colors"
          >
            +972 59-212-4252
          </a>
        </div>

        <div className="text-white/40 text-[9px]">
          © {CURRENT_YEAR} ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  );
}
