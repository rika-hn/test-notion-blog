import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export async function getDatabase() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
  });
  return response.results;
}

export async function getPage(id) {
  const response = await notion.pages.retrieve({ page_id: id });
  return response;
}

export async function getBlocks(id) {
  const response = await notion.blocks.children.list({ block_id: id });
  return response.results;
}
