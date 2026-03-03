import React, { useState, useEffect, useRef } from "react";
/* ===== Menu Item Images ===== */
import kopiSusu from "@/assets/menu-items/kopi-susu.jpg";
import nutrisari from "@/assets/menu-items/nutrisari.jpg";
import matcha from "@/assets/menu-items/matcha.jpg";
import thaiTea from "@/assets/menu-items/Thaitea.jpg";
import sususoda from "@/assets/menu-items/susu-soda.jpg";
import pisangGoreng from "@/assets/menu-items/pisang-goreng.jpg";
import mixplatter from "@/assets/menu-items/mix platter.jpg";
import rotiBakar from "@/assets/menu-items/roti-bakar.jpg";
import dimsum from "@/assets/menu-items/dimsum.jpg";
import cireng from "@/assets/menu-items/cireng.jpg";
import nasiGoreng from "@/assets/menu-items/nasi-goreng.jpg";
import indomie from "@/assets/menu-items/indomie.jpg";

/* ===== Types ===== */
type Category = "drinks" | "snacks" | "mains";

type MenuItem = {
  name: string;
  price: string;
  description: string;
  image: string;
  ingredients: { emoji: string; name: string; note: string }[];
  tags: string[];
  calories?: string;
};

type OrderItem = MenuItem & { quantity: number };

/* ===== Data ===== */
const categories: { key: Category; label: string; emoji: string }[] = [
  { key: "drinks", label: "Drinks",     emoji: "☕" },
  { key: "snacks", label: "Snacks",     emoji: "🍟" },
  { key: "mains",  label: "Main Meals", emoji: "🍛" },
];

