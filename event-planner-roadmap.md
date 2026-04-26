# Event Planner App — Build Roadmap

> A portfolio project designed to teach you hireable frontend + database skills using Next.js and Supabase.

---

## Before You Start — Read This

Your mind feeling messy right now is normal. It doesn't mean you're not ready. It means you haven't broken the thing down yet. That's what this doc is for.

**One rule to follow throughout this entire project:**

> Work in phases. Finish one thing before touching the next. A working Phase 1 deployed online is worth more than a half-built Phase 3.

Every time you feel lost, come back to this file and find where you are.

---

## The App — What You're Building

An Event Planner where users can:
- Create and manage events
- Share a public link for each event
- Accept RSVPs from guests
- (Optionally) get email confirmations and upload cover photos

**Stack:** Next.js (App Router) + Supabase (Database, Auth, Storage)

---

## The Database — 3 Tables

Before writing any code, understand what you're storing.

```
users         → handled automatically by Supabase Auth
events        → id, created_by (user_id), title, date, location, description, slug, image_url
rsvps         → id, event_id, user_id, status (accepted / declined)
```

`events` and `rsvps` are linked by `event_id`. That relationship — one event having many RSVPs — is your first real relational data model. It comes up in every backend interview.

---

## Phase 1 — Foundation (Build This First)

**Goal:** A working app where users can sign up, create an event, and RSVP.  
**Looks don't matter here. Working matters.**

### Features to build

#### 1. Auth — Sign up, log in, log out
- Use Supabase Auth (email + password is enough to start)
- Protect routes using Next.js middleware — logged-out users can't access the dashboard
- Store the session and expose it to your components

**What you'll learn:** Supabase Auth, Next.js middleware, protected routes, session handling

**Tip:** Don't build a fancy auth UI. A plain form that works is fine. You can polish it in Phase 2.

---

#### 2. Create & View Events
- A form with: event name, date, location, description
- On submit, save to the `events` table in Supabase
- A dashboard page that lists all events the logged-in user created

**What you'll learn:** Supabase database inserts and selects, Next.js server actions, React form handling, server vs client components

**Tip:** Use Next.js Server Actions for your form submissions — this is what interviewers want to see in 2024/2025. It shows you understand the App Router properly.

---

#### 3. RSVP System
- Each event has a guest list
- A user can RSVP with "Accepted" or "Declined"
- The event creator sees a live count of responses

**What you'll learn:** Relational data (linking RSVPs to events), optimistic UI updates, reading joined data from Supabase

**Tip:** When you insert an RSVP, update the UI immediately before the database confirms it. This is called an optimistic update — it's a real pattern used in production apps and a great talking point.

---

### Phase 1 Checklist
- [ ] Supabase project created
- [ ] `events` and `rsvps` tables set up
- [ ] Sign up / log in / log out working
- [ ] Dashboard shows your events
- [ ] Create event form saves to database
- [ ] RSVP button works and updates count
- [ ] App deployed (Vercel — free, takes 2 minutes)

**→ Deploy before moving to Phase 2. Even if it looks rough.**

---

## Phase 2 — Polish (Make It Feel Real)

**Goal:** Turn the working app into something you're proud to show recruiters.

### Features to build

#### 4. Public Shareable Event Page
- Each event gets a unique URL: `/events/[slug]`
- Anyone (even without an account) can view the event and RSVP
- Generate a slug from the event title on creation

**What you'll learn:** Next.js dynamic routes, public Supabase queries, URL slug generation

**Tip:** This is one of the most impressive things in the whole project. A recruiter can click a link and actually interact with your app. Make sure this works perfectly.

---

#### 5. Edit & Delete Events
- Creators can update event details or cancel the event
- Only the creator can do this — enforce this with Supabase Row Level Security (RLS), not just in the UI

**What you'll learn:** RLS policies (database-level security), conditional UI, PUT/DELETE patterns

**Tip:** RLS is what separates someone who just used Supabase from someone who understands it. If a recruiter asks "how do you prevent users from editing each other's events?" — your answer should be "Row Level Security on the database, not just a frontend check."

---

