import { inngest } from "../client";
import {
    eventType,
    staticSchema,
} from "inngest";

type DataProcess = {
    name: string;
};

const dataProcess = eventType("data/process", {
    schema: staticSchema<DataProcess>(),
});

export const dataProcessor = inngest.createFunction(
    {
        id: "data-processor",
        triggers: [dataProcess],
    },
    async ({ event, step }) => {
        // Step 1: Fetch data
        const rawData = await step.run("fetch-data", async () => {
            console.log("Fetching data...");

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {
                users: ["Alice", "Bob", "Charlie"],
            };
        });

        // Step 2: Transform data
        const transformedData = await step.run("transform-data", async () => {
            console.log("Transforming data...");

            return rawData.users.map((user) => ({
                name: user,
                email: `${user.toLowerCase()}@example.com`,
            }));
        });

        // Step 3: Save data
        const result = await step.run("save-data", async () => {
            console.log("Saving data...");

            // Simulate database save
            await new Promise((resolve) => setTimeout(resolve, 500));

            return {
                saved: transformedData.length,
                data: transformedData,
            };
        });

        return result;
    }
);