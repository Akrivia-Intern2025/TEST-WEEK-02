// Coode for uaual component loading
// // import { Injectable } from '@angular/core';
// // import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
// // import { Observable } from 'rxjs';

// // @Injectable({
// //   providedIn: 'root'
// // })
// // export class AuthGuard implements CanActivate {
// //   canActivate(
// //     route: ActivatedRouteSnapshot,
// //     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
// //     return true;
// //   }
  
// // }
// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   // Authentication logic to check if the user is logged in
//   isLoggedIn(): boolean {
//     const token = localStorage.getItem('userToken');
//     if (token) {
//       try {
//         // Decode the JWT token to check its validity
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//         return payload.exp > currentTime; // Check if the token is still valid
//       } catch (error) {
//         console.error('Invalid token format', error);
//         return false;
//       }
//     }
//     return false;
//   }

//   // Guard logic to protect routes
//   canActivate(): boolean {
//     if (this.isLoggedIn()) {
//       return true; // Allow access if the user is logged in
//     } else {
//       this.router.navigate(['/login']); // Redirect to login if not authenticated
//       return false;
//     }
//   }
// }

// code for  lazy-loading component
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  // Authentication logic to check if the user is logged in
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        return payload.exp > currentTime; // Check if the token is still valid
      } catch (error) {
        console.error('Invalid token format', error);
        return false;
      }
    }
    return false;
  }

  // Guard logic for regular routes
  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  // Guard logic for lazy-loaded modules
  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
