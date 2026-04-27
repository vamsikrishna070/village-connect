import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardSummary, getGrievance, getJob } from "@/api";
import { Shield, Users, Briefcase, MessageSquare, Clock3, CheckCircle2, BarChart3 } from "lucide-react";

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState("overview");
  const [summary, setSummary] = useState(null);
  const [grievancesData, setGrievancesData] = useState(null);
  const [jobsData, setJobsData] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingGrievances, setLoadingGrievances] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) return;

    const fetchData = async () => {
      setLoadingSummary(true);
      try {
        const response = await getDashboardSummary();
        setSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch admin summary:", error);
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchData();
  }, [isAdmin]);

  useEffect(() => {
    if (tab === "grievances" && !grievancesData) {
      const fetchGrievances = async () => {
        setLoadingGrievances(true);
        try {
          const response = await getGrievance({ page: 1, limit: 10 });
          setGrievancesData(response.data);
        } catch (error) {
          console.error("Failed to fetch admin grievances:", error);
        } finally {
          setLoadingGrievances(false);
        }
      };
      fetchGrievances();
    } else if (tab === "jobs" && !jobsData) {
      const fetchJobs = async () => {
        setLoadingJobs(true);
        try {
          const response = await getJob({ page: 1, limit: 10 });
          setJobsData(response.data);
        } catch (error) {
          console.error("Failed to fetch admin jobs:", error);
        } finally {
          setLoadingJobs(false);
        }
      };
      fetchJobs();
    }
  }, [tab, grievancesData, jobsData]);

  if (!isAdmin) {
    return (
      <AppLayout>
        <div className="text-center py-32 px-4">
          <h1 className="text-4xl font-bold mb-6">Access Denied</h1>
          <p className="text-muted-foreground mb-8 text-lg">You don't have permission to access this page.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3"><Shield className="size-8 text-primary" /> Admin Panel</h1>
          <p className="text-muted-foreground mt-3 text-lg">Manage all community services and grievances</p>
        </div>

        <div className="flex flex-wrap gap-2 rounded-lg border bg-muted/30 p-2 w-fit">
          <Button variant={tab === "overview" ? "secondary" : "ghost"} size="sm" onClick={() => setTab("overview")} className="gap-2">
            <BarChart3 className="size-4" /> Overview
          </Button>
          <Button variant={tab === "grievances" ? "secondary" : "ghost"} size="sm" onClick={() => setTab("grievances")} className="gap-2">
            <MessageSquare className="size-4" /> Grievances
          </Button>
          <Button variant={tab === "jobs" ? "secondary" : "ghost"} size="sm" onClick={() => setTab("jobs")} className="gap-2">
            <Briefcase className="size-4" /> Jobs
          </Button>
        </div>

        {tab === "overview" && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    {loadingSummary ? <Skeleton className="h-8 w-16 mt-2" /> : <p className="text-4xl font-bold mt-1">{summary?.totalUsers ?? 0}</p>}
                  </div>
                  <Users className="size-7 text-primary" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                    {loadingSummary ? <Skeleton className="h-8 w-16 mt-2" /> : <p className="text-4xl font-bold mt-1">{summary?.totalJobs ?? 0}</p>}
                  </div>
                  <Briefcase className="size-7 text-primary" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Grievances</p>
                    {loadingSummary ? <Skeleton className="h-8 w-16 mt-2" /> : <p className="text-4xl font-bold mt-1">{summary?.totalGrievances ?? 0}</p>}
                  </div>
                  <MessageSquare className="size-7 text-primary" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    {loadingSummary ? <Skeleton className="h-8 w-16 mt-2" /> : <p className="text-4xl font-bold mt-1">{summary?.pendingGrievances ?? 0}</p>}
                  </div>
                  <Clock3 className="size-7 text-amber-500" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                    {loadingSummary ? <Skeleton className="h-8 w-16 mt-2" /> : <p className="text-4xl font-bold mt-1">{summary?.resolvedGrievances ?? 0}</p>}
                  </div>
                  <CheckCircle2 className="size-7 text-green-600" />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Agriculture Entries</p>
                    {loadingSummary ? <Skeleton className="h-8 w-16 mt-2" /> : <p className="text-4xl font-bold mt-1">{summary?.totalAgricultureEntries ?? 0}</p>}
                  </div>
                  <BarChart3 className="size-7 text-primary" />
                </CardContent>
              </Card>
            </div>
            <p className="text-muted-foreground text-sm mt-4">Use the Grievances and Jobs tabs to manage entries. Use the Agriculture, Healthcare, and Education pages from the sidebar to manage those sections.</p>
          </>
        )}

        {tab === "grievances" && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Grievances</CardTitle>
              <CardDescription>Latest complaints submitted by users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingGrievances ? (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              ) : (grievancesData?.data ?? []).length > 0 ? (
                (grievancesData?.data ?? []).map((item) => (
                  <div key={item.id} className="rounded-md border p-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </div>
                    <Badge variant="secondary" className="uppercase">{item.status?.replace("_", " ")}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground py-4 text-center">No grievances found.</p>
              )}
            </CardContent>
          </Card>
        )}

        {tab === "jobs" && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Jobs</CardTitle>
              <CardDescription>Latest job postings in the platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {loadingJobs ? (
                <>
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </>
              ) : (jobsData?.data ?? []).length > 0 ? (
                (jobsData?.data ?? []).map((job) => (
                  <div key={job.id} className="rounded-md border p-4">
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground py-4 text-center">No jobs found.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
