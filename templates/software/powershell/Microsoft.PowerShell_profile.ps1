# $profile.CurrentUserCurrentHost   %UserProfile%\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
# $profile.AllUsersCurrentHost      C:\Program Files\PowerShell\7\Microsoft.PowerShell_profile.ps1

oh-my-posh init pwsh --config ~/AppData/Local/Programs/oh-my-posh/themes/yifanwww.omp.json | Invoke-Expression

fnm env --use-on-cd --version-file-strategy=recursive --corepack-enabled --shell power-shell | Out-String | Invoke-Expression
