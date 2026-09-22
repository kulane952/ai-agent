import {
    eventType,
    staticSchema,
} from "inngest";

import { inngest } from "../../inngest/client";

type GreetUserData = {
    name: string;
};

const greetUser = eventType("greet/user", {
    schema: staticSchema<GreetUserData>(),
});

export const simpleGreeter = inngest.createFunction(
    {
        id: "simple-greeter",
        triggers: [greetUser],
    },
    async ({ event, step }) => {
        // Just ONE step - perfect for learning!
        const result = await step.run("say-hello", async () => {
            const { name } = event.data;

            console.log(`Hello, ${name}!`);

            return {
                message: `Hello, ${name}!`,
                timestamp: new Date().toISOString(),
            };
        });

        return result;
    }
);