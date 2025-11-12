import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Zap, CheckCircle, XCircle, Eye, EyeOff, ChevronDown, Loader2, Send } from 'lucide-react';
import { toast } from 'sonner';
import DashboardSidebar from '@/components/DashboardSidebar';

const AITools = () => {
  const { user } = useAuth();
  const [connections, setConnections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  
  // Form state
  const [toolName, setToolName] = useState('');
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [timeoutSeconds, setTimeoutSeconds] = useState('30');
  const [rateLimit, setRateLimit] = useState('');
  
  // Test interface state
  const [testInput, setTestInput] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    fetchConnections();
  }, [user]);

  const fetchConnections = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('api_connections')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setConnections(data || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
      toast.error('Failed to load connections');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfiguration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase
        .from('api_connections')
        .insert({
          user_id: user.id,
          tool_name: toolName,
          api_url: apiUrl,
          api_key: apiKey,
          timeout_seconds: parseInt(timeoutSeconds),
          rate_limit: rateLimit ? parseInt(rateLimit) : null,
          status: 'connected',
        });

      if (error) throw error;

      toast.success('API connection saved successfully!');
      
      // Reset form
      setToolName('');
      setApiUrl('');
      setApiKey('');
      setTimeoutSeconds('30');
      setRateLimit('');
      
      fetchConnections();
    } catch (error: any) {
      console.error('Error saving connection:', error);
      toast.error(error.message || 'Failed to save connection');
    }
  };

  const testConnection = async (connectionId: string, apiUrl: string) => {
    setTestingConnection(connectionId);
    
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        toast.success('Connection successful!');
        
        // Update last_used timestamp
        await supabase
          .from('api_connections')
          .update({ last_used: new Date().toISOString() })
          .eq('id', connectionId);
          
        fetchConnections();
      } else {
        toast.error(`Connection failed: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error('Connection test error:', error);
      toast.error('Connection test failed');
    } finally {
      setTestingConnection(null);
    }
  };

  const disconnectTool = async (connectionId: string) => {
    try {
      const { error } = await supabase
        .from('api_connections')
        .delete()
        .eq('id', connectionId);

      if (error) throw error;

      toast.success('Tool disconnected successfully');
      fetchConnections();
    } catch (error) {
      console.error('Error disconnecting tool:', error);
      toast.error('Failed to disconnect tool');
    }
  };

  const handleTestAPI = async () => {
    if (!testInput.trim()) {
      toast.error('Please enter test input');
      return;
    }

    if (connections.length === 0) {
      toast.error('Please connect an API first');
      return;
    }

    setTesting(true);
    setTestOutput('');

    try {
      const connection = connections[0];
      const response = await fetch(connection.api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${connection.api_key}`,
        },
        body: JSON.stringify({ input: testInput }),
      });

      const data = await response.json();
      setTestOutput(JSON.stringify(data, null, 2));
      
      // Update last_used
      await supabase
        .from('api_connections')
        .update({ last_used: new Date().toISOString() })
        .eq('id', connection.id);
        
    } catch (error: any) {
      console.error('API test error:', error);
      setTestOutput(`Error: ${error.message}`);
      toast.error('API test failed');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-montserrat font-extrabold text-foreground mb-2">
            My AI Tools
          </h1>
          <p className="text-grey-light font-montserrat">
            Connect and manage your external AI tools and APIs
          </p>
        </div>

        {/* Connected Tools Section */}
        {connections.length > 0 && (
          <Card className="tech-card mb-8">
            <CardHeader>
              <CardTitle className="font-montserrat font-extrabold text-2xl">
                Connected Tools
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connections.map((tool) => (
                <div key={tool.id} className="p-6 bg-grey-dark rounded-lg space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-primary neon-glow" />
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-lg text-foreground">
                          {tool.tool_name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          {tool.status === 'connected' ? (
                            <CheckCircle className="h-4 w-4 text-primary" />
                          ) : (
                            <XCircle className="h-4 w-4 text-destructive" />
                          )}
                          <Badge variant={tool.status === 'connected' ? 'default' : 'destructive'}>
                            {tool.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => testConnection(tool.id, tool.api_url)}
                        disabled={testingConnection === tool.id}
                      >
                        {testingConnection === tool.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Test Connection'
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => disconnectTool(tool.id)}
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-grey-light font-montserrat">API Endpoint</p>
                      <p className="text-foreground font-montserrat font-medium truncate">
                        {tool.api_url}
                      </p>
                    </div>
                    <div>
                      <p className="text-grey-light font-montserrat">Last Sync</p>
                      <p className="text-foreground font-montserrat font-medium">
                        {tool.last_used ? new Date(tool.last_used).toLocaleString() : 'Never'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* API Configuration Panel */}
        <Card className="tech-card mb-8">
          <CardHeader>
            <CardTitle className="font-montserrat font-extrabold text-2xl">
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveConfiguration} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="tool-name" className="font-montserrat">
                  Tool Name
                </Label>
                <Input
                  id="tool-name"
                  placeholder="e.g., OpenAI GPT-4"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  required
                  className="bg-grey-dark border-grey-medium font-montserrat"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-url" className="font-montserrat">
                  API Base URL
                </Label>
                <Input
                  id="api-url"
                  placeholder="https://api.example.com/v1"
                  value={apiUrl}
                  onChange={(e) => setApiUrl(e.target.value)}
                  required
                  className="bg-grey-dark border-grey-medium font-montserrat"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="api-key" className="font-montserrat">
                  API Key
                </Label>
                <div className="relative">
                  <Input
                    id="api-key"
                    type={showApiKey ? 'text' : 'password'}
                    placeholder="sk-..."
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    required
                    className="bg-grey-dark border-grey-medium font-montserrat pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-light hover:text-foreground"
                  >
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Advanced Settings */}
              <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm text-grey-light hover:text-foreground font-montserrat">
                  <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? 'rotate-180' : ''}`} />
                  Advanced Settings
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeout" className="font-montserrat">
                      Timeout (seconds)
                    </Label>
                    <Input
                      id="timeout"
                      type="number"
                      value={timeoutSeconds}
                      onChange={(e) => setTimeoutSeconds(e.target.value)}
                      className="bg-grey-dark border-grey-medium font-montserrat"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate-limit" className="font-montserrat">
                      Rate Limit (requests/min)
                    </Label>
                    <Input
                      id="rate-limit"
                      type="number"
                      placeholder="Optional"
                      value={rateLimit}
                      onChange={(e) => setRateLimit(e.target.value)}
                      className="bg-grey-dark border-grey-medium font-montserrat"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Button type="submit" className="w-full">
                Save Configuration
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tool Interface/Playground */}
        {connections.length > 0 && (
          <Card className="tech-card">
            <CardHeader>
              <CardTitle className="font-montserrat font-extrabold text-2xl">
                Test Playground
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-input" className="font-montserrat">
                  Input
                </Label>
                <Textarea
                  id="test-input"
                  placeholder="Enter your test input..."
                  value={testInput}
                  onChange={(e) => setTestInput(e.target.value)}
                  rows={4}
                  className="bg-grey-dark border-grey-medium font-montserrat"
                />
              </div>

              <Button
                onClick={handleTestAPI}
                disabled={testing}
                className="w-full"
              >
                {testing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Request
                  </>
                )}
              </Button>

              {testOutput && (
                <div className="space-y-2">
                  <Label className="font-montserrat">Response</Label>
                  <pre className="p-4 bg-grey-darker rounded-lg text-sm text-grey-light font-mono overflow-x-auto">
                    {testOutput}
                  </pre>
                </div>
              )}

              {/* API Usage Stats */}
              <div className="grid grid-cols-4 gap-4 pt-4 border-t border-grey-medium">
                <div className="text-center">
                  <p className="text-2xl font-montserrat font-extrabold text-primary">1,234</p>
                  <p className="text-xs text-grey-light font-montserrat">Total API Calls</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-montserrat font-extrabold text-primary">99.2%</p>
                  <p className="text-xs text-grey-light font-montserrat">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-montserrat font-extrabold text-foreground">2 mins</p>
                  <p className="text-xs text-grey-light font-montserrat">Last Call</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-montserrat font-extrabold text-foreground">8.5K</p>
                  <p className="text-xs text-grey-light font-montserrat">Monthly Quota</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {connections.length === 0 && !loading && (
          <Card className="tech-card">
            <CardContent className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary neon-glow" />
              </div>
              <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                Connect Your First AI Tool
              </h3>
              <p className="text-grey-light font-montserrat mb-6 max-w-md mx-auto">
                Get started by configuring your API credentials above. You can connect to OpenAI, Anthropic, or any custom API endpoint.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AITools;
