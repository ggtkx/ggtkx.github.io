---
name: event-update
description: Add or update comedy show events on the ggtkx GitHub Pages site. Use when the user provides new event details (date, time, location, ticket link, image) or asks to change or add an event in scripts.js.
---

# Event Update (ggtkx site)

Add or edit events shown on the site by updating the `events` array in **assets/js/scripts.js**.

## Event object shape

Each entry in `events` must have:

| Field | Required | Example |
|-------|----------|---------|
| `datetime` | Yes | ISO 8601 with timezone, e.g. `'2026-04-03T20:00:00-07:00'` |
| `image` | No | Full image URL (e.g. imgur, Eventbrite) |
| `address` | Yes | Human-readable venue/address |
| `address_url` | Yes | Google Maps URL: `https://maps.google.com/?q=URL_ENCODED_ADDRESS` |
| `button_link` | Yes | Ticket/purchase URL |
| `button_text` | No | Defaults to `'购票'` if omitted |

## Datetime format

- Use **ISO 8601**: `YYYY-MM-DDTHH:mm:ss±HH:mm`.
- Pacific time: `-08:00` (PST) or `-07:00` (PDT). Use `-07:00` for roughly March–November.
- Example: Friday April 3, 2026 at 8pm Pacific → `'2026-04-03T20:00:00-07:00'`.

## Steps

1. **Open** `assets/js/scripts.js` and find the `const events = [ ... ];` array.
2. **Add or edit** an object with the fields above. Keep events in **chronological order** (earliest first).
3. **address_url**: From the address string, build `https://maps.google.com/?q=` plus the address with spaces replaced by `+` and commas/special chars encoded as needed (e.g. `Cubberley Theatre, Palo Alto` → `Cubberley+Theatre+Palo+Alto+CA`).
4. **Save**; the page uses `renderEvents(events)` and skips past events by `datetime`.

## Example (add new event)

User says: "Add event April 3 Friday 8pm, Cubberley Theatre Palo Alto, tickets at https://springcomedy26.eventbrite.com, image https://i.imgur.com/CxPkvg1.jpeg"

Add to `events`:

```javascript
{
  datetime: '2026-04-03T20:00:00-07:00',
  image: 'https://i.imgur.com/CxPkvg1.jpeg',
  address: 'Cubberley Theatre, Palo Alto',
  address_url: 'https://maps.google.com/?q=Cubberley+Theatre+Palo+Alto+CA',
  button_link: 'https://springcomedy26.eventbrite.com',
},
```

## Caveats

Don't remove event unless specified.
