'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  FileText, 
  Settings, 
  RefreshCw, 
  Check, 
  Sparkles,
  Play,
  ArrowRight
} from 'lucide-react';

// Dynamically import PDFViewer to disable SSR
const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  { 
    ssr: false,
    loading: () => (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-2xl h-[600px] text-slate-500 gap-3">
        <RefreshCw className="h-6 w-6 animate-spin text-slate-600" />
        <span className="text-sm">Loading PDF layout engine...</span>
      </div>
    )
  }
);

// We will dynamically import templates from `@teamless/react/templates`
// To prevent compilation errors before @teamless/react builds, we import them or define light versions.
// Since the workspaces are linked, we can import them once @teamless/react is built.
// Let's import them dynamically or use local definitions. To be extremely robust and avoid build issues,
// we can import them from the package.
import { Invoice, Receipt, Certificate, Contract, Report, Ticket } from '@teamless/react/templates';

const templatesMap: Record<string, { component: any; defaultProps: any }> = {
  Invoice: {
    component: Invoice,
    defaultProps: {
      invoiceNumber: 'INV-2026-0042',
      issueDate: 'July 6, 2026',
      dueDate: 'July 20, 2026',
      sender: {
        name: 'Teamless Inc.',
        email: 'billing@teamlessapp.me',
        address: '100 Pine Street, San Francisco, CA 94111',
        phone: '+1 (555) 019-2834',
      },
      recipient: {
        name: 'Acme Corporation',
        email: 'accounts@acme.com',
        address: '420 Park Avenue, Floor 18, New York, NY 10022',
      },
      items: [
        { description: 'Teamless PDF Gen Engine License (Annual)', quantity: 1, unitPrice: 2400.00 },
        { description: 'Dedicated SLA Support (Monthly)', quantity: 3, unitPrice: 150.00 },
      ],
      taxRate: 0.08,
      notes: 'Thank you for choosing Teamless!',
      paymentInstructions: 'Chase Bank wire, SWIFT: CHASUS33XXX, Account: 987654321',
    }
  },
  Receipt: {
    component: Receipt,
    defaultProps: {
      receiptId: 'REC-90382-748',
      timestamp: 'July 6, 2026 at 1:15 PM UTC',
      paymentMethod: 'Credit Card',
      cardLast4: '4242',
      customer: {
        name: 'Sarah Connor',
        email: 'sarah@cyberdyne.io',
      },
      items: [
        { name: 'Teamless Growth Plan (Monthly)', amount: 49.00 },
        { name: 'API Credits (10k Pack)', amount: 15.00 },
      ],
      tax: 5.92,
      discount: 10.00,
      total: 69.91,
    }
  },
  Certificate: {
    component: Certificate,
    defaultProps: {
      recipientName: 'ALEXANDER MERCER',
      courseTitle: 'Advanced PDF Engineering & Automation',
      issueDate: 'July 6, 2026',
      certificateId: 'CERT-2026-98A4D',
      issuerName: 'Guillermo Rauch',
      issuerTitle: 'CEO & Founder, Teamless',
    }
  },
  Contract: {
    component: Contract,
    defaultProps: {
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
          body: '"Confidential Information" means any information disclosed by either party (the "Disclosing Party") to the other party (the "Receiving Party") that is marked as confidential or proprietary.',
        }
      ]
    }
  },
  Report: {
    component: Report,
    defaultProps: {
      title: 'PDF Generation Engine Performance Analysis',
      subtitle: 'Comparative benchmark of Teamless vs Puppeteer-based architectures.',
      author: 'Marcus Aurelius',
      company: 'Teamless Labs',
      date: 'Q3 2026',
      summary: 'This report evaluates the performance metrics of the Teamless PDF generation engine. Key results demonstrate up to a 10x reduction in memory consumption and 8x improvement in document compilation speed.',
      sections: [
        {
          title: 'Introduction & Background',
          paragraphs: [
            'Enterprise document generation has historically relied on running headless web browsers like Chromium via Puppeteer. While this guarantees CSS compatibility, it introduces severe resource overheads.',
            'Teamless approaches this problem differently. By running layout calculations entirely in-process using the lightweight Yoga engine, we eliminate the headless browser overhead.'
          ]
        }
      ]
    }
  },
  Ticket: {
    component: Ticket,
    defaultProps: {
      eventName: 'Teamless Conf 2026',
      location: 'Yerba Buena Center for the Arts, San Francisco, CA',
      dateTime: 'Thursday, October 15, 2026 at 9:00 AM PST',
      attendeeName: 'Mohit Rai',
      ticketType: 'VIP Full Access Pass',
      seat: 'Row A / Seat 12',
      gate: 'South Entrance',
      ticketNumber: 'TC-9283-771B',
    }
  }
};

