"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const reportBasePath = process.env.NEXT_PUBLIC_REPORT_BASE_PATH ?? "";
const reportAsset = (filename: string) => `${reportBasePath}/${filename}`;

const report = {
  client: "Indian Motorcycle",
  period: "July 2026",
  previousPeriod: "June 2026",
  overall: {
    kpis: [
      { label: "Media spend", value: "$583k", previous: "$845k", change: "31%", direction: "down" as const },
      { label: "Leads", value: "10,508", previous: "12,219", change: "14%", direction: "down" as const },
      { label: "Blended CPL", value: "$55.50", previous: "$69.38", change: "20%", direction: "down" as const },
      { label: "Leads vs forecast", value: "109%", previous: "Spend 101% of plan", change: "hold", direction: "up" as const },
    ],
    mix: [
      { name: "Meta", spend: "$381k", spendChange: "−31%", result: "5,267 leads", resultChange: "−14%", efficiency: "$72 CPL", efficiencyChange: "−20%" },
      { name: "Google", spend: "$201k", spendChange: "−31%", result: "5,287 conv.", resultChange: "−14%", efficiency: "$38 CPA", efficiencyChange: "−20%" },
    ],
  },
  wins: [
    {
      title: "Efficiency held the period",
      stat: "$55.50 CPL",
      versus: "vs $69.38 June · vs $60 April · vs $114.56 FY forecast",
      means: "Twenty percent cheaper than June and less than half the annual forecast. Slightly above April’s $60, on 31% less spend. This is a good result.",
      why: "Spend dropped toward retargeting and Performance Max — people already showing intent — not evenly across the account.",
      learning: "Buy the next period on this cost base. Do not spend in full just to protect lead count.",
    },
    {
      title: "Retargeting did more with less",
      stat: "$20 CPL · 2,711 leads",
      versus: "vs $29 June · vs ~$33 Get a Quote retargeting",
      means: "Thirty-one percent cheaper than last month and well under the $33 CTA benchmark, after a 25% spend cut. This is an exceptional result.",
      why: "High-intent riders already knew the bike. Finance, colour and product proof closed the last question.",
      learning: "If retargeting holds near $20 as we reinvest, the system is working. That is the control number.",
    },
    {
      title: "Google converted the demand Meta created",
      stat: "$39.89 PMax CPA",
      versus: "vs $47 June Google CPA · vs $55.50 blended · vs $114.56 FY forecast",
      means: "Eighty-four percent of Google conversions at a CPA far under account forecast and below blended CPL. This is a good result on cost. Model mix is the open question.",
      why: "Search did not re-introduce the brand. It captured riders who already had a model in mind.",
      learning: "Judge Google on CPA and model quality, not on matching Meta lead volume.",
    },
  ],
  channels: [
    {
      id: "meta",
      name: "Meta",
      role: "Scale engine · 65% of spend",
      kpis: [
        { label: "Spend", value: "$381k", previous: "$552k", change: "31%", direction: "down" as const },
        { label: "Leads", value: "5,267", previous: "6,124", change: "14%", direction: "down" as const },
        { label: "CPL", value: "$72", previous: "$90", change: "20%", direction: "down" as const },
        { label: "Retargeting CPL", value: "$20", previous: "$29", change: "31%", direction: "down" as const },
      ],
      split: [
        { name: "Prospecting", result: "2,366 leads", metric: "$116 CPL", note: "$274.8k spend · scale engine" },
        { name: "Retargeting", result: "2,711 leads", metric: "$20 CPL", note: "25% less spend · more leads" },
      ],
      commentary: {
        points: [
          {
            stat: "$72 blended CPL",
            versus: "vs $90 June · vs $114.56 FY forecast · vs $60 April blended",
            means: "Twenty percent cheaper than June and 37% under the annual forecast. Not quite April’s $60 account CPL, but a clearly good Meta result on less spend.",
            why: "Investment fell 31% toward warm audiences. Volume fell 14% — slower than spend — so efficiency improved rather than the channel breaking.",
            learning: "Rebuild Meta volume at or under $72. Do not buy lead count back at June’s $90.",
          },
          {
            stat: "$20 retargeting CPL",
            versus: "vs $29 June · vs ~$33 Get a Quote retargeting",
            means: "More leads on 25% less spend, 31% cheaper than last month and well under the historic $33 CTA benchmark. This is an exceptional result.",
            why: "Finance, colour and a detailed bike closed riders who were already in-market. No awareness job was being asked of this audience.",
            learning: "Protect $20 as the control number. Reinvest here first.",
          },
          {
            stat: "$116 prospecting CPL",
            versus: "vs $20 retargeting · vs ~$140 Get a Quote prospecting · vs $114.56 FY forecast",
            means: "Better than the $140 prospecting CTA benchmark, but six times retargeting and slightly above FY forecast. Scale is working; this is not the efficiency win.",
            why: "Cold audiences still need a use-case in the first three seconds. That costs more than closing warm riders.",
            learning: "Keep prospecting as the volume engine. Judge it against ~$140 and forecast, not against retargeting’s $20.",
          },
        ],
        rating: {
          verdict: "Strong",
          text: "Meta did its job: cheaper than June, well under annual forecast, with retargeting the standout. The open issue is prospecting cost and model mix, not channel failure.",
        },
      },
      creatives: [
        {
          title: "Challenger POV",
          stage: "Consideration",
          primary: "3.09%",
          primaryLabel: "CTR",
          secondary: "23K LPV",
          objective: "Attention and site traffic",
          why: "First-person riding makes the experience obvious in the opening frame. The viewer can imagine the bike before they are asked to buy it.",
          versus: "vs 1.47% static · vs 3.8% video consideration benchmark — in the video range, well above static.",
          learning: "Upper-funnel work should sell the ride, not the spec sheet. Cut longer stories into 6–15s with the bike moving immediately.",
        },
        {
          title: "Scout Monthly Payments",
          stage: "Prospecting",
          primary: "798",
          primaryLabel: "leads",
          secondary: "$101 CPL",
          objective: "Prospecting leads",
          why: "A specific monthly figure made the value exchange concrete while keeping the bike central. Affordability did more conversion work than lifestyle language.",
          versus: "vs $116 Meta prospecting blended · vs ~$140 Get a Quote prospecting — cheaper than both.",
          learning: "Build payment variants for Bagger, Touring and Chief, then send each to a model-specific landing page.",
        },
        {
          title: "Chieftain Finance",
          stage: "Retargeting",
          primary: "212",
          primaryLabel: "leads",
          secondary: "$17 CPL",
          objective: "High-intent conversion",
          why: "A direct finance line and a detailed bike view answered the last question. The audience had already done the dreaming.",
          versus: "vs $20 retargeting blended · vs ~$33 Get a Quote retargeting — best in the retargeting set.",
          learning: "Retargeting should be product-first, branded and specific. Put the strongest proof in frame one, then finance and trade-in routes by model.",
        },
      ],
    },
    {
      id: "google",
      name: "Google",
      role: "Intent capture · 35% of spend",
      kpis: [
        { label: "Spend", value: "$201k", previous: "$291k", change: "31%", direction: "down" as const },
        { label: "Conversions", value: "5,287", previous: "6,148", change: "14%", direction: "down" as const },
        { label: "CPA", value: "$38", previous: "$47", change: "20%", direction: "down" as const },
        { label: "PMax share", value: "84%", previous: "of Google conv.", change: "hold", direction: "up" as const },
      ],
      split: [
        { name: "Performance Max", result: "4,444 conv.", metric: "$39.89 CPA", note: "84% of Google conversions" },
        { name: "Brand Search", result: "843 conv.", metric: "$28.65 CPA", note: "Highest-efficiency Google route" },
      ],
      commentary: {
        points: [
          {
            stat: "$38 Google CPA",
            versus: "vs $47 June · vs $55.50 blended · vs $114.56 FY forecast",
            means: "Twenty percent cheaper than June, below blended CPL, and a third of the annual forecast. On 35% of spend it matched Meta’s conversion count. This is a very good cost result.",
            why: "Google is catching demand Meta creates, not manufacturing awareness. Queries already carried model intent.",
            learning: "Keep CPA under $40. That is the success test, not matching Meta on volume.",
          },
          {
            stat: "$39.89 PMax CPA · 84% of Google",
            versus: "vs $47 June Google CPA · vs retail mix Scout 42% / Bagger 29% / Touring 18% / Chief 12%",
            means: "Efficient versus last month and versus forecast. Weak versus retail targets: volume still sits on Scout, Chief and Pursuit, while Touring and Chief retail share stay light.",
            why: "Product feeds followed the strongest conversion signal. The algorithm optimised for form fills, not desirable bikes.",
            learning: "Value-weight PMax so the next success test is model mix, not more conversions at $39.89.",
          },
          {
            stat: "$28.65 Brand CPA",
            versus: "vs $39.89 PMax · vs $38 Google blended",
            means: "Twenty-eight percent cheaper than PMax and the lowest CPA in the Google mix. This is a good result and the cleanest intent in the account.",
            why: "Brand queries only had to confirm availability and send the rider to a quote.",
            learning: "Protect Brand. Do not starve it to fund prospecting.",
          },
        ],
        rating: {
          verdict: "Strong on cost, mixed on mix",
          text: "Google is converting cheaply versus June, forecast and blended CPL. That is a good channel result. It is not yet a good portfolio result until Touring and Chief move toward retail targets.",
        },
      },
      creatives: [
        {
          title: "PMax · Chief / Pursuit / Scout",
          stage: "Performance Max",
          primary: "4,444",
          primaryLabel: "conversions",
          secondary: "$39.89 CPA",
          objective: "Efficient conversions",
          why: "Product-first assets met riders who already knew the model. PMax concentrated on the bikes with the strongest conversion signal.",
          versus: "vs $47 June Google CPA · vs $114.56 FY forecast — a good cost result.",
          learning: "Signal quality now matters more than finding extra form fills. Weighted conversion values should push the account toward the bikes we actually want to sell.",
        },
        {
          title: "Brand Search",
          stage: "Search",
          primary: "843",
          primaryLabel: "conversions",
          secondary: "$28.65 CPA",
          objective: "Capture existing demand",
          why: "Brand queries are the cleanest intent in the mix. The ad only had to confirm availability and send the rider to a quote.",
          versus: "vs $39.89 PMax · vs $38 Google blended — the cheapest Google route.",
          learning: "Protect Brand. Switch on AI Max for Brand and keep the landing page as direct as the query.",
        },
        {
          title: "Catch All · model pages",
          stage: "Search / PMax",
          primary: "Mix",
          primaryLabel: "quality lever",
          secondary: "Scout still leads",
          objective: "Desirable model mix",
          why: "Where model-level landing pages and feed assets were strongest, conversion quality followed. Broad catch-alls filled volume, not mix.",
          versus: "vs retail targets Scout 42% / Bagger 29% / Touring 18% / Chief 12% — volume is not yet mix.",
          learning: "Scale Catch All only where model quality is proven. Touring and Chief need dedicated routes or the portfolio stays Scout-heavy.",
        },
      ],
    },
  ],
  campaign: {
    name: "Meta · Retargeting",
    vs: "vs June flight",
    kpis: [
      { label: "Leads", value: "2,711", previous: "2,510", change: "8%", direction: "up" as const },
      { label: "Spend", value: "$54k", previous: "$72k", change: "25%", direction: "down" as const },
      { label: "CPL", value: "$20", previous: "$29", change: "31%", direction: "down" as const },
      { label: "LP to lead", value: "5.7%", previous: "June flight", change: "hold", direction: "up" as const },
    ],
    commentary: {
      points: [
        {
          stat: "$20 CPL",
          versus: "vs $29 June flight · vs ~$33 Get a Quote retargeting · vs $55.50 blended",
          means: "Thirty-one percent cheaper than the last flight, well under the $33 CTA benchmark, and almost a third of blended CPL. This is an exceptional campaign result.",
          why: "Finance and a close bike view closed people already in-market. No awareness job was being asked of this audience.",
          learning: "This is the control campaign. Reinvest here first and hold $20 as the line.",
        },
        {
          stat: "2,711 leads on 25% less spend",
          versus: "vs 2,510 leads / $72k June flight",
          means: "Lead volume rose 8% while spend fell. That is the reverse of a typical cut, and a clear win versus the previous flight.",
          why: "The audience was already warm. Distinctive colour and a seasonal cue earned the stop; the offer did the conversion.",
          learning: "A spend cut here does not have to cost volume. Add spend carefully and watch frequency, not just CPL.",
        },
        {
          stat: "5.7% landing-page to lead",
          versus: "Paid landing-page conversion typically sits around 2–5%",
          means: "Above the usual paid range. The page is converting the traffic the ads send. This is a good result.",
          why: "The ad and the page agreed: product, finance, quote. No re-selling the dream on arrival.",
          learning: "If CPL rises, check frequency and creative fatigue before rebuilding the page.",
        },
      ],
      rating: {
        verdict: "Standout",
        text: "Retargeting is why blended CPL could fall while total spend fell faster than volume. Versus June and versus the $33 CTA benchmark, this campaign is a clear success for the client.",
      },
    },
  },
  learnings: [
    {
      title: "Intent is the lever",
      text: "Spend can fall 31% and the period can still beat forecast if money follows people who already want the bike.",
    },
    {
      title: "Stage-specific creative is doing the work",
      text: "Experience-led video wins consideration. Product and finance win conversion. Broad lifestyle copy does not scale either job.",
    },
    {
      title: "Volume is not the same as value",
      text: "Scout still supplies the leads. Bagger is now on its 29% retail target. Touring and Chief at 4% each are the gap the next phase has to close.",
    },
  ],
  nextPhase: [
    {
      title: "Reinvest at the new cost base",
      text: "Put spend back into the account while CPL is $55.50, 7% below forecast. Rebuild lead volume without giving the efficiency back.",
      success: "CPL ≤ $60 as volume recovers.",
    },
    {
      title: "Value-weight Google",
      text: "Move PMax to weighted conversion values and Max Conversion Value so the account optimises toward desirable bikes, not form fills.",
      success: "Model mix moves toward retail targets.",
    },
    {
      title: "Build the missing models",
      text: "Protect Bagger. Launch dedicated Touring and Chief routes — rider-led lifestyle, product detail and finance — so the mix is not Scout-dependent.",
      success: "Bagger holds ≥29%; Touring and Chief share rises.",
    },
    {
      title: "Close the quality loop",
      text: "Weekly Power BI / CRM check: selected model versus lead form, plus a 30-day decision forecast. Next budget follows quality, not lead count alone.",
      success: "Quality tracked before the next pacing call.",
    },
  ],
};

