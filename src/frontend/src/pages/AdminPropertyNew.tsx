import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PropertyForm } from "../components/PropertyForm";

export function AdminPropertyNewPage() {
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
        <span className="text-sm font-medium text-foreground">
          Add New Property
        </span>
      </div>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Add New Property
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Fill in the details to list a new plot or land.
        </p>
      </div>

      <PropertyForm mode="new" />
    </div>
  );
}
