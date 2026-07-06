import React from 'react';
import { Document, Page, View, Text } from '../index';

export interface CertificateProps {
  recipientName?: string;
  courseTitle?: string;
  issueDate?: string;
  certificateId?: string;
  issuerName?: string;
  issuerTitle?: string;
  logoUrl?: string;
}

const defaultProps: CertificateProps = {
  recipientName: 'ALEXANDER MERCER',
  courseTitle: 'Advanced PDF Engineering & Automation',
  issueDate: 'July 6, 2026',
  certificateId: 'CERT-2026-98A4D',
  issuerName: 'Guillermo Rauch',
  issuerTitle: 'CEO & Founder, Teamless',
};

export const Certificate = (props: CertificateProps) => {
  const mergedProps = { ...defaultProps, ...props };
  const {
    recipientName,
    courseTitle,
    issueDate,
    certificateId,
    issuerName,
    issuerTitle,
  } = mergedProps;

  return (
    <Document>
      <Page
        size="A4"
        orientation="landscape"
        className="p-10 font-sans bg-slate-50 text-slate-800 flex flex-col justify-center items-center"
      >
        {/* Certificate Border */}
        <View className="w-full h-full border-[10px] border-slate-900 p-8 flex flex-col justify-between items-center bg-white rounded-lg relative">
          
          {/* Decorative Inner Thin Border */}
          <View className="absolute top-2.5 left-2.5 right-2.5 bottom-2.5 border border-slate-300 pointer-events-none" />

          {/* Header Seal/Logo Area */}
          <View className="flex flex-col items-center mt-4">
            <Text className="text-sm font-bold text-slate-900 tracking-[6px] mb-1">TEAMLESS PLATFORM</Text>
            <Text className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Official Certification</Text>
          </View>

          {/* Certificate Title */}
          <View className="flex flex-col items-center mt-6">
            <Text className="text-3xl font-serif font-bold text-slate-900 mb-2">
              Certificate of Completion
            </Text>
            <Text className="text-xs text-slate-500 italic">This is proudly presented to</Text>
          </View>

          {/* Recipient Name */}
          <View className="flex flex-col items-center my-4 border-b border-slate-200 pb-2 px-16">
            <Text className="text-2xl font-bold text-slate-900 tracking-wide font-sans uppercase">
              {recipientName}
            </Text>
          </View>

          {/* Achievement Description */}
          <View className="flex flex-col items-center max-w-[500px] mb-4">
            <Text className="text-xs text-slate-500 text-center leading-relaxed">
              for successfully completing the rigorous curriculum and practical requirements for
            </Text>
            <Text className="text-sm font-semibold text-slate-900 text-center mt-2 px-6">
              {courseTitle}
            </Text>
            <Text className="text-xs text-slate-500 text-center mt-2 leading-relaxed">
              demonstrating mastery in programmatic document rendering, styling, and distribution systems.
            </Text>
          </View>

          {/* Signatures & Metadata Footer */}
          <View className="flex flex-row justify-between items-end w-full px-12 mt-4 mb-4">
            {/* Issue Date */}
            <View className="flex flex-col items-start w-1/4">
              <Text className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Date of Issue</Text>
              <Text className="text-xs font-semibold text-slate-800">{issueDate}</Text>
            </View>

            {/* Signature Area */}
            <View className="flex flex-col items-center w-2/5 border-t border-slate-300 pt-2">
              <Text className="text-xs font-serif italic text-slate-600 mb-1">{issuerName}</Text>
              <Text className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{issuerTitle}</Text>
            </View>

            {/* Certificate ID */}
            <View className="flex flex-col items-end w-1/4">
              <Text className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Verification ID</Text>
              <Text className="text-xs font-mono font-semibold text-slate-800">{certificateId}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Certificate;
