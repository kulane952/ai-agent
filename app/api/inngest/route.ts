import {serve} from "inngest/next";

import { inngest } from "../../inngest/client"
import {dataProcessor} from "../../inngest/functions/data-processor"

import {simpleGreeter} from "../../inngest/functions/simple-greeter"
import {emailSender} from "../../inngest/functions/email-sender"
import {approvalWorkflow} from "../../inngest/functions/approval-workflow"
import {dailyReport} from "../../inngest/functions/daily-report"
import {batchProcessor} from "../../inngest/functions/batch-processor"
import {createUser} from "../../inngest/functions/register"
// We'll add functions here as we create them
 export const {GET,POST,PUT}=serve({
    client:inngest,

    functions:[
        simpleGreeter,
        dataProcessor,
        emailSender,
        approvalWorkflow,
        dailyReport,
        batchProcessor,
        createUser

    ],
 })