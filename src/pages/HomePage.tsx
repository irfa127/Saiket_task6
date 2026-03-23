import { SearchForm } from '../components/SearchForm';

export const HomePage = () => (
  <div>
    <section className="bg-hero-gradient">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 text-white sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
            Discover smarter travel planning
          </span>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Book your next flight with comfort, speed, and confidence.
          </h1>
          <p className="max-w-xl text-lg text-blue-50">
            Search routes, compare fares, choose your seat, and complete your booking journey in a modern travel experience.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ['250+', 'Daily flights'],
              ['98%', 'On-time partners'],
              ['24/7', 'Travel support'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-blue-100">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="self-end">
          <SearchForm />
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: 'Flexible flight search',
            text: 'Explore one-way and round-trip journeys with passenger and class preferences built in.',
          },
          {
            title: 'Smooth booking flow',
            text: 'Move seamlessly from flight results to passenger details, seat selection, and payment.',
          },
          {
            title: 'Trip management',
            text: 'Review your bookings anytime and cancel upcoming flights directly from your profile page.',
          },
        ].map((feature) => (
          <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
            <h2 className="text-xl font-semibold text-slate-900">{feature.title}</h2>
            <p className="mt-3 text-slate-600">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);
