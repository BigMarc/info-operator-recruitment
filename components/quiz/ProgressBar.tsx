'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  variant: 'v1' | 'v2' | 'v3';
}

export default function ProgressBar({ currentStep, totalSteps, variant }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  const getVariantColor = () => {
    switch (variant) {
      case 'v1':
        return 'from-blue-500 to-purple-600';
      case 'v2':
        return 'from-green-500 to-teal-600';
      case 'v3':
        return 'from-orange-500 to-red-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
      <div 
        className={`h-2 rounded-full bg-gradient-to-r ${getVariantColor()} transition-all duration-500 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
