import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicLayout } from "@/components/layout/public-layout";
import { Briefcase, Sprout, HeartPulse, BookOpen, MessageSquare } from "lucide-react";

export default function Home() {
  return (
    <PublicLayout>
      <section className="bg-primary/5">
        <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full items-center justify-center px-6 md:px-8">
          <div className="flex flex-col items-center text-center space-y-10">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground max-w-3xl leading-tight">
              Your Village, Connected and Thriving
            </h1>
            <p className="text-2xl text-muted-foreground max-w-2xl leading-relaxed">
              Access jobs, agriculture tips, healthcare info, education resources, and connect with local government—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto text-lg px-10 py-7 h-auto font-semibold">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-10 py-7 h-auto font-semibold">Log In</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl leading-tight">Everything you need</h2>
            <p className="mt-6 text-xl text-muted-foreground leading-relaxed">Essential services for our rural community</p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Briefcase className="size-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Local Jobs</CardTitle>
                <CardDescription className="text-base">Find employment opportunities nearby or post jobs if you're hiring.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="size-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <Sprout className="size-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">Agriculture</CardTitle>
                <CardDescription className="text-base">Access farming tips, weather updates, and government schemes.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="size-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <HeartPulse className="size-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Healthcare</CardTitle>
                <CardDescription className="text-base">Find local clinics, health camps, and essential medical information.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="size-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <BookOpen className="size-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Education</CardTitle>
                <CardDescription className="text-base">Discover learning resources, scholarships, and skill development programs.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border shadow-sm hover:shadow-md transition-shadow lg:col-span-2">
              <CardHeader>
                <div className="size-12 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <MessageSquare className="size-6 text-amber-600" />
                </div>
                <CardTitle className="text-xl">Grievance Portal</CardTitle>
                <CardDescription className="text-base">Report issues to local authorities and track the status of your complaints directly.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
