# $profile.CurrentUserCurrentHost   %UserProfile%\Documents\PowerShell\Microsoft.PowerShell_profile.ps1
# $profile.AllUsersCurrentHost      C:\Program Files\PowerShell\7\Microsoft.PowerShell_profile.ps1

Import-Module posh-git

oh-my-posh --init --shell pwsh --config ~/AppData/Local/Programs/oh-my-posh/themes/yifanwww.omp.json | Invoke-Expression
