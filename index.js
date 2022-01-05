import * as github from "@actions/github";
import core from '@actions/core';
import {CloudflareDeleteDeployments} from "./cloudflare.js";

try {
    const cfEmail = core.getInput('cf-email');
    const cfToken = core.getInput('cf-token');
    const cfAccountID = core.getInput('cf-account-id');
    const cfProjectName = core.getInput('cf-project-name');

    await CloudflareDeleteDeployments(cfEmail, cfToken, cfAccountID, cfProjectName);

    const payload = JSON.stringify(github.context.ref, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}

