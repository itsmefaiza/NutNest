# Release Runbook

Follow these steps for every release.

## 1. Pre-release checks
- Pull latest changes and verify the build passes.
- Run `bun audit` and resolve any high/critical dependency issues.
- Smoke-test critical flows (auth, order placement, admin dashboard).

## 2. Backend change review
List any backend changes included in this release:
- New or modified database tables, columns, or migrations
- New or modified RLS policies, GRANTs, or roles
- New or modified SECURITY DEFINER functions or triggers
- New or modified edge functions / server functions
- Auth configuration changes (providers, password policy, email settings)
- New secrets or connectors

## 3. Security re-scan (REQUIRED after any backend change)
> **Prompt:** "Did this release include any of the backend changes listed in Step 2?"
>
> If **yes**, request a full security re-scan **before** publishing:
> - In Lovable chat, paste the ready-to-copy prompt below.
> - Wait for results. Fix or explicitly ignore each new finding before continuing.
> - Do not proceed to Step 4 until the scan returns no unresolved findings.
>
> **Ready-to-copy prompt:**
> ```
> Run a full security re-scan of the backend now and report every finding (internal_id, severity, affected table/function, and recommended fix). This release included backend changes — do not skip. List any new findings since the last scan and explicitly confirm "no unresolved findings" if the scan is clean. Do not fix or ignore anything yet; just report.
> ```
>
> If **no**, note "No backend changes — security re-scan skipped" in the release notes and continue.

## 4. Publish
- Publish via Lovable.
- Verify the published URL loads and auth works.

## 5. Post-release
- Monitor logs for 15 minutes.
- Update release notes with the security scan outcome from Step 3.
