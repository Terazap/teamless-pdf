import React from 'react';
import { Document, Page, View, Text } from '@teamless/react';

export interface TicketProps {
  eventName?: string;
  location?: string;
  dateTime?: string;
  attendeeName?: string;
  ticketType?: string;
  seat?: string;
  gate?: string;
  ticketNumber?: string;
}

const defaultProps: TicketProps = {
  eventName: 'Teamless Conf 2026',
  location: 'Yerba Buena Center for the Arts, San Francisco, CA',
  dateTime: 'Thursday, October 15, 2026 at 9:00 AM PST',
  attendeeName: 'Mohit Rai',
  ticketType: 'VIP Full Access Pass',
  seat: 'Row A / Seat 12',
  gate: 'South Entrance',
  ticketNumber: 'TC-9283-771B',
};

export const Ticket = (props: TicketProps) => {
  const mergedProps = { ...defaultProps, ...props };
  const {
    eventName,
    location,
    dateTime,
    attendeeName,
    ticketType,
    seat,
    gate,
    ticketNumber,
  } = mergedProps;

  return (
    <Document>
      <Page size="A4" className="p-12 font-sans bg-slate-50 text-slate-800 flex flex-col justify-center items-center">
        {/* Ticket Outer Wrapper Card */}
        <View className="w-full bg-white border border-slate-200 rounded-2xl flex flex-row shadow-sm overflow-hidden my-auto">
          
          {/* Main Stub (Left) */}
          <View className="w-3/4 p-8 flex flex-col justify-between border-r-2 border-dashed border-slate-200 relative">
            {/* Top Cutout */}
            <View className="absolute right-[-10px] top-[-10px] w-5 h-5 bg-slate-50 rounded-full border border-slate-200" />
            {/* Bottom Cutout */}
            <View className="absolute right-[-10px] bottom-[-10px] w-5 h-5 bg-slate-50 rounded-full border border-slate-200" />
            
            <View>
              {/* Event Header */}
              <View className="flex flex-row justify-between items-center mb-6">
                <Text className="text-xs font-bold text-slate-400 uppercase tracking-[4px]">EVENT PASS</Text>
                <View className="bg-slate-900 rounded px-2 py-0.5">
                  <Text className="text-[9px] font-bold text-white uppercase">{ticketType}</Text>
                </View>
              </View>

              {/* Event Title */}
              <Text className="text-2xl font-bold text-slate-900 tracking-tight mb-2">{eventName}</Text>
              <Text className="text-xs text-slate-500 mb-6">{location}</Text>

              {/* Grid of details */}
              <View className="flex flex-row gap-8 mb-6">
                <View className="flex flex-col">
                  <Text className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Date & Time</Text>
                  <Text className="text-xs font-bold text-slate-800">{dateTime}</Text>
                </View>
              </View>

              {/* Attendee Name */}
              <View className="flex flex-col">
                <Text className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Attendee</Text>
                <Text className="text-sm font-bold text-slate-900">{attendeeName}</Text>
              </View>
            </View>

            {/* Simulated Barcode */}
            <View className="flex flex-row items-end mt-8">
              <View className="flex flex-col">
                <View className="flex flex-row gap-0.5 h-8 items-end mb-1">
                  <View className="w-1.5 h-full bg-slate-900" />
                  <View className="w-0.5 h-full bg-slate-900" />
                  <View className="w-1 h-full bg-slate-900" />
                  <View className="w-0.5 h-full bg-slate-900" />
                  <View className="w-2 h-full bg-slate-900" />
                  <View className="w-0.5 h-full bg-slate-900" />
                  <View className="w-1.5 h-full bg-slate-900" />
                  <View className="w-1 h-full bg-slate-900" />
                  <View className="w-0.5 h-full bg-slate-900" />
                  <View className="w-2 h-full bg-slate-900" />
                  <View className="w-1.5 h-full bg-slate-900" />
                  <View className="w-0.5 h-full bg-slate-900" />
                  <View className="w-1 h-full bg-slate-900" />
                  <View className="w-0.5 h-full bg-slate-900" />
                  <View className="w-2 h-full bg-slate-900" />
                  <View className="w-0.5 h-full bg-slate-900" />
                  <View className="w-1.5 h-full bg-slate-900" />
                  <View className="w-1 h-full bg-slate-900" />
                  <View className="w-0.5 h-full bg-slate-900" />
                  <View className="w-2 h-full bg-slate-900" />
                  <View className="w-1 h-full bg-slate-900" />
                </View>
                <Text className="text-[9px] font-mono text-slate-400">{ticketNumber}</Text>
              </View>
            </View>
          </View>

          {/* Ticket Stub (Right) */}
          <View className="w-1/4 p-8 flex flex-col justify-between bg-slate-50">
            <View>
              <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">STUB</Text>
              
              <View className="flex flex-col gap-4">
                <View className="flex flex-col">
                  <Text className="text-[9px] text-slate-400 uppercase font-semibold mb-0.5">Gate</Text>
                  <Text className="text-xs font-bold text-slate-800">{gate}</Text>
                </View>
                <View className="flex flex-col">
                  <Text className="text-[9px] text-slate-400 uppercase font-semibold mb-0.5">Seat</Text>
                  <Text className="text-xs font-bold text-slate-800">{seat}</Text>
                </View>
              </View>
            </View>

            <View className="flex flex-col items-center mt-6">
              {/* Brand Logo in Stub */}
              <Text className="text-[10px] font-bold text-slate-900 tracking-wider">TEAMLESS</Text>
              <Text className="text-[8px] text-slate-400 mt-0.5">Confirm Entry</Text>
            </View>
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default Ticket;
