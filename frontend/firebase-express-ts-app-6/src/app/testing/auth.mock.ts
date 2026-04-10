import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { vi } from 'vitest';

vi.mock('@angular/fire/auth', () => ({
  Auth: class {},
  onAuthStateChanged: vi.fn(),
  signInAnonymously: vi.fn(),
  signOut: vi.fn(),
}));

export const mockAuthState = (user: User | null) => {
  const onAuthStateChangedMock = vi.mocked(onAuthStateChanged);
  onAuthStateChangedMock.mockImplementation((_auth: Auth, nextOrObserver) => {
    const next = typeof nextOrObserver === 'function' ? nextOrObserver : nextOrObserver?.next;
    next?.(user);
    return () => {};
  });
};
