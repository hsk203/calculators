# Calculator Hub

Free online calculators for work, money, and everyday life — live at
**https://calc.aitech8.com**.

Each calculator is one page, one keyword, with the formula explained, a
worked example with real numbers, and a FAQ. Every calculation runs in the
visitor's browser (client-side JavaScript); nothing is sent to a server.

## Batch 1 — 12 calculators, 8 categories

| Category | Calculators |
| --- | --- |
| Finance & Tax | Compound Interest, Take-Home Pay |
| Business & Startup | Startup Cost, Break-Even, Profit Margin |
| Freelance & Gig Work | Freelance Tax |
| Real Estate | Mortgage Payment |
| Health & Fitness | BMI, Calorie |
| Construction & Home | Paint, Tile |
| E-Commerce & Marketing | Ad ROI |
| Everyday Life | (coming soon) |

## Stack

- Kanade Astro template (Astro 7 + Tailwind 4 + Vue 3)
- Static site, deployed on Cloudflare Workers (`calculators` worker)
- Custom domain: `calc.aitech8.com`

## Develop

```sh
pnpm install
SITE_URL=https://calc.aitech8.com pnpm build   # includes astro check + vue-tsc
python3 ../run_wrangler.py . deploy            # deploy to Cloudflare Workers
```

Add a calculator by adding one entry to `src/data/calculators.ts` — fields,
formula, worked example, and FAQs. The widget (`src/components/CalculatorWidget.astro`)
renders the form and runs the calculation; the page
(`src/pages/calculators/[...slug].astro`) renders the SEO content and FAQ schema.
