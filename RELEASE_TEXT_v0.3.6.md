v0.3.6 secures the household reset endpoint with a server-side RESET_TOKEN.

Fixes
- Household reset endpoint now requires RESET_TOKEN instead of an admin role.

Deployment notes
- Rebuild backend image.
