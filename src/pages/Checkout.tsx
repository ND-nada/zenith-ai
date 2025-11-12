import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, CreditCard, CheckCircle, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { products } from '@/data/products';

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const productId = searchParams.get('product');
  const planParam = searchParams.get('plan');

  const product = products.find(p => p.id === productId);

  const [selectedPlan, setSelectedPlan] = useState(planParam || 'professional');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const pricingTiers = {
    starter: { name: 'Starter', price: 99 },
    professional: { name: 'Professional', price: 299 },
    enterprise: { name: 'Enterprise', price: 999 },
  };

  useEffect(() => {
    if (!user) {
      navigate(`/products/${productId}`);
      return;
    }

    if (!product) {
      toast.error('Product not found');
      navigate('/products');
    }
  }, [user, product, productId, navigate]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !product) return;

    if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) {
      toast.error('Please fill in all card details');
      return;
    }

    setProcessing(true);

    try {
      const selectedPlanData = pricingTiers[selectedPlan as keyof typeof pricingTiers];

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          product_id: product.id,
          product_name: product.name,
          plan: selectedPlanData.name,
          amount: selectedPlanData.price,
          status: 'completed',
          payment_method: paymentMethod,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const { error: productError } = await supabase
        .from('user_products')
        .insert({
          user_id: user.id,
          product_id: product.id,
          product_name: product.name,
          plan: selectedPlanData.name,
          price: selectedPlanData.price,
          status: 'active',
          order_id: orderData.id,
        });

      if (productError) throw productError;

      toast.success('Purchase completed successfully!');

      setTimeout(() => {
        navigate('/dashboard/ai-tools');
      }, 1500);

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Failed to complete purchase');
    } finally {
      setProcessing(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-montserrat font-extrabold text-foreground mb-2">
              Checkout
            </h1>
            <p className="text-grey-light font-montserrat">
              Complete your purchase securely
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleCheckout} className="space-y-6">
                <Card className="tech-card p-6">
                  <h2 className="text-2xl font-montserrat font-bold mb-6">Select Plan</h2>
                  <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
                    {Object.entries(pricingTiers).map(([key, tier]) => (
                      <div key={key} className="flex items-center space-x-3 p-4 rounded-lg border border-grey-medium hover:border-primary transition-all">
                        <RadioGroupItem value={key} id={key} />
                        <Label htmlFor={key} className="flex-1 cursor-pointer">
                          <div className="flex justify-between items-center">
                            <span className="font-montserrat font-semibold">{tier.name}</span>
                            <span className="text-primary font-montserrat font-bold">${tier.price}/mo</span>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </Card>

                <Card className="tech-card p-6">
                  <h2 className="text-2xl font-montserrat font-bold mb-6">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border border-grey-medium hover:border-primary transition-all">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                        <CreditCard className="h-5 w-5" />
                        <span className="font-montserrat font-semibold">Credit/Debit Card</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="card-number" className="font-montserrat">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="bg-grey-dark border-grey-medium font-montserrat mt-2"
                          maxLength={19}
                        />
                      </div>

                      <div>
                        <Label htmlFor="card-name" className="font-montserrat">Cardholder Name</Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          className="bg-grey-dark border-grey-medium font-montserrat mt-2"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="font-montserrat">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="bg-grey-dark border-grey-medium font-montserrat mt-2"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="font-montserrat">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="bg-grey-dark border-grey-medium font-montserrat mt-2"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Card>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-5 w-5" />
                      Complete Purchase
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-grey-light font-montserrat">
                  Your payment information is secure and encrypted
                </p>
              </form>
            </div>

            <div className="lg:col-span-1">
              <Card className="tech-card p-6 sticky top-24">
                <h2 className="text-xl font-montserrat font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-2xl font-bold text-background">AI</span>
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold">{product.name}</h3>
                      <p className="text-sm text-grey-light">{product.category}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-grey-medium">
                  <div className="flex justify-between">
                    <span className="text-grey-light font-montserrat">Plan</span>
                    <span className="font-montserrat font-semibold">
                      {pricingTiers[selectedPlan as keyof typeof pricingTiers].name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-grey-light font-montserrat">Billing</span>
                    <span className="font-montserrat font-semibold">Monthly</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-grey-medium">
                    <span className="font-montserrat font-bold">Total</span>
                    <span className="text-2xl font-montserrat font-extrabold text-primary">
                      ${pricingTiers[selectedPlan as keyof typeof pricingTiers].price}/mo
                    </span>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-montserrat font-semibold text-sm mb-1">What's Included:</p>
                      <ul className="text-xs text-grey-light space-y-1">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
