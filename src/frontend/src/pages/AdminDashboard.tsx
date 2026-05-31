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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpDown,
  Building2,
  CheckCircle,
  Eye,
  HardHat,
  Pencil,
  Plus,
  Star,
  Trash2,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import type { Property } from "../backend";
import { PropertyStatus } from "../backend";
import {
  LegalStatusBadge,
  PropertyStatusBadge,
} from "../components/StatusBadge";
import { useAdmin } from "../hooks/useAdmin";
import {
  useDeleteProperty,
  useProperties,
  useSetPropertyStatus,
} from "../hooks/useProperties";
import { formatArea, formatPrice } from "../utils/imageUrl";
const AREA_STROKE = "#6366f1";

// ── Animated Counter
function AnimatedCounter({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);
  useState(() => {
    if (value === 0) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(value / 60));
    const timer = setInterval(() => {
      current = Math.min(current + step, value);
      setDisplayed(current);
      if (current >= value) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  });
  return <span>{displayed}</span>;
}

// ── Stat Card
function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  glowClass,
  gradFrom,
  gradTo,
  delay = 0,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  colorClass: string;
  glowClass?: string;
  gradFrom: string;
  gradTo: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-card ${
        glowClass ?? ""
      }`}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
        }}
        aria-hidden
      />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
            }}
          >
            <Icon className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </span>
        </div>
        <div className={`text-3xl font-display font-bold ${colorClass}`}>
          <AnimatedCounter value={value} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Custom Chart Tooltip
function GlassTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-light rounded-xl px-3 py-2 text-xs shadow-elevation">
      {label && <p className="font-medium text-foreground mb-1">{label}</p>}
      {payload.map((entry) => (
        <p key={entry.name} className="text-muted-foreground">
          {entry.name}:{" "}
          <strong className="text-foreground">{entry.value}</strong>
        </p>
      ))}
    </div>
  );
}

type SortKey = "title" | "price" | "areaSizeSqFt" | "dateAdded";

export function AdminDashboardPage() {
  const { isLoading: authLoading } = useAdmin();
  const { data: properties, isLoading: propsLoading } = useProperties();
  const deleteProperty = useDeleteProperty();
  const setStatus = useSetPropertyStatus();

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("dateAdded");
  const [sortAsc, setSortAsc] = useState(false);
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // ── Stats
  const total = properties?.length ?? 0;
  const available =
    properties?.filter((p) => p.status === PropertyStatus.available).length ??
    0;
  const sold = total - available;
  const constructionCount =
    properties?.filter((p) => p.isConstructionSite).length ?? 0;

  // ── Chart data
  const locationData = useMemo(() => {
    if (!properties) return [];
    const counts: Record<string, number> = {};
    for (const p of properties) {
      const loc = p.locationName.split(",")[0].trim();
      counts[loc] = (counts[loc] ?? 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name, count }));
  }, [properties]);

  const monthlyData = useMemo(() => {
    if (!properties) return [];
    const counts: Record<string, number> = {};
    for (const p of properties) {
      const date = new Date(Number(p.dateAdded / BigInt(1_000_000)));
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return Object.entries(counts)
      .sort()
      .slice(-6)
      .map(([month, count]) => ({ month: month.slice(5), count }));
  }, [properties]);

  const donutData = useMemo(
    () => [
      { name: "Available", value: available },
      { name: "Sold", value: sold },
    ],
    [available, sold],
  );

  // ── Sorted list
  const sorted = useMemo(() => {
    if (!properties) return [];
    return [...properties].sort((a, b) => {
      let diff = 0;
      if (sortKey === "title") diff = a.title.localeCompare(b.title);
      else if (sortKey === "price") diff = Number(a.price - b.price);
      else if (sortKey === "areaSizeSqFt")
        diff = a.areaSizeSqFt - b.areaSizeSqFt;
      else diff = Number(a.dateAdded - b.dateAdded);
      return sortAsc ? diff : -diff;
    });
  }, [properties, sortKey, sortAsc]);

  // ── Quick stats
  const mostRecent = useMemo(
    () =>
      properties
        ? [...properties].sort((a, b) => Number(b.dateAdded - a.dateAdded))[0]
        : undefined,
    [properties],
  );

  const thisMonthCount = useMemo(() => {
    if (!properties) return 0;
    const now = new Date();
    return properties.filter((p) => {
      const d = new Date(Number(p.dateAdded / BigInt(1_000_000)));
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    }).length;
  }, [properties]);

  // ── Handlers
  const handleDelete = async (propertyId: string, title: string) => {
    try {
      await deleteProperty.mutateAsync(propertyId);
      toast.success(`"${title}" deleted`);
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(propertyId);
        return next;
      });
    } catch {
      toast.error("Failed to delete property");
    }
  };

  const handleToggleStatus = async (p: Property) => {
    const newStatus =
      p.status === PropertyStatus.available
        ? PropertyStatus.sold
        : PropertyStatus.available;
    try {
      await setStatus.mutateAsync({
        propertyId: p.propertyId,
        status: newStatus,
      });
      toast.success(`Marked as ${newStatus}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleBulkDelete = async () => {
    setBulkDeleting(true);
    let failed = 0;
    for (const id of selected) {
      try {
        await deleteProperty.mutateAsync(id);
      } catch {
        failed++;
      }
    }
    const count = selected.size;
    setSelected(new Set());
    setBulkDeleting(false);
    if (failed === 0) toast.success(`Deleted ${count} properties`);
    else toast.error(`${failed} deletions failed`);
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const toggleSelect = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleSelectAll = () => {
    if (selected.size === sorted.length) setSelected(new Set());
    else setSelected(new Set(sorted.map((p) => p.propertyId)));
  };

  // ── Auth gates
  if (authLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Skeleton className="h-10 w-64 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-2xl" />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const DONUT_COLORS = ["#4ade80", "#f97316"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Property Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage all land and plot listings
          </p>
        </div>
        <Link to="/admin/property/new">
          <Button
            className="gap-2 shrink-0"
            data-ocid="dashboard.add_property_button"
          >
            <Plus className="w-4 h-4" />
            Add New Property
          </Button>
        </Link>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="Total"
          value={total}
          icon={Building2}
          colorClass="text-foreground"
          gradFrom="#818cf8"
          gradTo="#6366f1"
          delay={0}
        />
        <StatCard
          label="Available"
          value={available}
          icon={CheckCircle}
          colorClass="text-green-600 dark:text-green-400"
          glowClass="shadow-neon-success"
          gradFrom="#4ade80"
          gradTo="#16a34a"
          delay={0.1}
        />
        <StatCard
          label="Sold"
          value={sold}
          icon={XCircle}
          colorClass="text-orange-600 dark:text-orange-400"
          glowClass="shadow-neon-destructive"
          gradFrom="#fb923c"
          gradTo="#ea580c"
          delay={0.2}
        />
        <StatCard
          label="Under Construction"
          value={constructionCount}
          icon={HardHat}
          colorClass="text-amber-600 dark:text-amber-400"
          gradFrom="#fbbf24"
          gradTo="#d97706"
          delay={0.3}
        />
        <StatCard
          label="Views"
          value={0}
          icon={Eye}
          colorClass="text-primary"
          gradFrom="#a78bfa"
          gradTo="#7c3aed"
          delay={0.4}
        />
      </div>

      {/* Quick stats bar */}
      {properties && properties.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8"
        >
          {[
            {
              icon: TrendingUp,
              label: "This month",
              value: `${thisMonthCount} added`,
              ocid: "dashboard.month_stats",
            },
            {
              icon: Star,
              label: "Most recent",
              value: mostRecent?.title ?? "—",
              ocid: "dashboard.recent_stat",
            },
            {
              icon: Building2,
              label: "Locations",
              value: `${locationData.length} areas`,
              ocid: "dashboard.location_stat",
            },
          ].map(({ icon: Icon, label, value, ocid }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-muted/40 rounded-xl px-4 py-3 border border-border"
              data-ocid={ocid}
            >
              <div className="w-7 h-7 rounded-lg bg-card flex items-center justify-center shadow-card shrink-0">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground truncate">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Charts section */}
      {properties && properties.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid md:grid-cols-3 gap-5 mb-8"
        >
          {/* Donut — availability split */}
          <div className="glass-light rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
              Availability Split
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={66}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={900}
                >
                  {donutData.map((_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: stable
                    <Cell key={i} fill={DONUT_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip content={<GlassTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-4 mt-2">
              {donutData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-1.5 text-xs">
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block"
                    style={{ background: DONUT_COLORS[i] }}
                  />
                  <span className="text-muted-foreground">
                    {d.name} ({d.value})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart — by location */}
          <div className="glass-light rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-secondary inline-block" />
              By Location
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={locationData} margin={{ left: -20 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<GlassTooltip />} />
                <Bar
                  dataKey="count"
                  name="Properties"
                  fill="#f97316"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Area chart — monthly additions */}
          <div className="glass-light rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-display font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-accent inline-block" />
              Monthly Additions
            </h3>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={monthlyData} margin={{ left: -20 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={AREA_STROKE}
                      stopOpacity={0.35}
                    />
                    <stop
                      offset="95%"
                      stopColor={AREA_STROKE}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<GlassTooltip />} />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Added"
                  stroke="#818cf8"
                  strokeWidth={2}
                  fill="url(#areaGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.section>
      )}

      {/* Bulk actions bar */}
      {selected.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 rounded-xl px-4 py-3 mb-4"
          data-ocid="dashboard.bulk_actions_bar"
        >
          <span className="text-sm font-medium text-foreground flex-1">
            {selected.size} selected
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                disabled={bulkDeleting}
                className="gap-1.5"
                data-ocid="dashboard.bulk_delete_button"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete {selected.size}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Bulk Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Delete {selected.size} properties? This cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-ocid="dashboard.bulk_cancel_button">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={handleBulkDelete}
                  data-ocid="dashboard.bulk_confirm_button"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setSelected(new Set())}
          >
            Cancel
          </Button>
        </motion.div>
      )}

      {/* Property list */}
      {propsLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : !properties || properties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border border-dashed border-border rounded-2xl p-12 text-center"
          data-ocid="dashboard.empty_state"
        >
          <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-semibold text-foreground mb-2">
            No properties yet
          </h3>
          <p className="text-muted-foreground text-sm mb-5">
            Add your first land or plot listing to get started.
          </p>
          <Link to="/admin/property/new">
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" /> Add First Property
            </Button>
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-card"
        >
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 w-10">
                    <Checkbox
                      checked={
                        selected.size === sorted.length && sorted.length > 0
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                      data-ocid="dashboard.select_all_checkbox"
                    />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground w-16">
                    Img
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => toggleSort("title")}
                      className="flex items-center gap-1 hover:text-foreground transition-colors"
                    >
                      Property <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Location
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => toggleSort("price")}
                      className="flex items-center gap-1 ml-auto hover:text-foreground transition-colors"
                    >
                      Price <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">
                    Legal
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sorted.map((p, idx) => (
                  <tr
                    key={p.propertyId}
                    className={`hover:bg-muted/20 transition-colors ${
                      selected.has(p.propertyId) ? "bg-primary/5" : ""
                    }`}
                    data-ocid={`dashboard.property_row.${idx + 1}`}
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selected.has(p.propertyId)}
                        onCheckedChange={() => toggleSelect(p.propertyId)}
                        aria-label={`Select ${p.title}`}
                        data-ocid={`dashboard.row_checkbox.${idx + 1}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      {p.images?.[0] ? (
                        <img
                          src={p.images[0].getDirectURL()}
                          alt={p.title}
                          className="w-12 h-10 object-cover rounded-lg border border-border"
                        />
                      ) : (
                        <div className="w-12 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground truncate max-w-[160px] flex items-center gap-1.5">
                        {p.isConstructionSite && (
                          <span
                            className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 shrink-0"
                            title="Construction Site"
                          >
                            <HardHat className="w-2.5 h-2.5" />
                            Under Construction
                          </span>
                        )}
                        {p.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatArea(p.areaSizeSqFt)}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="truncate max-w-[120px] block">
                        {p.locationName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums font-medium">
                      {formatPrice(p.price)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(p)}
                        disabled={setStatus.isPending}
                        title={`Toggle to ${
                          p.status === PropertyStatus.available
                            ? "Sold"
                            : "Available"
                        }`}
                        className="transition-smooth"
                        data-ocid={`dashboard.toggle_status.${idx + 1}`}
                      >
                        <PropertyStatusBadge status={p.status} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <LegalStatusBadge status={p.legalStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          to="/admin/property/$id/edit"
                          params={{ id: p.propertyId }}
                        >
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 text-muted-foreground hover:text-primary"
                            title="Edit"
                            data-ocid={`dashboard.edit_button.${idx + 1}`}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-8 h-8 text-muted-foreground hover:text-destructive"
                              title="Delete"
                              data-ocid={`dashboard.delete_button.${idx + 1}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Property
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Delete <strong>&ldquo;{p.title}&rdquo;</strong>?
                                This cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="dashboard.cancel_button">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() =>
                                  handleDelete(p.propertyId, p.title)
                                }
                                data-ocid="dashboard.confirm_delete_button"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-border">
            {sorted.map((p, idx) => (
              <motion.div
                key={p.propertyId}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`p-4 ${
                  selected.has(p.propertyId) ? "bg-primary/5" : ""
                }`}
                data-ocid={`dashboard.mobile_card.${idx + 1}`}
              >
                <div className="flex gap-3">
                  <Checkbox
                    checked={selected.has(p.propertyId)}
                    onCheckedChange={() => toggleSelect(p.propertyId)}
                    className="mt-1"
                    aria-label={`Select ${p.title}`}
                  />
                  {p.images?.[0] ? (
                    <img
                      src={p.images[0].getDirectURL()}
                      alt={p.title}
                      className="w-16 h-14 object-cover rounded-lg border border-border shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-14 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-foreground truncate">
                      {p.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {p.locationName}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <PropertyStatusBadge status={p.status} />
                      {p.isConstructionSite && (
                        <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                          <HardHat className="w-2.5 h-2.5" />
                          Construction
                        </span>
                      )}
                      <span className="text-xs font-medium text-foreground">
                        {formatPrice(p.price)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <Link
                      to="/admin/property/$id/edit"
                      params={{ id: p.propertyId }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-8 h-8"
                        data-ocid={`dashboard.mobile_edit.${idx + 1}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-8 h-8 text-destructive"
                          data-ocid={`dashboard.mobile_delete.${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Property</AlertDialogTitle>
                          <AlertDialogDescription>
                            Delete <strong>&ldquo;{p.title}&rdquo;</strong>?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground"
                            onClick={() => handleDelete(p.propertyId, p.title)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="px-4 py-2.5 border-t border-border bg-muted/20 text-xs text-muted-foreground">
            {total} {total === 1 ? "property" : "properties"} total
            {selected.size > 0 && ` · ${selected.size} selected`}
          </div>
        </motion.div>
      )}
    </div>
  );
}
