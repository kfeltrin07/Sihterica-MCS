import { HttpInterceptorFn } from '@angular/common/http';

export const izvjestajiInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
