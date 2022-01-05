import got from "got";
import _ from "lodash";

export async function CloudflareDeleteDeployments(cfEmail, cfToken, cfAccountID, cfProjectName, branch) {
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

    _.forEach(result, (function (deploy) {
        console.log(deploy.id, deploy.environment, deploy.deployment_trigger.metadata.branch);
    }));
}
