workflow "Build, test and publish" {
  on = "push"
  resolves = [
    "Lint",
    "Publish site",
  ]
}

action "Install" {
  uses = "docker://node:10"
  runs = "yarn"
}

action "Test" {
  uses = "docker://node:10"
  needs = ["Install"]
  runs = "yarn"
  args = "test"
}

action "Lint" {
  uses = "docker://node:10"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Build site" {
  uses = "docker://node:10"
  needs = ["Test", "Lint"]
  runs = "yarn"
  args = "dist"
}

action "master-branch-filter" {
  needs = "Build site"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Publish site" {
  uses = "docker://node:10"
  needs = ["master-branch-filter"]
  runs = "yarn"
  secrets = ["GITHUB_TOKEN"]
  args = ["deploy", "-u", "ffflobot <ffflobot@users.noreply.github.com>"]
}
