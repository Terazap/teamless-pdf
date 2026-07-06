import React from 'react';
import { Document, Page, View, Text } from '@teamless/react';

export interface ReceiptProps {
  receiptId?: string;
  timestamp?: string;
  paymentMethod?: string;
  cardLast4?: string;
  customer?: {
    name: string;
    email: string;
  };
  items?: Array<{
    name: string;
    amount: number;
  }>;
  tax?: number;
  discount?: number;
  total?: number;
}

const defaultProps: ReceiptProps = {
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
};

export const Receipt = (props: ReceiptProps) => {
  const mergedProps = { ...defaultProps, ...props };
  const {
    receiptId,
    timestamp,
    paymentMethod,
    cardLast4,
    customer,
    items = [],
    tax = 0,
    discount = 0,
    total = 0,
  } = mergedProps;

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);

  return (
    <Document>
      <Page size="A4" className="p-12 font-sans bg-slate-50 text-slate-800 flex flex-col items-center">
        {/* Receipt Container Card */}
        <View className="w-4/5 bg-white p-8 border border-slate-200 rounded-2xl shadow-sm my-auto">
          {/* Header */}
          <View className="flex flex-col items-center border-b border-dashed border-slate-200 pb-6 mb-6">
            <Text className="text-xl font-bold text-slate-900 tracking-tight">TEAMLESS</Text>
            <Text className="text-xs text-slate-400 mt-1">Receipt for your payment</Text>
            <View className="mt-4 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <Text className="text-xs font-semibold text-emerald-700 uppercase">Payment Successful</Text>
            </View>
          </View>

          {/* Amount Paid Big Display */}
          <View className="flex flex-col items-center mb-8">
            <Text className="text-3xl font-extrabold text-slate-900 tracking-tight">
              ${total.toFixed(2)}
            </Text>
            <Text className="text-xs text-slate-400 mt-1">Paid on {timestamp}</Text>
          </View>

          {/* Metadata Grid */}
          <View className="flex flex-row justify-between mb-8 gap-4 border-b border-slate-100 pb-6">
            <View className="flex flex-col w-1/2">
              <Text className="text-xs text-slate-400 uppercase tracking-wider mb-1">Receipt Details</Text>
              <Text className="text-xs font-semibold text-slate-800">{receiptId}</Text>
              <Text className="text-xs text-slate-500 mt-0.5">{paymentMethod} (•••• {cardLast4})</Text>
            </View>
            <View className="flex flex-col w-1/2 items-end">
              <Text className="text-xs text-slate-400 uppercase tracking-wider mb-1">Billed To</Text>
              <Text className="text-xs font-semibold text-slate-800">{customer?.name}</Text>
              <Text className="text-xs text-slate-500 mt-0.5">{customer?.email}</Text>
            </View>
          </View>

          {/* Items List */}
          <View className="flex flex-col mb-6">
            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Purchase Breakdown
            </Text>
            {items.map((item, index) => (
              <View key={index} className="flex flex-row justify-between py-2 border-b border-slate-50">
                <Text className="text-xs text-slate-700 w-3/4 leading-relaxed">{item.name}</Text>
                <Text className="text-xs font-medium text-slate-900">${item.amount.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          {/* Calculations */}
          <View className="flex flex-col border-t border-slate-100 pt-4 gap-2">
            <View className="flex flex-row justify-between">
              <Text className="text-xs text-slate-500">Subtotal</Text>
              <Text className="text-xs font-medium text-slate-800">${subtotal.toFixed(2)}</Text>
            </View>
            {discount > 0 && (
              <View className="flex flex-row justify-between">
                <Text className="text-xs text-emerald-600">Discount</Text>
                <Text className="text-xs font-medium text-emerald-600">-${discount.toFixed(2)}</Text>
              </View>
            )}
            <View className="flex flex-row justify-between">
              <Text className="text-xs text-slate-500">Tax</Text>
              <Text className="text-xs font-medium text-slate-800">${tax.toFixed(2)}</Text>
            </View>
            <View className="flex flex-row justify-between border-t border-slate-200 pt-3 mt-1">
              <Text className="text-xs font-bold text-slate-900">Total Paid</Text>
              <Text className="text-xs font-bold text-slate-900">${total.toFixed(2)}</Text>
            </View>
          </View>

          {/* Footer Note */}
          <View className="flex flex-col items-center mt-8 pt-6 border-t border-dashed border-slate-200">
            <Text className="text-[10px] text-slate-400 text-center leading-relaxed">
              If you have any questions about this charge, please contact support@teamlessapp.me.
            </Text>
            <Text className="text-[10px] text-slate-400 text-center mt-1">
              Thank you for automating your documents with Teamless!
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default Receipt;
