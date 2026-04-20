# Contribution
This document explains the workflow of contributing a feature/bug-fix to Merida.

Tentative workflow:
1. Develop
2. Change version in package.json
3. Check gemspec for any necessary change
4. Check _config.yaml for any necessary change
5. Release the gem
6. Verify the starter repo [Manually run the workflow] [maybe first on the dev branch so we don't mess with current good version]
7. Update the changelog [TODO: Automate the generation of changelog from the commits]
8. Tag the release and push the tag
9. Publish the release note 
10. Auto-release on the starter repo