export default function Playground() {
  const templateNames = Object.keys(templatesMap);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templateNames[0]);
  const [propsJson, setPropsJson] = useState<string>('{}');
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [renderTrigger, setRenderTrigger] = useState<number>(0);

  // Sync props when selected template changes
  useEffect(() => {
    const defaultProps = templatesMap[selectedTemplate]?.defaultProps || {};
    setPropsJson(JSON.stringify(defaultProps, null, 2));
    setJsonError(null);
  }, [selectedTemplate]);

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

  const SelectedComponent = templatesMap[selectedTemplate]?.component;

  let renderedPdf = null;
  if (SelectedComponent) {
    try {
      const parsedProps = JSON.parse(propsJson);
      renderedPdf = <SelectedComponent {...parsedProps} key={renderTrigger} />;
    } catch {
      renderedPdf = <SelectedComponent key={renderTrigger} />;
    }
  }

  return (
    <div className="w-full bg-slate-900/50 border border-slate-800 rounded-3xl p-6 lg:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Control Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-indigo-400" />
            Interactive Playground
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Edit document inputs on the left, watch vector PDF render instantly on the right.
          </p>
        </div>

        {/* Template Selector Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          {templateNames.map(name => {
            const isSelected = name === selectedTemplate;
            return (
              <button
                key={name}
                onClick={() => setSelectedTemplate(name)}
                className={`px-3.5 py-1.5 text-xs rounded-lg transition-all ${
                  isSelected 
                    ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Workspace Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Editor (Props) */}
        <div className="lg:col-span-5 flex flex-col h-[600px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Settings className="h-3.5 w-3.5 text-slate-400" />
              Template Props (JSON)
            </span>
            {jsonError ? (
              <span className="text-[10px] bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2.5 py-0.5 rounded">
                Syntax Error
              </span>
            ) : (
              <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded flex items-center gap-1">
                <Check className="h-3 w-3" /> Valid Props
              </span>
            )}
          </div>
          
          <textarea
            value={propsJson}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="flex-1 w-full bg-slate-950/80 font-mono text-xs text-slate-300 p-5 rounded-2xl border border-slate-800 focus:border-indigo-500 focus:outline-none resize-none shadow-inner"
            spellCheck="false"
          />

          {jsonError && (
            <div className="mt-3 p-3 rounded-xl border border-rose-500/20 bg-rose-500/5 text-xs text-rose-400 font-mono">
              {jsonError}
            </div>
          )}

          <div className="mt-4 flex gap-3">
            <button
              onClick={forceRefresh}
              className="flex-1 px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Force Re-compile
            </button>
          </div>
        </div>

        {/* Live Rendering Viewer */}
        <div className="lg:col-span-7 flex flex-col h-[600px] relative">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Play className="h-3.5 w-3.5 text-slate-400 fill-slate-400/20" />
            Live Vector PDF Render
          </span>

          <div className="flex-1 w-full h-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-inner relative">
            {renderedPdf ? (
              <PDFViewer className="w-full h-full border-none" showToolbar={true}>
                {renderedPdf}
              </PDFViewer>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-3">
                <RefreshCw className="h-6 w-6 animate-spin text-slate-600" />
                <span className="text-sm">Re-rendering PDF...</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
