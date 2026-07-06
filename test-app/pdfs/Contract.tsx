import React from 'react';
import { Document, Page, View, Text } from '@teamless/react';

export interface ContractProps {
  title?: string;
  effectiveDate?: string;
  partyA?: {
    name: string;
    type: string;
    state: string;
    address: string;
  };
  partyB?: {
    name: string;
    type: string;
    state: string;
    address: string;
  };
  clauses?: Array<{
    title: string;
    body: string;
  }>;
}

const defaultProps: ContractProps = {
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
    {
      title: 'Term and Termination',
      body: 'This Agreement will commence on the Effective Date and remain in effect for a period of two (2) years, or until terminated by either party with thirty (30) days prior written notice. The obligations of confidentiality hereunder will survive for five (5) years following the disclosure of any Confidential Information.',
    },
    {
      title: 'Miscellaneous',
      body: 'This Agreement constitutes the entire agreement between the parties regarding its subject matter and supersedes all prior discussions. This Agreement will be governed by the laws of the State of Delaware, without regard to conflict of laws principles. Any amendments must be in writing and signed by both parties.',
    },
  ],
};

export const Contract = (props: ContractProps) => {
  const mergedProps = { ...defaultProps, ...props };
  const { title, effectiveDate, partyA, partyB, clauses = [] } = mergedProps;

  return (
    <Document>
      <Page size="A4" className="p-16 font-sans bg-white text-slate-800 flex flex-col justify-between">
        <View>
          {/* Header */}
          <View className="flex flex-col items-center border-b border-slate-300 pb-4 mb-8">
            <Text className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">
              Legal Agreement
            </Text>
            <Text className="text-lg font-bold text-slate-900 text-center tracking-tight font-serif">
              {title}
            </Text>
            <Text className="text-xs text-slate-500 mt-2">Effective Date: {effectiveDate}</Text>
          </View>

          {/* Preamble / Introduction */}
          <Text className="text-[10px] text-slate-700 leading-relaxed mb-6">
            This Mutual Non-Disclosure Agreement (the "Agreement") is entered into as of the Effective Date
            written above, by and between{' '}
            <Text className="font-semibold text-slate-900">{partyA?.name}</Text>, a {partyA?.type}{' '}
            organized under the laws of {partyA?.state}, with offices at {partyA?.address} ("Party A"), and{' '}
            <Text className="font-semibold text-slate-900">{partyB?.name}</Text>, a {partyB?.type}{' '}
            organized under the laws of {partyB?.state}, with offices at {partyB?.address} ("Party B").
            Party A and Party B may collectively be referred to as the "Parties" or individually as a
            "Party."
          </Text>

          {/* Clauses */}
          <View className="flex flex-col gap-5">
            {clauses.map((clause, index) => (
              <View key={index} className="flex flex-col">
                <Text className="text-xs font-bold text-slate-950 mb-1">
                  {index + 1}. {clause.title}
                </Text>
                <Text className="text-[10px] text-slate-600 leading-relaxed text-justify">
                  {clause.body}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Signatures Footer */}
        <View className="mt-12">
          <Text className="text-[10px] text-slate-500 mb-6 text-center italic">
            IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.
          </Text>
          <View className="flex flex-row justify-between gap-12">
            {/* Party A */}
            <View className="flex flex-col w-1/2">
              <Text className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-1 mb-6">
                Party A: {partyA?.name}
              </Text>
              <View className="flex flex-col gap-2">
                <View className="flex flex-row border-b border-slate-200 pb-1">
                  <Text className="text-[9px] text-slate-400 w-12">By:</Text>
                  <Text className="text-[9px] text-slate-800 font-serif italic">John Doe</Text>
                </View>
                <View className="flex flex-row border-b border-slate-200 pb-1">
                  <Text className="text-[9px] text-slate-400 w-12">Name:</Text>
                  <Text className="text-[9px] text-slate-800">John Doe</Text>
                </View>
                <View className="flex flex-row border-b border-slate-200 pb-1">
                  <Text className="text-[9px] text-slate-400 w-12">Title:</Text>
                  <Text className="text-[9px] text-slate-800">President & CEO</Text>
                </View>
                <View className="flex flex-row border-b border-slate-200 pb-1">
                  <Text className="text-[9px] text-slate-400 w-12">Date:</Text>
                  <Text className="text-[9px] text-slate-800">{effectiveDate}</Text>
                </View>
              </View>
            </View>

            {/* Party B */}
            <View className="flex flex-col w-1/2">
              <Text className="text-xs font-bold text-slate-900 border-b border-slate-200 pb-1 mb-6">
                Party B: {partyB?.name}
              </Text>
              <View className="flex flex-col gap-2">
                <View className="flex flex-row border-b border-slate-200 pb-1">
                  <Text className="text-[9px] text-slate-400 w-12">By:</Text>
                  <Text className="text-[9px] text-slate-800 font-serif italic">Sarah Connor</Text>
                </View>
                <View className="flex flex-row border-b border-slate-200 pb-1">
                  <Text className="text-[9px] text-slate-400 w-12">Name:</Text>
                  <Text className="text-[9px] text-slate-800">Sarah Connor</Text>
                </View>
                <View className="flex flex-row border-b border-slate-200 pb-1">
                  <Text className="text-[9px] text-slate-400 w-12">Title:</Text>
                  <Text className="text-[9px] text-slate-800">Director of Ops</Text>
                </View>
                <View className="flex flex-row border-b border-slate-200 pb-1">
                  <Text className="text-[9px] text-slate-400 w-12">Date:</Text>
                  <Text className="text-[9px] text-slate-800">{effectiveDate}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Contract;
