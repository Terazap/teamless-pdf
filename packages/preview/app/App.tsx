import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { 
  FileText, 
  Code2, 
  Settings, 
  RefreshCw, 
  Download, 
  ChevronRight, 
  FileCheck, 
  Info,
  Sparkles,
  Layers
} from 'lucide-react';

// Import fallback/default templates from packages/react
import { Invoice, Receipt, Certificate, Contract, Report, Ticket } from '@teamless/react/templates';

// Live templates loaded from the developer's CWD pdfs/ folder via Vite
const liveComponents = import.meta.glob('/pdfs/*.tsx', { eager: true }) as Record<string, any>;
const liveSources = import.meta.glob('/pdfs/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

// Fallback templates map
const fallbackComponents: Record<string, any> = {
  '/pdfs/Invoice.tsx': { default: Invoice },
  '/pdfs/Receipt.tsx': { default: Receipt },
  '/pdfs/Certificate.tsx': { default: Certificate },
  '/pdfs/Contract.tsx': { default: Contract },
  '/pdfs/Report.tsx': { default: Report },
  '/pdfs/Ticket.tsx': { default: Ticket },
};

// Raw content for fallbacks
const fallbackSources: Record<string, string> = {
  '/pdfs/Invoice.tsx': `// Invoice Template (Preview Fallback)\nexport default function Invoice() { ... }`,
  '/pdfs/Receipt.tsx': `// Receipt Template (Preview Fallback)\nexport default function Receipt() { ... }`,
  '/pdfs/Certificate.tsx': `// Certificate Template (Preview Fallback)\nexport default function Certificate() { ... }`,
  '/pdfs/Contract.tsx': `// Contract Template (Preview Fallback)\nexport default function Contract() { ... }`,
  '/pdfs/Report.tsx': `// Report Template (Preview Fallback)\nexport default function Report() { ... }`,
  '/pdfs/Ticket.tsx': `// Ticket Template (Preview Fallback)\nexport default function Ticket() { ... }`,
};

// Default props dictionary for templates to pre-fill the JSON editor
const defaultPropsMap: Record<string, any> = {
  Invoice: {
    invoiceNumber: 'INV-2026-0042',
    issueDate: 'July 6, 2026',
    dueDate: 'July 20, 2026',
    sender: {
      name: 'Teamless Inc.',
      email: 'billing@teamlessapp.me',
      address: '100 Pine Street, Suite 1200, San Francisco, CA 94111',
      phone: '+1 (555) 019-2834',
    },
    recipient: {
      name: 'Acme Corporation',
      email: 'accounts@acme.com',
      address: '420 Park Avenue, Floor 18, New York, NY 10022',
    },
    items: [
      { description: 'Premium PDF Generation Platform - Enterprise License (Annual)', quantity: 1, unitPrice: 2400.00 },
      { description: 'Dedicated SLA & Technical Support (Monthly)', quantity: 3, unitPrice: 150.00 },
      { description: 'Custom Template Development & Integration Service', quantity: 8, unitPrice: 125.00 },
    ],
    taxRate: 0.08,
    notes: 'Thank you for choosing Teamless for your document generation. We appreciate your business!',
    paymentInstructions: 'Please wire payments to Chase Bank, SWIFT: CHASUS33XXX, Account: 987654321. Refer to INV-2026-0042.',
  },
  Receipt: {
    receiptId: 'REC-90382-748',
    timestamp: 'July 6, 2026 at 1:15 PM UTC',
    paymentMethod: 'Credit Card',
    cardLast4: '4242',
    customer: {
      name: 'Sarah Connor',
      email: 'sarah@cyberdyne.io',
    },
    items: [
      { name: 'Teamless Growth Plan (Monthly Subscription)', amount: 49.00 },
      { name: 'Extra PDF Generation API Credits (10k Pack)', amount: 15.00 },
      { name: 'Premium Theme Asset Pack (Bundle)', amount: 9.99 },
    ],
    tax: 5.92,
    discount: 10.00,
    total: 69.91,
  },
  Certificate: {
    recipientName: 'ALEXANDER MERCER',
    courseTitle: 'Advanced PDF Engineering & Automation',
    issueDate: 'July 6, 2026',
    certificateId: 'CERT-2026-98A4D',
    issuerName: 'Guillermo Rauch',
    issuerTitle: 'CEO & Founder, Teamless',
  },
  Contract: {
    title: 'MUTUAL NON-DISCLOSURE AGREEMENT',
    effectiveDate: 'July 6, 2026',
    partyA: {
      name: 'Teamless Technologies Inc.',
      type: 'corporation',
      state: 'Delaware',
      address: '100 Pine Street, San Francisco, CA 94111',
    },
    partyB: {
      name: 'Skynet Research Group LLC',
      type: 'limited liability company',
      state: 'California',
      address: '2000 Cyberdyne Boulevard, Los Angeles, CA 90025',
    },
    clauses: [
      {
        title: 'Purpose',
        body: 'The parties wish to explore a potential business relationship of mutual interest. In connection with this opportunity, each party may disclose to the other party certain proprietary and confidential technical, product, design, and business information.',
      },
      {
        title: 'Confidential Information',
        body: '"Confidential Information" means any information disclosed by either party (the "Disclosing Party") to the other party (the "Receiving Party") that is marked as confidential or proprietary, or that should reasonably be understood to be confidential given the nature of the information and the circumstances of disclosure.',
      },
      {
        title: 'Obligations of Confidentiality',
        body: 'The Receiving Party shall: (a) hold the Confidential Information in strict confidence and protect it using at least the same degree of care it uses for its own confidential information, but in no event less than a reasonable standard of care; and (b) not disclose or use any Confidential Information for any purpose outside the scope of this Agreement, except with the Disclosing Party\'s prior written consent.',
      },
    ],
  },
  Report: {
    title: 'PDF Generation Engine Performance Analysis',
    subtitle: 'Comparative benchmark of Teamless vs Puppeteer-based architectures.',
    author: 'Marcus Aurelius',
    company: 'Teamless Labs',
    date: 'Q3 2026',
    summary: 'This report evaluates the performance metrics of the Teamless PDF generation engine. Key results demonstrate up to a 10x reduction in memory consumption and 8x improvement in document compilation speed compared to Chromium-based headless setups.',
    sections: [
      {
        title: 'Introduction & Background',
        paragraphs: [
          'Enterprise document generation has historically relied on running headless web browsers like Chromium via Puppeteer or Playwright. While this guarantees CSS compatibility, it introduces severe resource overheads.',
          'Teamless approaches this problem differently. By running layout calculations entirely in-process using the lightweight Yoga engine and compiling straight to PDF primitives via @react-pdf/renderer, we eliminate the headless browser.',
        ],
      },
    ],
  },
  Ticket: {
    eventName: 'Teamless Conf 2026',
    location: 'Yerba Buena Center for the Arts, San Francisco, CA',
    dateTime: 'Thursday, October 15, 2026 at 9:00 AM PST',
    attendeeName: 'Mohit Rai',
    ticketType: 'VIP Full Access Pass',
    seat: 'Row A / Seat 12',
    gate: 'South Entrance',
    ticketNumber: 'TC-9283-771B',
  },
};

export default function App() {
  // Combine live scan and fallbacks (live files take precedence)
  const templatesMap = Object.keys(liveComponents).length > 0 ? liveComponents : fallbackComponents;
  const sourcesMap = Object.keys(liveComponents).length > 0 ? liveSources : fallbackSources;

  const templatePaths = Object.keys(templatesMap);
  const [selectedPath, setSelectedPath] = useState<string>(templatePaths[0] || '');
  const [activeTab, setActiveTab] = useState<'props' | 'code'>('props');
  const [propsJson, setPropsJson] = useState<string>('{}');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [renderTrigger, setRenderTrigger] = useState<number>(0);

  // Extract template name from path (e.g. "/pdfs/Invoice.tsx" -> "Invoice")
  const getTemplateName = (pathStr: string) => {
    return pathStr.split('/').pop()?.replace('.tsx', '') || 'Template';
  };

  const selectedName = getTemplateName(selectedPath);

  // Sync default props when selected template changes
  useEffect(() => {
    if (selectedPath) {
      const name = getTemplateName(selectedPath);
      const defaultProps = defaultPropsMap[name] || {};
      setPropsJson(JSON.stringify(defaultProps, null, 2));
      setJsonError(null);
    }
  }, [selectedPath]);

  // Handle JSON typing and verification
  const handleJsonChange = (val: string) => {
    setPropsJson(val);
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch (e: any) {
      setJsonError(e.message);
    }
  };

  const forceRefresh = () => {
    setRenderTrigger(prev => prev + 1);
  };

  // Get active template component and raw code source
  const SelectedTemplate = templatesMap[selectedPath]?.default;
  const rawCode = sourcesMap[selectedPath] || '';

  // Render props safely
  let renderedComponent = null;
  if (SelectedTemplate) {
    try {
      const parsedProps = JSON.parse(propsJson);
      renderedComponent = <SelectedTemplate {...parsedProps} key={renderTrigger} />;
    } catch {
      // If JSON is broken, render with fallback empty props
      renderedComponent = <SelectedTemplate key={renderTrigger} />;
    }
  }

  const isLiveMode = Object.keys(liveComponents).length > 0;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Sidebar */}
      <div className="w-80 border-r border-slate-800 bg-slate-900/60 backdrop-blur-md flex flex-col justify-between shrink-0">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-6 w-6 text-indigo-500" />
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                TEAMLESS
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
              Preview
            </span>
          </div>

          {/* Mode Indicator */}
          <div className="p-4 mx-4 my-3 bg-slate-800/40 border border-slate-800 rounded-xl flex items-center gap-3">
            <div className={`h-2.5 w-2.5 rounded-full ${isLiveMode ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <div>
              <Text className="text-xs font-bold text-slate-300">
                {isLiveMode ? 'Live Workspace Mode' : 'Default Sandbox Mode'}
              </Text>
              <Text className="text-[10px] text-slate-500 mt-0.5">
                {isLiveMode ? 'Watching /pdfs/ folder' : 'Rendering fallback templates'}
              </Text>
            </div>
          </div>

          {/* List of Templates */}
          <div className="p-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 mb-3">
              Templates ({templatePaths.length})
            </h3>
            <div className="space-y-1">
              {templatePaths.map(path => {
                const name = getTemplateName(path);
                const isSelected = path === selectedPath;
                return (
                  <button
                    key={path}
                    onClick={() => setSelectedPath(path)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between transition-all duration-200 group ${
                      isSelected 
                        ? 'bg-indigo-600/90 text-white font-medium shadow-md shadow-indigo-600/10' 
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-500 group-hover:text-slate-400'}`} />
                      <span>{name}</span>
                    </div>
                    <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${
                      isSelected ? 'text-white translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/20 text-center">
          <div className="flex justify-center items-center gap-1.5 text-xs text-slate-500">
            <Sparkles className="h-3 w-3 text-indigo-400" />
            <span>teamlessapp.me</span>
          </div>
        </div>
      </div>

      {/* Editor & Control Panel */}
      <div className="w-[480px] border-r border-slate-800 flex flex-col bg-slate-900/40 shrink-0">
        {/* Tabs Control */}
        <div className="h-14 border-b border-slate-800 px-4 flex items-center justify-between bg-slate-900/20">
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800/80">
            <button
              onClick={() => setActiveTab('props')}
              className={`px-3 py-1 text-xs rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === 'props' 
                  ? 'bg-slate-800 text-white font-medium shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings className="h-3.5 w-3.5" />
              Props (JSON)
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1 text-xs rounded-md flex items-center gap-1.5 transition-all ${
                activeTab === 'code' 
                  ? 'bg-slate-800 text-white font-medium shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              Source Code
            </button>
          </div>
          
          <button 
            onClick={forceRefresh}
            title="Refresh preview render"
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-hidden flex flex-col relative">
          {activeTab === 'props' ? (
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Template Data Bindings
                </span>
                {jsonError ? (
                  <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 py-0.5 rounded">
                    Invalid JSON
                  </span>
                ) : (
                  <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded flex items-center gap-1">
                    <FileCheck className="h-3 w-3" /> Ready
                  </span>
                )}
              </div>
              <textarea
                value={propsJson}
                onChange={(e) => handleJsonChange(e.target.value)}
                className="flex-1 w-full bg-slate-950/80 font-mono text-xs text-slate-300 p-4 rounded-xl border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none shadow-inner"
                spellCheck="false"
              />
              {jsonError && (
                <div className="mt-3 p-3 rounded-lg border border-rose-500/20 bg-rose-500/5 text-xs text-rose-400 font-mono">
                  {jsonError}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {selectedName}.tsx Source
              </span>
              <pre className="flex-1 w-full bg-slate-950/80 font-mono text-xs text-slate-400 p-4 rounded-xl border border-slate-800 overflow-auto whitespace-pre select-text">
                <code>{rawCode}</code>
              </pre>
              <div className="mt-3 p-3 bg-slate-800/30 border border-slate-800 rounded-lg flex items-start gap-2.5 text-xs text-slate-400">
                <Info className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>
                  This file is loaded from your workspace. Editing it locally triggers instant Vite HMR reloading.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Live PDF Viewer Right Pane */}
      <div className="flex-1 h-full bg-slate-950 flex flex-col relative">
        {renderedComponent ? (
          <div className="flex-1 w-full h-full relative">
            <PDFViewer className="w-full h-full border-none" showToolbar={false}>
              {renderedComponent}
            </PDFViewer>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 p-8 gap-4">
            <RefreshCw className="h-8 w-8 animate-spin text-slate-600" />
            <Text className="text-sm">Compiling React PDF layout...</Text>
          </div>
        )}
      </div>
    </div>
  );
}
