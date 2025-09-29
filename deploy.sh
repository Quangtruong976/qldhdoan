#!/bin/bash

echo "🚀 Bắt đầu deploy dự án QLDHDOAN..."

# 1. Gom code
git add .

# 2. Commit với ngày giờ
git commit -m "Cập nhật code: $(date '+%Y-%m-%d %H:%M:%S')"

# 3. Push lên GitHub
git push origin main

# 4. Deploy lên Vercel
vercel --prod

# 5. Kiểm tra domain
echo "🌐 Kiểm tra domain qldhdoan.vercel.app..."
STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" https://qldhdoan.vercel.app)

if [ "$STATUS" -eq 200 ]; then
  echo "✅ Deploy thành công! Website đã chạy: https://qldhdoan.vercel.app"
else
  echo "⚠️ Deploy xong nhưng website trả về lỗi: $STATUS"
fi
