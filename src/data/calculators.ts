import type { PostSummary } from "../lib/posts";

// ---------------------------------------------------------------------------
// Calculator Hub data: 8 categories, 12 calculators (batch 1).
// Every calculator has: working inputs, a formula, a worked example with
// verified numbers, and 3-5 FAQs. Formulas are the standard textbook ones.
// ---------------------------------------------------------------------------

export type CalculatorCategory = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
};

export const CATEGORIES: CalculatorCategory[] = [
  {
    slug: "finance-tax",
    name: "Finance & Tax",
    tagline: "Money, tax, and investing",
    description:
      "Calculators for money, tax, and investing: mortgage payments, take-home pay, and compound interest — each with the formula explained.",
  },
  {
    slug: "business-startup",
    name: "Business & Startup",
    tagline: "Start and run a business",
    description:
      "Calculators for starting and running a business: startup costs, break-even points, and profit margins.",
  },
  {
    slug: "freelance-gig",
    name: "Freelance & Gig Work",
    tagline: "For freelancers and gig workers",
    description:
      "Calculators for freelancers and gig workers: tax estimates and what you actually keep from each job.",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "Buying and owning property",
    description:
      "Calculators for buying and owning property: mortgage payments and the true cost of a home.",
  },
  {
    slug: "health-fitness",
    name: "Health & Fitness",
    tagline: "Your body, by the numbers",
    description:
      "Calculators for your body: body mass index (BMI) and your daily calorie needs.",
  },
  {
    slug: "construction-home",
    name: "Construction & Home",
    tagline: "Building and renovating",
    description:
      "Calculators for building and renovating: how much paint and how many tiles a job really needs.",
  },
  {
    slug: "ecommerce-marketing",
    name: "E-Commerce & Marketing",
    tagline: "Selling online",
    description:
      "Calculators for selling online: advertising ROI, return on ad spend, and profit margins.",
  },
  {
    slug: "everyday-life",
    name: "Everyday Life",
    tagline: "Daily life, calculated",
    description:
      "Everyday calculators for daily life. More calculators are coming to this category soon.",
  },
];

export type CalculatorField = {
  id: string;
  label: string;
  type: "number" | "select";
  unit?: string;
  placeholder?: string;
  defaultValue?: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  /** Shown only when the unit toggle equals this group. */
  group?: string;
  /** Plain-English explanation shown in the "what each input means" list. */
  help?: string;
};

export type Faq = { q: string; a: string };

export type Calculator = {
  slug: string;
  /** H1 keyword, e.g. "Mortgage Payment Calculator". */
  title: string;
  /** Unique meta description. */
  description: string;
  category: string;
  tags: string[];
  popular?: boolean;
  fields: CalculatorField[];
  unitToggle?: {
    id: string;
    label: string;
    options: { value: string; label: string }[];
    defaultValue: string;
  };
  /** Key into the COMPUTE map in CalculatorWidget.astro. */
  compute: string;
  resultHint: string;
  formula: string;
  formulaNote?: string;
  howItWorks: string[];
  example: { title: string; body: string[] };
  faqs: Faq[];
  related: string[];
};

