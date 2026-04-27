import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { getHealthcare, createHealthcare, updateHealthcare, deleteHealthcare } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { HeartPulse, Plus, Pencil, Trash2, Phone } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const CATEGORY_LABELS = {
  information: "Health Information",
  service: "Health Service",
  scheme: "Health Scheme"
};

const CATEGORY_COLORS = {
  information: "bg-blue-100 text-blue-800",
  service: "bg-green-100 text-green-800",
  scheme: "bg-purple-100 text-purple-800"
};

export default function Healthcare() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: "", category: "information", content: "", contactInfo: "" });
  const [submitting, setSubmitting] = useState(false);
  const isAdmin = user?.role === "admin";

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await getHealthcare();
      setItems(response.data);
    } catch (error) {
      console.error("Failed to fetch healthcare items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const data = {
      title: form.title,
      category: form.category,
      content: form.content,
      contactInfo: form.contactInfo || null,
      imageUrl: null,
      information: form.category === "information" ? form.content : form.title,
      services: form.category === "service" ? form.content : form.title
    };
    
    setSubmitting(true);
    try {
      if (editItem) {
        await updateHealthcare(editItem.id, data);
        toast.success("Entry updated");
      } else {
        await createHealthcare(data);
        toast.success("Entry created");
      }
      fetchItems();
      setOpen(false);
      setEditItem(null);
    } catch (error) {
      toast.error(editItem ? "Failed to update" : "Failed to create");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteHealthcare(id);
      toast.success("Entry deleted");
      fetchItems();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      title: item.title ?? item.information ?? "",
      category: item.category ?? "information",
      content: item.content ?? item.services ?? "",
      contactInfo: item.contactInfo ?? ""
    });
    setOpen(true);
  };

  const openCreate = () => {
    setEditItem(null);
    setForm({ title: "", category: "information", content: "", contactInfo: "" });
    setOpen(true);
  };

  return (
    <AppLayout>
      <div className="space-y-8 px-4 md:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
              <HeartPulse className="size-9 text-primary" /> Healthcare Services
            </h1>
            <p className="text-muted-foreground mt-1">Health services, information, and government health schemes</p>
          </div>
          {isAdmin && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2" onClick={openCreate}>
                  <Plus className="size-5" /> Add Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>{editItem ? "Edit Entry" : "Add Healthcare Entry"}</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="Entry title" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="information">Health Information</SelectItem>
                        <SelectItem value="service">Health Service</SelectItem>
                        <SelectItem value="scheme">Health Scheme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content</label>
                    <Textarea value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} placeholder="Describe the health info or service..." rows={5} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Contact Information (optional)</label>
                    <Input value={form.contactInfo} onChange={(e) => setForm((f) => ({ ...f, contactInfo: e.target.value }))} placeholder="Phone number or address" />
                  </div>
                  <Button onClick={handleSubmit} className="w-full" disabled={submitting}>
                    {editItem ? "Save Changes" : "Create Entry"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-52 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {(items ?? []).map((item) => (
              <Card key={item.id} className={`flex flex-col ${isAdmin ? "cursor-pointer hover:border-primary/50" : ""}`} onClick={() => {
                if (isAdmin) openEdit(item);
              }}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight">{item.title ?? item.information ?? "Healthcare Update"}</CardTitle>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${CATEGORY_COLORS[item.category ?? "information"]}`}>
                      {CATEGORY_LABELS[item.category ?? "information"]}
                    </span>
                  </div>
                  <CardDescription>{format(new Date(item.updatedAt), "dd MMM yyyy")}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-4 whitespace-pre-wrap">{item.content ?? item.services ?? item.information}</p>
                  {item.contactInfo && (
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Phone className="size-4 text-primary" />
                      <span>{item.contactInfo}</span>
                    </div>
                  )}
                  {isAdmin && (
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        openEdit(item);
                      }}>
                        <Pencil className="size-4 mr-1" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(item.id);
                      }}>
                        <Trash2 className="size-4 mr-1" /> Delete
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {(items ?? []).length === 0 && <div className="col-span-3 text-center py-16 text-muted-foreground">No healthcare entries yet.</div>}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
