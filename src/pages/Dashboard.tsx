import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity, Zap, DollarSign, CheckCircle, Package, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    activeServices: 0,
    connectedTools: 0,
    totalSpent: 0,
  });
  const [apiConnections, setApiConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch services count
      const { count: servicesCount } = await supabase
        .from('user_services')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'active');

      // Fetch API connections
      const { data: connections } = await supabase
        .from('api_connections')
        .select('*')
        .eq('user_id', user.id);

      // Fetch total spent (sum of service prices)
      const { data: services } = await supabase
        .from('user_services')
        .select('price')
        .eq('user_id', user.id);

      const totalSpent = services?.reduce((sum, service) => sum + Number(service.price), 0) || 0;

      setStats({
        activeServices: servicesCount || 0,
        connectedTools: connections?.filter(c => c.status === 'connected').length || 0,
        totalSpent,
      });

      setApiConnections(connections || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const recentActivities = [
    { date: 'Dec 10, 2024', activity: 'NextCore Activated', status: 'Active' },
    { date: 'Dec 12, 2024', activity: 'AI Tool Connected', status: 'Success' },
    { date: 'Dec 15, 2024', activity: 'Payment Processed', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 ml-64 p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-montserrat font-extrabold text-foreground mb-2">
            Dashboard
          </h1>
          <p className="text-grey-light font-montserrat">
            Welcome back! Here's what's happening with your account.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="tech-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-montserrat font-semibold text-grey-light">
                Active Services
              </CardTitle>
              <Package className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-montserrat font-extrabold text-foreground">
                {loading ? '...' : stats.activeServices}
              </div>
              <p className="text-xs text-grey-light font-montserrat mt-1">Services running</p>
            </CardContent>
          </Card>

          <Card className="tech-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-montserrat font-semibold text-grey-light">
                Connected AI Tools
              </CardTitle>
              <Zap className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-montserrat font-extrabold text-foreground">
                {loading ? '...' : stats.connectedTools}
              </div>
              <p className="text-xs text-grey-light font-montserrat mt-1">Tools connected</p>
            </CardContent>
          </Card>

          <Card className="tech-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-montserrat font-semibold text-grey-light">
                Total Spent
              </CardTitle>
              <DollarSign className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-montserrat font-extrabold text-foreground">
                ${loading ? '...' : stats.totalSpent.toFixed(0)}
              </div>
              <p className="text-xs text-grey-light font-montserrat mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="tech-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-montserrat font-semibold text-grey-light">
                Account Status
              </CardTitle>
              <CheckCircle className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-montserrat font-extrabold text-primary">
                Active
              </div>
              <p className="text-xs text-grey-light font-montserrat mt-1">All systems go</p>
            </CardContent>
          </Card>
        </div>

        {/* Connected AI Tools Section */}
        <Card className="tech-card mb-8">
          <CardHeader>
            <CardTitle className="font-montserrat font-extrabold text-2xl">
              Connected AI Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            {apiConnections.length === 0 ? (
              <div className="text-center py-8">
                <Zap className="h-12 w-12 text-grey-medium mx-auto mb-4" />
                <p className="text-grey-light font-montserrat mb-4">
                  No AI tools connected yet
                </p>
                <Button onClick={() => navigate('/dashboard/ai-tools')}>
                  Connect Tool
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {apiConnections.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between p-4 bg-grey-dark rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-montserrat font-semibold text-foreground">
                          {tool.tool_name}
                        </h4>
                        <p className="text-sm text-grey-light font-montserrat">
                          Last used: {tool.last_used ? new Date(tool.last_used).toLocaleDateString() : 'Never'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={tool.status === 'connected' ? 'default' : 'destructive'}>
                        {tool.status}
                      </Badge>
                      <Button size="sm" onClick={() => navigate('/dashboard/ai-tools')}>
                        Open Tool
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="tech-card mb-8">
          <CardHeader>
            <CardTitle className="font-montserrat font-extrabold text-2xl">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-grey-dark rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-montserrat text-sm text-foreground">{activity.activity}</p>
                      <p className="text-xs text-grey-light font-montserrat">{activity.date}</p>
                    </div>
                  </div>
                  <Badge variant={activity.status === 'Active' || activity.status === 'Success' ? 'default' : 'secondary'}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/products')}>
            <Package className="h-5 w-5" />
            <span className="text-sm font-montserrat">Browse Products</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/dashboard/ai-tools')}>
            <Zap className="h-5 w-5" />
            <span className="text-sm font-montserrat">Connect AI Tool</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/dashboard/billing')}>
            <DollarSign className="h-5 w-5" />
            <span className="text-sm font-montserrat">View Invoices</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col gap-2" onClick={() => navigate('/contact')}>
            <Mail className="h-5 w-5" />
            <span className="text-sm font-montserrat">Contact Support</span>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
