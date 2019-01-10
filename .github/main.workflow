workflow "Build, lint and test" {
  on = "push"
  resolves = ["Test", "Lint"]
}

action "Build" {
  uses = "docker://node:10"
  runs = "yarn"
}

action "Test" {
  uses = "docker://node:10"
  needs = ["Build"]
  runs = "yarn"
  args = "test"
}

action "Lint" {
  uses = "docker://node:10"
  needs = ["Build"]
  runs = "yarn"
  args = "lint"
}
