// Slices the idle-scene sprite sheets (art/idle/sheet-N.png) into one horizontal
// strip per pose. Rows are found by their transparent gaps; each sprite piece
// belongs to the frame whose grid cell holds its centre; frames are then aligned
// to the first by shape, so only the moving parts move.
//
//   swiftc -O scripts/slice-idle-sheets.swift -o /tmp/slice-idle
//   /tmp/slice-idle art/idle /tmp/idle-strips 0.8
//   for f in /tmp/idle-strips/*.png; do cwebp -q 88 -alpha_q 100 -m 6 "$f" -o "public/idle/$(basename "$f" .png).webp"; done
//
// Prints one JSON line per pose ({"pose","frames","w","h"}, w/h = output frame size);
// copy those numbers into src/data/idleSprites.ts.
import AppKit
import CoreGraphics

struct Row { let pose: String; let frames: Int; let span: Int }
let layout: [Int: [Row]] = [
  1: [Row(pose: "coding", frames: 2, span: 1), Row(pose: "debugging", frames: 2, span: 1),
      Row(pose: "frustrated", frames: 2, span: 1), Row(pose: "idea", frames: 2, span: 1)],
  2: [Row(pose: "music", frames: 2, span: 1), Row(pose: "pancit", frames: 2, span: 1),
      Row(pose: "shipped", frames: 2, span: 1), Row(pose: "stretching", frames: 2, span: 1)],
  3: [Row(pose: "coffee", frames: 2, span: 1), Row(pose: "walking", frames: 4, span: 1),
      Row(pose: "running", frames: 4, span: 1), Row(pose: "adobo", frames: 2, span: 1)],
  4: [Row(pose: "petting", frames: 4, span: 1), Row(pose: "feeding", frames: 2, span: 2),
      Row(pose: "tv", frames: 2, span: 2), Row(pose: "reading", frames: 2, span: 2)],
  5: [Row(pose: "charging", frames: 2, span: 2), Row(pose: "playing", frames: 2, span: 2),
      Row(pose: "driving", frames: 2, span: 2), Row(pose: "toilet", frames: 2, span: 2)],
  6: [Row(pose: "scrolling", frames: 4, span: 1), Row(pose: "sleeping", frames: 2, span: 1),
      Row(pose: "waking", frames: 2, span: 1)],
]

setvbuf(stdout, nil, _IONBF, 0)
let args = CommandLine.arguments
let sheetDir = args[1], outDir = args[2]
let scale = Double(args[3])!

