import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Zap, Package, CreditCard, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardSidebar = () => {
  const { user, signOut } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Zap, label: 'My AI Tools', path: '/dashboard/ai-tools' },
    { icon: Package, label: 'Services', path: '/dashboard/services' },
    { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-background border-r border-grey-dark flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-grey-dark">
        <h1 className="text-2xl font-montserrat font-extrabold gradient-text">
          TagerAi
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-grey-light hover:bg-grey-dark transition-all font-montserrat"
            activeClassName="bg-primary/10 text-primary neon-glow"
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-grey-dark">
        <div className="flex items-center gap-3 mb-3 p-3 rounded-lg bg-grey-dark">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-montserrat font-semibold text-foreground truncate">
              {user?.email?.split('@')[0] || 'User'}
            </p>
            <p className="text-xs text-grey-light truncate font-montserrat">
              {user?.email}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 font-montserrat"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
