import React from 'react';
import { Document, Page, View, Text } from '../index';

export interface ReportProps {
  title?: string;
  subtitle?: string;
  author?: string;
  company?: string;
  date?: string;
  summary?: string;
  sections?: Array<{
    title: string;
    paragraphs: string[];
  }>;
}

const defaultProps: ReportProps = {
  title: 'PDF Generation Engine Performance Analysis',
  subtitle: 'Comparative benchmark of Teamless vs Puppeteer-based architectures.',
  author: 'Marcus Aurelius',
  company: 'Teamless Labs',
  date: 'Q3 2026',
  summary: 'This report evaluates the performance metrics of the Teamless PDF generation engine. Key results demonstrate up to a 10x reduction in memory consumption and 8x improvement in document compilation speed compared to Chromium-based headless setups, establishing react-native-yoga layouts as the standard for enterprise-grade programmatic document publishing.',
  sections: [
    {
      title: 'Introduction & Background',
      paragraphs: [
        'Enterprise document generation has historically relied on running headless web browsers like Chromium via Puppeteer or Playwright. While this guarantees CSS compatibility, it introduces severe resource overheads. A single browser instance can consume 100MB+ of RAM, limiting horizontal scalability and leading to high operational costs.',
        'Teamless approaches this problem differently. By running layout calculations entirely in-process using the lightweight Yoga engine and compiling straight to PDF primitives via @react-pdf/renderer, we eliminate the headless browser. The result is a fast, lightweight, and memory-safe system built specifically for developers.',
      ],
    },
    {
      title: 'Key Performance Benchmarks',
      paragraphs: [
        'Under a load of 1,000 document generation requests, the Teamless engine maintained an average response latency of 124ms, compared to 950ms for Puppeteer. Memory utilization peaked at just 12MB per process, whereas Puppeteer spikes exceeded 450MB, causing significant garbage collection pauses.',
        'Additionally, because Teamless outputs vector-optimized PDF primitives, output file sizes were on average 45% smaller than the raster-heavy outputs produced by browser-based print emulations.',
      ],
    },
    {
      title: 'Conclusion & Recommendations',
      paragraphs: [
        'Based on our empirical analysis, we recommend that all high-volume programmatic document pipelines transition away from browser-based rendering. Teamless provides the necessary Tailwind CSS integration and React components to make this transition seamless, saving infrastructure costs and improving client response times.',
      ],
    },
  ],
};

export const Report = (props: ReportProps) => {
  const mergedProps = { ...defaultProps, ...props };
  const { title, subtitle, author, company, date, summary, sections = [] } = mergedProps;

  return (
    <Document>
      {/* Page 1: Cover Page */}
      <Page size="A4" className="p-16 font-sans bg-slate-900 text-slate-100 flex flex-col justify-between">
        {/* Cover Top */}
        <View className="flex flex-col">
          <Text className="text-xs font-bold text-slate-400 uppercase tracking-[4px] mb-2">
            TECHNICAL WHITE PAPER
          </Text>
          <View className="w-16 h-1.5 bg-slate-100 mb-8" />
        </View>

        {/* Cover Center */}
        <View className="flex flex-col justify-center my-auto max-w-[500px]">
          <Text className="text-3xl font-bold font-serif leading-tight text-white mb-4">
            {title}
          </Text>
          <Text className="text-sm text-slate-400 leading-relaxed font-sans">
            {subtitle}
          </Text>
        </View>

        {/* Cover Bottom */}
        <View className="flex flex-row justify-between items-end border-t border-slate-800 pt-6 mt-12">
          <View className="flex flex-col">
            <Text className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{author}</Text>
            <Text className="text-[10px] text-slate-500 mt-1">{company}</Text>
          </View>
          <View className="flex flex-col items-end">
            <Text className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{date}</Text>
          </View>
        </View>
      </Page>

      {/* Page 2: Content Page */}
      <Page size="A4" className="p-16 font-sans bg-white text-slate-800 flex flex-col justify-between">
        <View>
          {/* Header */}
          <View className="flex flex-row justify-between items-center border-b border-slate-200 pb-3 mb-8">
            <Text className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Teamless Research Labs
            </Text>
            <Text className="text-[9px] text-slate-400">{title}</Text>
          </View>

          {/* Executive Summary */}
          {summary && (
            <View className="bg-slate-50 border-l-4 border-slate-900 p-5 mb-8 rounded-r-lg">
              <Text className="text-xs font-bold text-slate-900 mb-1.5 uppercase tracking-wide">
                Executive Summary
              </Text>
              <Text className="text-[10px] text-slate-600 leading-relaxed italic">{summary}</Text>
            </View>
          )}

          {/* Sections */}
          <View className="flex flex-col gap-6">
            {sections.map((section, sIndex) => (
              <View key={sIndex} className="flex flex-col">
                <Text className="text-xs font-bold text-slate-950 mb-2 border-b border-slate-100 pb-1">
                  {section.title}
                </Text>
                <View className="flex flex-col gap-2.5">
                  {section.paragraphs.map((p, pIndex) => (
                    <Text key={pIndex} className="text-[10px] text-slate-600 leading-relaxed text-justify">
                      {p}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View className="flex flex-row justify-between items-center border-t border-slate-100 pt-4 mt-8">
          <Text className="text-[8px] text-slate-400">© 2026 Teamless Inc. All rights reserved.</Text>
          <Text className="text-[8px] text-slate-400">Page 2 of 2</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Report;
