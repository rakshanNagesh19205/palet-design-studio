export const SocialProof = () => {
  const logos = [
    { name: 'ACME.ai', style: 'font-bold' },
    { name: 'Figmatic', style: 'font-medium italic' },
    { name: 'SwissType', style: 'font-mono font-bold' },
    { name: 'MonoLith', style: 'font-semibold tracking-widest' },
  ];

  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-12">
      <div className="container">
        <p className="mb-8 text-center text-overline uppercase tracking-widest text-white/40">
          Trusted by precise teams at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
          {logos.map((logo) => (
            <span
              key={logo.name}
              className={`text-xl text-white/30 ${logo.style}`}
            >
              {logo.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
