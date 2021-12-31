import core from '@actions/core';
import github from '@actions/github';
import got from 'got';
// const forEach = require('lodash.forEach');

try {
    const request = {
        headers: {
            "content-type": "application/json;charset=UTF-8",
            'Accept': "application/json",
            "X-Auth-Email": core.getInput("cf-email"),
            "X-Auth-Key": core.getInput('cf-token'),
        },
    }
    const cfAccountID = core.getInput('cf-account-id');
    const cfProjectName = core.getInput('cf-project-name');
    const deployments_endpoint_base = 'https://api.cloudflare.com/client/v4/accounts/' + cfAccountID + '/pages/projects/' + cfProjectName + '/deployments';

    const {result} = got.get(deployments_endpoint_base, request).json();

    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}

