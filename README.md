# semt-reporting-system

<!--
Replace <OWNER> and <REPO> in the badges below with your GitHub owner/org and repo name.
After Codecov runs on CI, these badges will show project coverage status.
-->

[![Codecov](https://codecov.io/gh/Arun-KR/semt/branch/main/graph/badge.svg)](https://codecov.io/gh/Arun-KR/semt)
[![Client Coverage](https://codecov.io/gh/Arun-KR/semt/branch/main/graph/badge.svg?flag=client)](https://codecov.io/gh/Arun-KR/semt)
[![Server Coverage](https://codecov.io/gh/Arun-KR/semt/branch/main/graph/badge.svg?flag=server)](https://codecov.io/gh/Arun-KR/semt)

<!-- CI Status: replace <OWNER>/<REPO> with your repository slug -->

[![CI](https://github.com/Arun-KR/semt/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Arun-KR/semt/actions/workflows/ci.yml)

A monorepo with client and server for the SeMT reporting system.

## CI & Branch Protection

- Ensure the CI workflow exists at [.github/workflows/ci.yml](.github/workflows/ci.yml).
- Update badges above by replacing `<OWNER>/<REPO>` with your GitHub org/user and repo name.
- Protect your default branch to require CI passing before merge:
  - GitHub → Settings → Branches → Branch protection rules → Add rule
  - Select `main` (or `master`), enable "Require status checks to pass before merging"
  - Add required checks: "frontend-tests" and "backend-tests" (from the CI workflow)
  - Optionally enable "Require pull request reviews before merging"

### Local test quickstart

```bash
# Frontend
cd frontend
npm install
npm test -- --run

# Backend
cd backend
npm install
npm test -- --run
```
