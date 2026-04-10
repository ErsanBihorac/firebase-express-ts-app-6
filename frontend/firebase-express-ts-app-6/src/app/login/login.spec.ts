import { ComponentFixture, TestBed } from '@angular/core/testing';
import { it, describe, vi, expect } from 'vitest';
import { Login } from './login';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    routerMock = { navigate: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signinAnonymously: vi.fn().mockResolvedValue({ uid: 'test_uid' }), // mock of the signinAnonymously method of AuthService injection
          },
        },
        {
          provide: Router,
          useValue: routerMock, // mock for navigate method of the Router injections
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('change route on login', async () => {
    await component.onAnonymousLogin();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });
});
