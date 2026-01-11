import { Dices, Github, Instagram, Twitter } from 'lucide-react'

const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Join Waitlist', href: '#' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Contact Us', href: '#' },
  { label: 'Buy Me a Coffee', href: '#' },
]

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-emerald-500/10 p-2 rounded-lg">
                <Dices className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
              </div>
              <span className="text-xl font-semibold text-white tracking-tight">
                Food Dice
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Making dining decisions fun again. Powered by randomness and
              Google Places API.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Legal & Support</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Food Dice. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-slate-500 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-700 text-[10px] uppercase tracking-wider">
            Made with ❤️ for hungry people everywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
