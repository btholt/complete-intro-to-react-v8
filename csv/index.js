import fs from "fs/promises";
import path from "path";
import { convertArrayToCSV } from "convert-array-to-csv";
import { getLessons } from "../data/lesson.js";

async function start() {
  const configBuffer = await fs.readFile(
    path.join(process.cwd(), "course.json")
  );
  const config = JSON.parse(configBuffer);

  if (!config.csvPath) {
    console.log("no csvPath in course.json, skipping CSV generation");
    return;
  }

  process.env.BASE_URL = config?.productionBaseUrl || "";
  const sections = await getLessons();

  const lessons = [];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];

    for (let j = 0; j < section.lessons.length; j++) {
      const lesson = section.lessons[j];

      lessons.push({
        order: lesson.order,
        sectionTitle: section.title,
        lessonTitle: lesson.title,
        slug: section.slug + "/" + lesson.slug,
        sectionIcon: section.icon,
        filePath: lesson.fullSlug,
        description: lesson.description,
      });
    }
  }

  const csv = convertArrayToCSV(lessons);

  await fs.writeFile(config.csvPath, csv);
  console.log(`wrote ${lessons.length} rows to ${config.csvPath}`);
}

start();
