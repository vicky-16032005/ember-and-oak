import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight,
  CalendarCheck,
  Carrot,
  CheckCircle,
  Clock,
  Coffee,
  CookingPot,
  Cursor,
  Flame,
  Knife,
  Leaf,
  List,
  MapPin,
  Phone,
  Star,
  Trophy,
  UsersThree,
  X,
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'power3.out'

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* Scroll-reveal helper: content is fully visible by default; GSAP only
   animates FROM hidden when motion is allowed, so nothing ships blank. */
function useReveal(ref, selector, vars = {}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(selector, {
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
          y: 32,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: EASE,
          ...vars,
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])
}

/* ============================== Navbar =============================== */

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      rootMargin: '80px 0px 0px 0px',
    })
    if (sentinelRef.current) io.observe(sentinelRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { href: '#kitchen', label: 'The kitchen' },
    { href: '#craft', label: 'Our day' },
    { href: '#menu', label: 'Menu' },
  ]

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-px" />
      <header
        className={`fixed left-1/2 top-4 z-40 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2 rounded-full px-4 py-2.5 transition-colors duration-300 sm:px-6 ${
          scrolled ? 'glass' : 'border border-transparent'
        }`}
      >
        <nav className="flex items-center justify-between gap-4">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember">
              <Flame size={20} weight="fill" className="text-[#FFF6EE]" />
            </span>
            <span className="font-display text-lg leading-none">Ember &amp; Oak</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] text-muted transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#reserve"
              className="btn-press hidden items-center gap-1.5 rounded-full bg-ember px-5 py-2.5 text-[15px] font-semibold text-[#FFF6EE] transition-colors hover:bg-ember-bright sm:inline-flex"
            >
              Reserve a table
              <ArrowUpRight size={16} weight="bold" />
            </a>
            <button
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
              aria-label="Open menu"
            >
              <List size={22} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div className="glass fixed inset-0 z-50 flex flex-col px-8 py-6 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg">Ember &amp; Oak</span>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          <div className="mt-16 flex flex-col gap-7">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#reserve"
              onClick={() => setOpen(false)}
              className="btn-press mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-ember px-6 py-3.5 text-lg font-semibold text-[#FFF6EE]"
            >
              Reserve a table
              <ArrowUpRight size={18} weight="bold" />
            </a>
          </div>
        </div>
      )}
    </>
  )
}

/* =============================== Hero ================================ */

const HERO_EMBERS = [
  { left: '12%', dur: '6.5s', delay: '0s', drift: '14px' },
  { left: '38%', dur: '7.8s', delay: '2.1s', drift: '-10px' },
  { left: '64%', dur: '6.1s', delay: '4s', drift: '18px' },
  { left: '85%', dur: '8.4s', delay: '1.2s', drift: '-16px' },
]

function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: EASE } })
        tl.from('.hero-line', { y: 52, opacity: 0, duration: 0.95, stagger: 0.14 }, 0.25)
          .from('.hero-sub', { y: 26, opacity: 0, duration: 0.7 }, '-=0.55')
          .from('.hero-cta', { y: 18, opacity: 0, duration: 0.55, stagger: 0.1 }, '-=0.4')
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100dvh] items-end overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2000&q=80"
        alt="Candlelit tables set for dinner service in a dim dining room"
        className="absolute inset-0 h-full w-full object-cover brightness-[.42]"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep/70 via-deep/20 to-bg" />

      <div aria-hidden="true" className="absolute inset-0">
        {HERO_EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember-hero"
            style={{ left: e.left, bottom: '12%', '--dur': e.dur, '--delay': e.delay, '--drift': e.drift }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-wrap px-6 pb-24 pt-24 sm:px-10">
        <h1 className="font-display max-w-3xl text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-7xl">
          <span className="hero-line block">Dinner, cooked</span>
          <span className="hero-line block text-tan">over open fire.</span>
        </h1>
        <p className="hero-sub mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
          A small neighborhood bistro built around one oak-fired oven. Seasonal plates, natural
          wine, and thirty-eight seats.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <a
            href="#reserve"
            className="hero-cta btn-press inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 text-lg font-semibold text-[#FFF6EE] transition-colors hover:bg-ember-bright"
          >
            Reserve a table
            <ArrowUpRight size={18} weight="bold" />
          </a>
          <a
            href="#menu"
            className="hero-cta btn-press glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-lg font-semibold text-ink transition-colors hover:border-ink/25"
          >
            View the menu
          </a>
        </div>
      </div>
    </section>
  )
}