const menuItems: Record<Category, MenuItem[]> = {
  drinks: [
    {
      name: "Kopi Susu Gula Aren",
      price: "Rp 25.000",
      description: "Signature coffee with palm sugar milk",
      image: kopiSusu,
      calories: "180 kcal",
      tags: ["Bestseller", "Signature"],
      ingredients: [
        { emoji: "☕", name: "Espresso Shot",       note: "Single/double shot arabika lokal" },
        { emoji: "🥛", name: "Susu Segar",          note: "Full cream, dipanaskan hingga berbusa lembut" },
        { emoji: "🍯", name: "Gula Aren Cair",      note: "Gula aren asli Jawa, rasa karamel alami" },
        { emoji: "🧊", name: "Es Batu",             note: "Es kristal bersih, opsional panas/dingin" },
      ],
    },
    {
      name: "Nutrisari",
      price: "Rp 28.000",
      description: "Instant powdered drink from natural fruit extracts",
      image: nutrisari,
      calories: "120 kcal",
      tags: ["Segar", "Vitamin C"],
      ingredients: [
        { emoji: "🍊", name: "Ekstrak Jeruk",       note: "Sari jeruk tropis alami" },
        { emoji: "🧴", name: "Vitamin C & B",       note: "Diperkaya vitamin dari buah asli" },
        { emoji: "💧", name: "Air Mineral",         note: "Dilarutkan dengan air dingin/hangat" },
        { emoji: "🍬", name: "Gula",                note: "Gula pasir halus secukupnya" },
      ],
    },
    {
      name: "Matcha Latte",
      price: "Rp 32.000",
      description: "Premium Japanese matcha with steamed milk",
      image: matcha,
      calories: "160 kcal",
      tags: ["Premium", "Antioxidant"],
      ingredients: [
        { emoji: "🍵", name: "Bubuk Matcha",        note: "Grade ceremonial dari Uji, Kyoto" },
        { emoji: "🥛", name: "Susu Oat / Segar",    note: "Pilihan susu oat atau full cream" },
        { emoji: "🍯", name: "Madu / Simple Syrup", note: "Pemanis alami pilihan" },
        { emoji: "🧊", name: "Es Batu",             note: "Disajikan dingin atau panas" },
      ],
    },
    {
      name: "Thai Tea",
      price: "Rp 22.000",
      description: "Creamy classic Thai iced tea",
      image: thaiTea,
      calories: "200 kcal",
      tags: ["Creamy", "Classic"],
      ingredients: [
        { emoji: "🍵", name: "Teh Ceylon",          note: "Teh hitam kuat khas Thailand" },
        { emoji: "🥛", name: "Susu Kental Manis",   note: "Full cream, taburan di atas es" },
        { emoji: "🌿", name: "Rempah Rahasia",      note: "Vanili & kapulaga untuk aroma khas" },
        { emoji: "🧊", name: "Es Batu",             note: "Banyak es untuk kesegaran maksimal" },
      ],
    },
    {
      name: "Susu Soda",
      price: "Rp 20.000",
      description: "Sweetened condensed milk with carbonated soda water",
      image: sususoda,
      calories: "150 kcal",
      tags: ["Unik", "Segar"],
      ingredients: [
        { emoji: "🥛", name: "Susu Kental Manis",   note: "Creamy dan manis di lapisan bawah" },
        { emoji: "🫧", name: "Air Soda",            note: "Soda tawar untuk efek buih yang menyegarkan" },
        { emoji: "🧊", name: "Es Batu",             note: "Es penuh untuk minuman super dingin" },
        { emoji: "🍋", name: "Perasan Lemon",       note: "Opsional, untuk kesegaran extra" },
      ],
    },
  ],
  snacks: [
    {
      name: "Pisang Goreng Keju",
      price: "Rp 18.000",
      description: "Crispy fried banana with cheese",
      image: pisangGoreng,
      calories: "280 kcal",
      tags: ["Crispy", "Favorit"],
      ingredients: [
        { emoji: "🍌", name: "Pisang Kepok",        note: "Pisang kepok matang pilihan, manis alami" },
        { emoji: "🧀", name: "Keju Cheddar",        note: "Diparut halus, meleleh sempurna" },
        { emoji: "🌾", name: "Tepung Bumbu",        note: "Adonan crispy dengan sedikit vanili" },
        { emoji: "🛢️", name: "Minyak Goreng",       note: "Digoreng hingga keemasan sempurna" },
      ],
    },
    {
      name: "Mix Platter",
      price: "Rp 22.000",
      description: "Seasoned crispy fries with nugget and sausage",
      image: mixplatter,
      calories: "420 kcal",
      tags: ["Sharing", "Komplit"],
      ingredients: [
        { emoji: "🥔", name: "French Fries",        note: "Kentang goreng bumbu garam & paprika" },
        { emoji: "🍗", name: "Chicken Nugget",      note: "Nugget ayam crispy, 4 pcs" },
        { emoji: "🌭", name: "Sosis Sapi",          note: "Sosis panggang sapi pilihan" },
        { emoji: "🥫", name: "Saus Sambal & Mayo",  note: "Dua saus pendamping" },
      ],
    },
    {
      name: "Roti Bakar Special",
      price: "Rp 25.000",
      description: "Grilled toast with chocolate & cheese",
      image: rotiBakar,
      calories: "320 kcal",
      tags: ["Classic", "Cozy"],
      ingredients: [
        { emoji: "🍞", name: "Roti Tawar Tebal",    note: "Roti tawar premium dipanggang di atas bara" },
        { emoji: "🍫", name: "Cokelat Meses",       note: "Taburan meses cokelat premium" },
        { emoji: "🧀", name: "Keju Slice",          note: "Keju lembaran meleleh saat hangat" },
        { emoji: "🧈", name: "Mentega",             note: "Olesan margarin Wijsman untuk aroma harum" },
      ],
    },
    {
      name: "Dimsum Platter",
      price: "Rp 35.000",
      description: "Assorted steamed dumplings",
      image: dimsum,
      calories: "350 kcal",
      tags: ["Premium", "Steamed"],
      ingredients: [
        { emoji: "🥟", name: "Hakau Udang",         note: "Siomay udang tipis, dikukus 8 menit" },
        { emoji: "🥩", name: "Siomay Ayam",         note: "Isian ayam cincang dengan jahe" },
        { emoji: "🌿", name: "Daun Bawang",         note: "Taburan segar untuk aroma" },
        { emoji: "🫙", name: "Saus Hoisin",         note: "Saus khas cocolan dimsum" },
      ],
    },
    {
      name: "Cireng",
      price: "Rp 15.000",
      description: "Snack made from tapioca flour or starch",
      image: cireng,
      calories: "220 kcal",
      tags: ["Tradisional", "Murah"],
      ingredients: [
        { emoji: "🌾", name: "Tepung Tapioka",      note: "Bahan utama, kenyal dan crispy di luar" },
        { emoji: "🧄", name: "Bawang Putih",        note: "Bumbu utama aroma khas cireng" },
        { emoji: "🌶️", name: "Cabe Rawit",          note: "Cocolan sambal rujak pedas manis" },
        { emoji: "🛢️", name: "Minyak Goreng",       note: "Digoreng deep fry hingga kecokelatan" },
      ],
    },
  ],
  mains: [
    {
      name: "Nasi Goreng Special",
      price: "Rp 35.000",
      description: "Signature fried rice with egg & chicken",
      image: nasiGoreng,
      calories: "550 kcal",
      tags: ["Signature", "Bestseller"],
      ingredients: [
        { emoji: "🍚", name: "Nasi Putih",          note: "Nasi kemarin (sehari lalu) lebih pulen saat digoreng" },
        { emoji: "🥚", name: "Telur Ayam",          note: "Telur ceplok setengah matang di atas" },
        { emoji: "🍗", name: "Ayam Suwir",          note: "Dada ayam bumbu kecap, suwir halus" },
        { emoji: "🧄", name: "Bumbu Rahasia",       note: "Bawang merah, putih, cabai, terasi bakar" },
        { emoji: "🥦", name: "Sayuran Segar",       note: "Kol, wortel, dan daun bawang" },
        { emoji: "🫙", name: "Kecap Manis",         note: "Kecap Bango untuk warna dan rasa khas" },
      ],
    },
    {
      name: "Mie Goreng Seafood",
      price: "Rp 38.000",
      description: "Stir-fried noodles with fresh seafood",
      image: indomie,
      calories: "580 kcal",
      tags: ["Seafood", "Spicy Option"],
      ingredients: [
        { emoji: "🍜", name: "Mie Telur",           note: "Mie kuning tebal, kenyal dan menyerap bumbu" },
        { emoji: "🦐", name: "Udang Segar",         note: "Udang kupas segar, dimasak saat order" },
        { emoji: "🦑", name: "Cumi-Cumi",           note: "Cumi cincin segar, empuk tidak alot" },
        { emoji: "🧄", name: "Bumbu Stir-fry",      note: "Bawang putih, jahe, saus tiram, kecap asin" },
        { emoji: "🥬", name: "Sawi Hijau",          note: "Sawi segar untuk warna dan nutrisi" },
        { emoji: "🌶️", name: "Cabe Merah",          note: "Level pedas bisa disesuaikan request" },
      ],
    },
  ],
};

