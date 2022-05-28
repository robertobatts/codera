export const BACKEND_PREFIX='http://localhost:1337';
export const API_PREFIX=`${BACKEND_PREFIX}/api`;
export const REVIEWS_URL=`${API_PREFIX}/reviews`;

export const getReviewsUrl = () => {
  return `${REVIEWS_URL}?populate=coverImage`;
}

export const getReviewUrl = (id) => {
  return `${REVIEWS_URL}/${id}?populate=coverImage`;
};