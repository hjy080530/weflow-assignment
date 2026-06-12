create table reservations (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  phone         text not null,
  date          date not null,
  time          text not null,
  service_type  text not null,
  business_type text,
  note          text,
  status        text default '대기' check (status in ('대기', '진행중', '완료'))
);

alter table reservations enable row level security;
create policy "public insert" on reservations for insert with check (true);
create policy "service role all" on reservations using (auth.role() = 'service_role');

create table inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz default now(),
  name          text not null,
  phone         text not null,
  service_type  text not null,
  business_type text,
  note          text,
  status        text default '대기' check (status in ('대기', '진행중', '완료'))
);

alter table inquiries enable row level security;
create policy "public insert" on inquiries for insert with check (true);
create policy "service role all" on inquiries using (auth.role() = 'service_role');
