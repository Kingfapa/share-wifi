function Show-BalloonTip {            
    [cmdletbinding()]
    param(            
     [parameter(Mandatory=$true)]
     [string]$Title,
     [ValidateSet("Info","Warning","Error")]
     [string]$MessageType = "Info",
     [parameter(Mandatory=$true)]
     [string]$Message,
     [string]$Duration=10000
    )            
    
    [system.Reflection.Assembly]::LoadWithPartialName('System.Windows.Forms') | Out-Null            
    $balloon = New-Object System.Windows.Forms.NotifyIcon
    $path = Get-Process -id $pid | Select-Object -ExpandProperty Path
    $icon = [System.Drawing.Icon]::ExtractAssociatedIcon($path)
    $balloon.Icon = $icon
    $balloon.BalloonTipIcon = $MessageType
    $balloon.BalloonTipText = $Message
    $balloon.BalloonTipTitle = $Title
    $balloon.Visible = $true
    $balloon.ShowBalloonTip($Duration)
    
    }
    
    # .Net methods for hiding/showing the console in the background
    Add-Type -Name Window -Namespace Console -MemberDefinition '
    [DllImport("Kernel32.dll")]
    public static extern IntPtr GetConsoleWindow();
    
    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, Int32 nCmdShow);
    '
    function Hide-Console
    {
        $consolePtr = [Console.Window]::GetConsoleWindow()
        #0 hide
        [Console.Window]::ShowWindow($consolePtr, 0)
    }
    Hide-Console
    
    if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) { 
        
        Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs; exit 
    }
    
    # Get the ID and security principal of the current user account
    $myWindowsID = [System.Security.Principal.WindowsIdentity]::GetCurrent();
    $myWindowsPrincipal = New-Object System.Security.Principal.WindowsPrincipal($myWindowsID);
    
    # Get the security principal for the administrator role
    $adminRole = [System.Security.Principal.WindowsBuiltInRole]::Administrator;
    
    # Check to see if we are currently running as an administrator
    if ($myWindowsPrincipal.IsInRole($adminRole))
    {
        # We are running as an administrator, so change the title and background colour to indicate this
        $Host.UI.RawUI.WindowTitle = $myInvocation.MyCommand.Definition + "(Elevated)";
        $Host.UI.RawUI.BackgroundColor = "DarkBlue";
        Clear-Host;
    }
    else {
        # We are not running as an administrator, so relaunch as administrator
    
        # Create a new process object that starts PowerShell
        $newProcess = New-Object System.Diagnostics.ProcessStartInfo "PowerShell";
    
        # Specify the current script path and name as a parameter with added scope and support for scripts with spaces in it's path
        $newProcess.Arguments = "& '" + $script:MyInvocation.MyCommand.Path + "'"
    
        # Indicate that the process should be elevated
        $newProcess.Verb = "runas";
    
        # Start the new process
        [System.Diagnostics.Process]::Start($newProcess);
    
        # Exit from the current, unelevated, process
        Exit;
    }
    
    <# Kolla om datorn laddar
    Param($computer = “localhost”)
    
    function Test-IsOnBattery {
        Param(
        [string]$computer
        )
    
        [BOOL](Get-WmiObject -Class BatteryStatus -Namespace root\wmi `
        -ComputerName $computer).PowerOnLine
    
        Start-Sleep -Seconds 5
    }#>
    
    function checkCable{
        [BOOL]((Get-WmiObject -Class win32_networkadapter -filter "netconnectionid = 'Anslutning till lokalt nätverk'").netconnectionstatus -eq 2)
        Start-Sleep -Seconds 5
    }
    
    While($true) {
        $status = (netsh wlan show hostednetwork)[11] -match "Startad"
        if(checkCable) {
            if($status -eq $false) {
                netsh wlan start hostednetwork
                Show-BalloonTip -Title “Hotspot” -MessageType Info -Message “Sharing network” -Duration 500
            }
        }
        else {
            if($status) {
                netsh wlan stop hostednetwork
                Show-BalloonTip -Title “Hotspot” -MessageType Info -Message “Stopped Sharing network” -Duration 500
            }
        }
    }