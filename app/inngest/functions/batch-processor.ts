// app/inngest/functions/batch-processor.ts

import { inngest } from "../client";

type BatchProcessData = {
  items: string[];
};

export const batchProcessor = inngest.createFunction(
  {
    id: "batch-processor",
    triggers: [
      {
        event: "batch/process",
      },
    ],
  },
  async ({ event, step }) => {
    const { items } = event.data as BatchProcessData;

    console.log(`Processing ${items.length} items...`);

    const results = await Promise.all(
      items.map((item, index) =>
        step.run(`process-item-${index}`, async () => {
          console.log(`Processing item: ${item}`);

          await new Promise((resolve) => setTimeout(resolve, 500));

          return {
            item,
            processed: true,
            timestamp: new Date().toISOString(),
          };
        })
      )
    );

    return {
      processed: results.length,
      results,
    };
  }
);