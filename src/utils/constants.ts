export const POST_STATUSES = {
  DRAFTED: 'Drafted',
  WAITING: 'WaitingForReview',
  PUBLISHED: 'Published',
};

export const RESPONSE_MESSAGES = {
  SENT_TO_REVIEW:
    'Your post has been sent to review and will publish once its approved',
  POST_DELETED: 'post deleted',
  ERROR_DELETING: 'error deleting post',
  POST_PUBLISHED: 'post status been updated to published',
  EXTRA_REVIEW: 'this post needs extra review',
  EMAIL_EXISTS: 'Email already exists',
  PASSWORD_NOMATCH: "passwords don't match",
};

export const offensiveWords = ['fuck', 'guns', 'bombs', 'kill'];
