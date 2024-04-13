import { Member, getMemberFeedItems, sources } from "@src/builder/posts";
import { PostItem } from "@src/types";
import fs from "fs-extra";

let allPostItems: PostItem[] = [];

export default function handler() {
    const members = 
  {
    id: "1",
    name: "おかむー",
    avatarSrc: "",
    sources: sources,
  } as Member

(async function () {
  for (const member of [members] ) {
    const items = await getMemberFeedItems(member);
    if (items) allPostItems = [...allPostItems, ...items];
  }
  allPostItems.sort((a, b) => b.dateMiliSeconds - a.dateMiliSeconds);
  fs.ensureDirSync(".contents");
  fs.writeJsonSync(".contents/posts.json", allPostItems);
})();
  }