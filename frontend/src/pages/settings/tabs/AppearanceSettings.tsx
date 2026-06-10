import { useState, useEffect } from 'react';
import { Palette, Moon, Sun, Monitor, LayoutGrid } from 'lucide-react';
import { Card } from '../../../components/ui';
import toast from 'react-hot-toast';

type ThemeType = 'dark' | 'light' | 'system';
type DensityType = 'comfortable' | 'compact';

export default function AppearanceSettings() {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [density, setDensity] = useState<DensityType>('comfortable');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [theme]);

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    toast.success(`Theme set to ${newTheme} mode.`);
  };

  const handleDensityChange = (newDensity: DensityType) => {
    setDensity(newDensity);
    toast.success(`Dashboard density set to ${newDensity}.`);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h2 className="text-2xl font-heading font-bold text-white tracking-wide flex items-center gap-3">
          <Palette className="w-6 h-6 text-primary-500" /> Interface Appearance
        </h2>
        <p className="text-gray-400 mt-1">Customize the command center visual experience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-gray-400" /> Color Theme
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => handleThemeChange('dark')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-colors ${theme === 'dark' ? 'border-primary-500 bg-primary-500/10 text-white' : 'border-gray-700 bg-black/20 text-gray-400 hover:border-gray-600'}`}
              >
                <Moon className={`w-6 h-6 mb-2 ${theme === 'dark' ? 'text-primary-500' : ''}`} />
                <span className="font-bold text-sm">Dark Mode</span>
              </button>
              <button 
                onClick={() => handleThemeChange('light')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-colors ${theme === 'light' ? 'border-primary-500 bg-primary-500/10 text-white' : 'border-gray-700 bg-black/20 text-gray-400 hover:border-gray-600'}`}
              >
                <Sun className={`w-6 h-6 mb-2 ${theme === 'light' ? 'text-primary-500' : ''}`} />
                <span className="font-bold text-sm">Light Mode</span>
              </button>
              <button 
                onClick={() => handleThemeChange('system')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-colors ${theme === 'system' ? 'border-primary-500 bg-primary-500/10 text-white' : 'border-gray-700 bg-black/20 text-gray-400 hover:border-gray-600'}`}
              >
                <Monitor className={`w-6 h-6 mb-2 ${theme === 'system' ? 'text-primary-500' : ''}`} />
                <span className="font-bold text-sm">System Sync</span>
              </button>
            </div>
          </Card>

          <Card className="border-gray-800/50 bg-secondary-900/40 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-gray-400" /> Dashboard Density
            </h3>
            <div className="space-y-4">
              <label 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${density === 'comfortable' ? 'border-primary-500/50 bg-primary-500/5' : 'border-gray-800 bg-black/20 hover:border-gray-700'}`}
                onClick={() => handleDensityChange('comfortable')}
              >
                <div>
                  <p className="text-white font-medium">Comfortable (Default)</p>
                  <p className="text-xs text-gray-500">More spacing, larger text</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${density === 'comfortable' ? 'border-primary-500' : 'border-gray-600'}`}>
                  {density === 'comfortable' && <div className="w-2 h-2 rounded-full bg-primary-500" />}
                </div>
              </label>
              <label 
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${density === 'compact' ? 'border-primary-500/50 bg-primary-500/5' : 'border-gray-800 bg-black/20 hover:border-gray-700'}`}
                onClick={() => handleDensityChange('compact')}
              >
                <div>
                  <p className="text-white font-medium">Compact</p>
                  <p className="text-xs text-gray-500">Maximum data density</p>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${density === 'compact' ? 'border-primary-500' : 'border-gray-600'}`}>
                  {density === 'compact' && <div className="w-2 h-2 rounded-full bg-primary-500" />}
                </div>
              </label>
            </div>
          </Card>
        </div>

        {/* Live Preview Panel */}
        <Card className={`border-gray-800/50 backdrop-blur-xl flex flex-col p-0 overflow-hidden transition-colors duration-500 ${theme === 'light' ? 'bg-gray-100' : 'bg-black/40'}`}>
          <div className={`px-6 py-4 border-b border-gray-800 ${theme === 'light' ? 'bg-gray-200' : 'bg-secondary-900/50'}`}>
            <h3 className={`${theme === 'light' ? 'text-gray-900' : 'text-white'} font-bold flex items-center gap-2`}>
              <Palette className="w-4 h-4 text-primary-500" /> Live Preview
            </h3>
          </div>
          <div className={`flex-1 flex flex-col opacity-90 pointer-events-none transition-all duration-500 ${density === 'comfortable' ? 'p-6 gap-4' : 'p-3 gap-2'}`}>
            {/* Fake Dashboard Elements */}
            <div className="flex items-center justify-between">
              <div className={`w-32 bg-gray-800 rounded animate-pulse ${density === 'comfortable' ? 'h-6' : 'h-4'}`} />
              <div className="flex gap-2">
                <div className={`rounded-full bg-primary-500/20 ${density === 'comfortable' ? 'w-8 h-8' : 'w-6 h-6'}`} />
                <div className={`rounded-full bg-gray-800 ${density === 'comfortable' ? 'w-8 h-8' : 'w-6 h-6'}`} />
              </div>
            </div>
            <div className={`grid grid-cols-2 ${density === 'comfortable' ? 'gap-4' : 'gap-2'}`}>
              <div className={`rounded-xl border ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-secondary-900 border-gray-800'} ${density === 'comfortable' ? 'h-24 p-4' : 'h-16 p-2'}`}>
                <div className={`bg-gray-800 rounded mb-2 ${density === 'comfortable' ? 'w-16 h-4' : 'w-12 h-2'}`} />
                <div className={`bg-primary-500/50 rounded ${density === 'comfortable' ? 'w-10 h-8' : 'w-8 h-6'}`} />
              </div>
              <div className={`rounded-xl border ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-secondary-900 border-gray-800'} ${density === 'comfortable' ? 'h-24 p-4' : 'h-16 p-2'}`}>
                <div className={`bg-gray-800 rounded mb-2 ${density === 'comfortable' ? 'w-16 h-4' : 'w-12 h-2'}`} />
                <div className={`bg-accent-red/50 rounded ${density === 'comfortable' ? 'w-10 h-8' : 'w-8 h-6'}`} />
              </div>
            </div>
            <div className={`flex-1 rounded-xl border mt-2 flex items-center justify-center ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-secondary-900 border-gray-800'}`}>
              <p className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} font-mono text-xs`}>Chart Area</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
