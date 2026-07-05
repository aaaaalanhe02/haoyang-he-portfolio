#!/usr/bin/env bash
# 视频转码脚本：把 raw-assets/ 里的 MOV/MP4 用 ffmpeg 统一转成跨浏览器可播的
# H.264 + AAC MP4（faststart 便于流式加载），缩放到合理尺寸、压制体积。
# 输出到 public/videos/。需要先安装 ffmpeg（brew install ffmpeg）。
#
# 用法：bash scripts/convert-videos.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RAW="$ROOT/raw-assets"
OUT="$ROOT/public/videos"
mkdir -p "$OUT"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "错误：未找到 ffmpeg。请先 brew install ffmpeg。" >&2
  exit 1
fi

# 统一转码：最长边不超过 1280，crf 26，AAC 128k，faststart
transcode() {
  local in="$1" out="$2"
  echo "  -> $(basename "$out")"
  # -nostdin 关键：否则 ffmpeg 会吞掉 while-read 循环的 stdin，破坏后续文件名读取
  ffmpeg -nostdin -y -loglevel error -i "$in" \
    -vf "scale=w='min(1280,iw)':h='min(1280,ih)':force_original_aspect_ratio=decrease,scale=trunc(iw/2)*2:trunc(ih/2)*2" \
    -c:v libx264 -crf 26 -preset veryfast -pix_fmt yuv420p -movflags +faststart \
    -c:a aac -b:a 128k \
    "$out"
}

echo "==> HYPED 视频（5 个 MOV）"
i=0
while IFS= read -r -d '' f; do
  i=$((i + 1))
  transcode "$f" "$OUT/$(printf 'hyped-%02d.mp4' "$i")"
done < <(find "$RAW/HYPED" -maxdepth 1 -type f -iname '*.mov' -print0 | sort -z)

echo "==> 乐队鼓手视频"
transcode "$RAW/band/001_WC-EditVideo_1.MP4" "$OUT/band.mp4"

echo "==> 血液流变实验视频（原 40MB，压制）"
transcode "$RAW/Blood Rheology project/93c35e7cbaa97c4401eeb36f47a65a9a.mp4" "$OUT/blood-rheology.mp4"

echo "==> 完成。产物："
ls -lh "$OUT"
