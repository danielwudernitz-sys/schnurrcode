-- ============================================================
-- Schnurrcode — Supabase-Schema (EU/Frankfurt)
-- So benutzen: Supabase-Projekt öffnen → "SQL Editor" → "New query"
-- → diesen GANZEN Inhalt einfügen → "Run".
-- Danach in Vercel SUPABASE_URL + SUPABASE_SERVICE_KEY setzen.
-- ============================================================

-- 1) Leads (E-Mails aus dem Gratis-Übersetzer / Lead-Magnet)
create table if not exists leads (
  email      text primary key,          -- ein Eintrag pro E-Mail (Upsert)
  consent    boolean,
  country    text,
  created_at timestamptz default now()
);

-- 2) Käufe (befüllt vom Stripe-Webhook) — Basis für den Login!
create table if not exists orders (
  id             bigint generated always as identity primary key,
  email          text not null,
  country        text,                  -- Pflicht für OSS/Umsatzsteuer
  product        text,
  bump           boolean default false,
  stripe_session text,
  created_at     timestamptz default now()
);
create index if not exists orders_email_idx on orders (email);

-- 3) Profile (optional; Personalisierung läuft v. a. über 'cats')
create table if not exists profiles (
  email      text primary key,
  cat_name   text,
  photo_url  text,
  onboarded  boolean default true,
  updated_at timestamptz default now()
);

-- 4) Favoriten (gespeicherte Deutungen)
create table if not exists favorites (
  id          bigint generated always as identity primary key,
  email       text not null,
  ids         jsonb,
  ueberschrift text,
  created_at  timestamptz default now()
);
create index if not exists favorites_email_idx on favorites (email);

-- 5) Katzen (Mehr-Katzen-System, pro Käufer)
create table if not exists cats (
  id         uuid primary key,
  email      text not null,
  name       text not null,
  photo_url  text,          -- kleine Daten-URL (oder später Supabase Storage)
  breed      text,
  age        text,
  notes      text,
  created_at timestamptz default now()
);
create index if not exists cats_email_idx on cats (email);

-- 6) Journal-Einträge (Notizen & Verhalten, pro Katze)
create table if not exists cat_events (
  id         uuid primary key,
  cat_id     uuid not null,
  email      text not null,
  date       text not null,  -- YYYY-MM-DD
  note       text not null,
  category   text not null,  -- fuetterung | tierarzt | klo | verhalten | sonstiges
  created_at timestamptz default now()
);
create index if not exists cat_events_cat_idx on cat_events (cat_id);

-- ------------------------------------------------------------
-- Sicherheit: Row Level Security AN. Der Server nutzt den
-- SERVICE-Key (umgeht RLS), öffentlicher anon-Zugriff ist damit
-- blockiert. Keine zusätzlichen Policies nötig.
-- ------------------------------------------------------------
alter table leads       enable row level security;
alter table orders      enable row level security;
alter table profiles    enable row level security;
alter table favorites   enable row level security;
alter table cats        enable row level security;
alter table cat_events  enable row level security;
