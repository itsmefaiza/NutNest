import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "NutNest Admin Dashboard" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

type Order = {
  id: string;
  customer_name: string;
  flavor: string;
  quantity: number;
  unit_price: number;
  total: number;
  status: string;
  notes: string | null;
  ordered_at: string;
};

const FLAVORS = ["Almond Crunch", "Pistachio Bloom", "Peanut Praline"];

function AdminDashboard() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>("");

  // Form
  const [customer, setCustomer] = useState("");
  const [flavor, setFlavor] = useState(FLAVORS[0]);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(400);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        navigate({ to: "/auth" });
        return;
      }
      setEmail(user.email ?? "");
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin");
      const admin = !!roles && roles.length > 0;
      setIsAdmin(admin);
      if (admin) await loadOrders();
      setLoading(false);
    })();
  }, [navigate]);

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("ordered_at", { ascending: false });
    if (!error && data) setOrders(data as Order[]);
  }

  async function addOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    const { error } = await supabase.from("orders").insert({
      customer_name: customer,
      flavor,
      quantity,
      unit_price: unitPrice,
      notes: notes || null,
    });
    if (error) setFormError(error.message);
    else {
      setCustomer("");
      setNotes("");
      setQuantity(1);
      await loadOrders();
    }
    setSubmitting(false);
  }

  async function deleteOrder(id: string) {
    if (!confirm("Delete this order?")) return;
    await supabase.from("orders").delete().eq("id", id);
    await loadOrders();
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((s, o) => s + Number(o.total), 0);
    const totalBars = orders.reduce((s, o) => s + o.quantity, 0);
    const totalOrders = orders.length;
    const avg = totalOrders ? totalRevenue / totalOrders : 0;
    return { totalRevenue, totalBars, totalOrders, avg };
  }, [orders]);

  const revenueByDay = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of orders) {
      const d = new Date(o.ordered_at).toISOString().slice(0, 10);
      map.set(d, (map.get(d) ?? 0) + Number(o.total));
    }
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, revenue]) => ({ date, revenue }));
  }, [orders]);

  const byFlavor = useMemo(() => {
    const map = new Map<string, number>();
    for (const o of orders) map.set(o.flavor, (map.get(o.flavor) ?? 0) + o.quantity);
    return FLAVORS.map((f) => ({ flavor: f, bars: map.get(f) ?? 0 }));
  }, [orders]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-serif text-3xl mb-3">Not authorized</h1>
          <p className="text-muted-foreground mb-6">
            This dashboard is private to the NutNest founder. You're signed in as <strong>{email}</strong> but don't have admin access.
          </p>
          <button onClick={signOut} className="px-6 py-3 bg-cocoa text-cream text-sm uppercase tracking-[0.2em]">
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">NutNest</p>
            <h1 className="font-serif text-2xl">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-cocoa">View site</Link>
            <button onClick={signOut} className="px-4 py-2 border border-border hover:bg-muted">Sign out</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        {/* KPIs */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Kpi label="Total revenue" value={`Rs ${stats.totalRevenue.toLocaleString()}`} />
          <Kpi label="Total orders" value={stats.totalOrders.toString()} />
          <Kpi label="Bars sold" value={stats.totalBars.toString()} />
          <Kpi label="Avg order value" value={`Rs ${Math.round(stats.avg).toLocaleString()}`} />
        </section>

        {/* Charts */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-background border border-border p-6">
            <h2 className="font-serif text-xl mb-4">Revenue over time</h2>
            <div className="h-64">
              {revenueByDay.length === 0 ? (
                <EmptyChart label="No sales yet — add an order below." />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueByDay}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-background border border-border p-6">
            <h2 className="font-serif text-xl mb-4">Bars sold by flavor</h2>
            <div className="h-64">
              {stats.totalBars === 0 ? (
                <EmptyChart label="Nothing sold yet." />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byFlavor}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="flavor" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bars" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </section>

        {/* New order */}
        <section className="bg-background border border-border p-6">
          <h2 className="font-serif text-xl mb-4">Record a new order</h2>
          <form onSubmit={addOrder} className="grid md:grid-cols-5 gap-3">
            <input
              required
              placeholder="Customer name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="md:col-span-1 px-3 py-2 border border-border bg-background"
            />
            <select value={flavor} onChange={(e) => setFlavor(e.target.value)} className="px-3 py-2 border border-border bg-background">
              {FLAVORS.map((f) => <option key={f}>{f}</option>)}
            </select>
            <input
              type="number"
              min={1}
              required
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="px-3 py-2 border border-border bg-background"
              placeholder="Qty"
            />
            <input
              type="number"
              min={0}
              step="0.01"
              required
              value={unitPrice}
              onChange={(e) => setUnitPrice(parseFloat(e.target.value) || 0)}
              className="px-3 py-2 border border-border bg-background"
              placeholder="Unit price"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-cocoa text-cream text-sm uppercase tracking-[0.2em] px-4 py-2 hover:bg-gold hover:text-cocoa disabled:opacity-50"
            >
              {submitting ? "Saving…" : "Add order"}
            </button>
            <input
              placeholder="Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="md:col-span-5 px-3 py-2 border border-border bg-background"
            />
          </form>
          {formError && <p className="text-sm text-red-600 mt-3">{formError}</p>}
        </section>

        {/* Recent orders */}
        <section className="bg-background border border-border p-6">
          <h2 className="font-serif text-xl mb-4">Recent orders</h2>
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-sm">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-[0.15em] text-muted-foreground border-b border-border">
                    <th className="py-2 pr-4">Date</th>
                    <th className="py-2 pr-4">Customer</th>
                    <th className="py-2 pr-4">Flavor</th>
                    <th className="py-2 pr-4">Qty</th>
                    <th className="py-2 pr-4">Total</th>
                    <th className="py-2 pr-4">Notes</th>
                    <th className="py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border/50">
                      <td className="py-3 pr-4">{new Date(o.ordered_at).toLocaleDateString()}</td>
                      <td className="py-3 pr-4">{o.customer_name}</td>
                      <td className="py-3 pr-4">{o.flavor}</td>
                      <td className="py-3 pr-4">{o.quantity}</td>
                      <td className="py-3 pr-4 font-medium">Rs {Number(o.total).toLocaleString()}</td>
                      <td className="py-3 pr-4 text-muted-foreground">{o.notes ?? "—"}</td>
                      <td className="py-3 text-right">
                        <button onClick={() => deleteOrder(o.id)} className="text-xs text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background border border-border p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <p className="font-serif text-3xl mt-2">{value}</p>
    </div>
  );
}

function EmptyChart({ label }: { label: string }) {
  return <div className="h-full flex items-center justify-center text-sm text-muted-foreground">{label}</div>;
}
