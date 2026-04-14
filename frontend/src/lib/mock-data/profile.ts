export type ProfileField = {
  label: string;
  value: string;
  editable?: boolean;
  external?: boolean;
};

export type ProfileStat = {
  label: string;
  value: string;
  note?: string;
};

export type UserProfile = {
  name: string;
  title: string;
  email: string;
  avatarUrl: string;
  bio: string;
  stats: ProfileStat[];
  fields: ProfileField[];
};

export const userProfile: UserProfile = {
  name: "Mahdi Talukder",
  title: "Algorithm Explorer",
  email: "mahditalukder123@gmail.com",
  avatarUrl:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=320&q=80",
  bio: "Focused on building strong competitive programming instincts through consistent practice and thoughtful problem solving.",
  stats: [
    {
      label: "Total Unique Solves",
      value: "477",
      note: "+28 this month",
    },
    {
      label: "Current Streak",
      value: "14 days",
      note: "Best: 32 days",
    },
    {
      label: "Codeforces Max Rating",
      value: "1805",
      note: "Expert",
    },
  ],
  fields: [
    {
      label: "Email",
      value: "mahditalukder123@gmail.com",
    },
    {
      label: "Name",
      value: "Mahdi Talukder",
      editable: true,
    },
    {
      label: "Phone Number",
      value: "+880 1893-906302",
      editable: true,
    },
    {
      label: "Institute",
      value: "Metropolitan University, Sylhet",
      editable: true,
    },
    {
      label: "Facebook Link",
      value: "facebook.com/mahdi.talukder",
      editable: true,
      external: true,
    },
    {
      label: "Discord Username",
      value: "mahdi_talukder",
      editable: true,
      external: true,
    },
    {
      label: "Vjudge Username",
      value: "MahD",
      editable: true,
      external: true,
    },
    {
      label: "Codeforces Username",
      value: "MahD",
      editable: true,
      external: true,
    },
  ],
};
