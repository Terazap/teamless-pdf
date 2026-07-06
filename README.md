<div align="center">
  <img src="https://raw.githubusercontent.com/teamless-pdf/teamless/main/assets/banner.png" alt="Teamless Banner" width="100%" style="border-radius: 12px; margin-bottom: 24px;" error="this is a placeholder for public repository" />
  
  <h1>Teamless</h1>
  <p><strong>Beautiful PDFs with React & Tailwind CSS. No more Puppeteer hell.</strong></p>

  <p>
    <a href="https://github.com/teamless-pdf/teamless/actions"><img src="https://img.shields.io/github/actions/workflow/status/teamless-pdf/teamless/ci.yml?branch=main&style=flat-square" alt="CI Status" /></a>
    <a href="https://www.npmjs.com/package/@teamless/react"><img src="https://img.shields.io/npm/v/@teamless/react?style=flat-square" alt="NPM Version" /></a>
    <a href="https://github.com/teamless-pdf/teamless/blob/main/LICENSE"><img src="https://img.shields.io/github/license/teamless-pdf/teamless?style=flat-square" alt="MIT License" /></a>
    <a href="https://github.com/teamless-pdf/teamless/stargazers"><img src="https://img.shields.io/github/stars/teamless-pdf/teamless?style=flat-square&color=yellow" alt="GitHub Stars" /></a>
  </p>

  <p>
    <a href="#quickstart">Quickstart</a> •
    <a href="#why-teamless">Why Teamless?</a> •
    <a href="#starter-templates">Starter Templates</a> •
    <a href="#features">Features</a> •
    <a href="#community">Community & Contributing</a>
  </p>
</div>

---

## What is Teamless?

Teamless is an open-source + commercial PDF generation platform for developers, inspired by the developer-first experience of **Resend** and **React Email**. 

Instead of spinning up heavy headless Chrome browsers (like Puppeteer or Playwright) to run layout engines in the cloud, Teamless computes layouts **in-process** using React and the Yoga Flexbox engine, exporting vector commands directly. It wraps `@react-pdf/renderer` to give you **native Tailwind CSS v4 support** via simple `className` attributes.

## Quickstart

Start a new Teamless project in under a minute:

```bash
npx create-teamless@latest my-pdf-docs
```

This command scaffolds a new project, copies 6 premium starter templates into a `pdfs/` folder, and runs installation.

Then, start the live preview development server:

```bash
cd my-pdf-docs
npm run dev
```

The live preview dashboard will open at `http://localhost:3000`. Edit any `.tsx` template inside your `pdfs/` folder, and watch the PDF hot-reload instantly in the browser!

---

## Why Teamless?

Running headless Chrome instances to convert HTML/CSS into PDF is heavy, slow, and hard to scale. Here is how Teamless stacks up:

| Feature / Metric | Puppeteer / Chrome Automation | Teamless Engine |
| :--- | :--- | :--- |
| **Compilation Speed** | 1,200ms - 2,500ms (cold boot) | **80ms - 150ms (in-process)** |
| **Memory footprint** | 150MB - 400MB+ per process | **8MB - 15MB per process** |
| **Styling Developer Exp** | Ad-hoc CSS, print emulators | **React + Tailwind CSS with Types** |
| **Infrastructure** | Heavy docker setups, leaks | **Serverless-native, zero binaries** |
| **Output optimization** | Heavy print rasterizations | **Vector-optimized, tiny PDF files** |

---

## How it works

Teamless wraps standard PDF primitives with an inline compiler that resolves Tailwind classes dynamically:

```tsx
import React from 'react';
import { Document, Page, View, Text } from '@teamless/react';

export default function Invoice() {
  return (
    <Document>
      <Page size="A4" className="p-12 font-sans bg-white text-slate-800">
        <View className="flex flex-row justify-between items-start border-b border-slate-200 pb-6">
          <View>
            <Text className="text-2xl font-bold text-slate-900">Invoice</Text>
            <Text className="text-xs text-slate-500 mt-1">INV-2026-0001</Text>
          </View>
          <Text className="text-sm font-semibold text-slate-600">$450.00 Due</Text>
        </View>
      </Page>
    </Document>
  );
}
```

---

## Starter Templates

Teamless comes out of the box with 6 beautifully-designed, high-fidelity developer templates:

1. **Invoice**: Professional client billings with items breakdown and totals calculators.
2. **Receipt**: Modern centered digital voucher with payment method breakdown and confirmation badge.
3. **Certificate**: Decorative landscape-oriented certificate of completion or award.
4. **Contract**: Sidebar signature block legal document layout.
5. **Report**: Multi-page corporate whitepaper with executive summaries and header pagination.
6. **Ticket**: Boarding pass-style event pass complete with dotted tear-off stubs and simulated vector barcodes.

---

## Features

- **Tailwind CSS v4 Engine**: Direct support for standard utility colors, spacing, borders, typography, and flex alignments.
- **Hot Module Replacement (HMR)**: Live preview dev server built on top of Vite. Save a file, watch the canvas update instantly.
- **Props Playground**: Feed custom JSON properties to your templates via the preview sidebar and live-test multiple customer datasets.
- **TypeScript First**: Complete autocomplete configurations for layout components and properties.
- **Serverless Ready**: Light footprint allows running generation inside Vercel, AWS Lambda, or Cloudflare Workers without chromium dependencies.

---

## Contributing

We love contributions! If you want to submit a bug report, suggest a feature, or add a template:

1. Fork the repository.
2. Create a branch: `git checkout -b feat/my-new-template`.
3. Make changes and commit: `git commit -m "add support for A5 flyer template"`.
4. Open a Pull Request.

Please check our [Contributing Guide](CONTRIBUTING.md) for more details.

## License

MIT © [Teamless](LICENSE)
