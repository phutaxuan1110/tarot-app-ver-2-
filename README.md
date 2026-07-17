# ✨ Tarot Học - Vietnamese Tarot Learning App

Ứng dụng học Tarot dành cho người Việt với 4 chế độ học tập tương tác, đầy đủ 78 lá bài Smith-Waite.

## 🎯 Tính năng chính

- **📚 Flashcard Mode**: Học từng lá bài một cách trực quan
- **🎯 Quiz Drill Mode**: Kiểm tra kiến thức qua các câu hỏi
- **🔮 Spread Practice**: Thực hành các layout Tarot phổ biến
- **🧠 Context Matching**: Ghép ý nghĩa với tình huống thực tế
- **📊 Statistics Dashboard**: Theo dõi tiến độ học tập
- **❤️ Favorites & Collections**: Lưu lá bài yêu thích
- **🏆 Achievements System**: Nhận thành tích khi đạt mục tiêu
- **🌙 Offline-first**: Tất cả dữ liệu lưu trữ cục bộ với localStorage

## 🛠️ Setup

### Yêu cầu
- Node.js 16+
- npm hoặc yarn

### Cài đặt

```bash
# Clone repository
git clone <repo-url>
cd tarot-learning-app

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

## 📱 Cách sử dụng

### 1. Flashcard Mode
- Xem hình ảnh và tên lá bài
- Nhấn lá bài để xem ý nghĩa
- Duyệt qua tất cả lá bài
- Thêm vào Favorites nếu muốn
- Shuffle để học theo thứ tự ngẫu nhiên

### 2. Quiz Drill Mode
- Chọn loại quiz: Ý nghĩa, Từ khóa, Arcana
- Trả lời câu hỏi trắc nghiệm
- Nhận điểm và feedback
- Xem độ chính xác cuối cùng

### 3. Spread Practice
- Chọn loại Spread: Three Card hoặc Celtic Cross
- Rút lá bài ngẫu nhiên
- Xem ý nghĩa từng vị trí
- Thực hành diễn giải

### 4. Context Matching
- Đọc tình huống/ngữ cảnh
- Chọn những lá bài phù hợp
- Giúp hiểu ý nghĩa ứng dụng thực tế

## 📊 Data Structure

### Tarot Cards Database
Mỗi lá bài chứa:
- ID, Tên, Số thứ tự
- Arcana (Major/Minor), Suit (Cups/Wands/Swords/Pentacles)
- Emoji đại diện
- Từ khóa (keywords)
- 8 loại ý nghĩa (tình yêu, công việc, gia đình, sức khỏe, tương lai, tâm linh, lời khuyên, v.v.)
- Element, Planet, Zodiac
- Độ khó và mức nhớ

### User Stats
```json
{
  "cardsLearned": 0,
  "totalReviews": 0,
  "quizAccuracy": 0,
  "reviewAccuracy": 0,
  "xp": 0,
  "streak": 0,
  "cardProgress": {},
  "achievements": []
}
```

## 🎨 Design

- **Modern Dark Theme**: Glassmorphism UI với gradient
- **Purple, Gold, Dark Blue**: Màu sắc chủ đề Tarot
- **Responsive**: Tối ưu cho mobile, tablet, desktop
- **Smooth Animations**: Hiệu ứng chuyển tiếp mượt mà

## 💾 Local Storage

Tất cả dữ liệu được lưu trữ cục bộ:
- `tarotUserStats`: Thống kê người dùng
- `tarotFavorites`: Danh sách lá bài yêu thích
- `tarotCollections`: Bộ sưu tập tùy chỉnh
- `tarotCardOfDay`: Lá bài hôm nay

## 🚀 Build & Deploy

```bash
# Build production
npm run build

# Start production server
npm start
```

Deployment đơn giản trên Vercel, Netlify, hoặc bất kỳ hosting Node.js nào.

## 📚 Data Content

### Major Arcana (22 lá)
- Từ The Fool (0) đến The World (21)
- Đầy đủ ý nghĩa tiếng Việt
- Đại diện cho hành trình tâm linh

### Minor Arcana (56 lá)
- **Cups (14)**: Cảm xúc, Mối quan hệ, Nước
- **Wands (14)**: Hành động, Creativity, Lửa
- **Swords (14)**: Tư duy, Xung đột, Không khí
- **Pentacles (14)**: Tài chính, Vật chất, Đất

## 🎓 Học tập Tips

1. **Bắt đầu với Flashcard**: Làm quen với tất cả 78 lá bài
2. **Quiz để kiểm tra**: Dùng Quiz Mode để tự kiểm tra
3. **Thực hành Spread**: Học cách diễn giải trong context thực tế
4. **Duy trì Streak**: Học hàng ngày để duy trì streak
5. **Revisit Cards**: Xem lại lá bài đã học thường xuyên

## 🔐 Privacy

- Không có kết nối internet
- Tất cả dữ liệu lưu trữ cục bộ
- Không chia sẻ thông tin cá nhân

## 🐛 Troubleshooting

**Dữ liệu không lưu?**
- Kiểm tra localStorage trong DevTools
- Đảm bảo browser cho phép localStorage

**Flashcard không flip?**
- Kiểm tra JavaScript được bật
- Thử refresh trang

**App chạy chậm?**
- Xóa cache browser
- Kiểm tra RAM còn trống

## 📝 License

MIT License - Tự do sử dụng và sửa đổi

## 🙏 Cảm ơn

- Smith-Waite Tarot Deck concept
- Next.js & React
- Tailwind CSS
- Lucide React icons

---

**Made with 💜 for Vietnamese Tarot learners**

Vào năm 2025 - Version 1.0.0
