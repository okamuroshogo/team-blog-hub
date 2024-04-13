import fs from "fs-extra";
import Parser from "rss-parser";
import { PostItem } from "../types";

type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
};

function isValidUrl(str: string): boolean {
  try {
    const { protocol } = new URL(str);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

const parser = new Parser();
let allPostItems: PostItem[] = [];

async function fetchFeedItems(url: string) {
  const feed = await parser.parseURL(url);
  if (!feed?.items?.length) return [];

  // return item which has title and link
  return feed.items
    .map(({ title, contentSnippet, link, isoDate }) => {
      return {
        title,
        contentSnippet: contentSnippet?.replace(/\n/g, ""),
        link,
        isoDate,
        dateMiliSeconds: isoDate ? new Date(isoDate).getTime() : 0,
      };
    })
    .filter(
      ({ title, link }) => title && link && isValidUrl(link)
    ) as FeedItem[];
}

async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return [];
  let feedItems: FeedItem[] = [];
  for (const url of sources) {
    const items = await fetchFeedItems(url);
    if (items) feedItems = [...feedItems, ...items];
  }
  return feedItems;
}
