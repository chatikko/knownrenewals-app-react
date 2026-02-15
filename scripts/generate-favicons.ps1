param(
  [string]$Source = "public/favicon.png"
)

Add-Type -AssemblyName System.Drawing

if (-not (Test-Path $Source)) {
  throw "Source favicon not found: $Source"
}

$publicDir = Split-Path -Parent $Source
$image = [System.Drawing.Image]::FromFile($Source)

try {
  if ($image.Width -ne $image.Height) {
    throw "Source favicon must be square. Current size: $($image.Width)x$($image.Height)"
  }

  $sizes = @(48, 96, 192)
  foreach ($size in $sizes) {
    $bitmap = New-Object System.Drawing.Bitmap $size, $size
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.DrawImage($image, 0, 0, $size, $size)

      $outPath = Join-Path $publicDir ("favicon-{0}x{0}.png" -f $size)
      $bitmap.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $graphics.Dispose()
      $bitmap.Dispose()
    }
  }

  # Create /favicon.ico by embedding the generated 48x48 PNG in ICO container.
  $pngPath = Join-Path $publicDir "favicon-48x48.png"
  $pngBytes = [System.IO.File]::ReadAllBytes($pngPath)
  $icoPath = Join-Path $publicDir "favicon.ico"

  $stream = [System.IO.File]::Open($icoPath, [System.IO.FileMode]::Create)
  $writer = New-Object System.IO.BinaryWriter($stream)
  try {
    # ICONDIR
    $writer.Write([UInt16]0)  # reserved
    $writer.Write([UInt16]1)  # type = icon
    $writer.Write([UInt16]1)  # count

    # ICONDIRENTRY
    $writer.Write([Byte]48)                 # width
    $writer.Write([Byte]48)                 # height
    $writer.Write([Byte]0)                  # color count
    $writer.Write([Byte]0)                  # reserved
    $writer.Write([UInt16]1)                # color planes
    $writer.Write([UInt16]32)               # bits per pixel
    $writer.Write([UInt32]$pngBytes.Length) # image size
    $writer.Write([UInt32]22)               # offset = 6 + 16

    $writer.Write($pngBytes)
  } finally {
    $writer.Dispose()
    $stream.Dispose()
  }
} finally {
  $image.Dispose()
}

Write-Output "Generated favicon.ico, favicon-48x48.png, favicon-96x96.png, favicon-192x192.png"

