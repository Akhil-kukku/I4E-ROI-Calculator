export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="bg-[#0f2e5f] text-[13px] text-white">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <span>+91 85918 58565</span>
            <span>info@invest4edu.com</span>
          </div>
          <div className="hidden gap-4 text-xs md:flex">
            <span>About Us</span>
            <span>Careers</span>
            <span>Contact Us</span>
            <span>Press Releases</span>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-4">
        <div className="text-2xl font-extrabold tracking-tight text-[#1b4b88]">invest4Edu</div>
        <nav className="hidden items-center gap-8 text-[15px] text-[#1f3552] lg:flex">
          <span>Educational Services</span>
          <span>Financial Services</span>
          <span>Resources</span>
          <span>Study Abroad</span>
          <span>Skill Building</span>
        </nav>
        <button className="rounded bg-[#1795e4] px-5 py-2 text-sm font-semibold text-white">Login</button>
      </div>
    </header>
  );
}
