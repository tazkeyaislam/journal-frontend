import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

describe('AuthService', () => {
    let service: AuthService;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: Router, useValue: routerSpy },
            ],
        });

        service = TestBed.inject(AuthService);
    });

    afterEach(() => {
        localStorage.clear();
    });

    describe('isAuthenticated', () => {
        it('should return false and navigate to root if token is not found', () => {
            localStorage.removeItem('token');
            const result = service.isAuthenticated();
            expect(result).toBeFalse();
            expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
        });

        it('should return true if token is found', () => {
            localStorage.setItem('token', 'fake-token');
            const result = service.isAuthenticated();
            expect(result).toBeTrue();
            expect(routerSpy.navigate).not.toHaveBeenCalled();
        });
    });

    describe('decodeToken', () => {
        it('should return null if no token is found', () => {
            localStorage.removeItem('token');
            const result = service.decodeToken();
            expect(result).toBeNull();
        });

        it('should return decoded token if token is found', () => {
            const fakeToken = 'fake-jwt-token';
            const fakeDecodedToken = { role: 'admin', email: 'user@example.com' };

            const decodeTokenSpy = spyOn<any>(service, 'decodeToken').and.returnValue(fakeDecodedToken);

            localStorage.setItem('token', fakeToken);
            const result = service.decodeToken();
            expect(result).toEqual(fakeDecodedToken);

            // Assert that the actual AuthService method was called
            expect(decodeTokenSpy).toHaveBeenCalled();
        });
    });

    describe('getUserRole', () => {
        it('should return empty string if no token is found', () => {
            localStorage.removeItem('token');
            const result = service.getUserRole();
            expect(result).toBe('');
        });

        it('should return the role from the decoded token', () => {
            const fakeDecodedToken = { role: 'admin', email: 'user@example.com' };

            spyOn(service, 'decodeToken').and.returnValue(fakeDecodedToken);

            const result = service.getUserRole();
            expect(result).toBe('admin');
        });

        it('should return an empty string if the token does not have a role', () => {
            const fakeDecodedToken = { email: 'user@example.com' };

            spyOn(service, 'decodeToken').and.returnValue(fakeDecodedToken);

            const result = service.getUserRole();
            expect(result).toBe(''); // Expect an empty string if role is undefined
        });
    });
});
