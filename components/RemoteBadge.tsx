interface RemoteBadgeProps {
  remote: string;
}

export default function RemoteBadge({ remote }: RemoteBadgeProps) {
  const isFullRemote = remote === 'full';
  return (
    <span className={`inline-flex items-center gap-1 rounded-full text-xs px-2 py-0.5 font-medium border
      ${isFullRemote
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
        : 'bg-violet-50 text-violet-700 border-violet-200'
      }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isFullRemote ? 'bg-emerald-500' : 'bg-violet-500'}`} />
      {isFullRemote ? 'Fully Remote' : 'Hybrid'}
    </span>
  );
}