/* ================== The Kitchen: asymmetric feature bento ============= */

const OVEN_EMBERS = [
  { left: '8%', dur: '3.1s', delay: '0s', drift: '12px', size: '5px', rise: '-220px' },
  { left: '14%', dur: '5.1s', delay: '2.7s', drift: '-18px', size: '3px', rise: '-300px' },
  { left: '18%', dur: '4.2s', delay: '1.4s', drift: '-8px', size: '6px', rise: '-180px' },
  { left: '26%', dur: '5.6s', delay: '0.2s', drift: '22px', size: '3px', rise: '-320px' },
  { left: '29%', dur: '3.6s', delay: '0.6s', drift: '16px', size: '5px', rise: '-240px' },
  { left: '37%', dur: '4.9s', delay: '3.1s', drift: '-12px', size: '4px', rise: '-280px' },
  { left: '41%', dur: '4.8s', delay: '2.2s', drift: '-14px', size: '6px', rise: '-200px' },
  { left: '49%', dur: '5.4s', delay: '1.7s', drift: '14px', size: '3px', rise: '-340px' },
  { left: '53%', dur: '3.3s', delay: '1.1s', drift: '10px', size: '5px', rise: '-230px' },
  { left: '61%', dur: '5.8s', delay: '0.8s', drift: '-20px', size: '4px', rise: '-310px' },
  { left: '64%', dur: '4.5s', delay: '0.3s', drift: '-12px', size: '6px', rise: '-190px' },
  { left: '71%', dur: '5.2s', delay: '2.4s', drift: '18px', size: '3px', rise: '-330px' },
  { left: '75%', dur: '3.8s', delay: '1.9s', drift: '14px', size: '5px', rise: '-250px' },
  { left: '82%', dur: '5.5s', delay: '1.2s', drift: '-16px', size: '4px', rise: '-290px' },
  { left: '88%', dur: '4.1s', delay: '0.9s', drift: '-10px', size: '6px', rise: '-210px' },
]

const COALS = [
  { left: '4%', w: '22%', dur: '4.4s', delay: '0s' },
  { left: '24%', w: '30%', dur: '5.2s', delay: '1.3s' },
  { left: '52%', w: '24%', dur: '3.9s', delay: '0.5s' },
  { left: '74%', w: '22%', dur: '4.8s', delay: '2s' },
]

const OVEN_STATUS = ['Oak loaded at 6:00', 'Coals raked twice', 'Holding 480 degrees', 'Ready for service']

function OvenScene() {
  const [statusIdx, setStatusIdx] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setStatusIdx((i) => (i + 1) % OVEN_STATUS.length), 2600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-full min-h-[300px] overflow-hidden rounded-xl bg-deep">
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ember/25 to-transparent" />
      {/* heat glow over the coals */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(ellipse_120%_90%_at_50%_100%,rgba(240,138,77,0.32),transparent_65%)]"
      />
      {/* coal bed: two offset rows */}
      <div aria-hidden="true" className="absolute inset-x-4 bottom-4 h-9">
        {COALS.map((c, i) => (
          <span
            key={i}
            className="coal absolute bottom-3 h-3.5 rounded-full bg-gradient-to-r from-ember via-ember-bright to-ember"
            style={{ left: c.left, width: c.w, '--dur': c.dur, '--delay': c.delay }}
          />
        ))}
        {COALS.map((c, i) => (
          <span
            key={`b-${i}`}
            className="coal absolute bottom-0 h-2.5 rounded-full bg-gradient-to-r from-ember-bright via-ember to-ember-bright"
            style={{
              left: `calc(${c.left} + 7%)`,
              width: `calc(${c.w} - 6%)`,
              '--dur': c.delay === '0s' ? '5.6s' : c.dur,
              '--delay': `calc(${c.delay} + 0.9s)`,
            }}
          />
        ))}
      </div>
      {/* rising embers */}
      <div aria-hidden="true" className="absolute inset-0">
        {OVEN_EMBERS.map((e, i) => (
          <span
            key={i}
            className="ember"
            style={{
              left: e.left,
              '--dur': e.dur,
              '--delay': e.delay,
              '--drift': e.drift,
              '--size': e.size,
              '--rise': e.rise,
            }}
          />
        ))}
      </div>
      <div className="absolute left-5 top-5">
        <p key={statusIdx} className="status-swap text-sm font-medium text-ink/85">
          {OVEN_STATUS[statusIdx]}
        </p>
      </div>
    </div>
  )
}

