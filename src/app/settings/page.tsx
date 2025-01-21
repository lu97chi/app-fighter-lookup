"use client";

import * as React from "react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Bell,
  User,
  Settings,
  Shield,
  Mail,
  Phone,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

interface UserSettings {
  profile: {
    name: string;
    email: string;
    phone: string;
    timezone: string;
    language: string;
  };
  preferences: {
    theme: "light" | "dark" | "system";
    emailDigest: boolean;
    smsAlerts: boolean;
    soundEnabled: boolean;
  };
  notifications: {
    newContracts: boolean;
    upcomingFights: boolean;
    fighterUpdates: boolean;
    financialAlerts: boolean;
    marketingEmails: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginAlerts: boolean;
  };
}

const mockSettings: UserSettings = {
  profile: {
    name: "John Manager",
    email: "john@fightermanagement.com",
    phone: "+1 (555) 123-4567",
    timezone: "America/New_York",
    language: "English",
  },
  preferences: {
    theme: "system",
    emailDigest: true,
    smsAlerts: true,
    soundEnabled: true,
  },
  notifications: {
    newContracts: true,
    upcomingFights: true,
    fighterUpdates: true,
    financialAlerts: true,
    marketingEmails: false,
  },
  security: {
    twoFactorEnabled: true,
    lastPasswordChange: "2024-02-15",
    loginAlerts: true,
  },
};

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<UserSettings>({
    ...mockSettings,
    preferences: {
      ...mockSettings.preferences,
      theme: (theme as "light" | "dark" | "system") || "system",
    },
  });

  const updateSettings = (
    category: keyof UserSettings,
    field: string,
    value: boolean | string
  ) => {
    if (category === "preferences" && field === "theme") {
      setTheme(value as string);
    }
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={settings.profile.name}
                      onChange={(e) =>
                        updateSettings("profile", "name", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) =>
                        updateSettings("profile", "email", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={settings.profile.phone}
                      onChange={(e) =>
                        updateSettings("profile", "phone", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Select
                      value={settings.profile.timezone}
                      onValueChange={(value) =>
                        updateSettings("profile", "timezone", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Theme</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred theme
                  </p>
                </div>
                <Select
                  value={settings.preferences.theme}
                  onValueChange={(value: "light" | "dark" | "system") =>
                    updateSettings("preferences", "theme", value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive daily digest emails
                  </p>
                </div>
                <Switch
                  checked={settings.preferences.emailDigest}
                  onCheckedChange={(checked) =>
                    updateSettings("preferences", "emailDigest", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via SMS
                  </p>
                </div>
                <Switch
                  checked={settings.preferences.smsAlerts}
                  onCheckedChange={(checked) =>
                    updateSettings("preferences", "smsAlerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Sound Effects</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable sound effects in the app
                  </p>
                </div>
                <Switch
                  checked={settings.preferences.soundEnabled}
                  onCheckedChange={(checked) =>
                    updateSettings("preferences", "soundEnabled", checked)
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Contracts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new contract opportunities
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.newContracts}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications", "newContracts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Upcoming Fights</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders about upcoming fights
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.upcomingFights}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications", "upcomingFights", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Fighter Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Stay informed about your fighters&apos; activities
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.fighterUpdates}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications", "fighterUpdates", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Financial Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about important financial updates
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.financialAlerts}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications", "financialAlerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive promotional emails and newsletters
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.marketingEmails}
                  onCheckedChange={(checked) =>
                    updateSettings("notifications", "marketingEmails", checked)
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={settings.security.twoFactorEnabled}
                  onCheckedChange={(checked) =>
                    updateSettings("security", "twoFactorEnabled", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Login Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new sign-ins to your account
                  </p>
                </div>
                <Switch
                  checked={settings.security.loginAlerts}
                  onCheckedChange={(checked) =>
                    updateSettings("security", "loginAlerts", checked)
                  }
                />
              </div>

              <div className="space-y-0.5">
                <Label>Password</Label>
                <p className="text-sm text-muted-foreground">
                  Last changed on {new Date(settings.security.lastPasswordChange).toLocaleDateString()}
                </p>
                <Button variant="outline" className="mt-2">
                  Change Password
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 