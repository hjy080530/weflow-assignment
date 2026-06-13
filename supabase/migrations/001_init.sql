create extension if not exists pgcrypto;

create table if not exists public.reservations (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  phone         text not null,
  date          date not null,
  time          text not null,
  service_type  text not null,
  business_type text not null default '',
  note          text not null default '',
  status        text not null default '대기'
);

alter table public.reservations add column if not exists created_at timestamptz not null default now();
alter table public.reservations add column if not exists name text not null default '';
alter table public.reservations add column if not exists phone text not null default '';
alter table public.reservations add column if not exists date date not null default current_date;
alter table public.reservations add column if not exists time text not null default '';
alter table public.reservations add column if not exists service_type text not null default '';
alter table public.reservations add column if not exists business_type text not null default '';
alter table public.reservations add column if not exists note text not null default '';
alter table public.reservations add column if not exists status text not null default '대기';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'reservations_status_check'
      and conrelid = 'public.reservations'::regclass
  ) then
    alter table public.reservations
      add constraint reservations_status_check
      check (status in ('대기', '진행중', '완료'));
  end if;
end $$;

alter table public.reservations enable row level security;
drop policy if exists "public insert" on public.reservations;
drop policy if exists "service role all" on public.reservations;
create policy "public insert" on public.reservations
  for insert
  with check (true);
create policy "service role all" on public.reservations
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create table if not exists public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  phone         text not null,
  service_type  text not null,
  business_type text not null default '',
  note          text not null default '',
  status        text not null default '대기'
);

alter table public.inquiries add column if not exists created_at timestamptz not null default now();
alter table public.inquiries add column if not exists name text not null default '';
alter table public.inquiries add column if not exists phone text not null default '';
alter table public.inquiries add column if not exists service_type text not null default '';
alter table public.inquiries add column if not exists business_type text not null default '';
alter table public.inquiries add column if not exists note text not null default '';
alter table public.inquiries add column if not exists status text not null default '대기';

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'inquiries_status_check'
      and conrelid = 'public.inquiries'::regclass
  ) then
    alter table public.inquiries
      add constraint inquiries_status_check
      check (status in ('대기', '진행중', '완료'));
  end if;
end $$;

alter table public.inquiries enable row level security;
drop policy if exists "public insert" on public.inquiries;
drop policy if exists "service role all" on public.inquiries;
create policy "public insert" on public.inquiries
  for insert
  with check (true);
create policy "service role all" on public.inquiries
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