export const CALCULATORS: Calculator[] = [
  {
    slug: "mortgage-payment-calculator",
    title: "Mortgage Payment Calculator",
    description:
      "Calculate your monthly mortgage payment from the loan amount, interest rate, and term — plus total interest and total paid over the life of the loan.",
    category: "real-estate",
    tags: ["mortgage", "home loan", "monthly payment", "interest"],
    popular: true,
    fields: [
      {
        id: "loanAmount",
        label: "Loan amount",
        type: "number",
        unit: "$",
        defaultValue: 300000,
        min: 1000,
        step: 1000,
        help: "The total amount you borrow — usually the home price minus your down payment.",
      },
      {
        id: "annualRate",
        label: "Annual interest rate",
        type: "number",
        unit: "%",
        defaultValue: 6,
        min: 0,
        max: 30,
        step: 0.05,
        help: "The yearly interest rate on the loan, as a percentage. A 6% rate means 0.5% per month.",
      },
      {
        id: "years",
        label: "Loan term",
        type: "number",
        unit: "years",
        defaultValue: 30,
        min: 1,
        max: 50,
        step: 1,
        help: "How long you take to repay the loan. 30 years is the most common term in the US; 15 years means a higher monthly payment but much less total interest.",
      },
    ],
    compute: "mortgage",
    resultHint:
      "Enter the loan amount, rate, and term to see your monthly payment.",
    formula:
      "M = P × r(1 + r)^n ÷ ((1 + r)^n − 1), where r is the monthly interest rate (annual rate ÷ 12) and n is the number of monthly payments (years × 12).",
    howItWorks: [
      "A mortgage payment has two parts: the interest the bank charges and the principal you pay back. Early in the loan, most of your payment goes to interest; over time, more goes to principal. This calculator uses the standard amortisation formula lenders use, so the monthly payment it shows is the fixed payment that pays the loan off exactly over the term.",
      "The payment shown here covers principal and interest only. Your real monthly housing cost is usually higher, because most lenders also collect property tax and home insurance with the payment (often called PITI), and some loans add mortgage insurance (PMI).",
    ],
    example: {
      title: "Worked example: $300,000 at 6% for 30 years",
      body: [
        "Loan amount: $300,000",
        "Annual rate: 6% → monthly rate 0.5%",
        "Term: 30 years → 360 monthly payments",
        "Monthly payment: $1,798.65",
        "Total paid over 30 years: $647,514.57",
        "Total interest: $347,514.57 — more than the loan itself, which is why a lower rate or a shorter term saves so much.",
      ],
    },
    faqs: [
      {
        q: "What does the monthly payment include?",
        a: "Principal and interest only. Property tax, home insurance, and mortgage insurance (PMI) are usually extra — add them to get your true monthly housing cost.",
      },
      {
        q: "Why is the first payment mostly interest?",
        a: "Interest is charged on the balance you still owe. Early on the balance is large, so the interest part is large. As you pay the balance down, the interest part shrinks and more of each payment goes to principal.",
      },
      {
        q: "Is a 15-year mortgage better than a 30-year one?",
        a: "A 15-year loan has a higher monthly payment but far less total interest. On a $300,000 loan at 6%, a 15-year term costs about $2,531 a month but only about $155,683 in total interest, versus $347,515 on a 30-year term. Choose the term you can afford every month without strain.",
      },
      {
        q: "Does this calculator include taxes and insurance?",
        a: "No. Add your annual property tax and insurance, divide by 12, and add that to the monthly payment shown here for the full picture.",
      },
    ],
    related: [
      "take-home-pay-calculator",
      "compound-interest-calculator",
      "break-even-calculator",
    ],
  },
  {
    slug: "freelance-tax-calculator",
    title: "Freelance Tax Calculator",
    description:
      "Estimate your freelance tax from annual income, business expenses, and your effective tax rate — and see what you actually keep after tax.",
    category: "freelance-gig",
    tags: ["freelance", "tax", "self-employed", "income tax"],
    popular: true,
    fields: [
      {
        id: "income",
        label: "Annual freelance income",
        type: "number",
        unit: "$",
        defaultValue: 80000,
        min: 0,
        step: 500,
        help: "Everything you earned from freelance work in the year, before expenses.",
      },
      {
        id: "expenses",
        label: "Business expenses",
        type: "number",
        unit: "$",
        defaultValue: 12000,
        min: 0,
        step: 100,
        help: "Ordinary business costs: software, equipment, internet, travel, home office. Only count costs that are genuinely for the business.",
      },
      {
        id: "rate",
        label: "Effective tax rate",
        type: "number",
        unit: "%",
        defaultValue: 20,
        min: 0,
        max: 60,
        step: 0.5,
        help: "Your estimated effective tax rate as a percentage. If you paid $13,600 on $68,000 of taxable income last year, your rate was 20%.",
      },
    ],
    compute: "freelance-tax",
    resultHint:
      "Enter your income, expenses, and tax rate to estimate your tax.",
    formula:
      "Taxable income = annual income − business expenses. Estimated tax = taxable income × effective tax rate.",
    howItWorks: [
      "Freelancers usually pay tax on profit, not on gross income. Business expenses — software, equipment, travel, a home office — reduce the income that gets taxed, so tracking them is the single biggest lever on your tax bill.",
      "The “effective tax rate” is a single blended rate you enter yourself. It is an estimate: your real rate depends on your country's tax bands, deductions, and whether you also pay self-employment or social charges. Use your last year's actual rate, or your accountant's estimate.",
    ],
    example: {
      title: "Worked example: $80,000 income, $12,000 expenses, 20% rate",
      body: [
        "Annual income: $80,000",
        "Business expenses: $12,000",
        "Taxable income: $80,000 − $12,000 = $68,000",
        "Estimated tax: $68,000 × 20% = $13,600",
        "You keep: $80,000 − $13,600 = $66,400 before any other charges.",
      ],
    },
    faqs: [
      {
        q: "What counts as a business expense?",
        a: "Costs that are ordinary and necessary for your work: software subscriptions, a laptop, internet, phone, travel to clients, and a home-office share of rent and utilities. Keep receipts — the exact rules depend on your country.",
      },
      {
        q: "Why is the result only an estimate?",
        a: "Real tax uses bands, allowances, and separate charges (like self-employment tax) that a single rate cannot capture. This calculator gives a planning number; your tax return is the final word.",
      },
      {
        q: "Should I set money aside for tax?",
        a: "Yes. A common rule is to set aside your effective rate — for example 20% — of every payment you receive, in a separate account, so the tax bill never surprises you.",
      },
      {
        q: "Does this include VAT or sales tax?",
        a: "No. This estimates income tax only. If you charge VAT or GST, that is collected on top of your fees and passed to the tax authority; it is not part of this calculation.",
      },
    ],
    related: [
      "take-home-pay-calculator",
      "profit-margin-calculator",
      "break-even-calculator",
    ],
  },
  {
    slug: "business-startup-cost-calculator",
    title: "Business Startup Cost Calculator",
    description:
      "Add up the one-time and monthly costs of starting a business — and see your first-year total and monthly burn before you spend anything.",
    category: "business-startup",
    tags: ["startup", "business costs", "budget", "runway"],
    fields: [
      {
        id: "once_equipment",
        label: "Equipment",
        type: "number",
        unit: "$",
        defaultValue: 5000,
        min: 0,
        step: 100,
        help: "One-time: computers, tools, machines, furniture — anything you buy once to start.",
      },
      {
        id: "once_licenses",
        label: "Licences & registration",
        type: "number",
        unit: "$",
        defaultValue: 1200,
        min: 0,
        step: 50,
        help: "One-time: business registration, licences, and permits.",
      },
      {
        id: "once_website",
        label: "Website & branding",
        type: "number",
        unit: "$",
        defaultValue: 800,
        min: 0,
        step: 50,
        help: "One-time: website build, logo, and branding.",
      },
      {
        id: "once_marketing",
        label: "Launch marketing",
        type: "number",
        unit: "$",
        defaultValue: 1500,
        min: 0,
        step: 50,
        help: "One-time: launch ads, printed materials, and opening promotions.",
      },
      {
        id: "once_legal",
        label: "Legal & accounting setup",
        type: "number",
        unit: "$",
        defaultValue: 1000,
        min: 0,
        step: 50,
        help: "One-time: lawyer and accountant fees for setting up the business.",
      },
      {
        id: "once_other",
        label: "Other one-time costs",
        type: "number",
        unit: "$",
        defaultValue: 500,
        min: 0,
        step: 50,
        help: "One-time: anything else you pay once — deposits, initial stock, training.",
      },
      {
        id: "month_rent",
        label: "Rent & utilities",
        type: "number",
        unit: "$/mo",
        defaultValue: 1200,
        min: 0,
        step: 50,
        help: "Monthly: office or shop rent, electricity, water, and internet.",
      },
      {
        id: "month_salaries",
        label: "Salaries (incl. your own)",
        type: "number",
        unit: "$/mo",
        defaultValue: 4000,
        min: 0,
        step: 100,
        help: "Monthly: wages for staff — and the minimum you need to pay yourself to live on.",
      },
      {
        id: "month_software",
        label: "Software & subscriptions",
        type: "number",
        unit: "$/mo",
        defaultValue: 200,
        min: 0,
        step: 10,
        help: "Monthly: software, apps, and subscriptions the business needs every month.",
      },
      {
        id: "month_marketing",
        label: "Ongoing marketing",
        type: "number",
        unit: "$/mo",
        defaultValue: 500,
        min: 0,
        step: 50,
        help: "Monthly: regular ads, social media, and content costs.",
      },
      {
        id: "month_other",
        label: "Other monthly costs",
        type: "number",
        unit: "$/mo",
        defaultValue: 100,
        min: 0,
        step: 10,
        help: "Monthly: anything else that repeats every month.",
      },
    ],
    compute: "startup-cost",
    resultHint:
      "Enter your one-time and monthly costs to see your first-year total.",
    formula:
      "Total one-time cost = sum of all one-time costs. Monthly burn = sum of all monthly costs. First-year total = one-time costs + 12 × monthly burn.",
    howItWorks: [
      "Starting a business has two kinds of cost: one-time costs you pay once (equipment, licences, a website) and recurring costs you pay every month (rent, salaries, software). Founders often budget the first and forget the second — but the monthly burn is what decides how long your money lasts.",
      "The first-year total is the number to raise or save before you start: one-time costs plus twelve months of burn. If that number is bigger than the money you have, cut the monthly costs first — they repeat every month.",
    ],
    example: {
      title: "Worked example: a small service business",
      body: [
        "One-time costs: equipment $5,000, licences $1,200, website $800, launch marketing $1,500, legal $1,000, other $500 → $10,000",
        "Monthly costs: rent $1,200, salaries $4,000, software $200, marketing $500, other $100 → $6,000 per month",
        "First-year total: $10,000 + 12 × $6,000 = $82,000",
        "That $82,000 is the money to have ready before you start — it buys twelve months of runway.",
      ],
    },
    faqs: [
      {
        q: "What should I include in one-time costs?",
        a: "Anything you pay once to get started: equipment, licences and registrations, legal fees, a website build, branding, and your first batch of stock or materials.",
      },
      {
        q: "What is monthly burn?",
        a: "The total of your recurring monthly costs — rent, salaries, software, and marketing. It is the speed at which your bank balance falls before the business earns money.",
      },
      {
        q: "How much runway does the first-year total give me?",
        a: "Twelve months. If you raise or save the first-year total, you can run for a year without revenue. Most advisers suggest 12–18 months of runway for a new business.",
      },
      {
        q: "Should I include my own salary?",
        a: "Yes — put the minimum you need to live on under monthly salaries. Founders who pay themselves nothing run out of personal savings and quit early.",
      },
    ],
    related: [
      "break-even-calculator",
      "profit-margin-calculator",
      "take-home-pay-calculator",
    ],
  },
  {
    slug: "break-even-calculator",
    title: "Break-Even Calculator",
    description:
      "Find how many units you must sell to cover your costs — from fixed costs, variable cost per unit, and your selling price.",
    category: "business-startup",
    tags: ["break-even", "fixed costs", "pricing", "units"],
    fields: [
      {
        id: "fixed",
        label: "Fixed costs",
        type: "number",
        unit: "$",
        defaultValue: 10000,
        min: 0,
        step: 100,
        help: "Costs that do not change with sales: rent, salaries, insurance, software subscriptions.",
      },
      {
        id: "variable",
        label: "Variable cost per unit",
        type: "number",
        unit: "$",
        defaultValue: 15,
        min: 0,
        step: 0.5,
        help: "The cost of making or delivering one unit: materials, packaging, shipping, payment fees.",
      },
      {
        id: "price",
        label: "Price per unit",
        type: "number",
        unit: "$",
        defaultValue: 25,
        min: 0,
        step: 0.5,
        help: "What you charge for one unit.",
      },
    ],
    compute: "break-even",
    resultHint:
      "Enter your fixed costs, variable cost, and price to find your break-even point.",
    formula:
      "Break-even units = fixed costs ÷ (price per unit − variable cost per unit). Break-even revenue = break-even units × price per unit.",
    howItWorks: [
      "Fixed costs (rent, salaries) stay the same no matter how much you sell. Variable costs (materials, packaging, payment fees) grow with each unit. Each sale contributes price minus variable cost toward the fixed costs — that contribution is called the contribution margin.",
      "You break even when total contribution covers the fixed costs. Sell fewer units than the break-even point and you lose money; sell more and every extra unit is profit (before tax).",
    ],
    example: {
      title:
        "Worked example: fixed costs $10,000, variable cost $15, price $25",
      body: [
        "Contribution per unit: $25 − $15 = $10",
        "Break-even units: $10,000 ÷ $10 = 1,000 units",
        "Break-even revenue: 1,000 × $25 = $25,000",
        "Sell 1,001 units and you are in profit; sell 999 and you are in loss.",
      ],
    },
    faqs: [
      {
        q: "What if the price is lower than the variable cost?",
        a: "Then every sale loses money and there is no break-even point — you must raise the price or cut the variable cost before you sell anything.",
      },
      {
        q: "Does this include tax?",
        a: "No. Break-even here is before tax. After tax you need a few more sales to cover the tax on the profit.",
      },
      {
        q: "How do I lower my break-even point?",
        a: "Three ways: cut fixed costs, cut variable cost per unit, or raise the price. Raising the price usually moves the number fastest, but it can reduce how many units you sell.",
      },
      {
        q: "Can I use this for a service business?",
        a: "Yes. Treat one client project or one hour as a “unit”: fixed costs are your monthly overhead, variable cost is what each project costs you, and price is what you charge per project.",
      },
    ],
    related: [
      "profit-margin-calculator",
      "business-startup-cost-calculator",
      "ad-roi-calculator",
    ],
  },
  {
    slug: "compound-interest-calculator",
    title: "Compound Interest Calculator",
    description:
      "See how your savings grow with compound interest — enter the principal, annual rate, years, and compounding frequency.",
    category: "finance-tax",
    tags: ["compound interest", "savings", "investment", "future value"],
    popular: true,
    fields: [
      {
        id: "principal",
        label: "Principal (starting amount)",
        type: "number",
        unit: "$",
        defaultValue: 10000,
        min: 0,
        step: 100,
        help: "The amount you invest at the start.",
      },
      {
        id: "rate",
        label: "Annual interest rate",
        type: "number",
        unit: "%",
        defaultValue: 5,
        min: 0,
        max: 30,
        step: 0.1,
        help: "The annual interest rate, as a percentage.",
      },
      {
        id: "years",
        label: "Years invested",
        type: "number",
        unit: "years",
        defaultValue: 10,
        min: 1,
        max: 60,
        step: 1,
        help: "How long the money stays invested.",
      },
      {
        id: "frequency",
        label: "Compounding frequency",
        type: "select",
        defaultValue: "12",
        options: [
          { value: "1", label: "Yearly" },
          { value: "4", label: "Quarterly" },
          { value: "12", label: "Monthly" },
          { value: "365", label: "Daily" },
        ],
        help: "How often interest is added to the balance. Monthly is the most common for savings accounts.",
      },
    ],
    compute: "compound",
    resultHint:
      "Enter the principal, rate, years, and compounding frequency to see your future value.",
    formula:
      "A = P × (1 + r/n)^(n×t), where P is the principal, r the annual rate, n the number of compounding periods per year, and t the years.",
    howItWorks: [
      "Compound interest means you earn interest on your interest. Each period, the interest is added to the balance, so the next period's interest is calculated on a larger amount. The more often interest compounds, and the longer you leave it, the faster the balance grows.",
      "The difference between compounding monthly and yearly looks small in year one, but over decades it is large — that is why starting early matters more than the exact rate.",
    ],
    example: {
      title: "Worked example: $10,000 at 5% for 10 years",
      body: [
        "Principal: $10,000, annual rate: 5%, term: 10 years",
        "Compounded monthly: $16,470.09 (interest earned $6,470.09)",
        "Compounded yearly: $16,288.95",
        "Monthly compounding earns $181.14 more than yearly compounding on the same money.",
      ],
    },
    faqs: [
      {
        q: "What is the difference between compound and simple interest?",
        a: "Simple interest pays only on the original amount. Compound interest pays on the amount plus all interest earned so far, so the balance grows faster every year.",
      },
      {
        q: "Does the frequency matter much?",
        a: "Yes, but less than the rate and the time. On $10,000 at 5% for 10 years, monthly compounding earns $181 more than yearly compounding — real money, but the 10 years matter far more than the frequency.",
      },
      {
        q: "Is the result guaranteed?",
        a: "No. This assumes a fixed rate for the whole period. Real investments change rate, and inflation reduces what the future amount can buy.",
      },
      {
        q: "What if I add money every month?",
        a: "Regular contributions grow the result a lot. This calculator covers a single lump sum; a version with monthly contributions is coming soon.",
      },
    ],
    related: [
      "mortgage-payment-calculator",
      "take-home-pay-calculator",
      "break-even-calculator",
    ],
  },
  {
    slug: "take-home-pay-calculator",
    title: "Take-Home Pay Calculator",
    description:
      "Work out your net take-home pay from your gross salary, tax rate, and other deductions — annual and monthly.",
    category: "finance-tax",
    tags: ["salary", "take-home pay", "net pay", "tax"],
    popular: true,
    fields: [
      {
        id: "gross",
        label: "Gross annual salary",
        type: "number",
        unit: "$",
        defaultValue: 72000,
        min: 0,
        step: 500,
        help: "Your gross salary for the year, before tax and deductions.",
      },
      {
        id: "rate",
        label: "Effective tax rate",
        type: "number",
        unit: "%",
        defaultValue: 20,
        min: 0,
        max: 60,
        step: 0.5,
        help: "Your estimated effective tax rate as a percentage. If you paid $14,400 of tax on $72,000 last year, your rate was 20%.",
      },
      {
        id: "deductions",
        label: "Other annual deductions",
        type: "number",
        unit: "$",
        defaultValue: 3600,
        min: 0,
        step: 100,
        help: "Other annual deductions: pension contributions, health insurance, student loan repayments.",
      },
    ],
    compute: "take-home",
    resultHint:
      "Enter your gross salary, tax rate, and deductions to see your take-home pay.",
    formula:
      "Net pay = gross pay × (1 − tax rate) − other deductions. Monthly net = annual net ÷ 12.",
    howItWorks: [
      "Gross pay is what your contract says. Tax takes a slice, and other deductions (pension, health insurance, student loans) take more. What is left is your take-home pay — the number that actually reaches your bank account.",
      "This calculator uses one blended tax rate as an estimate. Real payroll tax uses bands and allowances, so treat the result as a planning figure and check your payslip for the exact number.",
    ],
    example: {
      title: "Worked example: $72,000 gross, 20% tax, $3,600 deductions",
      body: [
        "Gross salary: $72,000 per year",
        "Tax: $72,000 × 20% = $14,400",
        "Other deductions: $3,600",
        "Take-home pay: $72,000 − $14,400 − $3,600 = $54,000 per year",
        "Monthly take-home pay: $54,000 ÷ 12 = $4,500",
      ],
    },
    faqs: [
      {
        q: "Why is this only an estimate?",
        a: "Real tax is charged in bands, and allowances differ by country and by personal situation. A single blended rate cannot capture that. Use your last payslip's effective rate for the closest estimate.",
      },
      {
        q: "What counts as “other deductions”?",
        a: "Anything taken from your pay after tax: pension or retirement contributions, health insurance premiums, student loan repayments, and union dues.",
      },
      {
        q: "How do I find my effective tax rate?",
        a: "Divide the total tax on your last annual tax statement by your gross income. If you paid $14,400 on $72,000, your effective rate is 20%.",
      },
      {
        q: "Does this include employer contributions?",
        a: "No. Employer pension or insurance contributions are not part of your gross pay and are not deducted here.",
      },
    ],
    related: [
      "freelance-tax-calculator",
      "compound-interest-calculator",
      "mortgage-payment-calculator",
    ],
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    description:
      "Calculate your body mass index (BMI) from your weight and height — in metric or imperial units — and see which category you fall into.",
    category: "health-fitness",
    tags: ["BMI", "body mass index", "weight", "health"],
    popular: true,
    unitToggle: {
      id: "units",
      label: "Units",
      defaultValue: "metric",
      options: [
        { value: "metric", label: "Metric (kg / cm)" },
        { value: "imperial", label: "Imperial (lb / in)" },
      ],
    },
    fields: [
      {
        id: "weightKg",
        label: "Weight",
        type: "number",
        unit: "kg",
        defaultValue: 70,
        min: 20,
        max: 300,
        step: 0.5,
        group: "metric",
        help: "Your weight in kilograms.",
      },
      {
        id: "heightCm",
        label: "Height",
        type: "number",
        unit: "cm",
        defaultValue: 175,
        min: 100,
        max: 230,
        step: 0.5,
        group: "metric",
        help: "Your height in centimetres.",
      },
      {
        id: "weightLb",
        label: "Weight",
        type: "number",
        unit: "lb",
        defaultValue: 154,
        min: 40,
        max: 660,
        step: 0.5,
        group: "imperial",
        help: "Your weight in pounds.",
      },
      {
        id: "heightIn",
        label: "Height",
        type: "number",
        unit: "in",
        defaultValue: 69,
        min: 40,
        max: 90,
        step: 0.5,
        group: "imperial",
        help: "Your height in inches.",
      },
    ],
    compute: "bmi",
    resultHint: "Enter your weight and height to calculate your BMI.",
    formula:
      "BMI = weight (kg) ÷ height (m)². Imperial: BMI = 703 × weight (lb) ÷ height (in)².",
    howItWorks: [
      "Body mass index (BMI) is a quick screening number: your weight divided by your height squared. It does not measure body fat directly, but for most adults it tracks closely enough to be useful.",
      "The standard adult categories are: under 18.5 underweight, 18.5–24.9 healthy, 25–29.9 overweight, 30 and above obese. Athletes with a lot of muscle can score “overweight” while being lean — BMI is a starting point, not a diagnosis.",
    ],
    example: {
      title: "Worked example: 70 kg, 1.75 m",
      body: [
        "Weight: 70 kg, height: 1.75 m",
        "BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = 22.9",
        "Category: healthy weight (18.5–24.9).",
      ],
    },
    faqs: [
      {
        q: "What is a healthy BMI?",
        a: "18.5 to 24.9 for most adults. Below 18.5 is underweight, 25–29.9 is overweight, and 30 or above is obese.",
      },
      {
        q: "Is BMI accurate?",
        a: "It is a screening tool, not a diagnosis. It does not separate muscle from fat, so very muscular people can score high while being lean. It also works less well for children, older adults, and pregnant women.",
      },
      {
        q: "What should I do if my BMI is high?",
        a: "Use it as a prompt to check your habits — food, movement, sleep — and talk to a doctor or dietitian before starting a diet. A single number does not define your health.",
      },
      {
        q: "Why is height squared?",
        a: "Body weight scales with volume, which grows with the cube of height, while the index uses the square as a practical compromise that fits population data well.",
      },
    ],
    related: ["calorie-calculator", "take-home-pay-calculator"],
  },
  {
    slug: "calorie-calculator",
    title: "Calorie Calculator",
    description:
      "Estimate your daily calorie needs with the Mifflin-St Jeor equation — BMR plus your activity level, for weight maintenance, loss, or gain.",
    category: "health-fitness",
    tags: ["calories", "BMR", "TDEE", "weight loss"],
    popular: true,
    fields: [
      {
        id: "age",
        label: "Age",
        type: "number",
        unit: "years",
        defaultValue: 30,
        min: 10,
        max: 100,
        step: 1,
        help: "Your age in years.",
      },
      {
        id: "gender",
        label: "Gender",
        type: "select",
        defaultValue: "female",
        options: [
          { value: "female", label: "Female" },
          { value: "male", label: "Male" },
        ],
        help: "The Mifflin-St Jeor equation uses different constants for men and women.",
      },
      {
        id: "weight",
        label: "Weight",
        type: "number",
        unit: "kg",
        defaultValue: 65,
        min: 30,
        max: 300,
        step: 0.5,
        help: "Your weight in kilograms.",
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        unit: "cm",
        defaultValue: 165,
        min: 120,
        max: 230,
        step: 0.5,
        help: "Your height in centimetres.",
      },
      {
        id: "activity",
        label: "Activity level",
        type: "select",
        defaultValue: "1.55",
        options: [
          { value: "1.2", label: "Sedentary — desk job, little exercise" },
          {
            value: "1.375",
            label: "Lightly active — light exercise 1–3 days/week",
          },
          {
            value: "1.55",
            label: "Moderately active — moderate exercise 3–5 days/week",
          },
          {
            value: "1.725",
            label: "Very active — hard exercise 6–7 days/week",
          },
          {
            value: "1.9",
            label: "Extra active — physical job or training twice a day",
          },
        ],
        help: "How active you are in a normal week. Be honest — most people overestimate.",
      },
    ],
    compute: "calorie",
    resultHint:
      "Enter your age, gender, weight, height, and activity level to estimate your daily calories.",
    formula:
      "Mifflin-St Jeor: men BMR = 10×weight + 6.25×height − 5×age + 5; women BMR = 10×weight + 6.25×height − 5×age − 161 (weight in kg, height in cm). Daily calories = BMR × activity factor (1.2 sedentary to 1.9 very active).",
    howItWorks: [
      "Your body burns calories even at rest — that is your basal metabolic rate (BMR). Daily activity multiplies it: a desk job multiplies by about 1.2, heavy training by up to 1.9. The result is an estimate of the calories that maintain your current weight.",
      "To lose weight, eat a little below the number (a 300–500 kcal daily deficit is the usual advice); to gain, eat above it. The formula is an estimate — real needs vary by several hundred calories.",
    ],
    example: {
      title:
        "Worked example: woman, 30 years, 65 kg, 165 cm, moderately active",
      body: [
        "BMR = 10×65 + 6.25×165 − 5×30 − 161 = 650 + 1,031.25 − 150 − 161 = 1,370 kcal/day",
        "Activity factor (moderately active): 1.55",
        "Daily calories to maintain weight: 1,370 × 1.55 ≈ 2,124 kcal/day",
        "To lose about 0.5 kg per week, aim for roughly 1,600–1,800 kcal/day.",
      ],
    },
    faqs: [
      {
        q: "What is BMR?",
        a: "Basal metabolic rate — the calories your body burns at complete rest, just to keep you alive. Everything you do on top of that adds to the total.",
      },
      {
        q: "How do I pick my activity level?",
        a: "Sedentary: desk job, little exercise. Lightly active: light exercise 1–3 days a week. Moderately active: moderate exercise 3–5 days. Very active: hard exercise 6–7 days. Extra active: physical job or training twice a day.",
      },
      {
        q: "How accurate is the result?",
        a: "Within a few hundred calories for most people. It is a starting point — track your weight for two weeks and adjust up or down if it moves the wrong way.",
      },
      {
        q: "How many calories should I eat to lose weight?",
        a: "A common target is 300–500 kcal below your maintenance number, which usually means about 0.5 kg of fat loss per week. Do not go far below your BMR without medical advice.",
      },
    ],
    related: ["bmi-calculator", "take-home-pay-calculator"],
  },
  {
    slug: "paint-calculator",
    title: "Paint Calculator",
    description:
      "Work out how much paint you need from the wall size, number of walls, and coats — in gallons or litres, with a buy-extra allowance.",
    category: "construction-home",
    tags: ["paint", "coverage", "renovation", "DIY"],
    unitToggle: {
      id: "units",
      label: "Units",
      defaultValue: "ft",
      options: [
        { value: "ft", label: "Feet (ft)" },
        { value: "m", label: "Metres (m)" },
      ],
    },
    fields: [
      {
        id: "lengthFt",
        label: "Wall length",
        type: "number",
        unit: "ft",
        defaultValue: 12,
        min: 0.5,
        step: 0.5,
        group: "ft",
        help: "The length of one wall, in feet.",
      },
      {
        id: "heightFt",
        label: "Wall height",
        type: "number",
        unit: "ft",
        defaultValue: 8,
        min: 0.5,
        step: 0.5,
        group: "ft",
        help: "The height of the wall, in feet.",
      },
      {
        id: "lengthM",
        label: "Wall length",
        type: "number",
        unit: "m",
        defaultValue: 3.6,
        min: 0.2,
        step: 0.1,
        group: "m",
        help: "The length of one wall, in metres.",
      },
      {
        id: "heightM",
        label: "Wall height",
        type: "number",
        unit: "m",
        defaultValue: 2.4,
        min: 0.2,
        step: 0.1,
        group: "m",
        help: "The height of the wall, in metres.",
      },
      {
        id: "walls",
        label: "Number of walls",
        type: "number",
        defaultValue: 4,
        min: 1,
        max: 20,
        step: 1,
        help: "How many walls of this size you are painting.",
      },
      {
        id: "coats",
        label: "Number of coats",
        type: "number",
        defaultValue: 2,
        min: 1,
        max: 4,
        step: 1,
        help: "Two coats is the standard for a lasting finish.",
      },
    ],
    compute: "paint",
    resultHint:
      "Enter the wall size, number of walls, and coats to see how much paint you need.",
    formula:
      "Paintable area = wall length × wall height × number of walls × number of coats. Paint needed = area ÷ 350 sq ft per gallon (about 10 sq m per litre).",
    howItWorks: [
      "Paint is sold by coverage: one US gallon covers about 350 square feet in one coat, and one litre covers about 10 square metres. Multiply the wall area by the number of coats, divide by the coverage, and you have the paint needed.",
      "The calculator rounds the result up and shows both gallons and litres. Buy a little extra — running out mid-wall leaves a visible join, and a spare tin covers touch-ups later.",
    ],
    example: {
      title: "Worked example: 12 ft × 8 ft walls, 4 walls, 2 coats",
      body: [
        "One wall: 12 × 8 = 96 sq ft",
        "Four walls, two coats: 96 × 4 × 2 = 768 sq ft",
        "Paint needed: 768 ÷ 350 = 2.19 gallons (about 8.3 litres)",
        "Buy 3 gallons — rounding up covers touch-ups and guarantees the colour matches.",
      ],
    },
    faqs: [
      {
        q: "How much does one gallon cover?",
        a: "About 350 square feet in one coat on a smooth wall. Rough or unpainted surfaces absorb more — allow 300 square feet per gallon for bare plaster or new drywall.",
      },
      {
        q: "Do I need to subtract doors and windows?",
        a: "For a rough estimate, no — the extra paint covers them as waste and touch-ups. For a tight budget, subtract about 15 sq ft per door and 10 sq ft per window.",
      },
      {
        q: "How many coats do I need?",
        a: "Two coats is the standard for a lasting finish. One coat is enough only when repainting the same colour on a sound surface.",
      },
      {
        q: "Should I buy extra?",
        a: "Yes — round up to the next whole gallon. Paint from the same batch matches perfectly, and a spare tin is useful for touch-ups.",
      },
    ],
    related: ["tile-calculator", "mortgage-payment-calculator"],
  },
  {
    slug: "tile-calculator",
    title: "Tile Calculator",
    description:
      "Calculate how many tiles you need for a floor or wall — from the area and tile size, including a 10% allowance for cuts and breakage.",
    category: "construction-home",
    tags: ["tile", "flooring", "renovation", "DIY"],
    unitToggle: {
      id: "units",
      label: "Units",
      defaultValue: "ft",
      options: [
        { value: "ft", label: "Feet / inches" },
        { value: "m", label: "Metres / cm" },
      ],
    },
    fields: [
      {
        id: "floorLFt",
        label: "Floor length",
        type: "number",
        unit: "ft",
        defaultValue: 12,
        min: 0.5,
        step: 0.5,
        group: "ft",
        help: "The length of the floor, in feet.",
      },
      {
        id: "floorWFt",
        label: "Floor width",
        type: "number",
        unit: "ft",
        defaultValue: 10,
        min: 0.5,
        step: 0.5,
        group: "ft",
        help: "The width of the floor, in feet.",
      },
      {
        id: "tileLFt",
        label: "Tile length",
        type: "number",
        unit: "in",
        defaultValue: 12,
        min: 1,
        step: 1,
        group: "ft",
        help: "The length of one tile, in inches.",
      },
      {
        id: "tileWFt",
        label: "Tile width",
        type: "number",
        unit: "in",
        defaultValue: 12,
        min: 1,
        step: 1,
        group: "ft",
        help: "The width of one tile, in inches.",
      },
      {
        id: "floorLM",
        label: "Floor length",
        type: "number",
        unit: "m",
        defaultValue: 3.6,
        min: 0.2,
        step: 0.1,
        group: "m",
        help: "The length of the floor, in metres.",
      },
      {
        id: "floorWM",
        label: "Floor width",
        type: "number",
        unit: "m",
        defaultValue: 3,
        min: 0.2,
        step: 0.1,
        group: "m",
        help: "The width of the floor, in metres.",
      },
      {
        id: "tileLM",
        label: "Tile length",
        type: "number",
        unit: "cm",
        defaultValue: 30,
        min: 5,
        step: 1,
        group: "m",
        help: "The length of one tile, in centimetres.",
      },
      {
        id: "tileWM",
        label: "Tile width",
        type: "number",
        unit: "cm",
        defaultValue: 30,
        min: 5,
        step: 1,
        group: "m",
        help: "The width of one tile, in centimetres.",
      },
    ],
    compute: "tile",
    resultHint:
      "Enter the floor size and tile size to see how many tiles you need.",
    formula:
      "Floor area = length × width. Tiles needed = floor area ÷ area of one tile, plus 10% extra for cuts and breakage, rounded up.",
    howItWorks: [
      "Tiles are sold by the piece, but you buy by the area. Divide the floor area by the area of one tile to get the exact count, then add 10% — cuts at edges and corners, plus the odd broken tile, always use more than the exact number.",
      "The 10% allowance is the trade standard for straight layouts. For a diagonal or herringbone pattern, allow 15% instead.",
    ],
    example: {
      title: "Worked example: 12 ft × 10 ft floor, 12 in × 12 in tiles",
      body: [
        "Floor area: 12 × 10 = 120 sq ft",
        "One tile: 12 × 12 in = 1 sq ft",
        "Exact count: 120 ÷ 1 = 120 tiles",
        "With 10% for cuts and breakage: 120 × 1.10 = 132 tiles",
      ],
    },
    faqs: [
      {
        q: "Why add 10% extra?",
        a: "Tiles at the edges must be cut, and a few always break. The 10% allowance covers cuts and breakage for a straight layout; use 15% for diagonal patterns.",
      },
      {
        q: "Do I need to subtract fixtures?",
        a: "For a bath or toilet footprint, subtract it only if it is large. Small fixtures are usually ignored — the tiles under them are covered by the 10% allowance.",
      },
      {
        q: "How do I count tiles for a wall?",
        a: "The same way: wall area divided by tile area, plus 10%. Measure each wall separately and add them up.",
      },
      {
        q: "What size tile should I choose?",
        a: "Large tiles (12×24 in and up) make small rooms look bigger and have fewer grout lines, but they are harder to cut and cost more per piece.",
      },
    ],
    related: ["paint-calculator", "mortgage-payment-calculator"],
  },
  {
    slug: "ad-roi-calculator",
    title: "Ad ROI Calculator",
    description:
      "Calculate your advertising return on investment (ROI) and ROAS from ad spend and revenue — and see whether your ads actually made money.",
    category: "ecommerce-marketing",
    tags: ["ad ROI", "ROAS", "advertising", "marketing"],
    fields: [
      {
        id: "spend",
        label: "Ad spend",
        type: "number",
        unit: "$",
        defaultValue: 2000,
        min: 0,
        step: 10,
        help: "Everything you spent on the campaign: platform spend, agency fees, and creative costs.",
      },
      {
        id: "revenue",
        label: "Revenue from ads",
        type: "number",
        unit: "$",
        defaultValue: 8000,
        min: 0,
        step: 10,
        help: "The revenue you can attribute to the ads — sales that came from the campaign.",
      },
    ],
    compute: "ad-roi",
    resultHint:
      "Enter your ad spend and the revenue it brought in to see your ROI.",
    formula:
      "Profit = revenue from ads − ad spend. ROI = profit ÷ ad spend × 100. ROAS = revenue ÷ ad spend. (A 300% ROI means every $1 of ads returned $4 of revenue.)",
    howItWorks: [
      "Return on investment (ROI) answers one question: did the ads pay for themselves? Subtract what you spent from the revenue the ads brought in, then divide by what you spent. A positive ROI means the ads made money; a negative one means they lost money.",
      "Do not confuse ROI with ROAS (return on ad spend). ROAS is revenue ÷ spend — a 4.0× ROAS is the same as a 300% ROI. This calculator shows both, so the number matches whichever term your team uses.",
    ],
    example: {
      title: "Worked example: $2,000 spend, $8,000 revenue",
      body: [
        "Profit: $8,000 − $2,000 = $6,000",
        "ROI: $6,000 ÷ $2,000 × 100 = 300%",
        "ROAS: $8,000 ÷ $2,000 = 4.0×",
        "Every $1 of ads returned $4 of revenue and $3 of profit.",
      ],
    },
    faqs: [
      {
        q: "What is a good ad ROI?",
        a: "Anything above 0% means the ads paid for themselves. Many advertisers aim for at least 100% ROI (a 2× ROAS) after all costs, but the right target depends on your margins — a 50% ROI can be great on a high-margin product and terrible on a thin-margin one.",
      },
      {
        q: "What is the difference between ROI and ROAS?",
        a: "ROI is profit divided by spend; ROAS is revenue divided by spend. A campaign with $8,000 revenue on $2,000 spend has a 4.0× ROAS and a 300% ROI. ROI is the stricter number — it subtracts the spend first.",
      },
      {
        q: "Should I count agency fees in the spend?",
        a: "Yes, for an honest ROI. Include ad spend plus agency fees, creative costs, and tools. Counting only the platform spend flatters the result.",
      },
      {
        q: "What if the ROI is negative?",
        a: "The campaign lost money. Before killing it, check whether the revenue is fully tracked — sales that come days later, or on another device, are often missing from the reported number.",
      },
    ],
    related: [
      "profit-margin-calculator",
      "break-even-calculator",
      "business-startup-cost-calculator",
    ],
  },
  {
    slug: "profit-margin-calculator",
    title: "Profit Margin Calculator",
    description:
      "Calculate your profit, profit margin, and markup from revenue and cost — and learn the difference between margin and markup.",
    category: "business-startup",
    tags: ["profit margin", "markup", "pricing", "revenue"],
    popular: true,
    fields: [
      {
        id: "revenue",
        label: "Revenue",
        type: "number",
        unit: "$",
        defaultValue: 50000,
        min: 0,
        step: 100,
        help: "Total sales revenue for the period, before any costs.",
      },
      {
        id: "cost",
        label: "Cost",
        type: "number",
        unit: "$",
        defaultValue: 32000,
        min: 0,
        step: 100,
        help: "Total cost of the goods sold: product cost, shipping, packaging, and payment fees.",
      },
    ],
    compute: "margin",
    resultHint: "Enter your revenue and cost to see your profit and margin.",
    formula:
      "Profit = revenue − cost. Profit margin = profit ÷ revenue × 100. Markup = profit ÷ cost × 100.",
    howItWorks: [
      "Profit margin and markup look similar but answer different questions. Margin is the share of the selling price you keep — the number that matters for the health of the business. Markup is the share you add to the cost — the number you use when setting a price.",
      "A 36% margin means you keep 36 cents of every dollar of revenue. The same numbers give a 56.25% markup, because the markup is measured against the smaller cost figure. Mixing them up is the most common pricing mistake.",
    ],
    example: {
      title: "Worked example: $50,000 revenue, $32,000 cost",
      body: [
        "Profit: $50,000 − $32,000 = $18,000",
        "Profit margin: $18,000 ÷ $50,000 × 100 = 36.0%",
        "Markup: $18,000 ÷ $32,000 × 100 = 56.25%",
        "You keep 36 cents of every dollar you take in.",
      ],
    },
    faqs: [
      {
        q: "What is the difference between margin and markup?",
        a: "Margin is profit divided by revenue; markup is profit divided by cost. On $50,000 of revenue and $32,000 of cost, the margin is 36% and the markup is 56.25%. Margin can never exceed 100%; markup can.",
      },
      {
        q: "What is a good profit margin?",
        a: "It depends on the industry. Grocery stores run on 1–3%, most retailers on 5–10%, and software or digital products on 20–40% or more. Compare yourself with your own industry, not with a single number.",
      },
      {
        q: "Is margin before or after tax?",
        a: "This calculator gives gross margin — before tax, rent, and salaries unless you include them in the cost. Net margin, after all expenses, is lower and is the number that decides whether the business survives.",
      },
      {
        q: "Should the cost include shipping and fees?",
        a: "Yes, for an honest margin. Include product cost, shipping, packaging, and payment fees — anything you pay to make the sale happen.",
      },
    ],
    related: [
      "break-even-calculator",
      "ad-roi-calculator",
      "freelance-tax-calculator",
    ],
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const getCalculator = (slug: string): Calculator | undefined =>
  CALCULATORS.find((c) => c.slug === slug);

export const getCategory = (slug: string): CalculatorCategory | undefined =>
  CATEGORIES.find((c) => c.slug === slug);

export const categoryDisplayName = (slug: string): string =>
  getCategory(slug)?.name ?? slug;

export const calculatorsByCategory = (slug: string): Calculator[] =>
  CALCULATORS.filter((c) => c.category === slug);

export const popularCalculators = (): Calculator[] =>
  CALCULATORS.filter((c) => c.popular);

/** PostSummary-shaped rows so the site-wide search (Search.vue) can index calculators. */
export const getCalculatorSummaries = (): PostSummary[] =>
  CALCULATORS.map((c) => ({
    id: c.slug,
    title: c.title,
    description: c.description,
    date: "2026-11-13",
    category: c.category,
    tags: c.tags,
    cover: "tool",
    featured: c.popular ?? false,
    minutes: 3,
  }));
