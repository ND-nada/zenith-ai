import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardSidebar from '@/components/DashboardSidebar';
import { products } from '@/data/products';

const Services = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [user]);

  const fetchServices = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_services')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
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
            My Services
          </h1>
          <p className="text-grey-light font-montserrat">
            Manage your active services and subscriptions
          </p>
        </div>

        {/* Active Services */}
        {services.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-montserrat font-extrabold text-foreground mb-4">
              Active Services
            </h2>
            <div className="grid gap-6">
              {services.map((service) => (
                <Card key={service.id} className="tech-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-montserrat font-bold text-lg text-foreground">
                            {service.product_name}
                          </h3>
                          <p className="text-sm text-grey-light font-montserrat">
                            {service.plan} Plan
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className="text-2xl font-montserrat font-extrabold text-primary">
                          ${service.price}/mo
                        </div>
                        <Badge variant={service.status === 'active' ? 'default' : 'secondary'}>
                          {service.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {services.length === 0 && !loading && (
          <Card className="tech-card mb-8">
            <CardContent className="text-center py-12">
              <Package className="h-12 w-12 text-grey-medium mx-auto mb-4" />
              <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                No Active Services
              </h3>
              <p className="text-grey-light font-montserrat mb-6">
                You don't have any active services yet. Browse our products to get started.
              </p>
              <Button onClick={() => navigate('/products')}>
                Browse Products
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Available Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-montserrat font-extrabold text-foreground">
              Available Products
            </h2>
            <Button variant="ghost" onClick={() => navigate('/products')}>
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {products.slice(0, 4).map((product) => (
              <Card key={product.id} className="tech-card">
                <CardHeader>
                  <div className="aspect-video rounded-lg bg-grey-dark mb-4 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {product.category}
                    </Badge>
                    <span className="text-xl font-montserrat font-extrabold text-primary">
                      ${product.price}
                    </span>
                  </div>
                  <CardTitle className="font-montserrat font-extrabold text-xl">
                    {product.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-grey-light font-montserrat text-sm mb-4">
                    {product.description}
                  </p>
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;
