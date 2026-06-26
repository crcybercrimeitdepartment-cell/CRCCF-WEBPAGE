const fs = require('fs');

const cssStyles = `
  /* Theme Design Colors */
  :root {
    --color-primary-blue: #2563EB;
    --color-hover-blue: #1D4ED8;
    --color-navy-dark: #0F2B5B;
    --color-accent-blue: #3B82F6;
    --color-badge-blue: #DBEAFE;
    --color-text-heading: #0F172A;
    --color-text-body: #475569;
    --color-text-secondary: #64748B;
    --color-text-muted: #94A3B8;
    --color-bg-main: #F8FAFC;
    --color-bg-card: #FFFFFF;
    --color-bg-section: #F1F5F9;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px) scale(0.98); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
  .animate-fade-in:nth-child(1) { animation-delay: 0ms; }
  .animate-fade-in:nth-child(2) { animation-delay: 50ms; }
  .animate-fade-in:nth-child(3) { animation-delay: 100ms; }
  .animate-fade-in:nth-child(4) { animation-delay: 150ms; }
  .animate-fade-in:nth-child(5) { animation-delay: 200ms; }
  .animate-fade-in:nth-child(6) { animation-delay: 250ms; }
  .animate-fade-in:nth-child(7) { animation-delay: 300ms; }
  .animate-fade-in:nth-child(8) { animation-delay: 350ms; }
  .animate-fade-in:nth-child(9) { animation-delay: 400ms; }
  .animate-fade-in:nth-child(10) { animation-delay: 450ms; }
  .animate-fade-in:nth-child(11) { animation-delay: 500ms; }
  .animate-fade-in:nth-child(12) { animation-delay: 550ms; }

  .bg-corporate-radial {
    background-image:
      radial-gradient(circle at 10% 20%, rgba(37, 99, 235, 0.03) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 40%);
  }

  .whiteboard-surface {
    background-color: #f1f5f9;
    background-image:
      radial-gradient(circle at 50% 30%, #f8fafc 20%, #e2e8f0 100%),
      linear-gradient(to right, rgba(148, 163, 184, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(148, 163, 184, 0.04) 1px, transparent 1px);
    background-size: 100% 100%, 24px 24px, 24px 24px;
    position: relative;
    box-shadow:
      inset 0 4px 12px rgba(15, 23, 42, 0.07),
      inset 0 -4px 12px rgba(15, 23, 42, 0.02);
  }

  .whiteboard-frame {
    border: 14px solid;
    border-color: #f8fafc #94a3b8 #475569 #cbd5e1;
    border-radius: 28px;
    background-color: #cbd5e1;
    box-shadow:
      0 30px 60px -15px rgba(15, 23, 42, 0.3),
      0 15px 30px -10px rgba(15, 23, 42, 0.2),
      0 4px 12px rgba(0, 0, 0, 0.12),
      inset 0 2px 4px rgba(255, 255, 255, 0.85),
      inset 0 -2px 4px rgba(15, 23, 42, 0.25);
  }

  .whiteboard-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid rgba(226, 232, 240, 0.7);
    box-shadow:
      0 8px 20px -8px rgba(15, 23, 42, 0.08),
      0 3px 8px -4px rgba(15, 23, 42, 0.04),
      0 0 15px -3px rgba(37, 99, 235, 0.1),
      0 0 30px -5px rgba(59, 130, 246, 0.06),
      inset 0 2px 4px rgba(255, 255, 255, 0.9),
      inset 0 -4px 8px rgba(15, 23, 42, 0.03);
    transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .whiteboard-card:hover {
    transform: translateY(-4px) scale(1.015);
    border-color: rgba(59, 130, 246, 0.25);
    box-shadow:
      0 18px 30px -10px rgba(15, 23, 42, 0.12),
      0 8px 12px -6px rgba(15, 23, 42, 0.08),
      0 0 20px -2px rgba(37, 99, 235, 0.18),
      0 0 40px -4px rgba(59, 130, 246, 0.1),
      inset 0 2px 4px rgba(255, 255, 255, 0.95),
      inset 0 -4px 8px rgba(15, 23, 42, 0.015);
  }
  .whiteboard-card:active {
    transform: translateY(-1px) scale(0.99);
    box-shadow:
      0 4px 8px -2px rgba(15, 23, 42, 0.08),
      0 0 12px -2px rgba(37, 99, 235, 0.12),
      inset 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .neumorphic-icon-container {
    background: #f8fafc;
    box-shadow:
      inset 2px 2px 5px rgba(15, 23, 42, 0.06),
      inset -3px -3px 7px rgba(255, 255, 255, 0.8),
      2px 4px 10px rgba(15, 23, 42, 0.03);
    border: 1px solid rgba(226, 232, 240, 0.5);
  }

  @keyframes dropFromHeader {
    0% { opacity: 0; transform: translateY(-950px); }
    60% { opacity: 1; transform: translateY(15px); }
    80% { transform: translateY(-7px); }
    92% { transform: translateY(3px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-drop-from-header {
    animation: dropFromHeader 3.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  
  .bg-primary-blue { background-color: var(--color-primary-blue); }
  .text-primary-blue { color: var(--color-primary-blue); }
  .bg-hover-blue { background-color: var(--color-hover-blue); }
  .text-hover-blue { color: var(--color-hover-blue); }
  .bg-badge-blue { background-color: var(--color-badge-blue); }
  .text-text-heading { color: var(--color-text-heading); }
  .text-text-body { color: var(--color-text-body); }
  .text-text-secondary { color: var(--color-text-secondary); }
  .text-text-muted { color: var(--color-text-muted); }
  .bg-bg-main { background-color: var(--color-bg-main); }
  .bg-bg-card { background-color: var(--color-bg-card); }
  .bg-bg-section { background-color: var(--color-bg-section); }
  
  .border-bg-section { border-color: var(--color-bg-section); }
  .border-accent-blue { border-color: var(--color-accent-blue); }
  .border-transparent { border-color: transparent; }
`;

let content = fs.readFileSync('src/new-pages/InternshipPage.jsx', 'utf8');

const replacement = `export default function InternshipPage() {
  return (
    <>
      <style>{\`${cssStyles}\`}</style>
      <InternshipDashboard />
    </>
  );
}`;

content = content.replace(
  'export default function InternshipPage() {\n  return <InternshipDashboard />;\n}',
  replacement
);

fs.writeFileSync('src/new-pages/InternshipPage.jsx', content);
console.log('Injected CSS into InternshipPage.jsx');
