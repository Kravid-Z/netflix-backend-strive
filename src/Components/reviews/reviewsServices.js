import fsx from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fsx;

const dataFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../db"
);

export const getReviews = async () =>
  await readJSON(join(dataFolderPath, "reviewsTable.json"));

export const writeReviews = async (content) =>
  await writeJSON(join(dataFolderPath, "reviewsTable.json"), content);
