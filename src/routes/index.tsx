import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-chocolate.jpg";
import barAlmond from "@/assets/bar-almond.jpg";
import barPistachio from "@/assets/bar-pistachio.jpg";
import barPeanut from "@/assets/bar-peanut.jpg";
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
  { name: "Almond Crunch", desc: "Velvety milk chocolate, roasted Marcona almonds.", price: "Rs 400", img: barAlmond },
  { name: "Pistachio Bloom", desc: "Silken white chocolate, slow-roasted pistachios.", price: "Rs 400", img: barPistachio },
  { name: "Peanut Praline", desc: "Deep milk chocolate, salted roasted peanuts.", price: "Rs 400", img: barPeanut },
];

const orderMailto =
  "mailto:faizafaroq1014@gmail.com?subject=" +
  encodeURIComponent("New NutNest Order") +
  "&body=" +
  encodeURIComponent(
    "Hi Faiza,\n\nI'd like to place an order:\n\n• Bar(s) & quantity: \n• Delivery address: \n• Contact number: \n\nThank you!",
  );
const whatsappUrl =
  "https://wa.me/923299515502?text=" +
  encodeURIComponent("Hi NutNest! I'd like to place an order for your chocolate bars.");

function Index() {
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
            Chocolate, the way nuts intended.
          </h1>
          <p className="mt-8 text-cream/80 max-w-xl text-lg leading-relaxed">
            Slow-conched bars folded with whole roasted nuts. No fillers, no shortcuts — just cocoa, sugar and crunch.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#bars" className="inline-flex items-center px-8 py-4 bg-gold text-cocoa font-medium text-sm uppercase tracking-[0.2em] hover:bg-cream transition-colors">
              Shop the bars
            </a>
            <a href="#story" className="inline-flex items-center px-8 py-4 border border-cream/40 text-cream text-sm uppercase tracking-[0.2em] hover:bg-cream/10 transition-colors">
              Our story
            </a>
          </div>
        </div>
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
                <div className="aspect-square overflow-hidden bg-muted mb-6">
                  <img src={b.img} alt={b.name} width={1024} height={1024} loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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

      {/* Story */}
      <section id="story" className="py-28 px-6 bg-cocoa text-cream">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-6">Our Story</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-10">
            "I wanted a chocolate bar where the nuts weren't an afterthought."
          </h2>
          <p className="text-cream/80 text-lg leading-relaxed max-w-2xl mx-auto">
            NutNest began in a home kitchen in 2023, when founder <strong className="text-cream">Faiza Farooq</strong> grew
            tired of bars where a single sad almond hid inside an inch of waxy chocolate. Today, every bar she makes is built
            around the nuts — whole, roasted to order, and generous to the point of indulgence.
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
            For custom orders, hotel and café wholesale, or just to say the bars made your week — write to Faiza directly.
          </p>
          <a href="mailto:faizafaroq1014@gmail.com"
            className="inline-block font-serif text-2xl md:text-3xl text-cocoa border-b-2 border-gold pb-1 hover:text-gold transition-colors">
            faizafaroq1014@gmail.com
          </a>
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
