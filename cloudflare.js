import got from "got";
import _ from "lodash";

export async function CloudflareDeleteDeployments(cfEmail, cfToken, cfAccountID, cfProjectName, branch, cleanOlderThan, previewOnly) {
    const request = {
        headers: {
            "content-type": "application/json;charset=UTF-8",
            'Accept': "application/json",
            "X-Auth-Email": cfEmail,
            "X-Auth-Key": cfToken,
        },
    }

    const deployments_endpoint_base = 'https://api.cloudflare.com/client/v4/accounts/' + cfAccountID + '/pages/projects/' + cfProjectName + '/deployments';

    const {result} = await got.get(deployments_endpoint_base, request).json();

    let to_delete = [];
    _.forEach(result, (function (deploy) {
        if (cleanOlderThan > 0 && (Date.now() - new Date(deploy.created_on)) / 86400000 < cleanOlderThan) {
            return false;
        }
        if (deploy.environment && previewOnly) {
            return false;
        }
        if (branch != "" && branch != branch) {
            return false;
        }
        console.log(deploy.id, deploy.environment, deploy.deployment_trigger.metadata.branch);
        to_delete.push(deploy.id);
    }));
}
