// app/inngest/functions/approval-workflow.ts

import { inngest } from "../client";

import {
    eventType,
    staticSchema,
} from "inngest";

type WorkflowStartData = {
    requestId: string;
    action: string;
};

type WorkflowApprovalData = {
    requestId: string;
    approved: boolean;
    reason?: string;
};

const workflowStart = eventType("workflow/start", {
    schema: staticSchema<WorkflowStartData>(),
});

const workflowApproval = eventType("workflow/approval", {
    schema: staticSchema<WorkflowApprovalData>(),
});

export const approvalWorkflow = inngest.createFunction(
    {
        id: "approval-workflow",
        triggers: [workflowStart],
    },
    async ({ event, step }) => {
        const { requestId, action } = event.data;

        // Step 1: Process the request
        const processed = await step.run("process-request", async () => {
            console.log(`Processing request: ${action}`);

            return {
                requestId,
                action,
                status: "pending_approval",
            };
        });

        // Step 2: Wait for approval (up to 1 hour)
        const approval = await step.waitForEvent("wait-for-approval", {
            event: workflowApproval,
            timeout: "1m",
            match: "data.requestId",
        });

        if (!approval) {
            return {
                requestId,
                status: "timeout",
                message: "Approval not received within 1 hour",
            };
        }

        // Step 3: Execute approved action
        const result = await step.run("execute-action", async () => {
            if (approval.data.approved) {
                console.log(`Executing approved action: ${action}`);

                return {
                    requestId,
                    status: "completed",
                    action,
                };
            }

            return {
                requestId,
                status: "rejected",
                reason: approval.data.reason,
            };
        });

        return result;
    }
);