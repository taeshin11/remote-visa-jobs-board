interface VisaBadgeProps {
  visa: string;
  size?: 'sm' | 'md';
}

const visaColors: Record<string, string> = {
  H1B: 'bg-blue-100 text-blue-800 border-blue-200',
  TN: 'bg-green-100 text-green-800 border-green-200',
  'Skilled Worker': 'bg-purple-100 text-purple-800 border-purple-200',
  'Blue Card': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  TSS: 'bg-orange-100 text-orange-800 border-orange-200',
  LTSVP: 'bg-teal-100 text-teal-800 border-teal-200',
  'Critical Skills': 'bg-rose-100 text-rose-800 border-rose-200',
  'Employment Pass': 'bg-amber-100 text-amber-800 border-amber-200',
};

export default function VisaBadge({ visa, size = 'sm' }: VisaBadgeProps) {
  const colorClass = visaColors[visa] || 'bg-gray-100 text-gray-700 border-gray-200';
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${colorClass} ${sizeClass}`}>
      {visa}
    </span>
  );
}
