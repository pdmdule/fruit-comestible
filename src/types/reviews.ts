export interface ProductReview {
  id: string;
  product_id: string;
  author_name: string;
  author_location?: string | null;
  email: string;
  order_number: string;
  rating: number; // 1 to 5
  comment: string;
  usage_tag?: string | null;
  is_verified_purchase: boolean;
  is_approved: boolean;
  created_at: string;
}

export interface ProductReviewsSummary {
  averageRating: number;
  totalReviews: number;
}
