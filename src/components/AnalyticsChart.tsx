import React from 'react';
import { BarChart3, Globe, Smartphone, Monitor, Tablet } from 'lucide-react';

interface ChartData {
  label: string;
  value: number;
  percentage?: number;
}

interface AnalyticsChartProps {
  title: string;
  data: ChartData[];
  type: 'bar' | 'donut' | 'list';
  icon?: React.ReactNode;
}

export const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  title,
  data,
  type,
  icon
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  const getDeviceIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case 'mobile':
        return <Smartphone size={16} className="text-blue-600" />;
      case 'tablet':
        return <Tablet size={16} className="text-green-600" />;
      case 'desktop':
        return <Monitor size={16} className="text-purple-600" />;
      default:
        return <Globe size={16} className="text-gray-600" />;
    }
  };

  const renderBarChart = () => (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="w-20 text-sm text-gray-600 truncate">{item.label}</div>
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(item.value / maxValue) * 100}%` }}
            />
          </div>
          <div className="w-12 text-sm font-medium text-gray-900 text-right">{item.value}</div>
        </div>
      ))}
    </div>
  );

  const renderList = () => (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            {title.toLowerCase().includes('device') && getDeviceIcon(item.label)}
            <span className="text-sm font-medium text-gray-900">{item.label}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-gray-900">{item.value}</span>
            {item.percentage && (
              <span className="text-xs text-gray-500">({item.percentage}%)</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderDonutChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    return (
      <div className="flex items-center space-x-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="8"
            />
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const strokeDasharray = `${percentage * 2.51} ${251 - percentage * 2.51}`;
              const strokeDashoffset = -cumulativePercentage * 2.51;
              cumulativePercentage += percentage;
              
              const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981', '#3b82f6'];
              
              return (
                <circle
                  key={index}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={colors[index % colors.length]}
                  strokeWidth="8"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-900">{total}</span>
          </div>
        </div>
        <div className="space-y-2">
          {data.map((item, index) => {
            const colors = ['bg-amber-500', 'bg-pink-500', 'bg-purple-500', 'bg-green-500', 'bg-blue-500'];
            const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;
            
            return (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${colors[index % colors.length]}`} />
                <span className="text-sm text-gray-600">{item.label}</span>
                <span className="text-sm font-medium text-gray-900">
                  {item.value} ({percentage}%)
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center space-x-3 mb-4">
        {icon && <div className="text-gray-400">{icon}</div>}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      {data.length > 0 ? (
        <>
          {type === 'bar' && renderBarChart()}
          {type === 'list' && renderList()}
          {type === 'donut' && renderDonutChart()}
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <BarChart3 size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">No data available</p>
        </div>
      )}
    </div>
  );
};