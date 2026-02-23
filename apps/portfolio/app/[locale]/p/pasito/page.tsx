import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "A quick note on Pasito's SEO — Daniela Huezo",
  robots: {
    index: false,
    follow: false,
  },
}

const css = `
:root {
  --cream:      #FBF9F6;
  --cream-dark: #EDE7DC;
  --sage:       #7A9E87;
  --sage-pale:  #EAF1EC;
  --rose:       #C4857A;
  --rose-pale:  #FAEAE8;
  --brown:      #3D2E22;
  --muted:      #9B8A7A;
  --border:     #DDD5C8;
  --white:      #FDFAF6;
  --text:       #4A3828;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

.pasito-root {
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--cream) !important;
  color: var(--text) !important;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  line-height: 1.75;
  padding: 120px 40px 120px;
}
.pasito-root > div:last-child {
  max-width: 680px;
  margin: 0 auto;
}

.from-line {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--brown);
  margin-bottom: 56px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.from-line-rule {
  flex: 1;
  height: 1px;
  background: var(--border);
}
h1 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(28px, 4vw, 38px);
  font-weight: 700;
  color: var(--brown);
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 28px;
}
h1 em { font-style: italic; color: var(--rose); }
p { font-size: 16px; color: var(--text); line-height: 1.8; margin-bottom: 20px; }
p.lead { font-size: 17px; color: var(--brown); }
.divider { border: none; border-top: 1px solid var(--border); margin: 44px 0; }
.label {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--brown);
  margin-bottom: 16px;
  display: block;
}
.findings { display: flex; flex-direction: column; gap: 20px; }
.finding {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px 24px;
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 14px;
  align-items: start;
}
.finding-dot { width: 10px; height: 10px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
.finding-dot.red    { background: var(--rose); }
.finding-dot.yellow { background: #C49A5A; }
.finding-title { font-size: 15px; font-weight: 500; color: var(--brown); margin-bottom: 4px; }
.finding-desc { font-size: 14px; color: var(--brown); line-height: 1.7; margin: 0; }
.code {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  background: var(--cream-dark);
  padding: 1px 6px;
  border-radius: 3px;
  color: var(--brown);
}
.swap { background: var(--white); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
.swap-row { display: grid; grid-template-columns: 90px 1fr; border-bottom: 1px solid var(--border); }
.swap-row:last-child { border-bottom: none; }
.swap-key {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brown);
  padding: 16px;
  background: var(--cream-dark);
  border-right: 1px solid var(--border);
  display: flex;
  align-items: center;
}
.swap-vals { display: grid; grid-template-columns: 1fr 1fr; }
.swap-val { padding: 14px 16px; font-size: 12.5px; line-height: 1.55; border-right: 1px solid var(--border); }
.swap-val:last-child { border-right: none; }
.swap-val.before { color: #A05050; font-family: 'DM Mono', monospace; font-size: 11px; }
.swap-val.after  { color: #4A7A5A; font-family: 'DM Mono', monospace; font-size: 11px; }
.swap-header .swap-val {
  font-family: 'DM Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brown);
  padding: 10px 16px;
  background: var(--cream-dark);
}
.plan-list { display: flex; flex-direction: column; gap: 0; }
.plan-item { display: grid; grid-template-columns: 32px 1fr; gap: 16px; padding-bottom: 28px; position: relative; }
.plan-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 15px; top: 28px; bottom: 0;
  width: 1px;
  background: var(--border);
}
.plan-num {
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--white);
  display: flex; align-items: center; justify-content: center;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: var(--muted);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.plan-num.now { background: var(--rose-pale); border-color: var(--rose); color: var(--rose); }
.plan-body { padding-top: 4px; }
.plan-when {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--brown);
  margin-bottom: 4px;
}
.plan-title { font-size: 15px; font-weight: 500; color: var(--brown); margin-bottom: 4px; }
.plan-desc { font-size: 14px; color: var(--brown); line-height: 1.7; margin: 0; }
.signoff {
  margin-top: 56px;
  padding-top: 40px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 24px;
}
.signoff-left p { font-size: 15px; margin-bottom: 0; color: var(--brown); }
.signoff-left .name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 20px;
  font-style: italic;
  color: var(--brown);
  display: block;
  margin-top: 4px;
  margin-bottom: 8px;
}
.signoff-links { display: flex; flex-direction: column; gap: 3px; text-align: right; }
.signoff-links a {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: var(--sage);
  text-decoration: none;
}
.toc {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px 24px;
  margin-bottom: 40px;
}
.toc-title {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--brown);
  margin-bottom: 14px;
}
.toc-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.toc-list a {
  font-size: 15px;
  color: var(--brown);
  text-decoration: none;
  transition: color 0.15s;
}
.toc-list a:hover { color: var(--sage); }
.read-time {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: var(--brown);
  margin-left: auto;
}
.tldr {
  background: var(--rose-pale);
  border-left: 3px solid var(--rose);
  border-radius: 0 8px 8px 0;
  padding: 20px 24px;
  margin: 28px 0 36px;
}
.tldr-title {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--brown);
  margin-bottom: 12px;
  font-weight: 500;
}
.tldr ul {
  margin: 0;
  padding-left: 20px;
  font-size: 15px;
  line-height: 1.8;
  color: var(--brown);
}
.tldr li { margin-bottom: 6px; }
.tldr li:last-child { margin-bottom: 0; }
.section { scroll-margin-top: 24px; }
.note {
  background: var(--sage-pale);
  border-left: 2px solid var(--sage);
  border-radius: 0 6px 6px 0;
  padding: 16px 20px;
  margin: 24px 0;
}
.note p { font-size: 15px; color: #3d5c47; margin: 0; line-height: 1.7; }
`

