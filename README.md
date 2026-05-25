# 🎵 BD Bands — বাংলাদেশের সেরা ব্যান্ড

বাংলাদেশের সেরা ব্যান্ড, অ্যালবাম, গান এবং লিরিক্স — এক জায়গায়।

## Features
- ব্যান্ডের ইতিহাস ও সদস্য তালিকা
- অ্যালবাম ও গানের তালিকা
- YouTube embed করে গান শোনা
- গানের লিরিক্স দেখা
- সম্পূর্ণ বাংলা UI

## Tech Stack
- **Next.js 14** (App Router)
- **Tailwind CSS**
- **JavaScript** (no TypeScript, simple!)
- Data: JSON-based (no database needed)

---

## 🚀 Local Setup

```bash
# 1. Clone করো
git clone https://github.com/YOUR_USERNAME/bd-bands.git
cd bd-bands

# 2. Dependencies install করো
npm install

# 3. Dev server চালাও
npm run dev
```

তারপর browser-এ যাও: http://localhost:3000

---

## 📦 Vercel-এ Deploy করা

### Option 1: Vercel Dashboard (সহজ)
1. https://vercel.com এ যাও
2. "New Project" ক্লিক করো
3. GitHub repo connect করো
4. "Deploy" ক্লিক করো — হয়ে গেল!

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel
```

---

## ➕ নতুন ব্যান্ড/গান যোগ করা

`src/data/bands.js` ফাইল খোলো এবং নিচের format-এ যোগ করো:

```js
{
  id: "band-id",           // URL-এ ব্যবহার হবে
  name: "Band Name",
  genre: "Rock",
  formed: 2000,
  members: ["Member 1", "Member 2"],
  history: "ব্যান্ডের ইতিহাস...",
  albums: [
    {
      id: "album-id",
      title: "Album Title",
      year: 2005,
      songs: [
        {
          id: "song-id",
          title: "Song Title",
          duration: "4:30",
          youtube_id: "YouTube_Video_ID",  // YouTube URL থেকে নাও
          lyrics: `গানের লিরিক্স এখানে...`
        }
      ]
    }
  ]
}
```

### YouTube ID কীভাবে পাবো?
YouTube URL: `https://www.youtube.com/watch?v=rKG6wRFJMZI`
YouTube ID: `rKG6wRFJMZI` (v= এর পরের অংশ)

---

## 📁 Project Structure

```
bd-bands/
├── src/
│   ├── app/
│   │   ├── page.js              # Home page
│   │   ├── layout.js            # Global layout + Navbar
│   │   ├── globals.css          # Global styles
│   │   ├── bands/
│   │   │   ├── page.js          # All bands list
│   │   │   └── [slug]/page.js   # Band detail page
│   │   └── songs/
│   │       └── [slug]/page.js   # Song player + lyrics
│   └── data/
│       └── bands.js             # সব ডেটা এখানে ✏️
├── public/
├── package.json
└── README.md
```

---

## 🎯 Roadmap

- [ ] Search functionality
- [ ] Genre filter
- [ ] Mobile-friendly music player (floating)
- [ ] User favorites (localStorage)
- [ ] More bands & songs

---

Made with ❤️ for Bangladeshi Music
