export const config = {
  siteMeta: {
    title: "おかむーのブログ",
    teamName: "okamu.ro",
    description: "おかむーが発信しているQiitaやnoteのブログまとめです。",
  },
  siteRoot:
    process.env.NODE_ENV === "production"
      ? "https://blog.okamu.ro"
      : "http://localhost:3000",
  headerLinks: [
    {
      title: "Home",
      href: "https://www.okamu.ro",
    },
    {
      title: "Qiita",
      href: "https://qiita.com/okamu_",
    },
    {
      title: "Note",
      href: "https://note.com/okamu_",
    },
    {
      title: "GitHub",
      href: "https://github.com/okamuroshogo",
    },
  ],
};