const auditHTML = `
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">

<div class="from-line">Daniela Huezo · dhuezo.dev · February 2026<span class="from-line-rule" aria-hidden="true"></span><span class="read-time">4 min read</span></div>

<h1>Pasito is ranking for<br/>who it <em>used to be,</em><br/>not who it is now.</h1>

<p class="lead">I looked at pasito.ai after reading about your Series A. This isn't a pitch — it's something I noticed and thought was worth a few minutes of your time.</p>

<div class="tldr">
  <div class="tldr-title">TL;DR</div>
  <ul>
    <li>Homepage title still says "Employee Benefits Education" — Google ranks you for the wrong keywords.</li>
    <li>Series A backlinks are reinforcing old messaging. The window to fix this is closing.</li>
    <li>Three fixes: update meta tags, add crawlable content, build pillar pages for buyer-intent keywords.</li>
  </ul>
</div>

<nav class="toc" aria-label="Table of contents">
  <div class="toc-title">In this article</div>
  <ul class="toc-list">
    <li><a href="#short-version">The short version</a></li>
    <li><a href="#what-i-found">What I found</a></li>
    <li><a href="#what-changes">What changes</a></li>
    <li><a href="#the-plan">The plan</a></li>
  </ul>
</nav>

<hr class="divider"/>

<span class="label section" id="short-version">The short version</span>

<p>Your homepage title still reads <span class="code">"Employee Benefits Education, Engagement and Support"</span> — that's the 2022 Pasito. Your press releases, your fundraise announcement, your partnerships with New York Life and Sun Life all describe something completely different: an AI-native workspace for carriers and brokers.</p>

<p>Google indexed the old messaging. So when a benefits VP at a carrier searches "AI benefits platform" or "benefits automation for insurance," Pasito doesn't show up. You're invisible to the exact buyers you just raised $21M to reach.</p>

<div class="note">
  <p>The irony: the PR from your Series A generated backlinks from high-authority publications. Those links are a ranking gift — but the anchor texts are reinforcing the wrong keywords. That window is closing in the next few weeks.</p>
</div>

<hr class="divider"/>

<span class="label section" id="what-i-found">What I found</span>

<div class="findings">
  <div class="finding">
    <div class="finding-dot red"></div>
    <div>
      <div class="finding-title">Title tags and meta descriptions are misaligned with your product</div>
      <p class="finding-desc">Every page title reflects your old positioning. Google ranks you for "benefits education" searches — not for "AI agents for insurance" or "benefits automation," which is what your buyers actually search.</p>
    </div>
  </div>
  <div class="finding">
    <div class="finding-dot red"></div>
    <div>
      <div class="finding-title">The homepage has ~180 words of text Google can read</div>
      <p class="finding-desc">The rest is images. Google can't read images. Competitors in your space have 5–8x more indexable content on their homepages, which is part of why they outrank you for category terms.</p>
    </div>
  </div>
  <div class="finding">
    <div class="finding-dot red"></div>
    <div>
      <div class="finding-title">No structured data anywhere on the site</div>
      <p class="finding-desc">No schema markup means no knowledge panel, no rich results, no FAQ snippets in Google. It's free visibility that your site isn't claiming.</p>
    </div>
  </div>
  <div class="finding">
    <div class="finding-dot yellow"></div>
    <div>
      <div class="finding-title">Blog content doesn't target buyer-intent keywords</div>
      <p class="finding-desc">The blog covers general HR topics. Nobody searching "RFP automation for carriers" or "insurance document AI" lands on a Pasito page — those searches go to competitors.</p>
    </div>
  </div>
</div>

<hr class="divider"/>

<span class="label section" id="what-changes">What changes</span>

<div class="swap">
  <div class="swap-row swap-header">
    <div class="swap-key"></div>
    <div class="swap-vals">
      <div class="swap-val">Now</div>
      <div class="swap-val">After</div>
    </div>
  </div>
  <div class="swap-row">
    <div class="swap-key">Title tag</div>
    <div class="swap-vals">
      <div class="swap-val before">"Pasito I Employee Benefits Education, Engagement and Support"</div>
      <div class="swap-val after">"Pasito — AI Workspace for Insurance Carriers &amp; Brokers"</div>
    </div>
  </div>
  <div class="swap-row">
    <div class="swap-key">Schema</div>
    <div class="swap-vals">
      <div class="swap-val before">None</div>
      <div class="swap-val after">Organization + SoftwareApplication + FAQPage</div>
    </div>
  </div>
  <div class="swap-row">
    <div class="swap-key">Crawlable text</div>
    <div class="swap-vals">
      <div class="swap-val before">~180 words</div>
      <div class="swap-val after">900–1,200 structured words</div>
    </div>
  </div>
  <div class="swap-row">
    <div class="swap-key">Rich results</div>
    <div class="swap-vals">
      <div class="swap-val before">Not eligible</div>
      <div class="swap-val after">Knowledge panel + FAQ snippets</div>
    </div>
  </div>
</div>

<hr class="divider"/>

<span class="label section" id="the-plan">The plan — 4 weeks, not 4 months</span>

<div class="plan-list">
  <div class="plan-item">
    <div class="plan-num now">1</div>
    <div class="plan-body">
      <div class="plan-when">Week 1</div>
      <div class="plan-title">Fix the technical foundation</div>
      <p class="plan-desc">Rewrite title tags and meta descriptions across all pages to match current positioning. Add schema markup. Fix image alt texts. Fast to implement, immediate signal to Google.</p>
    </div>
  </div>
  <div class="plan-item">
    <div class="plan-num">2</div>
    <div class="plan-body">
      <div class="plan-when">Weeks 2–3</div>
      <div class="plan-title">Add crawlable content to the homepage</div>
      <p class="plan-desc">Structured text sections targeting carrier and broker search intent — without touching your existing design. Gives Google enough to rank you for the terms that matter.</p>
    </div>
  </div>
  <div class="plan-item">
    <div class="plan-num">3</div>
    <div class="plan-body">
      <div class="plan-when">Week 4</div>
      <div class="plan-title">Three pillar pages for mid-funnel buyers</div>
      <p class="plan-desc">One page each for: AI agents for carriers, benefits automation for brokers, RFP management. These capture buyers doing research before they're ready to demo.</p>
    </div>
  </div>
</div>

<div class="signoff">
  <div class="signoff-left">
    <p>Happy to talk through any of this.</p>
    <span class="name">Daniela Huezo</span>
    <p style="font-size:13px;">Cursor Ambassador · Tech Lead · El Salvador</p>
  </div>
  <div class="signoff-links">
    <a href="mailto:hello@dhuezo.dev">hello@dhuezo.dev</a>
    <a href="https://dhuezo.dev">dhuezo.dev</a>
    <a href="https://linkedin.com/in/dhuezo">linkedin.com/in/dhuezo</a>
  </div>
</div>

<p style="margin-top:56px;font-size:11px;color:var(--muted);line-height:1.7;border-top:1px solid var(--border);padding-top:24px;">This document is intended solely for the person it was sent to. The findings are based on publicly available information from pasito.ai and do not reflect any confidential or proprietary data. This is not a formal audit — it's an observation shared in good faith. Please don't share it further without checking with me first.</p>
`

export default function PasitoAuditPage() {
  return (
    <div className="pasito-root">
      <style>{css}</style>
      <div dangerouslySetInnerHTML={{ __html: auditHTML }} />
    </div>
  )
}
