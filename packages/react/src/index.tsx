import React from 'react';
import * as ReactPdf from '@react-pdf/renderer';
import { createTw } from 'react-pdf-tailwind';

// Default Teamless theme extending Tailwind with high-quality defaults
let tw = createTw({
  colors: {
    brand: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#111827',
      900: '#030712',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020817',
    },
  },
  fontFamily: {
    sans: ['Helvetica'],
    serif: ['Times-Roman'],
    mono: ['Courier'],
  },
});

/**
 * Configure the global Teamless Tailwind CSS styles and theme.
 */
export function configureTeamless(config: Parameters<typeof createTw>[0]) {
  tw = createTw(config);
}

/**
 * Helper to process and combine Tailwind classes with standard styles.
 */
function combineStyles(className?: string, style?: any) {
  const twStyles = className ? tw(className) : {};
  if (!style) return twStyles;
  if (Array.isArray(style)) return [twStyles, ...style];
  return [twStyles, style];
}

// ----------------------------------------------------
// Wrapped Teamless Components
// ----------------------------------------------------

export interface DocumentProps extends ReactPdf.DocumentProps {
  children?: React.ReactNode;
}
export const Document = ({ children, ...props }: DocumentProps) => {
  return <ReactPdf.Document {...props}>{children}</ReactPdf.Document>;
};
Document.displayName = 'Document';

export interface PageProps extends ReactPdf.PageProps {
  className?: string;
  children?: React.ReactNode;
}
export const Page = React.forwardRef<any, PageProps>(({ className, style, children, ...props }, ref) => {
  return (
    <ReactPdf.Page ref={ref} style={combineStyles(className, style)} {...props}>
      {children}
    </ReactPdf.Page>
  );
});
Page.displayName = 'Page';

export interface ViewProps extends ReactPdf.ViewProps {
  className?: string;
  children?: React.ReactNode;
}
export const View = React.forwardRef<any, ViewProps>(({ className, style, children, ...props }, ref) => {
  return (
    <ReactPdf.View ref={ref} style={combineStyles(className, style)} {...props}>
      {children}
    </ReactPdf.View>
  );
});
View.displayName = 'View';

export interface TextProps extends ReactPdf.TextProps {
  className?: string;
  children?: React.ReactNode;
}
export const Text = React.forwardRef<any, TextProps>(({ className, style, children, ...props }, ref) => {
  return (
    <ReactPdf.Text ref={ref} style={combineStyles(className, style)} {...props}>
      {children}
    </ReactPdf.Text>
  );
});
Text.displayName = 'Text';

export type ImageProps = ReactPdf.ImageProps & {
  className?: string;
};
export const Image = React.forwardRef<any, ImageProps>(({ className, style, ...props }, ref) => {
  return <ReactPdf.Image ref={ref} style={combineStyles(className, style) as any} {...(props as any)} />;
});
Image.displayName = 'Image';

export type LinkProps = ReactPdf.LinkProps & {
  className?: string;
  children?: React.ReactNode;
};
export const Link = React.forwardRef<any, LinkProps>(({ className, style, children, ...props }, ref) => {
  return (
    <ReactPdf.Link ref={ref} style={combineStyles(className, style) as any} {...(props as any)}>
      {children}
    </ReactPdf.Link>
  );
});
Link.displayName = 'Link';

export type CanvasProps = ReactPdf.CanvasProps & {
  className?: string;
};
export const Canvas = React.forwardRef<any, CanvasProps>(({ className, style, ...props }, ref) => {
  return <ReactPdf.Canvas ref={ref} style={combineStyles(className, style) as any} {...(props as any)} />;
});
Canvas.displayName = 'Canvas';

export type NoteProps = ReactPdf.NoteProps & {
  className?: string;
  children?: string;
};
export const Note = React.forwardRef<any, NoteProps>(({ className, style, children, ...props }, ref) => {
  return (
    <ReactPdf.Note ref={ref} style={combineStyles(className, style) as any} {...(props as any)}>
      {children}
    </ReactPdf.Note>
  );
});
Note.displayName = 'Note';

// ----------------------------------------------------
// Teamless Prefixed Aliases for direct imports
// ----------------------------------------------------

export {
  Document as TeamlessDocument,
  Page as TeamlessPage,
  View as TeamlessView,
  Text as TeamlessText,
  Image as TeamlessImage,
  Link as TeamlessLink,
  Canvas as TeamlessCanvas,
  Note as TeamlessNote,
};

// ----------------------------------------------------
// Standard React-PDF exports
// ----------------------------------------------------

export {
  Font,
  StyleSheet,
  pdf,
  renderToStream,
  renderToString,
  renderToFile,
  usePDF,
  version,
  // SVG components
  Svg,
  Line,
  Polyline,
  Polygon,
  Path,
  Rect,
  Circle,
  Ellipse,
  G,
  Stop,
  Defs,
  ClipPath,
  LinearGradient,
  RadialGradient,
} from '@react-pdf/renderer';

export { tw };
