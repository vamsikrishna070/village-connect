import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Briefcase,
  Sprout,
  HeartPulse,
  BookOpen,
  MessageSquare,
  Shield,
  LogOut
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function AppLayout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  if (!user) return null;

  const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Jobs", url: "/job", icon: Briefcase },
    { title: "Agriculture", url: "/agriculture", icon: Sprout },
    { title: "Healthcare", url: "/healthcare", icon: HeartPulse },
    { title: "Education", url: "/education", icon: BookOpen },
    { title: "My Grievances", url: "/grievance", icon: MessageSquare }
  ];
  if (user.role === "admin") {
    navItems.push({ title: "Admin Panel", url: "/admin", icon: Shield });
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full bg-background">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <img src="/favicon.svg" alt="VillageConnect Logo" className="size-8 rounded-md shadow-sm" />
              <span className="text-xl font-bold text-foreground">VillageConnect</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Services</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={location.pathname.startsWith(item.url)}>
                        <Link to={item.url} className="flex items-center gap-2 text-base py-6">
                          <item.icon className="size-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <Badge variant="secondary" className="w-fit text-[10px] uppercase">{user.role}</Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start gap-2" onClick={logout}>
              <LogOut className="size-4" />
              Log out
            </Button>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 md:hidden">
            <SidebarTrigger />
            <span className="font-semibold">VillageConnect</span>
          </header>
          <main className="flex-1 overflow-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