const chapters = [
  { id: "overall", number: "01", label: "Overall results" },
  ...report.channels.map((channel, index) => ({
    id: channel.id,
    number: String(index + 2).padStart(2, "0"),
    label: channel.name,
  })),
  { id: "campaign", number: String(report.channels.length + 2).padStart(2, "0"), label: "Campaign" },
  { id: "creative", number: String(report.channels.length + 3).padStart(2, "0"), label: "Winning creatives" },
  { id: "learnings", number: String(report.channels.length + 4).padStart(2, "0"), label: "Core learnings" },
  { id: "next", number: String(report.channels.length + 5).padStart(2, "0"), label: "Next phase" },
];

const storyPanelLabels = [
  "Overall results",
  "Key wins",
  ...report.channels.flatMap((channel) => [`${channel.name} results`, `${channel.name} commentary`]),
  "Campaign results",
  "Campaign commentary",
  ...report.channels.map((channel) => `Winning creatives · ${channel.name}`),
  "Core learnings",
  "Next phase",
];

const storyPanelCount = storyPanelLabels.length;
const mobileStoryQuery = "(max-width: 820px)";

const isVerticalStory = () =>
  typeof window !== "undefined" && window.matchMedia(mobileStoryQuery).matches;

function scrollStoryTo(_story: HTMLElement, target: HTMLElement) {
  const vertical = isVerticalStory();
  target.scrollIntoView({
    behavior: "instant",
    block: vertical ? "start" : "nearest",
    inline: vertical ? "nearest" : "start",
  });
}

