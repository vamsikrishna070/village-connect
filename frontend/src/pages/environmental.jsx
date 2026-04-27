import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { getEnvironmental } from "@/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, Search, Plus, Sprout } from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const categoryOptions = [
  { value: "soil", label: "Soil Health" },
  { value: "water", label: "Water Conservation" },
  { value: "air", label: "Air Quality" },
  { value: "climate", label: "Climate Awareness" },
  { value: "renewable", label: "Renewable Energy" },
  { value: "waste", label: "Waste Management" },
  { value: "biodiversity", label: "Biodiversity" }
];

export default function Environmental() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [envData, setEnvData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnvData = async () => {
      setLoading(true);
      try {
        const response = await getEnvironmental({ search, category });
        setEnvData(response.data);
      } catch (error) {
        console.error("Failed to fetch environmental data:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchEnvData, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  const canCreateContent = user?.role === "admin" || user?.role === "provider";
  const items = envData?.data || [];

  return (
    <AppLayout>
      <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              <Leaf className="size-9 text-green-600" />
              Environmental Awareness
            </h1>
            <p className="text-muted-foreground mt-3 text-lg">Learn about sustainability and environmental conservation practices.</p>
          </div>
          {canCreateContent && (
            <Link to="/admin">
              <Button className="gap-2 bg-green-600 hover:bg-green-700">
                <Plus className="size-4" />
                Add Content
              </Button>
            </Link>
          )}
        </div>

        <Card className="bg-muted/40 border-dashed shadow-sm">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search environmental content..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoryOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : items.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Sprout className="size-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No environmental content found. Check back soon!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link key={item._id} to={`/environmental/${item._id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  {item.imageUrl && (
                    <div className="h-40 bg-gradient-to-br from-green-100 to-blue-100 overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="inline-block">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {categoryOptions.find((o) => o.value === item.category)?.label || item.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">{item.description}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    {format(new Date(item.createdAt), "MMM dd, yyyy")}
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
