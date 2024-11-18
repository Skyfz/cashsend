'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

interface CookieSettings {
  necessary: boolean;
  functional: boolean;
  performance: boolean;
  marketing: boolean;
  analytics: boolean;
}

export default function CookieSettings() {
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    functional: false,
    performance: false,
    marketing: false,
    analytics: false,
  });

  useEffect(() => {
    // Load saved settings from localStorage when component mounts
    const savedSettings = localStorage.getItem('cookieSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      // Ensure necessary cookies are always true
      setSettings({ ...parsedSettings, necessary: true });
    }
  }, []);

  const handleSave = () => {
    // Here you would implement the actual cookie saving logic
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    toast({
      title: 'Cookie preferences saved',
      description: 'Your cookie preferences have been saved successfully.',
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Cookie Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage your cookie preferences. We use cookies to enhance your browsing experience and analyse our traffic.
      </p>

      <div className="space-y-6">
        {/* Strictly Necessary */}
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Strictly Necessary Cookies</h2>
              <p className="text-sm text-muted-foreground">These cookies are essential for the website to function properly.</p>
            </div>
            <Switch
              checked={settings.necessary}
              disabled={true}
              className="bg-primary"
            >
              <span className="sr-only">Enable necessary cookies</span>
              <span className="inline-block h-4 w-4 transform rounded-full bg-background transition" />
            </Switch>
          </div>
        </div>

        {/* Functional */}
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Functional Cookies</h2>
              <p className="text-sm text-muted-foreground">Enable personalised features and remember your preferences.</p>
            </div>
            <Switch
              checked={settings.functional}
              onCheckedChange={(checked: boolean) => setSettings({ ...settings, functional: checked })}
              className="bg-primary"
            >
              <span className="sr-only">Enable functional cookies</span>
              <span className="inline-block h-4 w-4 transform rounded-full bg-background transition" />
            </Switch>
          </div>
        </div>

        {/* Performance */}
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Performance Cookies</h2>
              <p className="text-sm text-muted-foreground">Help us improve website performance and user experience.</p>
            </div>
            <Switch
              checked={settings.performance}
              onCheckedChange={(checked: boolean) => setSettings({ ...settings, performance: checked })}
              className="bg-primary"
            >
              <span className="sr-only">Enable performance cookies</span>
              <span className="inline-block h-4 w-4 transform rounded-full bg-background transition" />
            </Switch>
          </div>
        </div>

        {/* Marketing */}
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Marketing Cookies</h2>
              <p className="text-sm text-muted-foreground">Used to deliver personalised advertisements based on your interests.</p>
            </div>
            <Switch
              checked={settings.marketing}
              onCheckedChange={(checked: boolean) => setSettings({ ...settings, marketing: checked })}
              className="bg-primary"
            >
              <span className="sr-only">Enable marketing cookies</span>
              <span className="inline-block h-4 w-4 transform rounded-full bg-background transition" />
            </Switch>
          </div>
        </div>

        {/* Analytics */}
        <div className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Analytics Cookies</h2>
              <p className="text-sm text-muted-foreground">Help us understand how visitors interact with our website.</p>
            </div>
            <Switch
              checked={settings.analytics}
              onCheckedChange={(checked: boolean) => setSettings({ ...settings, analytics: checked })}
              className="bg-primary"
            >
              <span className="sr-only">Enable analytics cookies</span>
              <span className="inline-block h-4 w-4 transform rounded-full bg-background transition" />
            </Switch>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={handleSave}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
