import { inject, Injectable } from '@angular/core';
import { Auth, onAuthStateChanged, signInAnonymously, signOut, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = inject(Auth);

  private readonly _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user: User | null) => {
      if (user) {
        this._user$.next(user);
        console.log('AuthStateChanged: ', user);
      } else {
        this._user$.next(null);
        console.log('AuthStateChanged: ', null);
      }
    });
  }

  get currentUser() {
    return this._user$.value;
  }

  async signinAnonymously() {
    const user = await signInAnonymously(this.auth);
    if (!user) throw new Error('login unsuccessfull');

    console.log('user logged in: ', user);
    return user;
  }

  async signOut() {
    await signOut(this.auth);
    console.log('sign out successfull');
  }
}
