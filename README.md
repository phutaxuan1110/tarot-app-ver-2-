# Thư mục ảnh lá bài (`public/cards/`)

App đã được nối sẵn để hiển thị ảnh lá bài thật. Bạn chỉ cần:

1. Chuẩn bị 78 file ảnh của bộ bài **đã có giấy phép hợp lệ** (bộ bạn tự mua bản quyền,
   bộ public-domain thật sự, hoặc minh họa do bạn/họa sĩ vẽ riêng).
2. Đặt tên file theo đúng **ID số** của lá bài (xem bảng bên dưới), định dạng `.jpg`,
   ví dụ: `0.jpg`, `1.jpg`, ..., `77.jpg`.
3. Copy toàn bộ vào thư mục này: `public/cards/`.

App sẽ tự động hiển thị ảnh. Nếu một lá nào đó chưa có ảnh, app sẽ **tự động fallback**
về emoji đại diện (không bị lỗi/vỡ layout), nên bạn có thể bổ sung ảnh dần dần.

> Muốn dùng định dạng khác (`.png`, `.webp`)? Sửa giá trị `imagePath` tương ứng
> trong `tarotCards.ts` (mỗi lá bài có field `imagePath: '/cards/{id}.jpg'`).

## Bảng ID ↔ Tên lá bài

### Major Arcana (0–21)
| ID | Tên | ID | Tên |
|----|-----|----|-----|
| 0 | The Fool | 11 | Justice |
| 1 | The Magician | 12 | The Hanged Man |
| 2 | The High Priestess | 13 | Death |
| 3 | The Empress | 14 | Temperance |
| 4 | The Emperor | 15 | The Devil |
| 5 | The Hierophant | 16 | The Tower |
| 6 | The Lovers | 17 | The Star |
| 7 | The Chariot | 18 | The Moon |
| 8 | Strength | 19 | The Sun |
| 9 | The Hermit | 20 | Judgement |
| 10 | Wheel of Fortune | 21 | The World |

### Cups (22–35)
Ace(22), Two(23), Three(24), Four(25), Five(26), Six(27), Seven(28), Eight(29),
Nine(30), Ten(31), Page(32), Knight(33), Queen(34), King(35) of Cups.

### Wands (36–49)
Ace(36), Two(37), Three(38), Four(39), Five(40), Six(41), Seven(42), Eight(43),
Nine(44), Ten(45), Page(46), Knight(47), Queen(48), King(49) of Wands.

### Swords (50–63)
Ace(50), Two(51), Three(52), Four(53), Five(54), Six(55), Seven(56), Eight(57),
Nine(58), Ten(59), Page(60), Knight(61), Queen(62), King(63) of Swords.

### Pentacles (64–77)
Ace(64), Two(65), Three(66), Four(67), Five(68), Six(69), Seven(70), Eight(71),
Nine(72), Ten(73), Page(74), Knight(75), Queen(76), King(77) of Pentacles.

## Kích thước khuyến nghị
- Tỷ lệ 2:3 (giống lá bài thật), ví dụ 600×900px, để không bị méo khi hiển thị.
- Dung lượng nên nén dưới ~300KB/ảnh để app load nhanh.