const DISHES = [
  { name: 'Charred leek, romesco', detail: 'Off the coals, nearly burnt, exactly right', price: 14 },
  { name: 'Half chicken, ember lemon', detail: 'Brined overnight, finished over oak', price: 29 },
  { name: 'Whole trout, fennel butter', detail: 'Crisp skin, soft herbs, brown butter', price: 27 },
]

function MenuShuffler() {
  const [front, setFront] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => setFront((i) => (i + 1) % DISHES.length), 3400)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44">
      {DISHES.map((dish, i) => {
        const pos = (i - front + DISHES.length) % DISHES.length
        const styles = [
          'translate-y-0 scale-100 opacity-100 z-30',
          '-translate-y-3 scale-[.96] opacity-50 z-20',
          '-translate-y-6 scale-[.92] opacity-25 z-10',
        ][pos]
        return (
          <article
            key={dish.name}
            className={`absolute inset-x-0 bottom-0 rounded-xl border border-divider bg-deep p-5 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${styles}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h4 className="font-display text-lg leading-snug">{dish.name}</h4>
              <span className="text-tan">{dish.price}</span>
            </div>
            <p className="mt-1.5 text-sm text-muted">{dish.detail}</p>
          </article>
        )
      })}
    </div>
  )
}

const DEMO_DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

function ReserveDemo() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setStep(3)
      return
    }
    const id = setInterval(() => setStep((s) => (s + 1) % 5), 1500)
    return () => clearInterval(id)
  }, [])

  const cursorPos =
    step >= 1 && step <= 3 ? 'translate(-118%, -210%)' : 'translate(-20%, -60%)'

  return (
    <div className="relative h-44 overflow-hidden rounded-xl bg-deep p-5">
      <div className="grid grid-cols-7 gap-1.5">
        {DEMO_DAYS.map((d, i) => {
          const pressed = i === 4 && step >= 2 && step <= 3
          return (
            <span
              key={d}
              className={`flex h-10 items-center justify-center rounded-md text-sm transition-all duration-300 ${
                pressed
                  ? 'scale-95 bg-ember font-semibold text-[#FFF6EE]'
                  : 'border border-divider text-muted'
              }`}
            >
              {d}
            </span>
          )
        })}
      </div>

      <div
        className={`mt-4 flex items-center gap-2 rounded-lg border border-ember/40 bg-ember/10 px-3.5 py-2.5 transition-all duration-500 ${
          step >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
      >
        <CalendarCheck size={18} className="shrink-0 text-ember-bright" />
        <p className="text-sm text-ink/90">Friday, table for two, held.</p>
      </div>

      <Cursor
        size={22}
        weight="fill"
        aria-hidden="true"
        className="absolute bottom-4 right-5 text-ink transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: cursorPos }}
      />
    </div>
  )
}

function Kitchen() {
  const ref = useRef(null)
  useReveal(ref, '.kitchen-card')

  return (
    <section id="kitchen" className="mx-auto max-w-wrap px-6 py-28 sm:px-10" ref={ref}>
      <h2 className="font-display max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
        One oven. No shortcuts.
      </h2>
      <p className="mt-5 max-w-xl text-lg text-muted">
        Everything that leaves this kitchen passes through oak flame. Here is what that looks
        like on an ordinary Tuesday.
      </p>

      <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-5 lg:grid-rows-2">
        <article className="kitchen-card flex flex-col rounded-2xl border border-divider bg-surface p-6 sm:p-7 lg:col-span-3 lg:row-span-2">
          <h3 className="font-display text-xl">The oven never sleeps</h3>
          <p className="mb-6 mt-2 max-w-md text-muted">
            Lit at six every morning, raked and fed through the last order of the night.
          </p>
          <div className="flex-1">
            <OvenScene />
          </div>
        </article>

        <article className="kitchen-card rounded-2xl border border-divider bg-surface p-6 sm:p-7 lg:col-span-2">
          <h3 className="font-display text-xl">Tonight's plates</h3>
          <p className="mb-6 mt-2 text-muted">The chalkboard rotates with the market.</p>
          <MenuShuffler />
        </article>

        <article className="kitchen-card rounded-2xl border border-divider bg-surface p-6 sm:p-7 lg:col-span-2">
          <h3 className="font-display text-xl">Tables go fast</h3>
          <p className="mb-6 mt-2 text-muted">Most nights book out by late afternoon.</p>
          <ReserveDemo />
        </article>
      </div>
    </section>
  )
}

/* ====================== Stats: divided counter row =================== */

function CountUp({ end, suffix = '', duration = 1800 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.textContent = `${end}${suffix}`
      return
    }
    let raf
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          el.textContent = `${Math.round(end * eased)}${suffix}`
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, suffix, duration])

  return <span ref={ref}>0{suffix}</span>
}

const STATS = [
  { end: 14, suffix: '', label: 'years in the same room', detail: 'Same corner, same oven, a few more scorch marks.' },
  { end: 38, suffix: '', label: 'seats, one long bench', detail: 'Small on purpose. Every table can see the fire.' },
  { end: 480, suffix: '°', label: "in the oven's belly", detail: 'Hot enough to blister a crust in ninety seconds.' },
]

function Stats() {
  const ref = useRef(null)
  useReveal(ref, '.stat-item', { y: 24 })

  return (
    <section ref={ref} className="border-y border-divider bg-deep/40">
      <div className="mx-auto grid max-w-wrap grid-cols-1 divide-y divide-divider px-6 sm:px-10 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {STATS.map((s) => (
          <div key={s.label} className="stat-item py-12 lg:px-10 lg:py-16 lg:first:pl-0 lg:last:pr-0">
            <p className="font-display text-5xl text-tan sm:text-6xl">
              <CountUp end={s.end} suffix={s.suffix} />
            </p>
            <p className="mt-3 text-lg text-ink">{s.label}</p>
            <p className="mt-1.5 text-muted">{s.detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ==================== Our day: sticky scroll stack =================== */

const DAY_STEPS = [
  {
    time: '6:00',
    title: 'First fire',
    body: 'Oak from a single mill upstate. The oven takes two hours to come to temperature, and we give it three.',
    img: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2?auto=format&fit=crop&w=1200&q=80',
    alt: 'A cook working over open flame in a dark kitchen',
  },
  {
    time: '11:30',
    title: 'The market haul',
    body: 'Whatever the farm trucks brought decides the menu. The chalkboard gets written at noon, not before.',
    img: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1200&q=80',
    alt: 'Crates of fresh vegetables laid out at a morning market',
  },
  {
    time: '17:00',
    title: 'Doors open',
    body: 'Candles lit, wine pulled, the room fills. Service runs until the last ember settles.',
    img: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80',
    alt: 'Warm lamplight over a full bistro dining room at night',
  },
]

function OurDay() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = gsap.utils.toArray('.day-card')
        cards.forEach((card, i) => {
          if (i === cards.length - 1) return
          gsap.to(card, {
            scale: 0.94,
            opacity: 0.4,
            filter: 'blur(3px)',
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top bottom-=140',
              end: 'top top+=180',
              scrub: true,
            },
          })
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="craft" ref={ref} className="mx-auto max-w-wrap px-6 py-28 sm:px-10">
      <h2 className="font-display max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
        A day, ember to table.
      </h2>

      <div className="mt-16 space-y-[14vh]">
        {DAY_STEPS.map((step) => (
          <div key={step.title} className="day-card sticky top-24">
            <article className="grid grid-cols-1 gap-8 rounded-2xl border border-divider bg-surface p-7 sm:p-10 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-3">
                <p className="font-display text-2xl text-tan">{step.time}</p>
                <h3 className="font-display mt-3 text-2xl sm:text-3xl">{step.title}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">{step.body}</p>
              </div>
              <div className="lg:col-span-2">
                <img
                  src={step.img}
                  alt={step.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ==================== Menu: divided dark tile grid =================== */

const SERVICES = [
  { icon: Flame, title: 'Wood-fired dinner', desc: 'The main event. Five to ten plates a night, all from the oven.' },
  { icon: Carrot, title: 'Seasonal lunch', desc: 'Shorter, brighter, faster. Thursday through Sunday.' },
  { icon: Coffee, title: 'Weekend brunch', desc: "Hearth-baked breads, soft eggs, last night's coals." },
  { icon: UsersThree, title: 'Private dining room', desc: 'Twelve seats behind the kitchen wall. Yours for the night.' },
  { icon: Knife, title: "Chef's counter", desc: 'Four stools at the pass. The tasting menu, narrated.' },
  { icon: CookingPot, title: 'Feasts to carry home', desc: 'Whole birds, sides, and bread, packed for your table.' },
]

function Menu() {
  const ref = useRef(null)
  useReveal(ref, '.menu-tile', { y: 28, stagger: 0.08 })

  return (
    <section id="menu" className="bg-deep py-28">
      <div ref={ref} className="mx-auto max-w-wrap px-6 sm:px-10">
        <h2 className="font-display max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
          Ways to eat with us.
        </h2>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-divider bg-divider sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="menu-tile group bg-deep p-8 transition-colors duration-300 hover:bg-surface sm:p-10">
              <s.icon
                size={26}
                className="text-ember-bright transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              <h3 className="font-display mt-5 text-xl">{s.title}</h3>
              <p className="mt-2.5 leading-relaxed text-muted">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ======================= Trust: divided strip ======================== */

const TRUST = [
  { icon: Trophy, title: 'City Eats Top 100', detail: 'Three years running, 2023 to 2025.' },
  { icon: Star, title: '4.8 from 2,140 diners', detail: 'Across the usual review sites.' },
  { icon: Leaf, title: 'Certified green kitchen', detail: 'Whole-animal buying, zero gas, composted ash.' },
]

function Trust() {
  const ref = useRef(null)
  useReveal(ref, '.trust-item', { y: 20 })

  return (
    <section ref={ref} className="mx-auto max-w-wrap px-6 py-24 sm:px-10">
      <div className="flex flex-col divide-y divide-divider lg:flex-row lg:divide-x lg:divide-y-0">
        {TRUST.map((t) => (
          <div key={t.title} className="trust-item flex items-start gap-4 py-8 lg:flex-1 lg:px-10 lg:py-2 lg:first:pl-0 lg:last:pr-0">
            <t.icon size={26} className="mt-0.5 shrink-0 text-ember-bright" />
            <div>
              <h3 className="text-lg font-semibold">{t.title}</h3>
              <p className="mt-1 text-muted">{t.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ========================= Reserve: form ============================= */

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink/90">{label}</span>
      {children}
    </label>
  )
}

const INPUT_CLS =
  'w-full rounded-lg border border-divider bg-deep/70 px-4 py-3 text-ink placeholder:text-muted outline-none transition-colors focus:border-ember [color-scheme:dark]'

function Reserve() {
  const ref = useRef(null)
  const [status, setStatus] = useState('idle')
  useReveal(ref, '.reserve-col', { y: 28 })

  function onSubmit(e) {
    e.preventDefault()
    if (status !== 'idle') return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section id="reserve" ref={ref} className="mx-auto max-w-wrap px-6 py-28 sm:px-10">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="reserve-col lg:col-span-5">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl">Hold a table.</h2>
          <p className="mt-5 max-w-md text-lg text-muted">
            Send a request and we confirm by text within the hour. Walk-ins keep six seats at
            the counter every night.
          </p>

          <ul className="mt-10 space-y-6">
            <li className="flex items-start gap-4">
              <MapPin size={22} className="mt-0.5 shrink-0 text-ember-bright" />
              <div>
                <p className="font-semibold">214 Coal Street</p>
                <p className="text-muted">Corner of 9th, under the green awning.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Phone size={22} className="mt-0.5 shrink-0 text-ember-bright" />
              <div>
                <p className="font-semibold">(312) 847-1928</p>
                <p className="text-muted">Afternoons are easiest to reach us.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Clock size={22} className="mt-0.5 shrink-0 text-ember-bright" />
              <div>
                <p className="font-semibold">Tuesday to Sunday, 17:00 to 23:00</p>
                <p className="text-muted">Lunch Thursday to Sunday from 11:30.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="reserve-col lg:col-span-7">
          {status === 'sent' ? (
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-divider bg-surface p-10 text-center">
              <CheckCircle size={52} weight="fill" className="text-ember-bright" />
              <h3 className="font-display mt-6 text-2xl">Request received.</h3>
              <p className="mt-3 max-w-sm text-muted">
                We confirm every table by text within the hour. See you by the fire.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-divider bg-surface p-7 sm:p-10"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Field label="Name">
                  <input required name="name" autoComplete="name" placeholder="Mara Lindqvist" className={INPUT_CLS} />
                </Field>
                <Field label="Email">
                  <input required type="email" name="email" autoComplete="email" placeholder="mara@example.com" className={INPUT_CLS} />
                </Field>
                <Field label="Phone">
                  <input required type="tel" name="phone" autoComplete="tel" placeholder="(312) 555-0184" className={INPUT_CLS} />
                </Field>
                <Field label="Party size">
                  <select name="party" defaultValue="2" className={INPUT_CLS}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Date">
                  <input required type="date" name="date" className={INPUT_CLS} />
                </Field>
                <Field label="Time">
                  <select name="time" defaultValue="19:00" className={INPUT_CLS}>
                    {['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'].map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="mt-6">
                <Field label="Anything we should know?">
                  <textarea
                    name="notes"
                    rows={4}
                    placeholder="Allergies, occasions, a seat near the oven..."
                    className={INPUT_CLS}
                  />
                </Field>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-press mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-7 py-4 text-lg font-semibold text-[#FFF6EE] transition-colors hover:bg-ember-bright disabled:opacity-70"
              >
                {status === 'sending' ? 'Sending request...' : 'Reserve a table'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

/* ============================== Footer =============================== */

function Footer() {
  return (
    <footer className="border-t border-divider bg-deep">
      <div className="mx-auto grid max-w-wrap grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ember">
              <Flame size={20} weight="fill" className="text-[#FFF6EE]" />
            </span>
            <span className="font-display text-lg">Ember &amp; Oak</span>
          </div>
          <p className="mt-4 max-w-xs text-muted">
            Wood-fired cooking, neighborhood soul. Same corner since 2012.
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-ink/80">
            <span className="h-2 w-2 rounded-full bg-ember-bright" aria-hidden="true" />
            Open tonight until 23:00
          </p>
        </div>

        <nav aria-label="Explore">
          <h3 className="font-semibold">Explore</h3>
          <ul className="mt-4 space-y-3 text-muted">
            <li><a href="#kitchen" className="transition-colors hover:text-ink">The kitchen</a></li>
            <li><a href="#craft" className="transition-colors hover:text-ink">Our day</a></li>
            <li><a href="#menu" className="transition-colors hover:text-ink">Menu</a></li>
            <li><a href="#reserve" className="transition-colors hover:text-ink">Reservations</a></li>
          </ul>
        </nav>

        <div>
          <h3 className="font-semibold">Hours</h3>
          <ul className="mt-4 space-y-3 text-muted">
            <li>Dinner: Tue to Sun, 17:00</li>
            <li>Lunch: Thu to Sun, 11:30</li>
            <li>Brunch: Sat and Sun, 10:00</li>
            <li>Closed Mondays</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">Find us</h3>
          <ul className="mt-4 space-y-3 text-muted">
            <li>214 Coal Street</li>
            <li>(312) 847-1928</li>
            <li>hello@emberandoak.example</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-divider">
        <div className="mx-auto flex max-w-wrap flex-col items-start justify-between gap-3 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:px-10">
          <p>&copy; 2026 Ember &amp; Oak. A demo website.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-ink">Privacy</Link>
            <Link to="/terms" className="transition-colors hover:text-ink">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* =============================== App ================================= */

export default function App() {
  useEffect(() => {
    document.fonts?.ready?.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Kitchen />
        <Stats />
        <OurDay />
        <Menu />
        <Trust />
        <Reserve />
      </main>
      <Footer />
    </div>
  )
}