func load(_ path: String) -> (CGImage, [UInt8], Int, Int) {
  let image = NSImage(contentsOfFile: path)!.cgImage(forProposedRect: nil, context: nil, hints: nil)!
  let w = image.width, h = image.height
  var data = [UInt8](repeating: 0, count: w * h * 4)
  let ctx = CGContext(data: &data, width: w, height: h, bitsPerComponent: 8, bytesPerRow: w * 4,
                      space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
  ctx.draw(image, in: CGRect(x: 0, y: 0, width: w, height: h))
  return (image, data, w, h)
}

/// Runs of indices where `filled(i)` is true, split wherever there are at least `gap` empty indices
func runs(_ range: Range<Int>, gap: Int, _ filled: (Int) -> Bool) -> [(Int, Int)] {
  var out: [(Int, Int)] = []
  var start: Int? = nil, lastFilled = -1
  for i in range {
    if filled(i) {
      if start == nil { start = i } else if i - lastFilled > gap { out.append((start!, lastFilled)); start = i }
      lastFilled = i
    }
  }
  if let s = start { out.append((s, lastFilled)) }
  return out
}

/// A frame's tight box on the sheet and its opaque-pixel mask (row-major, w × h)
struct Frame {
  let x: Int, y: Int, w: Int, h: Int, mask: [Bool]
  func at(_ x: Int, _ y: Int) -> Bool { x >= 0 && y >= 0 && x < w && y < h && mask[y * w + x] }
  /// Half-size copy for the coarse search: a pixel is set if any of its 2×2 block is
  var half: Frame {
    let hw = (w + 1) / 2, hh = (h + 1) / 2
    var m = [Bool](repeating: false, count: hw * hh)
    for y in 0..<h { for x in 0..<w where mask[y * w + x] { m[(y / 2) * hw + x / 2] = true } }
    return Frame(x: x / 2, y: y / 2, w: hw, h: hh, mask: m)
  }
}

/// Offset to place `f` at (relative to `ref`'s box) so the most opaque pixels overlap
func bestShift(_ ref: Frame, _ f: Frame, around: (Int, Int), range: (Int, Int)) -> (Int, Int) {
  var best = around, bestScore = -1
  for dy in (around.1 - range.1)...(around.1 + range.1) {
    for dx in (around.0 - range.0)...(around.0 + range.0) {
      var score = 0
      for y in 0..<f.h { for x in 0..<f.w where f.mask[y * f.w + x] && ref.at(x + dx, y + dy) { score += 1 } }
      if score > bestScore { bestScore = score; best = (dx, dy) }
    }
  }
  return best
}

for sheet in 1...6 {
  let (image, data, w, h) = load("\(sheetDir)/sheet-\(sheet).png")
  // Row 0 of `data` is the top of the image
  func solid(_ x: Int, _ y: Int) -> Bool { data[(y * w + x) * 4 + 3] > 128 }
  let rowsWanted = layout[sheet]!
  var bands = runs(0..<h, gap: 6) { y in (0..<w).contains { solid($0, y) } }
  // Merge the closest bands until there is one per pose row (floating steam, notes, confetti join their row)
  while bands.count > rowsWanted.count {
    var best = 0, bestGap = Int.max
    for i in 0..<(bands.count - 1) { let g = bands[i + 1].0 - bands[i].1; if g < bestGap { bestGap = g; best = i } }
    bands[best] = (bands[best].0, bands[best + 1].1); bands.remove(at: best + 1)
  }
  // Rows that touch come out as one tall band: split the tallest at its thinnest line
  func occupancy(_ y: Int) -> Int { (0..<w).reduce(0) { $0 + (solid($1, y) ? 1 : 0) } }
  while bands.count < rowsWanted.count {
    let i = bands.indices.max { (bands[$0].1 - bands[$0].0) < (bands[$1].1 - bands[$1].0) }!
    let (top, bottom) = bands[i], height = bottom - top
    let cut = (top + height / 4...top + height * 3 / 4).min { occupancy($0) < occupancy($1) }!
    bands[i] = (top, cut); bands.insert((cut + 1, bottom), at: i + 1)
  }
  precondition(bands.count == rowsWanted.count, "sheet \(sheet): found \(bands.count) rows")

  for (row, band) in zip(rowsWanted, bands) {
    let pitch = Double(w) / 4 * Double(row.span)
    let blobs = runs(0..<w, gap: 3) { x in (band.0...band.1).contains { solid(x, $0) } }
    // Each blob belongs to the frame whose cell holds its centre
    var boxes = [(Int, Int)?](repeating: nil, count: row.frames)
    for b in blobs {
      let i = min(row.frames - 1, Int(Double(b.0 + b.1) / 2 / pitch))
      boxes[i] = boxes[i].map { (min($0.0, b.0), max($0.1, b.1)) } ?? b
    }
    precondition(boxes.allSatisfy { $0 != nil }, "\(row.pose): empty frame")

    // Each frame as a tight box with its opaque-pixel mask
    let frames: [Frame] = boxes.map { box in
      let (x0, x1) = box!
      let ys = (band.0...band.1).filter { y in (x0...x1).contains { solid($0, y) } }
      let y0 = ys.first!, y1 = ys.last!
      var mask = [Bool](repeating: false, count: (x1 - x0 + 1) * (y1 - y0 + 1))
      for y in y0...y1 { for x in x0...x1 where solid(x, y) { mask[(y - y0) * (x1 - x0 + 1) + x - x0] = true } }
      return Frame(x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1, mask: mask)
    }
    // ChatGPT doesn't space frames exactly a cell apart, so slide every frame sideways
    // to where its shape best overlaps the first one: furniture stays put, only the
    // moving parts move. Heights stay as drawn (each row already shares a floor line,
    // and a jump should stay a jump). Search coarsely at half size, then refine.
    var offsets = [(0, 0)]
    for f in frames.dropFirst() {
      let dy = f.y - frames[0].y
      let coarse = bestShift(frames[0].half, f.half, around: (0, dy / 2), range: (45, 0))
      let fine = bestShift(frames[0], f, around: (coarse.0 * 2, dy), range: (2, 0))
      offsets.append(fine)
    }
    let minX = zip(frames, offsets).map { $1.0 }.min()!, maxX = zip(frames, offsets).map { $1.0 + $0.w }.max()!
    let minY = zip(frames, offsets).map { $1.1 }.min()!, maxY = zip(frames, offsets).map { $1.1 + $0.h }.max()!
    let outW = Int((Double(maxX - minX) * scale).rounded()), outH = Int((Double(maxY - minY) * scale).rounded())

    let ctx = CGContext(data: nil, width: outW * row.frames, height: outH, bitsPerComponent: 8, bytesPerRow: 0,
                        space: CGColorSpaceCreateDeviceRGB(), bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue)!
    ctx.interpolationQuality = .high
    for (i, (f, o)) in zip(frames, offsets).enumerated() {
      // CGImage cropping uses a top-left origin; the context draws from the bottom-left
      let crop = image.cropping(to: CGRect(x: f.x, y: f.y, width: f.w, height: f.h))!
      let left = Double(i * outW) + Double(o.0 - minX) * scale
      let top = Double(o.1 - minY) * scale
      ctx.draw(crop, in: CGRect(x: left, y: Double(outH) - top - Double(f.h) * scale,
                                width: Double(f.w) * scale, height: Double(f.h) * scale))
    }
    let rep = NSBitmapImageRep(cgImage: ctx.makeImage()!)
    try! rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: "\(outDir)/\(row.pose).png"))
    print("{\"pose\":\"\(row.pose)\",\"frames\":\(row.frames),\"w\":\(outW),\"h\":\(outH)}")
  }
}
