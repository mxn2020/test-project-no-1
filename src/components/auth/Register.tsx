import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signUp, signIn } from '../../lib/auth-client';
import { checkOAuthProviders } from '../../lib/auth-utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, Github, Mail } from 'lucide-react';
import { Container } from '../../lib/dev-container';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [providers, setProviders] = useState({ github: false, google: false });

  useEffect(() => {
    const loadProviders = async () => {
      const providerStatus = await checkOAuthProviders();
      setProviders(providerStatus);
    };
    loadProviders();
  }, []);

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log('=== REGISTER ATTEMPT START ===');
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Password length:', password.length);
    console.log('Environment:', {
      NODE_ENV: import.meta.env.NODE_ENV,
      MODE: import.meta.env.MODE,
      VITE_APP_URL: import.meta.env.VITE_APP_URL,
      VITE_API_URL: import.meta.env.VITE_API_URL,
      VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
      currentOrigin: window.location.origin,
      currentHref: window.location.href,
    });

    if (password !== confirmPassword) {
      console.log('❌ Password mismatch');
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      console.log('❌ Password too short');
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      console.log('✅ Validation passed, proceeding with registration');
      const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      const callbackURL = `${baseUrl}/dashboard`;
      console.log('📍 Callback URL:', callbackURL);
      console.log('🔧 Base URL source:', import.meta.env.VITE_APP_URL ? 'VITE_APP_URL' : 'window.location.origin');

      const registrationData = {
        email,
        password,
        name,
        callbackURL,
      };
      
      console.log('📦 Registration data:', {
        email: registrationData.email,
        name: registrationData.name,
        callbackURL: registrationData.callbackURL,
        passwordProvided: !!registrationData.password,
      });

      console.log('🚀 Calling signUp.email...');
      const result = await signUp.email(registrationData);

      console.log('📥 Server response:', result);

      if (result.error) {
        console.log('❌ Registration failed with error:', result.error);
        console.log('Error details:', {
          message: result.error.message,
          code: result.error.code,
          status: result.error.status,
          full: result.error,
        });
        setError(result.error.message || 'Registration failed');
        setIsLoading(false);
      } else {
        console.log('✅ Registration successful:', result);
        console.log('Success details:', {
          data: result.data,
          fullResult: result,
        });
        
        // Registration successful, clear loading state
        setIsLoading(false);
        
        // Check if Better Auth handled the redirect
        const redirectUrl = (result.data as any)?.url;
        if (redirectUrl) {
          console.log('🔄 Better Auth provided redirect URL:', redirectUrl);
          window.location.href = redirectUrl;
        } else {
          console.log('🔄 Manual redirect to dashboard');
          window.location.href = '/dashboard';
        }
      }
    } catch (err: any) {
      console.log('💥 Registration exception:', err);
      console.log('Exception details:', {
        message: err.message,
        name: err.name,
        stack: err.stack,
        response: err.response,
        status: err.status,
        statusText: err.statusText,
        config: err.config,
      });
      
      // Try to extract more meaningful error from network response
      if (err.response) {
        console.log('🌐 Network response error:', {
          data: err.response.data,
          status: err.response.status,
          statusText: err.response.statusText,
          headers: err.response.headers,
        });
      }
      
      setError(err.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
    
    console.log('=== REGISTER ATTEMPT END ===');
  };

  const handleGoogleRegister = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: '/dashboard'
      });
      // Social auth will redirect, so we don't need to clear loading here
    } catch (err: any) {
      setError(err.message || 'Google registration failed');
      setIsLoading(false);
    }
  };

  const handleGithubRegister = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await signIn.social({
        provider: "github",
        callbackURL: '/dashboard'
      });
      // Social auth will redirect, so we don't need to clear loading here
    } catch (err: any) {
      setError(err.message || 'GitHub registration failed');
      setIsLoading(false);
    }
  };

  return (
    <Container componentId="register-page">
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <Container componentId="register-header">
              <CardTitle className="text-2xl text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create a new account
              </CardDescription>
            </Container>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Container componentId="register-error">
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </Container>
            )}

            <Container componentId="social-register-buttons">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={handleGoogleRegister}
                  disabled={isLoading || !providers.google}
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={handleGithubRegister}
                  disabled={isLoading || !providers.github}
                  className="w-full"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </Container>

            <Container componentId="register-divider">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            </Container>

            <Container componentId="register-form">
              <form onSubmit={handleEmailRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </Button>
              </form>
            </Container>

            <Container componentId="register-footer">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  Already have an account?{' '}
                </span>
                <Link 
                  to="/login" 
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </Container>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};