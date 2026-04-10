import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { AuthService } from './auth-service';
import { Auth, User } from '@angular/fire/auth';
import { mockAuthState } from '../testing/auth.mock';
import { firstValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    mockAuthState(null);
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Auth, useValue: {} }],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sets null when no user is logged in', async () => {
    const user = await firstValueFrom(service.user$);
    expect(user).toBe(null);
  });
});

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    mockAuthState({ uid: 'test_uid' } as User);
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: Auth, useValue: {} }],
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sets null when no user is logged in', async () => {
    const user = await firstValueFrom(service.user$);
    expect(user?.uid).toBe('test_uid');
  });
});
