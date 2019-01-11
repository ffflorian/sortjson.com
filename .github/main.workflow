workflow "Install, lint and test" {
  on = "push"
  resolves = [
    "Lint",
    "Test",
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
