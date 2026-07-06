import React from 'react';
import { Document, Page, View, Text } from '@teamless/react';

export interface InvoiceProps {
  invoiceNumber?: string;
  issueDate?: string;
  dueDate?: string;
  sender?: {
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  recipient?: {
    name: string;
    email: string;
    address: string;
  };
  items?: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
  taxRate?: number;
  notes?: string;
  paymentInstructions?: string;
}

const defaultProps: InvoiceProps = {
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
  notes: 'Thank you for choosing Teamless for your document generation needs. We appreciate your business!',
  paymentInstructions: 'Please wire payments to Chase Bank, SWIFT: CHASUS33XXX, Account: 987654321. Refer to invoice number INV-2026-0042.',
};

export const Invoice = (props: InvoiceProps) => {
  const mergedProps = { ...defaultProps, ...props };
  const {
    invoiceNumber,
    issueDate,
    dueDate,
    sender,
    recipient,
    items = [],
    taxRate = 0,
    notes,
    paymentInstructions,
  } = mergedProps;

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <Document>
      <Page size="A4" className="p-12 font-sans bg-white text-slate-800">
        {/* Header */}
        <View className="flex flex-row justify-between items-start border-b border-slate-200 pb-8 mb-8">
          <View className="flex flex-col">
            <Text className="text-2xl font-bold text-slate-900 mb-1">TEAMLESS</Text>
            <Text className="text-xs text-slate-500 uppercase tracking-widest">INVOICE</Text>
          </View>
          <View className="flex flex-col items-end">
            <Text className="text-sm font-semibold text-slate-900">{invoiceNumber}</Text>
            <Text className="text-xs text-slate-500 mt-1">Date: {issueDate}</Text>
            <Text className="text-xs text-slate-500">Due Date: {dueDate}</Text>
          </View>
        </View>

        {/* Addresses */}
        <View className="flex flex-row justify-between mb-10 gap-6">
          <View className="flex flex-col w-1/2">
            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">From</Text>
            <Text className="text-sm font-semibold text-slate-900 mb-1">{sender?.name}</Text>
            <Text className="text-xs text-slate-500 leading-relaxed">{sender?.address}</Text>
            <Text className="text-xs text-slate-500 mt-1">{sender?.email}</Text>
            <Text className="text-xs text-slate-500">{sender?.phone}</Text>
          </View>
          <View className="flex flex-col w-1/2">
            <Text className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Bill To</Text>
            <Text className="text-sm font-semibold text-slate-900 mb-1">{recipient?.name}</Text>
            <Text className="text-xs text-slate-500 leading-relaxed">{recipient?.address}</Text>
            <Text className="text-xs text-slate-500 mt-1">{recipient?.email}</Text>
          </View>
        </View>

        {/* Table Header */}
        <View className="flex flex-row border-b border-slate-300 pb-2 mb-2">
          <View className="flex flex-col w-3/5">
            <Text className="text-xs font-semibold text-slate-500">Description</Text>
          </View>
          <View className="flex flex-col w-1/12 items-center">
            <Text className="text-xs font-semibold text-slate-500">Qty</Text>
          </View>
          <View className="flex flex-col w-1/6 items-end">
            <Text className="text-xs font-semibold text-slate-500">Unit Price</Text>
          </View>
          <View className="flex flex-col w-1/6 items-end">
            <Text className="text-xs font-semibold text-slate-500">Amount</Text>
          </View>
        </View>

        {/* Table Rows */}
        {items.map((item, index) => (
          <View key={index} className="flex flex-row border-b border-slate-100 py-3 items-center">
            <View className="flex flex-col w-3/5">
              <Text className="text-xs text-slate-900">{item.description}</Text>
            </View>
            <View className="flex flex-col w-1/12 items-center">
              <Text className="text-xs text-slate-600">{item.quantity}</Text>
            </View>
            <View className="flex flex-col w-1/6 items-end">
              <Text className="text-xs text-slate-600">${item.unitPrice.toFixed(2)}</Text>
            </View>
            <View className="flex flex-col w-1/6 items-end">
              <Text className="text-xs font-semibold text-slate-900">
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </Text>
            </View>
          </View>
        ))}

        {/* Totals Section */}
        <View className="flex flex-row justify-end mt-6">
          <View className="flex flex-col w-2/5 border-t border-slate-200 pt-3">
            <View className="flex flex-row justify-between mb-1.5">
              <Text className="text-xs text-slate-500">Subtotal</Text>
              <Text className="text-xs font-medium text-slate-900">${subtotal.toFixed(2)}</Text>
            </View>
            <View className="flex flex-row justify-between mb-2">
              <Text className="text-xs text-slate-500">Tax ({(taxRate * 100).toFixed(0)}%)</Text>
              <Text className="text-xs font-medium text-slate-900">${taxAmount.toFixed(2)}</Text>
            </View>
            <View className="flex flex-row justify-between border-t border-slate-200 pt-2 mb-2">
              <Text className="text-sm font-bold text-slate-900">Total Due</Text>
              <Text className="text-sm font-bold text-slate-900">${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Payment details and Notes */}
        <View className="flex flex-col mt-12 pt-8 border-t border-slate-100">
          {paymentInstructions && (
            <View className="flex flex-col mb-4">
              <Text className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Payment Info
              </Text>
              <Text className="text-xs text-slate-600 leading-relaxed">{paymentInstructions}</Text>
            </View>
          )}
          {notes && (
            <View className="flex flex-col">
              <Text className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Notes
              </Text>
              <Text className="text-xs text-slate-500 leading-relaxed">{notes}</Text>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default Invoice;
