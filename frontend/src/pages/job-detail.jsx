import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { getJobById } from "@/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, MapPin, Calendar, DollarSign, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const response = await getJobById(id);
        setJob(response.data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchJob();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-64 w-full" />
        </div>
      </AppLayout>
    );
  }

  if (!job) {
    return (
      <AppLayout>
        <div className="text-center py-16">
          <h2 className="text-xl font-semibold mb-4">Job not found</h2>
          <Button onClick={() => navigate("/jobs")}>Back to Jobs</Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6 max-w-3xl">
        <Button variant="ghost" onClick={() => navigate("/jobs")} className="gap-2 text-lg">
          <ArrowLeft className="size-5" /> Back to Jobs
        </Button>

        <Card className="shadow-md border-border/50">
          <CardHeader className="pb-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="text-4xl font-bold">{job.title}</CardTitle>
                <CardDescription className="text-lg mt-3">{job.postedByName}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{job.location}</p>
                </div>
              </div>
              {job.salary && (
                <div className="flex items-center gap-3">
                  <DollarSign className="size-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Salary</p>
                    <p className="font-medium">{job.salary}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="size-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Posted</p>
                  <p className="font-medium">{format(new Date(job.createdAt), "MMMM d, yyyy")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Briefcase className="size-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Posted by</p>
                  <p className="font-medium">{job.postedByName}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">Job Description</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{job.description}</p>
            </div>

            <Button className="w-full h-12 text-base" size="lg">
              Apply for This Job
            </Button>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
