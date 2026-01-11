const testimonials = [
  {
    quote:
      'Finally, an app that actually works. No more endless scrolling through reviews just to end up eating cereal. A game changer.',
    initials: 'SM',
    name: 'Sarah M.',
    role: 'Foodie Enthusiast',
    color: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    quote:
      "Made our date nights so much more fun. We love the surprise element! We've found 3 new regular spots this month alone.",
    initials: 'JL',
    name: 'James & Lisa',
    role: 'Couple',
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    quote:
      'Found my new favorite sushi spot thanks to Food Dice! It was hidden in a strip mall I drive by every day. Incredible.',
    initials: 'MR',
    name: 'Mike R.',
    role: 'Local Guide',
    color: 'bg-purple-500/20 text-purple-400',
  },
]

const QuoteIcon = () => (
  <svg
    className="absolute top-8 right-8 text-slate-800 w-10 h-10"
    fill="currentColor"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
  </svg>
)

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            See What Our Beta Testers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 relative"
            >
              <QuoteIcon />
              <p className="text-slate-300 mb-6 relative z-10">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center font-bold`}
                >
                  {testimonial.initials}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-slate-500 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
