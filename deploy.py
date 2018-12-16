from fabric.api import local, lcd

def deploy_app_engine(json_account, project_id, apps, version=None, stop_previous=False):
    local("echo '--------Deploy to %s--------'" % project_id)

    # slack notification
    # local('curl -X POST -H \'Content-type: application/json\' ' +
    #       '--data \'{"icon_emoji": ":rocket:", "channel": "#dev_notifications", ' +
    #       '"attachments": [{ "text": "Stating deploy to ' + project_id + ': ' + version + '", "color": "#4183C4"}]}\'' +
    #       ' $SLACK_HOOK_URL')

    # activation account json file way
    local("gcloud auth activate-service-account --key-file %s" % json_account)

    # set version if it is passed
    version_str = "-v %s" % version.replace('.', '-') if version else ''
    stop_previous_str = "--no-stop-previous-version --no-promote" if stop_previous else ''

    # deploy app engine specifying project and .yaml file
    local("gcloud -q --project=%s app deploy %s %s %s" % (project_id, version_str, stop_previous_str, ' '.join(apps)))

def deploy():
    branch = local('git symbolic-ref --short -q HEAD', capture=True)

    source = "/home/circleci/revolico/admin-frontend/build";
    local("cp app.yaml %s" % source)

    if branch == 'master':
        # deploy to production
        with lcd(source):
            deploy_app_engine('$HOME/gcloud-service-key.json',
                              'createreactapp-circleci-gcp',
                              ["app.yaml"], 'stable')

    else:
        last_comment = local('git log -n 1 --pretty=format:\'%s%n%n%b\'', capture=True)

        if '[ci staging]' in last_comment:

            # deploy to production
            with lcd(source):
                deploy_app_engine('$HOME/gcloud-service-key.json',
                                  'rcreatereactapp-circleci-gcp',
                                  ["app.yaml"], 'stable')
