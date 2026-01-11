import {
  Search,
  MapPin,
  LayoutGrid,
  PenLine,
  Languages,
  Rocket,
} from 'lucide-react'

const features = [
  {
    icon: Search,
    title: 'Multi-Food Search',
    description:
      "Can't decide between Pizza or Tacos? Search for both simultaneously.",
  },
  {
    icon: MapPin,
    title: 'Smart Location',
    description:
      'Use your GPS or drop a pin anywhere to find food in that area.',
  },
  {
    icon: LayoutGrid,
    title: 'Google Maps Integrated',
    description:
      'Seamless integration with Google Places API for accurate data.',
  },
  {
    icon: PenLine,
    title: 'Rich Details',
    description:
      'See ratings, price level, photos, and reviews before you go.',
  },
  {
    icon: Languages,
    title: 'Bilingual Support',
    description: 'Fully localized for both English and Spanish speakers.',
  },
  {
    icon: Rocket,
    title: 'Adventure Mode',
    description: 'Let the app decide everything. Pure random discovery.',
  },
]

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Everything You Need to Discover Great Food
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-all hover:bg-slate-800/50"
            >
              <div className="w-10 h-10 bg-emerald-900/30 rounded-xl flex items-center justify-center mb-4 text-emerald-400">
                <feature.icon className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