#### 6. Responsive UI
- Works on mobile and desktop
- Clean, consistent layout with Tailwind
- Not a template — something you actually styled

**What you'll learn:** Tailwind responsive utilities, component layout patterns, design consistency

**Tip:** You don't need it to be beautiful. You need it to not look broken on a phone. Start with `sm:` and `md:` breakpoints for your grid and font sizes.

---

### Phase 2 Checklist
- [ ] `/events/[slug]` page exists and is publicly accessible
- [ ] RSVP works without an account on the public page
- [ ] Edit event form is functional
- [ ] Delete event works (with a confirmation prompt)
- [ ] RLS policies are in place for events and RSVPs
- [ ] App looks clean on mobile
- [ ] README updated with screenshots and setup instructions

---

## Phase 3 — Stretch (Pick 1 or 2)

**Goal:** Add one standout feature that becomes a specific talking point in interviews.  
Don't attempt all three. Pick what interests you most.

---

#### 7. Email Notifications (Recommended first)
- When someone RSVPs, send them a confirmation email
- Use Resend (free tier, beginner-friendly, excellent docs)
- Create a Next.js API route that triggers the email

**What you'll learn:** Third-party API integration, Next.js API routes, environment variables for secrets

**Interview talking point:** "I integrated the Resend API to send transactional emails on RSVP — the logic lives in a Next.js API route that's called server-side so the API key is never exposed to the client."

---

#### 8. Event Cover Photo Upload
- Let creators upload an image for their event
- Store it in Supabase Storage
- Display it on the event page and dashboard

**What you'll learn:** File uploads, Supabase Storage buckets, handling binary data in forms

**Interview talking point:** "I used Supabase Storage to handle image uploads — I wrote a server action that uploads the file, gets back a public URL, and saves it alongside the event record."

---

#### 9. Comments / Q&A on Events
- Guests can leave a comment or question on an event page
- Comments update in real-time without refreshing

**What you'll learn:** Supabase Realtime subscriptions, useEffect + event listeners, live UI updates

**Interview talking point:** "I used Supabase Realtime to subscribe to new comments — the component listens for inserts on the comments table and updates the UI without a page reload."

---

## How to Think About Your Workflow

### When you sit down to work

1. Open this file first
2. Find the last unchecked box
3. Work only on that one thing
4. When it's done, check the box, commit, and stop for the day if needed

### When you get stuck

- Don't switch features — stay on the stuck thing
- Google the exact error message first
- If still stuck after 20 minutes, ask for help (Claude, Stack Overflow, Discord)
- A specific question gets a useful answer. "I'm stuck" gets nothing.

### Commit messages to use (keep it simple)

```
feat: add create event form
feat: connect Supabase auth
fix: rsvp count not updating
style: mobile layout for dashboard
```

---

## Why Each Skill Makes You Hireable

| What you build | What it signals to employers |
|---|---|
| Supabase Auth + middleware | You understand sessions, protected routes, and security basics |
| Relational tables (events → rsvps) | You can model real data, not just flat JSON |
| Row Level Security | You know the difference between UI-level and database-level security |
| Server Actions | You understand Next.js App Router properly, not just Pages Router habits |
| Public shareable routes | You can build user-facing features, not just internal dashboards |
| Third-party API (Resend) | You can integrate external services and handle secrets safely |
| Deployed on Vercel | Recruiters can actually use your app — huge advantage |

---

## Stack Summary

| Tool | What it does | Why you're using it |
|---|---|---|
| Next.js (App Router) | Frontend framework + routing + server actions | Industry standard, what jobs ask for |
| Supabase | Database + Auth + Storage | Full backend without needing to build one |
| Tailwind CSS | Styling | Fast, consistent, widely used |
| Vercel | Deployment | Free, works with Next.js perfectly |
| Resend (Phase 3) | Email sending | Simple API, generous free tier |

---

## Final Note

You're not behind. You're packaging yourself. This project, done properly and deployed, shows:

- You can build a full-stack feature end to end
- You understand how data is structured and secured
- You can ship something real, not just clone tutorials

Start Phase 1. Commit something today. The rest will follow.
