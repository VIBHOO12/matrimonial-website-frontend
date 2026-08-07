import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router);
  if (typeof window !== 'undefined') {
    const isAuthenticated = !!sessionStorage.getItem('loggedInUser');
    if (isAuthenticated) {
      // User is authenticated, allow navigation
      return true;
    } else {
      // User is not authenticated, redirect to login page
      return router.createUrlTree(['/']);
    }
  }
  // For server-side rendering or other environments, allow navigation
  return true;
};