function closestPanelIndex(story: HTMLElement, panels: HTMLElement[]) {
  const origin = isVerticalStory() ? story.getBoundingClientRect().top : story.getBoundingClientRect().left;
  return panels.reduce((closestIndex, panel, index) => {
    const panelEdge = isVerticalStory() ? panel.getBoundingClientRect().top : panel.getBoundingClientRect().left;
    const closestEdge = isVerticalStory()
      ? panels[closestIndex].getBoundingClientRect().top
      : panels[closestIndex].getBoundingClientRect().left;
    return Math.abs(panelEdge - origin) < Math.abs(closestEdge - origin) ? index : closestIndex;
  }, 0);
}

type Kpi = {
  label: string;
  value: string;
  previous: string;
  change: string;
  direction: "up" | "down";
};

export default function Home() {
  const storyRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState("overall");
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const progress = useMemo(
    () => `${((activePanelIndex + 1) / storyPanelCount) * 100}%`,
    [activePanelIndex],
  );

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;
    const panels = Array.from(story.querySelectorAll<HTMLElement>("[data-story-panel]"));

    let animationFrame = 0;
    const syncActivePanel = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const index = closestPanelIndex(story, panels);
        const panel = panels[index];
        if (!panel) return;
        setActivePanelIndex(index);
        const chapter = panel.closest<HTMLElement>(".chapter");
        if (chapter?.id) setActiveChapter(chapter.id);
      });
    };

    syncActivePanel();
    story.addEventListener("scroll", syncActivePanel, { passive: true });
    window.addEventListener("resize", syncActivePanel);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      story.removeEventListener("scroll", syncActivePanel);
      window.removeEventListener("resize", syncActivePanel);
    };
  }, []);

  const jumpTo = (id: string) => {
    const story = storyRef.current;
    const section = document.getElementById(id);
    if (!story || !section) return;
    setMenuOpen(false);
    scrollStoryTo(story, section);
  };

  const stepPanel = (direction: number) => {
    const story = storyRef.current;
    if (!story) return;
    const panels = Array.from(story.querySelectorAll<HTMLElement>("[data-story-panel]"));
    const currentIndex = closestPanelIndex(story, panels);
    const nextIndex = Math.min(panels.length - 1, Math.max(0, currentIndex + direction));
    const panel = panels[nextIndex];
    if (panel) scrollStoryTo(story, panel);
  };

  return (
    <div className="report-shell">
      <a className="skip-link" href="#overall">
        Skip to report
      </a>
      <div className="read-progress" aria-hidden="true">
        <span style={{ width: progress }} />
      </div>

      <header className="topbar">
        <button className="noise-mark" onClick={() => jumpTo("overall")} aria-label="Return to overall results">
          <Image src={reportAsset("noise-logo-black.png")} alt="Noise Media" width={1920} height={830} priority unoptimized />
        </button>
        <div className="report-name">
          <span>Noise ×</span>
          <strong>{report.client}</strong>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="report-chapters"
          aria-label={menuOpen ? "Close report menu" : "Open report menu"}
        >
          <i />
          <i />
          <i />
        </button>
      </header>

      <aside className={`chapter-nav ${menuOpen ? "open" : ""}`} aria-label="Report chapters" id="report-chapters">
        <p>Jump to chapter</p>
        <nav aria-label="Report navigation">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={activeChapter === chapter.id ? "active" : ""}
              onClick={() => jumpTo(chapter.id)}
              aria-current={activeChapter === chapter.id ? "location" : undefined}
            >
              <span>{chapter.number}</span>
              {chapter.label}
            </button>
          ))}
        </nav>
        <div className="nav-foot">
          <span>{String(activePanelIndex + 1).padStart(2, "0")}</span>
          <i />
          <span>{String(storyPanelCount).padStart(2, "0")}</span>
        </div>
      </aside>

      <main
        className="horizontal-story"
        ref={storyRef}
        tabIndex={0}
        onWheel={(event) => {
          if (isVerticalStory()) return;
          if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
          event.preventDefault();
          storyRef.current?.scrollBy({ left: event.deltaY, behavior: "auto" });
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") stepPanel(1);
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") stepPanel(-1);
        }}
        aria-label="Performance report"
      >
        <section className="chapter chapter-run light" id="overall">
          <div className="story-panel results-hero" data-story-panel>
            <p className="hero-kicker">
              {report.period} · compared with {report.previousPeriod}
            </p>
            <h1>Overall results</h1>
            <p className="hero-summary">
              Headline numbers across the full period, every channel included. Arrows show change versus {report.previousPeriod}.
            </p>
            <KpiBoard kpis={report.overall.kpis} previousPeriod={report.previousPeriod} />
            <div className="channel-mix" aria-label="Results by channel">
              <div className="mix-head">
                <span>Channel</span>
                <span>Spend</span>
                <span>Result</span>
                <span>Efficiency</span>
              </div>
              {report.overall.mix.map((row) => (
                <div className="mix-row" key={row.name}>
                  <strong>{row.name}</strong>
                  <span>{row.spend} <MixDelta value={row.spendChange} /></span>
                  <span>{row.result} <MixDelta value={row.resultChange} /></span>
                  <span>{row.efficiency} <MixDelta value={row.efficiencyChange} /></span>
                </div>
              ))}
            </div>
          </div>

          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="01"
              eyebrow="Key wins"
              title="What the overall numbers actually mean."
              intro="Each win: the core stat, whether it is good versus last period and benchmark, why, and the learning."
            />
            <div className="win-grid">
              {report.wins.map((win, index) => (
                <article className="win-card" key={win.title}>
                  <span>0{index + 1}</span>
                  <h3 className="editable" contentEditable suppressContentEditableWarning>{win.title}</h3>
                  <p className="win-result editable" contentEditable suppressContentEditableWarning>{win.stat}</p>
                  <p className="versus editable" contentEditable suppressContentEditableWarning>{win.versus}</p>
                  <NarrativeBlock label="What this means" text={win.means} />
                  <NarrativeBlock label="Why this happened" text={win.why} />
                  <NarrativeBlock label="Learning going forward" text={win.learning} accent />
                </article>
              ))}
            </div>
          </div>
        </section>

        {report.channels.map((channel, index) => (
          <section className="chapter chapter-run light" id={channel.id} key={channel.id}>
            <div className="story-panel" data-story-panel>
              <ChapterHeader
                number={String(index + 2).padStart(2, "0")}
                eyebrow={`${channel.name} · headline results`}
                title={`${channel.name} versus ${report.previousPeriod}.`}
                intro={channel.role}
              />
              <KpiBoard kpis={channel.kpis} previousPeriod={report.previousPeriod} />
              <div className="split-row">
                {channel.split.map((item) => (
                  <article key={item.name}>
                    <span>{item.name}</span>
                    <strong>{item.result}</strong>
                    <b>{item.metric}</b>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="story-panel" data-story-panel>
              <ChapterHeader
                number={String(index + 2).padStart(2, "0")}
                eyebrow={`${channel.name} · commentary`}
                title="What these results tell us."
                intro="Each point: the stat, whether it is good, why, and the learning. Then an overall rating."
              />
              <CommentaryGrid copy={channel.commentary} />
            </div>
          </section>
        ))}

        <section className="chapter chapter-run light" id="campaign">
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number={String(report.channels.length + 2).padStart(2, "0")}
              eyebrow="Campaign pull-out"
              title={report.campaign.name}
              intro={`${report.campaign.vs}. The campaign that most clearly explains the efficiency gain.`}
            />
            <KpiBoard kpis={report.campaign.kpis} previousPeriod={report.previousPeriod} />
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number={String(report.channels.length + 2).padStart(2, "0")}
              eyebrow="Campaign commentary"
              title="What this campaign tells us."
              intro="Each point: the stat, whether it is good, why, and the learning. Then an overall rating."
            />
            <CommentaryGrid copy={report.campaign.commentary} />
          </div>
        </section>

        <section className="chapter chapter-run creative-chapter" id="creative">
          {report.channels.map((channel) => (
            <div className="story-panel creative-story-panel" data-story-panel key={`${channel.id}-creative`}>
              <ChapterHeader
                number={String(report.channels.length + 3).padStart(2, "0")}
                eyebrow={`Winning creatives · ${channel.name}`}
                title={`Top ${channel.creatives.length} on ${channel.name}.`}
                intro="Key stats versus last period or benchmark, why it performed, and the learning we take into the next phase."
              />
              <div className="creative-stack">
                {channel.creatives.map((item, creativeIndex) => (
                  <article className="creative-card-full" key={item.title}>
                    {channel.id === "meta" ? (
                      <span className="creative-image">
                        <Image
                          src={reportAsset("indian-creative-triptych.png")}
                          alt={`${item.title} Indian Motorcycle campaign creative`}
                          width={1200}
                          height={675}
                          sizes="32vw"
                          unoptimized
                          style={{ left: `${-creativeIndex * 100}%` }}
                        />
                        <i>{item.stage}</i>
                      </span>
                    ) : (
                      <span className="type-creative">
                        <i>{item.stage}</i>
                        <b>{item.title}</b>
                      </span>
                    )}
                    <div className="creative-card-body">
                      <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                      <p className="creative-stats">
                        <strong>{item.primary}</strong>
                        <span>{item.primaryLabel} · {item.secondary}</span>
                      </p>
                      <p className="versus editable" contentEditable suppressContentEditableWarning>{item.versus}</p>
                      <p className="creative-objective">Objective: {item.objective}</p>
                      <NarrativeBlock label="Why it performed" text={item.why} />
                      <NarrativeBlock label="Learning we take" text={item.learning} accent />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="chapter chapter-run light" id="learnings">
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number={String(report.channels.length + 4).padStart(2, "0")}
              eyebrow="Core learnings"
              title="What the period taught us."
              intro="Carry these three lines into the next phase. Everything below them is execution."
            />
            <div className="learn-grid">
              {report.learnings.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                  <p className="editable" contentEditable suppressContentEditableWarning>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter chapter-run light" id="next">
          <div className="story-panel next-panel" data-story-panel>
            <ChapterHeader
              number={String(report.channels.length + 5).padStart(2, "0")}
              eyebrow="Next phase of work"
              title="What we are going to do."
              intro="Four moves that follow the results. Each one has a success test."
            />
            <div className="next-grid">
              {report.nextPhase.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                  <p className="editable" contentEditable suppressContentEditableWarning>{item.text}</p>
                  <small className="editable" contentEditable suppressContentEditableWarning>Success: {item.success}</small>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="slide-controls" aria-label="Report page navigation">
        <button onClick={() => stepPanel(-1)} disabled={activePanelIndex === 0} aria-label="Previous panel">
          <b aria-hidden="true">←</b><span>Previous</span>
        </button>
        <div>
          <span>{storyPanelLabels[activePanelIndex]}</span>
          <strong>{String(activePanelIndex + 1).padStart(2, "0")} / {String(storyPanelCount).padStart(2, "0")}</strong>
        </div>
        <button onClick={() => stepPanel(1)} disabled={activePanelIndex === storyPanelCount - 1} aria-label="Next panel">
          <span>Next</span><b aria-hidden="true">→</b>
        </button>
      </div>
    </div>
  );
}

function KpiBoard({ kpis, previousPeriod }: { kpis: Kpi[]; previousPeriod: string }) {
  return (
    <div className="kpi-board" aria-label="Headline stats versus previous period">
      {kpis.map((kpi) => (
        <div key={kpi.label}>
          <span>{kpi.label}</span>
          <strong className="editable" contentEditable suppressContentEditableWarning>{kpi.value}</strong>
          {kpi.change === "hold" ? (
            <small>{kpi.previous}</small>
          ) : (
            <Delta change={kpi.change} direction={kpi.direction} />
          )}
          {kpi.change === "hold" ? null : (
            <em>vs {previousPeriod} {kpi.previous}</em>
          )}
        </div>
      ))}
    </div>
  );
}

function Delta({ change, direction }: { change: string; direction: "up" | "down" }) {
  return (
    <small className={`delta ${direction}`}>
      {direction === "up" ? "↑" : "↓"} {change}
    </small>
  );
}

function MixDelta({ value }: { value: string }) {
  const down = value.startsWith("−") || value.startsWith("-");
  const up = value.startsWith("+");
  const amount = value.replace(/^[+−-]/, "");
  return (
    <em>
      {down ? "↓ " : up ? "↑ " : ""}
      {amount}
    </em>
  );
}

function CommentaryGrid({
  copy,
}: {
  copy: {
    points: { stat: string; versus: string; means: string; why: string; learning: string }[];
    rating: { verdict: string; text: string };
  };
}) {
  return (
    <div className="commentary-grid">
      {copy.points.map((point, index) => (
        <article className="point-card" key={point.stat}>
          <span>0{index + 1}</span>
          <strong className="editable" contentEditable suppressContentEditableWarning>{point.stat}</strong>
          <p className="versus editable" contentEditable suppressContentEditableWarning>{point.versus}</p>
          <NarrativeBlock label="What this means" text={point.means} />
          <NarrativeBlock label="Why this happened" text={point.why} />
          <NarrativeBlock label="Learning going forward" text={point.learning} />
        </article>
      ))}
      <article className="rating-card">
        <span>Overall rating</span>
        <strong className="editable" contentEditable suppressContentEditableWarning>{copy.rating.verdict}</strong>
        <p className="editable" contentEditable suppressContentEditableWarning>{copy.rating.text}</p>
      </article>
    </div>
  );
}

function ChapterHeader({
  number,
  eyebrow,
  title,
  intro,
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="chapter-header">
      <div className="section-number">{number}</div>
      <div>
        <span className="eyebrow editable" contentEditable suppressContentEditableWarning>{eyebrow}</span>
        <h2 className="editable" contentEditable suppressContentEditableWarning>{title}</h2>
      </div>
      <p className="editable" contentEditable suppressContentEditableWarning>{intro}</p>
    </header>
  );
}

function NarrativeBlock({
  label,
  text,
  accent = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div className={`narrative-block ${accent ? "accent" : ""}`}>
      <span className="editable" contentEditable suppressContentEditableWarning>{label}</span>
      <p className="editable" contentEditable suppressContentEditableWarning>{text}</p>
    </div>
  );
}
