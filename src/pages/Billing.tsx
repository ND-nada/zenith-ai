import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Download, Calendar } from 'lucide-react';
import DashboardSidebar from '@/components/DashboardSidebar';

const Billing = () => {
  const invoices = [
    { id: 'INV-001', date: 'Dec 1, 2024', amount: 299, status: 'Paid' },
    { id: 'INV-002', date: 'Nov 1, 2024', amount: 299, status: 'Paid' },
    { id: 'INV-003', date: 'Oct 1, 2024', amount: 299, status: 'Paid' },
    { id: 'INV-004', date: 'Sep 1, 2024', amount: 299, status: 'Paid' },
    { id: 'INV-005', date: 'Aug 1, 2024', amount: 299, status: 'Paid' },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-montserrat font-extrabold text-foreground mb-2">
            Billing
          </h1>
          <p className="text-grey-light font-montserrat">
            Manage your payment methods and billing history
          </p>
        </div>

        {/* Payment Method */}
        <Card className="tech-card mb-8">
          <CardHeader>
            <CardTitle className="font-montserrat font-extrabold text-2xl">
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-grey-dark rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-montserrat font-semibold text-foreground">
                    Visa ending in 4242
                  </p>
                  <p className="text-sm text-grey-light font-montserrat">
                    Expires 12/2025
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Next Payment */}
        <Card className="tech-card mb-8">
          <CardHeader>
            <CardTitle className="font-montserrat font-extrabold text-2xl">
              Next Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-grey-dark rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-montserrat text-sm text-grey-light">Due Date</p>
                    <p className="font-montserrat font-semibold text-foreground">
                      January 1, 2025
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-montserrat text-sm text-grey-light">Amount</p>
                  <p className="text-2xl font-montserrat font-extrabold text-primary">
                    $299.00
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-grey-medium">
                <Button className="w-full">
                  Manage Subscription
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="tech-card">
          <CardHeader>
            <CardTitle className="font-montserrat font-extrabold text-2xl">
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-grey-medium">
                    <th className="text-left py-3 px-4 font-montserrat font-semibold text-grey-light">
                      Invoice #
                    </th>
                    <th className="text-left py-3 px-4 font-montserrat font-semibold text-grey-light">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-montserrat font-semibold text-grey-light">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-montserrat font-semibold text-grey-light">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-montserrat font-semibold text-grey-light">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-grey-darker">
                      <td className="py-3 px-4 font-montserrat text-foreground">
                        {invoice.id}
                      </td>
                      <td className="py-3 px-4 font-montserrat text-grey-light">
                        {invoice.date}
                      </td>
                      <td className="py-3 px-4 font-montserrat font-semibold text-foreground">
                        ${invoice.amount}.00
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="default">
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Billing;
