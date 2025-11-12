import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';

const Settings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    company: '',
    phone: '',
  });
  
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    marketingEmails: false,
    apiAlerts: true,
  });

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      if (data) {
        setProfile({
          full_name: data.full_name || '',
          company: data.company || '',
          phone: data.phone || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          company: profile.company,
          phone: profile.phone,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwords.new.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.new
      });

      if (error) throw error;

      toast.success('Password updated successfully!');
      setPasswords({ current: '', new: '', confirm: '' });
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-montserrat font-extrabold text-foreground mb-2">
            Settings
          </h1>
          <p className="text-grey-light font-montserrat">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-grey-dark">
            <TabsTrigger value="profile" className="font-montserrat">
              Profile
            </TabsTrigger>
            <TabsTrigger value="api" className="font-montserrat">
              API & Integrations
            </TabsTrigger>
            <TabsTrigger value="security" className="font-montserrat">
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="font-montserrat">
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="tech-card">
              <CardHeader>
                <CardTitle className="font-montserrat font-extrabold text-2xl">
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name" className="font-montserrat">
                      Full Name
                    </Label>
                    <Input
                      id="full-name"
                      value={profile.full_name}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      className="bg-grey-dark border-grey-medium font-montserrat"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-montserrat">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-grey-dark border-grey-medium font-montserrat opacity-50"
                    />
                    <p className="text-xs text-grey-light font-montserrat">
                      Email cannot be changed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="font-montserrat">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="bg-grey-dark border-grey-medium font-montserrat"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-montserrat">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-grey-dark border-grey-medium font-montserrat"
                    />
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API & Integrations Tab */}
          <TabsContent value="api">
            <Card className="tech-card">
              <CardHeader>
                <CardTitle className="font-montserrat font-extrabold text-2xl">
                  API & Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-grey-dark rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-montserrat font-semibold text-foreground mb-1">
                        Manage AI Tools
                      </h3>
                      <p className="text-sm text-grey-light font-montserrat">
                        Configure and test your AI tool connections
                      </p>
                    </div>
                    <Button onClick={() => navigate('/dashboard/ai-tools')}>
                      Open
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card className="tech-card">
              <CardHeader>
                <CardTitle className="font-montserrat font-extrabold text-2xl">
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="font-montserrat">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                      className="bg-grey-dark border-grey-medium font-montserrat"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="font-montserrat">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      className="bg-grey-dark border-grey-medium font-montserrat"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="font-montserrat">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      className="bg-grey-dark border-grey-medium font-montserrat"
                    />
                  </div>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card className="tech-card">
              <CardHeader>
                <CardTitle className="font-montserrat font-extrabold text-2xl">
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-montserrat font-semibold text-foreground">
                      Email Notifications
                    </p>
                    <p className="text-sm text-grey-light font-montserrat">
                      Receive updates about your account activity
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, emailNotifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-montserrat font-semibold text-foreground">
                      Marketing Emails
                    </p>
                    <p className="text-sm text-grey-light font-montserrat">
                      Get news about products and features
                    </p>
                  </div>
                  <Switch
                    checked={preferences.marketingEmails}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, marketingEmails: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-montserrat font-semibold text-foreground">
                      API Usage Alerts
                    </p>
                    <p className="text-sm text-grey-light font-montserrat">
                      Notifications when API limits are reached
                    </p>
                  </div>
                  <Switch
                    checked={preferences.apiAlerts}
                    onCheckedChange={(checked) => 
                      setPreferences({ ...preferences, apiAlerts: checked })
                    }
                  />
                </div>

                <Button>Save Preferences</Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="tech-card mt-6 border-destructive/50">
              <CardHeader>
                <CardTitle className="font-montserrat font-extrabold text-2xl text-destructive">
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-grey-light font-montserrat mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="destructive">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
