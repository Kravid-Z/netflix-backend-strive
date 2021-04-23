import fsx from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fsx;

const dataFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../db"
);

export const getMedia = async () =>
  await readJSON(join(dataFolderPath, "mediaTable.json"));

export const writeMedia = async (content) =>
  await writeJSON(join(dataFolderPath, "mediaTable.json"), content);

  export const getPosterMediaTable = async () =>
  await readJSON(join(dataFolderPath, "posterMediaTable.json"));

export const writePosterMediaTable = async (content) =>
  await writeJSON(join(dataFolderPath, "posterMediaTable.json"), content);