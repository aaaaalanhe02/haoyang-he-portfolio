#!/usr/bin/env bash
# 资产转码脚本：把 raw-assets/ 里的原始照片（HEIC/JPG/PNG/TIF）用 macOS 自带的 sips
# 转成降尺寸的 web 图片，输出到 src/assets/<板块>/。浏览器不能显示 HEIC，且 Astro 底层的
# sharp 也不能解码 HEIC，所以必须先在这一步预转换。视频（MOV/MP4）由 convert-videos.sh 处理。
#
# 用法：bash scripts/convert-assets.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RAW="$ROOT/raw-assets"
OUT="$ROOT/src/assets"
MAXDIM=2400   # 长边像素上限（手机原图约 3024×4032，太大）

# 源文件夹 → 目标 slug（目标目录名）
map_slug() {
  case "$1" in
    "kilimanjaro")               echo "kilimanjaro" ;;
    "TMB")                       echo "tmb" ;;
    "climbing")                  echo "climbing" ;;
    "HYPED")                     echo "hyped" ;;
    "Nanjing University Intern") echo "nanjing" ;;
    "Biofilm project")           echo "biofilm" ;;
    "Blood Rheology project")    echo "blood-rheology" ;;
    "Photography")               echo "photography" ;;
    *)                           echo "" ;;
  esac
}

convert_dir() {
  local src_dir="$1" slug="$2"
  local dest="$OUT/$slug"
  mkdir -p "$dest"
  local i=0
  # 稳定排序，保证命名可复现
  while IFS= read -r -d '' f; do
    i=$((i + 1))
    local ext="${f##*.}"
    local lower
    lower="$(echo "$ext" | tr '[:upper:]' '[:lower:]')"
    local fmt="jpeg" outext="jpg"
    if [ "$lower" = "tif" ] || [ "$lower" = "tiff" ] || [ "$lower" = "png" ]; then
      fmt="png"; outext="png"   # 科学图 / 透明图保真
    fi
    local out
    out="$(printf '%s/%s-%02d.%s' "$dest" "$slug" "$i" "$outext")"
    sips -s format "$fmt" -Z "$MAXDIM" "$f" --out "$out" >/dev/null
    printf '  %s  ->  %s\n' "$(basename "$f")" "$(basename "$out")"
  done < <(find "$src_dir" -maxdepth 1 -type f \
             \( -iname '*.heic' -o -iname '*.jpg' -o -iname '*.jpeg' \
                -o -iname '*.png' -o -iname '*.tif' -o -iname '*.tiff' \) \
             -print0 | sort -z)
  echo "[$slug] 共 $i 张 -> $dest"
}

echo "==> 转码照片到 src/assets/"
for src in "$RAW"/*/; do
  name="$(basename "$src")"
  slug="$(map_slug "$name")"
  [ -z "$slug" ] && continue
  convert_dir "$src" "$slug"
done

# PDF / 论文 / 证书 / CV -> public/docs（原样复制，供内嵌 / 下载）
DOCS="$ROOT/public/docs"
mkdir -p "$DOCS"
echo "==> 复制 PDF 到 public/docs/"
cp -f "$RAW/CV_V2.pdf" "$DOCS/CV.pdf"
cp -f "$RAW/Biofilm project/Senior_Honor_Project_4.pdf" "$DOCS/biofilm-honours-thesis.pdf"
cp -f "$RAW/UCL project/Literature_Review (6).pdf" "$DOCS/ucl-literature-review.pdf"
cp -f "$RAW/certificate/Coursera 7QSU5D87HR7G.pdf" "$DOCS/coursera-1.pdf"
cp -f "$RAW/certificate/Coursera BZRFLP8Y4U1X.pdf" "$DOCS/coursera-2.pdf"
cp -f "$RAW/certificate/Haoyang He - Tableau for Data Visualization Certificate.pdf" "$DOCS/tableau-certificate.pdf"
ls "$DOCS"
echo "==> 完成。"
