# Maintenance Checklist

Use this checklist only when the public package changes. It is meant to prevent drift, not to turn the lab into a production service.

## Before Sharing A New Revision

Run the maintained checks:

```powershell
python -B -m pytest --assert=plain -p no:cacheprovider
npm run verify:evidence-assets
npm run test:dashboard
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\tools\verify-public-safe.ps1
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\tools\verify-security-txt.ps1
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File .\tools\verify-live-dashboard.ps1
npx --yes @tktco/node-actionlint
```

## Change-Specific Checks

- Dashboard changes: run the dashboard smoke tests and verify both public URLs after deployment.
- Evidence-template changes: run `npm run generate:evidence-assets`, then `npm run verify:evidence-assets`. Use `node tools/generate-public-evidence-assets.mjs --check --render-png` only for same-renderer local byte checks.
- Harness changes: update `harness/CONTRACT.md` first, then run the harness tests twice before sharing.
- Data or scenario changes: confirm the five canonical scenario IDs still align across CSVs, dashboard data, harness metadata, evidence panels, and monitor scripts.
- Documentation changes: re-read `README.md`, `docs/reproducibility.md`, and `docs/completion-notes.md` together to make sure the public-safe scope remains consistent.
- Security/sanitization changes: run the public-safe verifier and check that no private notes, real account IDs, credentials, logs, recordings, or screenshots were added.
- Maintenance doc changes: verify the README and reproducibility links to this checklist still resolve.

## Monthly Hygiene

- Review Dependabot pull requests for npm and GitHub Actions updates.
- Check the Actions tab for deprecation warnings.
- Run the live dashboard smoke check if the scheduled workflow has not run recently.
- Renew the `Expires` value in `.well-known/security.txt` before May 2, 2027.
- Keep `SECURITY.md` and both `security.txt` copies aligned; the root copy supports Vercel and the dashboard copy supports GitHub Pages.
- Keep `dashboard/.nojekyll` in place so GitHub Pages serves the dashboard `.well-known` directory.
- After deployment, verify the Vercel and GitHub Pages `/.well-known/security.txt` URLs are reachable.
