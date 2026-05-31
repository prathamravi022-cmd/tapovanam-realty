import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { AlertTriangle, Building2, ChevronLeft, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PropertyStatus } from "../backend";
import { PropertyForm } from "../components/PropertyForm";
import { useDeleteProperty, useProperties } from "../hooks/useProperties";

export function AdminPropertyEditPage() {
  const { id } = useParams({ from: "/admin/property/$id/edit" });
  const navigate = useNavigate();
  const { data: properties, isLoading: propsLoading } = useProperties();
  const deleteProperty = useDeleteProperty();

  const property = properties?.find((p) => p.propertyId === id);

  const handleDelete = async () => {
    if (!property) return;
    try {
      await deleteProperty.mutateAsync(property.propertyId);
      toast.success(`"${property.title}" deleted`);
      navigate({ to: "/admin" });
    } catch {
      toast.error("Failed to delete property");
    }
  };

  if (propsLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 flex flex-col items-center gap-6 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-muted-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold text-foreground mb-2">
            Property Not Found
          </h1>
          <p className="text-muted-foreground text-sm">
            The property you&apos;re trying to edit doesn&apos;t exist or has
            been deleted.
          </p>
        </div>
        <Link to="/admin">
          <Button variant="outline" className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link to="/admin">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>
        <span className="text-muted-foreground text-sm">/</span>
        <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
          {property.title}
        </span>
      </div>

      {/* Page header with delete */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-6">
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Edit Property
          </h1>
          <p className="text-muted-foreground text-sm mt-1 truncate">
            {property.title}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              property.status === PropertyStatus.available
                ? "bg-primary/10 text-primary"
                : "bg-secondary/10 text-secondary-foreground"
            }`}
          >
            {property.status === PropertyStatus.available
              ? "Available"
              : "Sold"}
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground"
                data-ocid="delete-property-btn"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Property</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to permanently delete{" "}
                  <strong>&ldquo;{property.title}&rdquo;</strong>? All images
                  and data will be removed. This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleDelete}
                  disabled={deleteProperty.isPending}
                  data-ocid="confirm-delete-btn"
                >
                  {deleteProperty.isPending ? "Deleting…" : "Delete Property"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <PropertyForm mode="edit" property={property} />
    </div>
  );
}
