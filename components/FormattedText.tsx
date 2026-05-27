// Render **bold** markdown-style emphasis as <strong> elements.
// Used by sections that store body copy in dictionaries with **bold** markers.

interface FormattedTextProps {
  text: string;
  strongClassName?: string;
}

export default function FormattedText({ text, strongClassName = 'font-bold' }: FormattedTextProps) {
  const parts = text.split('**');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1
          ? <strong key={i} className={strongClassName}>{part}</strong>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}
