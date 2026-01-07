v0.3.5 fixes wizard redirect behavior after completion and adds an admin reset endpoint.

Fixes
- Persist wizard completion as soon as the final step is reached to prevent repeat redirects.

Admin
- Added admin-only household reset endpoint to clear data while keeping users.

Deployment notes
- Rebuild backend image.
- Rebuild frontend assets.
