# Security policy

Orbiscale is built read-only first: no credentials in the code, connectors default to read-only, and secrets are stored only as vault references.

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Preferred: a private advisory on GitHub (below). Alternative: e-mail **neto.a.rojas@gmail.com** with the subject `[SECURITY]`.

1. Open a private report: **Security → Report a vulnerability** on this repository (GitHub private security advisory).
2. Include the version (Settings › About), the screen, and steps to reproduce.
3. Leave out real passwords, tokens and customer data. Use placeholders.

| Step | Target |
|---|---|
| Acknowledgement | within 5 business days |
| First assessment | within 10 business days |
| Fix or mitigation for confirmed issues | coordinated with you, usually within 90 days |

## Supported versions

| Version | Supported |
|---|---|
| 4.x | ✅ |
| 3.x | security fixes only |
| ≤ 2.x (MIT) | ❌ |

Commercial customers also have a private channel, with the SLA set in their contract ([COMMERCIAL.md](COMMERCIAL.md)).
