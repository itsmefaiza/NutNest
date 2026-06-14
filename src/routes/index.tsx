import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/hero-chocolate.jpg";
import barAlmond from "@/assets/bar-almond.jpg";
import barPistachio from "@/assets/bar-pistachio.jpg";
import barWalnut from "@/assets/bar-walnut.jpg";
import logo from "@/assets/nutnest-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutNest — Handcrafted Chocolate Bars with Nuts" },
      { name: "description", content: "Small-batch chocolate bars folded with roasted almonds, pistachios and peanuts. Founded by Faiza Farooq." },
      { property: "og:title", content: "NutNest — Handcrafted Chocolate Bars with Nuts" },
      { property: "og:description", content: "Small-batch chocolate bars folded with roasted almonds, pistachios and peanuts." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const bars = [
  { name: "Almond Crunch", desc: "Velvety milk chocolate, roasted Marcona almonds.", price: "Rs 500", img: barAlmond, badge: "Bestseller" },
  { name: "Pistachio Bloom", desc: "Silken white chocolate, slow-roasted pistachios.", price: "Rs 550", img: barPistachio, badge: "Customer Favourite" },
  { name: "Walnut Velvet", desc: "Dark chocolate folded with toasted walnut halves.", price: "Rs 500", img: barWalnut, badge: "New" },
];

const orderMailto =
  "mailto:thenutnestoffical@gmail.com?subject=" +
  encodeURIComponent("New NutNest Order") +
  "&body=" +
  encodeURIComponent(
    "Hi Faiza,\n\nI'd like to place an order:\n\n• Bar(s) & quantity: \n• Delivery address: \n• Contact number: \n\nThank you!",
  );
const whatsappUrl =
  "https://wa.me/923299515502?text=" +
  encodeURIComponent("Hi NutNest! I'd like to place an order for your chocolate bars.");

const chocolateBases = ["Dark", "Milk", "White"];
const fillings = ["Caramel", "Hazelnut Praline", "Strawberry Jam", "Coffee Ganache", "Honey Nougat", "No filling"];
const nutChoices = ["Almonds", "Pistachios", "Walnuts", "Hazelnuts", "Cashews", "No nuts"];

function Index() {
  const [base, setBase] = useState("Dark");
  const [filling, setFilling] = useState("Caramel");
  const [nuts, setNuts] = useState<string[]>(["Almonds"]);
  const [notes, setNotes] = useState("");

  const toggleNut = (n: string) =>
    setNuts((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));

  const customMessage = encodeURIComponent(
    `Hi NutNest! I'd like to customize a chocolate bar:\n\n• Chocolate base: ${base}\n• Filling: ${filling}\n• Nuts: ${nuts.join(", ") || "None"}\n• Notes: ${notes || "—"}\n\nThank you!`,
  );
  const customWhatsapp = `https://wa.me/923299515502?text=${customMessage}`;
  const customMailto = `mailto:thenutnestoffical@gmail.com?subject=${encodeURIComponent("Custom NutNest Bar")}&body=${customMessage}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="absolute top-0 left-0 right-0 z-20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-cream">
          <a href="#" aria-label="NutNest home" className="flex items-center">
            <img
              src={logo}
              alt="NutNest"
              width={1536}
              height={1024}
              className="h-16 md:h-20 w-auto drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]"
            />
          </a>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-[0.18em]">
            <a href="#bars" className="hover:text-gold transition-colors">Bars</a>
            <a href="#customize" className="hover:text-gold transition-colors">Customize</a>
            <a href="#story" className="hover:text-gold transition-colors">Story</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img src={heroImg} alt="Chocolate bar with hazelnuts and almonds" width={1024} height={1024}
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-cocoa/90 via-cocoa/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 w-full">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Small batch · Pakistan</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream max-w-3xl leading-[1.05]">
            Where Rich Chocolate Meets Real Crunch.
          </h1>
          <p className="mt-8 text-cream/80 max-w-xl text-lg leading-relaxed">
            Slow-conched bars folded with whole roasted nuts. No fillers, no shortcuts — just cocoa, sugar and crunch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#bars" className="inline-flex items-center px-8 py-4 bg-gold text-cocoa font-medium text-sm uppercase tracking-[0.2em] hover:bg-cream transition-colors">
              Shop the bars
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-8 py-4 border border-cream/40 text-cream text-sm uppercase tracking-[0.2em] hover:bg-cream/10 transition-colors">
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Tagline */}
      <section className="bg-cream py-14 px-6 border-b border-border">
        <p className="max-w-4xl mx-auto text-center font-serif text-2xl md:text-3xl text-cocoa leading-snug">
          Handcrafted chocolate bars layered with roasted nuts, made in small batches for people who believe every bite should be generous.
        </p>
      </section>

      {/* Bars */}
      <section id="bars" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">The Collection</p>
              <h2 className="font-serif text-4xl md:text-5xl max-w-xl">Three bars. Three textures of joy.</h2>
            </div>
            <p className="text-muted-foreground max-w-sm">Each 80g bar is hand-tempered, hand-wrapped and dated. Made in batches of 50.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {bars.map((b) => (
              <article key={b.name} className="group">
                <div className="relative aspect-square overflow-hidden bg-muted mb-6">
                  <img src={b.img} alt={b.name} width={1024} height={1024} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-gold text-cocoa text-[10px] uppercase tracking-[0.2em] font-medium px-3 py-1.5">
                    {b.badge}
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif text-2xl">{b.name}</h3>
                  <span className="text-gold font-medium">{b.price}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* Customize */}
      <section id="customize" className="py-28 px-6 bg-cream border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Build Your Own</p>
            <h2 className="font-serif text-4xl md:text-5xl text-cocoa mb-4">Craft your own bar.</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Pick a chocolate base, a filling, and the nuts you love. We'll handcraft it just for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 bg-background border border-border p-8 md:p-12">
            <div className="space-y-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Chocolate base</p>
                <div className="flex flex-wrap gap-2">
                  {chocolateBases.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBase(b)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        base === b ? "bg-cocoa text-cream border-cocoa" : "border-border hover:border-gold"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Filling</p>
                <div className="flex flex-wrap gap-2">
                  {fillings.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFilling(f)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        filling === f ? "bg-cocoa text-cream border-cocoa" : "border-border hover:border-gold"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Nuts (pick any)</p>
                <div className="flex flex-wrap gap-2">
                  {nutChoices.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => toggleNut(n)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        nuts.includes(n) ? "bg-gold text-cocoa border-gold" : "border-border hover:border-gold"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">Special notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Allergies, sweetness level, gift message…"
                  className="w-full px-4 py-3 border border-border bg-background text-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div className="bg-cocoa text-cream p-8 flex flex-col">
              <p className="text-gold text-xs uppercase tracking-[0.3em] mb-4">Your bar</p>
              <h3 className="font-serif text-3xl mb-6 leading-tight">
                {base} chocolate
                {filling !== "No filling" && <> with {filling.toLowerCase()}</>}
                {nuts.length > 0 && <> & {nuts.join(", ").toLowerCase()}</>}
              </h3>
              <dl className="space-y-3 text-sm text-cream/80 mb-8">
                <div className="flex justify-between border-b border-cream/10 pb-2"><dt>Base</dt><dd className="text-cream">{base}</dd></div>
                <div className="flex justify-between border-b border-cream/10 pb-2"><dt>Filling</dt><dd className="text-cream">{filling}</dd></div>
                <div className="flex justify-between border-b border-cream/10 pb-2"><dt>Nuts</dt><dd className="text-cream text-right">{nuts.length ? nuts.join(", ") : "None"}</dd></div>
              </dl>
              <p className="text-cream/70 text-sm mb-6 mt-auto">
                Custom bars start at Rs 600. We'll confirm price & delivery on WhatsApp.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={customWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center px-6 py-3 bg-gold text-cocoa text-sm uppercase tracking-[0.2em] hover:bg-cream transition-colors"
                >
                  Send on WhatsApp
                </a>
                <a
                  href={customMailto}
                  className="block text-center px-6 py-3 border border-cream/40 text-cream text-sm uppercase tracking-[0.2em] hover:bg-cream/10 transition-colors"
                >
                  Send by Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-28 px-6 bg-cocoa text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Our Story</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10">
            "I wanted a chocolate bar where the nuts weren't an afterthought."
          </h2>
          <p className="text-cream/80 text-lg leading-relaxed max-w-2xl mx-auto">
            NutNest was born from a simple idea: chocolate bars should be generous with nuts, handcrafted in small batches,
            and made to share. Every bar founder <strong className="text-cream">Faiza Farooq</strong> makes is built around
            the nuts — whole, roasted to order, and generous to the point of indulgence.
          </p>
          <p className="mt-8 font-serif text-2xl text-gold">— Faiza Farooq, Founder</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <img src={logo} alt="NutNest" width={1536} height={1024} loading="lazy" className="h-20 w-auto mx-auto mb-8" />
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Get in touch</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-8">Wholesale, gifting & hellos.</h2>
          <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
            Click below to place an order by email or message Faiza directly on WhatsApp. Bars are Rs 400 each.
          </p>
          <div className="flex flex-col items-center gap-6">
            <a
              href={orderMailto}
              className="inline-block font-serif text-2xl md:text-3xl text-cocoa border-b-2 border-gold pb-1 hover:text-gold transition-colors"
            >
              thenutnestoffical@gmail.com
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cocoa text-cream text-sm uppercase tracking-[0.2em] hover:bg-gold hover:text-cocoa transition-colors"
            >
              WhatsApp · 0329 9515502
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NutNest. Handcrafted in small batches.</p>
          <p className="font-serif text-foreground">NutNest</p>
        </div>
      </footer>
    </div>
  );
}
