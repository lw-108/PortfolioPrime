# PowerShell Script to Clean Up Unused Heavy Assets in PortfolioPrime
# Run this script to purge files that are not referenced in the source code.

$ProjectRoot = Resolve-Path "$PSScriptRoot\.."
$SvnPath = Join-Path $ProjectRoot "public\edu\svn.jpg"
$StripePath = Join-Path $ProjectRoot "public\stripe-gray-dark.webp"
$KeerthanaPath = Join-Path $ProjectRoot "public\testimonials\keerthana.png"
$AboutMePath = Join-Path $ProjectRoot "public\AboutMe.webp"

Write-Host "=== PortfolioPrime Heavy Asset Cleanup ===" -ForegroundColor Cyan

# 1. Delete unused svn.jpg
if (Test-Path $SvnPath) {
    Write-Host "Removing unused heavy image: public/edu/svn.jpg..." -ForegroundColor Yellow
    Remove-Item -Path $SvnPath -Force
    Write-Host "✓ Removed public/edu/svn.jpg" -ForegroundColor Green
} else {
    Write-Host "• public/edu/svn.jpg is already removed." -ForegroundColor Gray
}

# 2. Delete unused stripe-gray-dark.webp
if (Test-Path $StripePath) {
    Write-Host "Removing unused stripe file: public/stripe-gray-dark.webp..." -ForegroundColor Yellow
    Remove-Item -Path $StripePath -Force
    Write-Host "✓ Removed public/stripe-gray-dark.webp" -ForegroundColor Green
} else {
    Write-Host "• public/stripe-gray-dark.webp is already removed." -ForegroundColor Gray
}

# 3. Delete unused keerthana.png
if (Test-Path $KeerthanaPath) {
    Write-Host "Removing unused heavy image: public/testimonials/keerthana.png..." -ForegroundColor Yellow
    Remove-Item -Path $KeerthanaPath -Force
    Write-Host "✓ Removed public/testimonials/keerthana.png" -ForegroundColor Green
} else {
    Write-Host "• public/testimonials/keerthana.png is already removed." -ForegroundColor Gray
}

# 4. Delete unused AboutMe.webp
if (Test-Path $AboutMePath) {
    Write-Host "Removing unused image: public/AboutMe.webp..." -ForegroundColor Yellow
    Remove-Item -Path $AboutMePath -Force
    Write-Host "✓ Removed public/AboutMe.webp" -ForegroundColor Green
} else {
    Write-Host "• public/AboutMe.webp is already removed." -ForegroundColor Gray
}

# 5. Delete unused public/steps/ folder (imageless step ribbon)
$StepsDir = Join-Path $ProjectRoot "public\steps"
if (Test-Path $StepsDir) {
    Write-Host "Removing unused step images from public/steps/..." -ForegroundColor Yellow
    Remove-Item -Path $StepsDir -Recurse -Force
    Write-Host "✓ Removed public/steps/ directory and all its images" -ForegroundColor Green
} else {
    Write-Host "• public/steps/ directory is already removed." -ForegroundColor Gray
}

# 6. Delete unused public/TechIcons/ folder (replaced with remote URLs)
$TechIconsDir = Join-Path $ProjectRoot "public\TechIcons"
if (Test-Path $TechIconsDir) {
    Write-Host "Removing unused tech icon images from public/TechIcons/..." -ForegroundColor Yellow
    Remove-Item -Path $TechIconsDir -Recurse -Force
    Write-Host "✓ Removed public/TechIcons/ directory and all its images" -ForegroundColor Green
} else {
    Write-Host "• public/TechIcons/ directory is already removed." -ForegroundColor Gray
}

# 7. Delete newly replaced individual public assets
$FilesToDelete = @(
    "public\arrow.svg",
    "public\circle.svg",
    "public\dot.svg",
    "public\dotlight.svg",
    "public\favicon.png",
    "public\grab.svg",
    "public\lanyard.png",
    "public\logo.png",
    "public\logo-dark.svg",
    "public\logo-light.svg",
    "public\LW19.pdf",
    "public\mail.svg",
    "public\omnilanyard.png",
    "public\stripe.svg",
    "public\vite.svg",
    "public\card.glb",
    "public\omnitrix.glb",
    "public\fonts\ClashDisplay-Bold.eot",
    "public\fonts\ClashDisplay-Bold.ttf",
    "public\fonts\ClashDisplay-Bold.woff",
    "public\fonts\ClashDisplay-Bold.woff2",
    "public\fonts\ClashDisplay-Extralight.eot",
    "public\fonts\ClashDisplay-Extralight.ttf",
    "public\fonts\ClashDisplay-Extralight.woff",
    "public\fonts\ClashDisplay-Extralight.woff2",
    "public\fonts\ClashDisplay-Regular.eot",
    "public\fonts\ClashDisplay-Regular.ttf",
    "public\fonts\ClashDisplay-Regular.woff",
    "public\fonts\ClashDisplay-Regular.woff2",
    "public\fonts\ClashDisplay-Semibold.eot",
    "public\fonts\ClashDisplay-Semibold.ttf",
    "public\fonts\ClashDisplay-Semibold.woff",
    "public\fonts\ClashDisplay-Semibold.woff2",
    "public\fonts\ClashDisplay-Light.eot",
    "public\fonts\ClashDisplay-Medium.eot",
    "public\fonts\ClashDisplay-Variable.eot",
    "public\fonts\ClashDisplay-Medium.ttf",
    "public\fonts\ClashDisplay-Medium.woff",
    "public\fonts\ClashDisplay-Light.ttf",
    "public\fonts\ClashDisplay-Light.woff",
    "public\fonts\ClashDisplay-Variable.ttf",
    "public\fonts\ClashDisplay-Variable.woff",
    "src\components\StickerPeel.tsx",
    "src\components\InfiniteMenu.tsx"
)

foreach ($File in $FilesToDelete) {
    $FilePath = Join-Path $ProjectRoot $File
    if (Test-Path $FilePath) {
        Write-Host "Removing replaced file: $File..." -ForegroundColor Yellow
        Remove-Item -Path $FilePath -Force
        Write-Host "✓ Removed $File" -ForegroundColor Green
    } else {
        Write-Host "• $File is already removed." -ForegroundColor Gray
    }
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Cleanup completed successfully!" -ForegroundColor Green
