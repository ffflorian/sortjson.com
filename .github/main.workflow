workflow "Build, lint and test" {
  on = "push"
  resolves = [
    "Build project",
    "Lint project",
    "Test project",
    "Publish project"
  ]
}

action "Don't skip CI" {
  uses = "ffflorian/actions/last_commit@master"
  args = "^(?:(?!\\[(ci skip|skip ci)\\]).)*$"
}

action "Install dependencies" {
  uses = "docker://node:10-slim"
  needs = "Don't skip CI"
  runs = "yarn"
}

action "Lint project" {
  uses = "docker://node:10-slim"
  needs = "Install dependencies"
  runs = "yarn"
  args = "lint"
}

action "Test project" {
  uses = "docker://node:10-slim"
  needs = "Install dependencies"
  runs = "yarn"
  env = {
    CI = "true"
  }
  args = "test"
}

action "Build project" {
  uses = "docker://node:10-slim"
  needs = "Install dependencies"
  runs = "yarn"
  args = "dist"
}

action "Check for master branch" {
  uses = "actions/bin/filter@master"
  needs = [
    "Build project",
    "Lint project",
    "Test project"
  ]
  args = "branch master"
}

action "Publish project" {
  uses = "ffflorian/actions/gh-pages@master"
  needs = "Check for master branch"
  env = {
    GH_USER = "ffflobot"
  }
  args = [
    "--dotfiles",
    "--dist",
    "build",
    "--message",
    "Publish"
  ]
  secrets = ["GH_TOKEN"]
}

