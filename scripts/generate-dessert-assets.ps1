Add-Type -AssemblyName System.Drawing

$dir = Join-Path (Split-Path -Parent $PSScriptRoot) "public"
New-Item -ItemType Directory -Force $dir | Out-Null

function New-Brush($hex) {
  return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function Save-Dessert($name, $w, $h, $variant) {
  $bmp = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias

  $bgRect = [System.Drawing.Rectangle]::new(0, 0, $w, $h)
  $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush $bgRect, ([System.Drawing.ColorTranslator]::FromHtml("#2A140B")), ([System.Drawing.ColorTranslator]::FromHtml("#D49B45")), 38
  $g.FillRectangle($bg, 0, 0, $w, $h)

  for ($i = 0; $i -lt 24; $i++) {
    $alpha = 14 + (($i * 9) % 48)
    $b = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb($alpha, 255, 246, 226))
    $x = ($i * 137) % $w
    $y = ($i * 251) % $h
    $r = 90 + (($i * 31) % 210)
    $g.FillEllipse($b, $x - $r / 2, $y - $r / 2, $r, $r)
    $b.Dispose()
  }

  $cx = [int]($w * 0.5)
  $cy = [int]($h * 0.55)
  $plateW = [int]($w * 0.72)
  $plateH = [int]($h * 0.46)
  $shadow = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(110, 42, 20, 11))
  $g.FillEllipse($shadow, $cx - $plateW / 2 + 22, $cy - $plateH / 2 + 58, $plateW, $plateH)

  $plateRect = [System.Drawing.Rectangle]::new([int]($cx - $plateW / 2), [int]($cy - $plateH / 2), $plateW, $plateH)
  $plate = New-Object System.Drawing.Drawing2D.LinearGradientBrush $plateRect, ([System.Drawing.ColorTranslator]::FromHtml("#FFF2D2")), ([System.Drawing.ColorTranslator]::FromHtml("#B87428")), 90
  $g.FillEllipse($plate, $plateRect)

  $innerW = [int]($plateW * 0.78)
  $innerH = [int]($plateH * 0.72)
  $innerRect = [System.Drawing.Rectangle]::new([int]($cx - $innerW / 2), [int]($cy - $innerH / 2), $innerW, $innerH)
  $cream = New-Object System.Drawing.Drawing2D.LinearGradientBrush $innerRect, ([System.Drawing.ColorTranslator]::FromHtml("#FBF5EA")), ([System.Drawing.ColorTranslator]::FromHtml("#E7D7BE")), 115
  $g.FillEllipse($cream, $innerRect)

  $caramelPen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#9C541D")), ([Math]::Max(8, [int]($w / 78)))
  for ($j = 0; $j -lt 6; $j++) {
    $yy = $cy - $innerH / 5 + ($j * ($innerH / 10))
    $g.DrawBezier($caramelPen, $cx - $innerW / 3, $yy, $cx - $innerW / 8, $yy + 70, $cx + $innerW / 8, $yy - 65, $cx + $innerW / 3, $yy + 15)
  }

  $gold = New-Brush "#E0B45C"
  $nut = New-Brush "#5B341C"
  $green = New-Brush "#8B8A35"
  for ($k = 0; $k -lt 58; $k++) {
    $x = $cx - $innerW / 2 + (($k * 83) % $innerW)
    $y = $cy - $innerH / 2 + (($k * 47) % $innerH)
    $brush = @($gold, $nut, $green)[($k + $variant) % 3]
    $g.FillEllipse($brush, $x, $y, 10 + (($k * 3) % 18), 5 + (($k * 5) % 11))
  }

  if ($variant -gt 1) {
    $cupRect = [System.Drawing.Rectangle]::new([int]($w * 0.18), [int]($h * 0.24), [int]($w * 0.28), [int]($h * 0.38))
    $cup = New-Object System.Drawing.Drawing2D.LinearGradientBrush $cupRect, ([System.Drawing.ColorTranslator]::FromHtml("#FFF6DF")), ([System.Drawing.ColorTranslator]::FromHtml("#D49B45")), 70
    $g.FillRectangle($cup, $cupRect)
    $g.FillEllipse($cup, [int]($w * 0.18), [int]($h * 0.18), [int]($w * 0.28), [int]($h * 0.12))
    $g.FillEllipse((New-Brush "#FBF5EA"), [int]($w * 0.2), [int]($h * 0.2), [int]($w * 0.24), [int]($h * 0.08))
  }

  $path = Join-Path $dir $name
  $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

Save-Dessert "hero-dessert.png" 1600 1400 0
Save-Dessert "product-rice.png" 1100 1300 1
Save-Dessert "product-ashta.png" 1100 1300 2
Save-Dessert "product-cairo.png" 1100 1300 3
Save-Dessert "story-kitchen.png" 1200 1400 4
Save-Dessert "social-1.png" 900 1300 5
Save-Dessert "social-2.png" 900 1300 6
Save-Dessert "social-3.png" 900 1300 7
Save-Dessert "social-4.png" 900 1300 8
Save-Dessert "final-table.png" 1800 1100 9
