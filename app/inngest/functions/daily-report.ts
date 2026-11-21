// app/inngest/functions/daily-report.ts

import { inngest } from "../client";

export const dailyReport = inngest.createFunction(
  {
    id: "daily-report",
    triggers: [
      {
        cron: "*/5 * * * *",
      },
    ],
  },
  async ({ step }) => {
    const report = await step.run("generate-report", async () => {
      const timestamp = new Date().toISOString();

      console.log(`📊 Generating daily report at ${timestamp}`);

      return {
        date: new Date().toDateString(),

        metrics: {
          users: Math.floor(Math.random() * 1000),
          revenue: Math.floor(Math.random() * 10000),
        },

        generatedAt: timestamp,
      };
    });

    return report;
  }
);