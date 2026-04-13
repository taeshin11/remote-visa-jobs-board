interface AdPlaceholderProps {
  type: 'native' | 'display' | 'social';
  className?: string;
}

export default function AdPlaceholder({ type, className = '' }: AdPlaceholderProps) {
  if (type === 'native') {
    return (
      <div
        id="adsterra-native-banner"
        className={`w-full my-6 min-h-[90px] bg-purple-50 rounded-xl flex items-center justify-center text-gray-400 text-xs border border-purple-100 ${className}`}
      >
        <span className="text-purple-300">[ Advertisement ]</span>
      </div>
    );
  }

  if (type === 'display') {
    return (
      <div
        id="adsterra-display-banner"
        className={`w-[300px] h-[250px] bg-purple-50 rounded-xl flex items-center justify-center text-gray-400 text-xs mx-auto my-4 border border-purple-100 ${className}`}
      >
        <span className="text-purple-300">[ Advertisement 300×250 ]</span>
      </div>
    );
  }

  return null;
}
