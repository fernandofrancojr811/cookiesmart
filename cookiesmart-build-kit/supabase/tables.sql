
-- Recipes table for anonymous or future-auth users
create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  servings_original int not null default 1,
  source_text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Basic RLS: allow read to everyone, write via anon key (can refine later)
alter table public.recipes enable row level security;

create policy "Allow read to all"
on public.recipes for select
to public
using (true);

create policy "Allow insert to anon"
on public.recipes for insert
to anon
with check (true);

create policy "Allow update to anon"
on public.recipes for update
to anon
using (true);
