import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { getDashboardSummary, getRecentActivity, getGrievanceStats } from "@/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Sprout, HeartPulse, BookOpen, MessageSquare, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [activities, setActivities] = useState(null);
  const [grievanceStats, setGrievanceStatsData] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    getDashboardSummary().then((res) => setSummary(res.data)).finally(() => setLoadingSummary(false));
    getRecentActivity().then((res) => setActivities(res.data)).finally(() => setLoadingActivity(false));
    getGrievanceStats().then((res) => setGrievanceStatsData(res.data)).finally(() => setLoadingStats(false));
  }, []);

  const pieData = grievanceStats ? [
    { name: "Pending", value: grievanceStats.pending, color: "hsl(var(--destructive))" },
    { name: "In Progress", value: grievanceStats.inProgress, color: "hsl(var(--chart-5))" },
    { name: "Resolved", value: grievanceStats.resolved, color: "hsl(var(--chart-1))" }
  ] : [];

  return (
    <AppLayout>
      <div className="space-y-8 px-6 py-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2 text-lg">Overview of community services and activity.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Briefcase className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loadingSummary ? <Skeleton className="h-8 w-16" /> : <div className="text-3xl font-bold">{summary?.totalJobs || 0}</div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Agriculture Info</CardTitle>
              <Sprout className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loadingSummary ? <Skeleton className="h-8 w-16" /> : <div className="text-3xl font-bold">{summary?.totalAgricultureEntries || 0}</div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Grievances</CardTitle>
              <MessageSquare className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loadingSummary ? <Skeleton className="h-8 w-16" /> : <div className="text-3xl font-bold">{summary?.pendingGrievances || 0}</div>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Community Members</CardTitle>
              <HeartPulse className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loadingSummary ? <Skeleton className="h-8 w-16" /> : <div className="text-3xl font-bold">{summary?.totalUsers || 0}</div>}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from around the village</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {loadingActivity ? Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="size-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                )) : activities && activities.length > 0 ? activities.map((activity) => {
                  let Icon = Clock;
                  let iconColor = "text-muted-foreground";
                  let bgColor = "bg-muted";
                  if (activity.type === "job_posted") { Icon = Briefcase; iconColor = "text-blue-600"; bgColor = "bg-blue-100 dark:bg-blue-900/30"; }
                  if (activity.type === "grievance_submitted") { Icon = AlertCircle; iconColor = "text-destructive"; bgColor = "bg-destructive/10"; }
                  if (activity.type === "grievance_resolved") { Icon = CheckCircle2; iconColor = "text-green-600"; bgColor = "bg-green-100 dark:bg-green-900/30"; }
                  if (activity.type === "content_updated") { Icon = BookOpen; iconColor = "text-primary"; bgColor = "bg-primary/10"; }
                  return (
                    <div key={activity.id} className="flex items-start gap-4">
                      <div className={`p-2 rounded-full ${bgColor}`}>
                        <Icon className={`size-5 ${iconColor}`} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium leading-none">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <span className="text-xs text-muted-foreground mt-1">
                          {format(new Date(activity.createdAt), "MMM d, yyyy 'at' h:mm a")}
                        </span>
                      </div>
                    </div>
                  );
                }) : <div className="text-center py-8 text-muted-foreground">No recent activity.</div>}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Grievance Status</CardTitle>
              <CardDescription>Overview of all community reports</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-75">
              {loadingStats ? <Skeleton className="size-50 rounded-full" /> : grievanceStats && (grievanceStats.pending > 0 || grievanceStats.inProgress > 0 || grievanceStats.resolved > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "1px solid hsl(var(--border))" }} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              ) : <div className="text-center text-muted-foreground">No grievances reported yet.</div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