/* ===== useInView hook ===== */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ===== Detail Modal ===== */
function DetailModal({ item, onClose, onOrder }: {
  item: MenuItem;
  onClose: () => void;
  onOrder: (item: MenuItem) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div
        style={{
          background: "hsl(var(--background))",
          borderRadius: 20,
          overflow: "hidden",
          width: "100%",
          maxWidth: 480,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
          transform: mounted ? "translateY(0) scale(1)" : "translateY(32px) scale(0.95)",
          opacity: mounted ? 1 : 0,
          transition: "transform 0.45s cubic-bezier(.22,1,.36,1), opacity 0.35s ease",
        }}
      >
        {/* Hero image */}
        <div style={{ position: "relative", height: 230, overflow: "hidden", flexShrink: 0 }}>
          <img
            src={item.image}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 6s ease" }}
            onLoad={(e) => { (e.target as HTMLImageElement).style.transform = "scale(1.04)"; }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, hsl(var(--background)) 0%, rgba(0,0,0,0.2) 100%)" }}/>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 12, right: 12,
              width: 34, height: 34, borderRadius: "50%",
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
              color: "#fff", border: "none", cursor: "pointer",
              fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.8)"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.5)"; (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
          >✕</button>

          {/* Tags */}
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {item.tags.map((t) => (
              <span key={t} style={{
                background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))",
                fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 999,
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "0 1.5rem 1.75rem" }}>
          {/* Title + price row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 6 }}>
            <h2 className="font-display" style={{ fontSize: "1.35rem", fontWeight: 800, lineHeight: 1.2, flex: 1 }}>
              {item.name}
            </h2>
            <span style={{ color: "hsl(var(--primary))", fontWeight: 800, fontSize: "1.1rem", whiteSpace: "nowrap", paddingTop: 2 }}>
              {item.price}
            </span>
          </div>

          <p className="text-muted-foreground" style={{ fontSize: "0.88rem", marginBottom: 8 }}>{item.description}</p>

          {item.calories && (
            <span style={{
              display: "inline-block", fontSize: 12, fontWeight: 600,
              color: "hsl(var(--primary))", background: "hsl(var(--primary)/.1)",
              padding: "3px 12px", borderRadius: 999, marginBottom: 16,
            }}>🔥 {item.calories}</span>
          )}

          <div style={{ height: 1, background: "hsl(var(--border))", margin: "0 0 16px" }}/>

          <h3 className="font-display" style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 12 }}>
            🧪 Bahan & Komposisi
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {item.ingredients.map((ing, i) => (
              <div
                key={i}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "10px 14px", borderRadius: 12,
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-14px)",
                  transition: `opacity 0.4s ease ${i * 65 + 150}ms, transform 0.4s cubic-bezier(.22,1,.36,1) ${i * 65 + 150}ms`,
                  cursor: "default",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--primary)/.06)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "hsl(var(--card))"; }}
              >
                <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{ing.emoji}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{ing.name}</div>
                  <div className="text-muted-foreground" style={{ fontSize: "0.78rem", marginTop: 2 }}>{ing.note}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={() => { onOrder(item); onClose(); }}
            style={{
              marginTop: 20, width: "100%", padding: "14px 0",
              borderRadius: 12, border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: "1rem",
              background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary)/.7))",
              color: "hsl(var(--primary-foreground))",
              boxShadow: "0 4px 20px hsl(var(--primary)/.3)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "transform 0.2s cubic-bezier(.22,1,.36,1), box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(1.01)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px hsl(var(--primary)/.45)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px hsl(var(--primary)/.3)";
            }}
            onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)"; }}
            onMouseUp={e   => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(1.01)"; }}
          >
            🛒 Tambah ke Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== Main Component ===== */
const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("drinks");
  const [animating, setAnimating]           = useState(false);
  const [orders, setOrders]                 = useState<OrderItem[]>([]);
  const [notification, setNotification]     = useState("");
  const [notifVisible, setNotifVisible]     = useState(false);
  const [addedItem, setAddedItem]           = useState<string>("");
  const [selectedItem, setSelectedItem]     = useState<MenuItem | null>(null);

  const { ref: headerRef, inView: headerVisible } = useInView(0.2);
  const { ref: listRef,   inView: listVisible   } = useInView(0.1);

  const handleCategoryChange = (cat: Category) => {
    if (cat === activeCategory || animating) return;
    setAnimating(true);
    setTimeout(() => { setActiveCategory(cat); setAnimating(false); }, 220);
  };

  const handleAddOrder = (item: MenuItem) => {
    setOrders((prev) => {
      const idx = prev.findIndex((o) => o.name === item.name);
      if (idx >= 0) { const n = [...prev]; n[idx].quantity += 1; return n; }
      return [...prev, { ...item, quantity: 1 }];
    });
    setAddedItem(item.name);
    setNotification(`✓ ${item.name} ditambahkan!`);
    setNotifVisible(true);
    setTimeout(() => setNotifVisible(false), 2200);
    setTimeout(() => setAddedItem(""), 600);
  };

  const handleRemoveOrder = (index: number) => {
    const name = orders[index].name;
    setOrders((prev) => prev.filter((_, i) => i !== index));
    setNotification(`✕ ${name} dihapus`);
    setNotifVisible(true);
    setTimeout(() => setNotifVisible(false), 2200);
  };

  const handleUpdateQuantity = (index: number, value: number) => {
    if (value < 1) return;
    setOrders((prev) => { const n = [...prev]; n[index].quantity = value; return n; });
  };

  const totalPrice = orders.reduce((sum, item) =>
    sum + Number(item.price.replace("Rp ", "").replace(/\./g, "")) * item.quantity, 0);

  return (
    <>
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes fadeDown  { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideRight{ from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes shimmerText{ 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes listExit  { to{opacity:0;transform:translateX(-18px) scale(0.97)} }
        @keyframes listEnter { from{opacity:0;transform:translateX(18px) scale(0.97)} to{opacity:1;transform:translateX(0) scale(1)} }
        @keyframes pop       { 0%{transform:scale(1)} 40%{transform:scale(1.18)} 70%{transform:scale(0.94)} 100%{transform:scale(1)} }
        @keyframes ripple    { 0%{transform:scale(0);opacity:0.5} 100%{transform:scale(4);opacity:0} }
        @keyframes toastIn   { from{opacity:0;transform:translateY(16px) scale(0.95)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes toastOut  { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(10px) scale(0.95)} }
        @keyframes orderSlideIn { from{opacity:0;max-height:0;transform:scaleY(0.95)} to{opacity:1;max-height:600px;transform:scaleY(1)} }
        @keyframes badgeBounce  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }

        .menu-header-visible .menu-badge { animation:fadeDown 0.55s cubic-bezier(.22,1,.36,1) both }
        .menu-header-visible .menu-h2    { animation:fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.1s both }
        .menu-header-visible .menu-sub   { animation:fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.2s both }
        .menu-header-visible .menu-tabs  { animation:fadeUp 0.6s cubic-bezier(.22,1,.36,1) 0.3s both }

        .shimmer-text {
          background:linear-gradient(90deg,hsl(var(--primary)),hsl(var(--primary)/.55),hsl(var(--primary)));
          background-size:200% auto; -webkit-background-clip:text;
          -webkit-text-fill-color:transparent; background-clip:text;
          animation:shimmerText 3s linear infinite;
        }
        .tab-btn { position:relative;overflow:hidden;transition:transform 0.25s cubic-bezier(.22,1,.36,1),background 0.25s,box-shadow 0.25s }
        .tab-btn:hover { transform:translateY(-2px) }
        .tab-btn.active { animation:pop 0.35s cubic-bezier(.22,1,.36,1) }
        .tab-ripple { position:absolute;border-radius:50%;background:rgba(255,255,255,0.35);width:60px;height:60px;margin:-30px;animation:ripple 0.6s ease-out forwards;pointer-events:none }

        .list-animating { animation:listExit 0.22s ease forwards }
        .list-entering  { animation:listEnter 0.35s cubic-bezier(.22,1,.36,1) forwards }

        .menu-card { transition:transform 0.3s cubic-bezier(.22,1,.36,1),box-shadow 0.3s;position:relative;overflow:hidden }
        .menu-card::before { content:'';position:absolute;inset:0;background:linear-gradient(135deg,hsl(var(--primary)/.06) 0%,transparent 60%);opacity:0;transition:opacity 0.3s }
        .menu-card:hover { transform:translateX(6px) scale(1.015) }
        .menu-card:hover::before { opacity:1 }
        .menu-card:hover .menu-card-img { transform:scale(1.08) rotate(1.5deg) }
        .menu-card-img { transition:transform 0.4s cubic-bezier(.22,1,.36,1) }
        .price-tag { transition:color 0.2s,transform 0.2s }
        .menu-card:hover .price-tag { transform:scale(1.07);color:hsl(var(--primary)) }

        .action-btn { position:relative;overflow:hidden;transition:transform 0.2s cubic-bezier(.22,1,.36,1),box-shadow 0.2s,opacity 0.2s }
        .action-btn:hover { transform:scale(1.07) }
        .action-btn:active { transform:scale(0.93) }

        .order-summary { animation:orderSlideIn 0.45s cubic-bezier(.22,1,.36,1) both;transform-origin:top }
        .order-row { transition:background 0.2s,transform 0.2s }
        .order-row:hover { background:hsl(var(--muted)/.4);transform:translateX(3px);border-radius:8px }
        .cart-badge { animation:badgeBounce 0.4s cubic-bezier(.22,1,.36,1) }
        .qty-input { transition:border-color 0.2s,box-shadow 0.2s }
        .qty-input:focus { border-color:hsl(var(--primary));box-shadow:0 0 0 3px hsl(var(--primary)/.15);outline:none }
        .remove-btn { transition:background 0.2s,transform 0.2s }
        .remove-btn:hover { transform:scale(1.1) rotate(-5deg) }
        .toast-in  { animation:toastIn  0.35s cubic-bezier(.22,1,.36,1) forwards }
        .toast-out { animation:toastOut 0.3s ease forwards }
      `}</style>

      <section id="menu" className="section-padding bg-background relative overflow-hidden">
        <div style={{ position:'absolute',top:-120,right:-120,width:380,height:380,borderRadius:'50%',background:'radial-gradient(circle,hsl(var(--primary)/.1),transparent)',filter:'blur(60px)',pointerEvents:'none' }}/>
        <div style={{ position:'absolute',bottom:-80,left:-80,width:260,height:260,borderRadius:'50%',background:'radial-gradient(circle,hsl(var(--primary)/.07),transparent)',filter:'blur(50px)',pointerEvents:'none' }}/>

        <div className="container-custom" style={{ position:'relative', zIndex:1 }}>

          {/* Header */}
          <div ref={headerRef} className={`text-center max-w-2xl mx-auto mb-12 ${headerVisible ? 'menu-header-visible' : ''}`}>
            <span className="menu-badge text-primary font-medium tracking-widest uppercase text-sm inline-block opacity-0">Menu Kami</span>
            <h2 className="menu-h2 font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4 opacity-0">
              Rasakan <span className="shimmer-text">Perbedaannya</span>
            </h2>
            <p className="menu-sub text-muted-foreground text-lg opacity-0">
              Dari kopi aromatik hingga hidangan Indonesia yang lezat, temukan rasa yang menceritakan sebuah kisah.
            </p>
            <div className="menu-tabs flex justify-center gap-2 md:gap-4 mt-8 flex-wrap opacity-0">
              {categories.map((cat, i) => (
                <button
                  key={cat.key}
                  onClick={(e) => {
                    handleCategoryChange(cat.key);
                    const btn = e.currentTarget;
                    const c = document.createElement('span'); c.className = 'tab-ripple';
                    const r = btn.getBoundingClientRect();
                    c.style.left = `${e.clientX - r.left}px`; c.style.top = `${e.clientY - r.top}px`;
                    btn.appendChild(c); setTimeout(() => c.remove(), 650);
                  }}
                  className={`tab-btn px-6 py-3 rounded-full font-medium text-sm md:text-base ${activeCategory === cat.key ? 'gradient-bg text-primary-foreground shadow-lg active' : 'bg-secondary text-secondary-foreground hover:bg-muted'}`}
                  style={{ animationDelay:`${i * 60}ms` }}
                >
                  <span className="mr-1">{cat.emoji}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu List */}
          <div
            ref={listRef}
            className={`max-w-3xl mx-auto space-y-4 ${animating ? 'list-animating' : listVisible ? 'list-entering' : ''}`}
          >
            {menuItems[activeCategory].map((item, index) => (
              <div
                key={item.name}
                className="menu-card group p-5 bg-card rounded-xl card-elevated flex gap-4 items-center"
                style={{
                  opacity: listVisible ? 1 : 0,
                  animation: listVisible ? `listEnter 0.45s cubic-bezier(.22,1,.36,1) ${index * 80}ms both` : 'none',
                }}
              >
                {/* Image */}
                <div style={{ position:'relative', flexShrink:0 }}>
                  <img src={item.image} alt={item.name} className="menu-card-img w-24 h-24 object-cover rounded-lg" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 truncate">
                      {item.name}
                    </h3>
                    {item.tags[0] && (
                      <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:999, background:'hsl(var(--primary)/.12)', color:'hsl(var(--primary))', whiteSpace:'nowrap' }}>
                        {item.tags[0]}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mt-0.5 line-clamp-1">{item.description}</p>
                  {item.calories && (
                    <span className="text-muted-foreground" style={{ fontSize:11 }}>🔥 {item.calories}</span>
                  )}
                </div>

                {/* Price + Actions */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <span className="price-tag text-primary font-bold whitespace-nowrap text-sm md:text-base">
                    {item.price}
                  </span>
                  <div className="flex gap-2">
                    {/* Detail */}
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="action-btn px-3 py-1.5 rounded-lg text-sm font-semibold"
                      style={{ border:'1.5px solid hsl(var(--primary)/.35)', color:'hsl(var(--primary))', background:'hsl(var(--primary)/.07)' }}
                    >
                      🔍 Detail
                    </button>
                    {/* Order */}
                    <button
                      onClick={() => handleAddOrder(item)}
                      className={`action-btn px-3 py-1.5 rounded-lg gradient-bg text-primary-foreground text-sm font-semibold shadow-sm ${addedItem === item.name ? 'just-added' : ''}`}
                      style={{ boxShadow:'0 2px 10px hsl(var(--primary)/.25)' }}
                    >
                      + Pesan
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          {orders.length > 0 && (
            <div className="order-summary mt-10 max-w-3xl mx-auto bg-card p-6 rounded-2xl shadow-xl border border-border">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl font-bold">🛒 Pesanan Anda</h3>
                <span key={orders.length} className="cart-badge gradient-bg text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                  {orders.reduce((s, o) => s + o.quantity, 0)} item
                </span>
              </div>
              <ul className="space-y-3">
                {orders.map((item, idx) => (
                  <li key={idx} className="order-row flex justify-between items-center px-2 py-1.5 gap-3"
                    style={{ animation:`slideRight 0.35s cubic-bezier(.22,1,.36,1) ${idx * 50}ms both` }}>
                    <span className="font-medium text-foreground text-sm flex-1 truncate">{item.name}</span>
                    <div className="flex items-center gap-3">
                      <input type="number" value={item.quantity} min={1}
                        onChange={(e) => handleUpdateQuantity(idx, parseInt(e.target.value))}
                        className="qty-input w-14 p-1 border border-border rounded-lg text-center text-sm bg-background" />
                      <span className="font-bold text-primary text-sm whitespace-nowrap">
                        Rp {(Number(item.price.replace("Rp ", "").replace(/\./g, "")) * item.quantity).toLocaleString("id-ID")}
                      </span>
                      <button onClick={() => handleRemoveOrder(idx)}
                        className="remove-btn w-7 h-7 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white text-sm font-bold transition">
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="my-4 border-t border-border"/>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Total Pesanan</span>
                <span key={totalPrice} className="font-display text-2xl font-bold text-primary"
                  style={{ animation:'pop 0.4s cubic-bezier(.22,1,.36,1)' }}>
                  Rp {totalPrice.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Toast */}
        <div
          className={`fixed bottom-6 right-6 z-50 gradient-bg text-primary-foreground px-5 py-3 rounded-xl shadow-2xl font-medium text-sm ${notifVisible ? 'toast-in' : 'toast-out'}`}
          style={{ pointerEvents: notifVisible ? 'auto' : 'none' }}
        >
          {notification}
        </div>
      </section>

      {/* Detail Modal */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onOrder={handleAddOrder}
        />
      )}
    </>
  );
};

export default MenuSection;