'use client';

import React, { useState } from 'react';
import type { TarotCard } from '../tarotCards';

interface CardImageProps {
  card: TarotCard;
  className?: string;
  emojiSizeClassName?: string;
  priority?: boolean;
}

/**
 * Hiển thị ảnh lá bài từ /public/cards/{id}.jpg (do bạn upload, xem
 * public/cards/README.md để biết quy ước đặt tên file).
 *
 * Nếu ảnh chưa tồn tại (404) hoặc lỗi tải, tự động rơi về hiển thị
 * emoji đại diện (card.imageEmoji) để app không bao giờ bị vỡ layout.
 */
export default function CardImage({
  card,
  className = '',
  emojiSizeClassName = 'text-6xl',
  priority = false,
}: CardImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}
      >
        <span className={emojiSizeClassName}>{card.imageEmoji}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={card.imagePath}
      alt={card.name}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setErrored(true)}
      className={`object-cover ${className}`}
    />
  );
}
