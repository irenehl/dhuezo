import { Button } from '@/components/ui/button'

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-6">
          Be the First to Discover Your Next
          <br />
          <span className="text-emerald-400">Favorite Restaurant</span>
        </h2>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          Join the Food Dice waitlist today and be notified the moment we
          launch.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button
            size="lg"
            className="w-full sm:w-auto text-slate-950 font-bold shadow-[0_0_40px_rgba(52,211,153,0.3)] hover:shadow-[0_0_60px_rgba(52,211,153,0.5)] transform hover:-translate-y-1"
          >
            NOTIFY ME ON LAUNCH
          </Button>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Currently in development for iOS and Android
        </p>
      </div>
    </section>
  )
}
