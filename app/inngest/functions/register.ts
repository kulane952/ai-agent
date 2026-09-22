import { inngest } from "../client";

type CreateUser = {
  name: string;
  email: string;
};

export const createUser = inngest.createFunction(
  {
    id: "create-user",
    triggers: [
      {
        event: "user/create",
      },
    ],
  },

  async ({ event, step }) => {
    const { name, email } = event.data as CreateUser;

    console.log(`Creating user: ${email}, ${name}`);

    await step.run("send-welcome-email", async () => {
      console.log(`Sending welcome email to ${email}...`);

      await new Promise((resolve) => setTimeout(resolve, 10000));

      return {
        email,
        name,
      };
    });

    return {
      success: true,
      name,
      email,
    };
  }
);