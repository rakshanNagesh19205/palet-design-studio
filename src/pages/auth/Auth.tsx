import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { StyleShowcase } from '@/components/auth/StyleShowcase';
import { ArrowLeft, Eye, EyeOff, Mail, RefreshCw } from 'lucide-react';
import { z } from 'zod';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = z.object({
  name: z.string().min(1, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Auth = () => {
  const location = useLocation();
  const isSignUp = location.pathname === '/auth/signup';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  
  const { signIn, signUp, signInWithGoogle, signInWithGitHub, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle smooth transition between modes
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 50);
    return () => clearTimeout(timer);
  }, [isSignUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      const validation = signUpSchema.safeParse({ name, email, password });
      if (!validation.success) {
        toast({
          title: 'Validation Error',
          description: validation.error.errors[0].message,
          variant: 'destructive',
        });
        return;
      }

      setLoading(true);
      const { error } = await signUp(email, password);
      setLoading(false);

      if (error) {
        let message = error.message;
        if (error.message.includes('already registered')) {
          message = 'This email is already registered. Please sign in instead.';
        }
        toast({
          title: 'Sign Up Failed',
          description: message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Check your email',
          description: 'We sent you a confirmation link. Please check your inbox.',
        });
        navigate('/auth/signin');
      }
    } else {
      const validation = signInSchema.safeParse({ email, password });
      if (!validation.success) {
        toast({
          title: 'Validation Error',
          description: validation.error.errors[0].message,
          variant: 'destructive',
        });
        return;
      }

      setLoading(true);
      const { error } = await signIn(email, password);
      setLoading(false);

      if (error) {
        // Check for email not confirmed error
        if (error.message?.toLowerCase().includes('email not confirmed')) {
          setEmailNotConfirmed(true);
          toast({
            title: 'Email Not Verified',
            description: 'Please verify your email address before signing in.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Sign In Failed',
            description: error.message === 'Invalid login credentials' 
              ? 'Invalid email or password. Please try again.'
              : error.message,
            variant: 'destructive',
          });
        }
      } else {
        navigate('/dashboard');
      }
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address first.',
        variant: 'destructive',
      });
      return;
    }

    setResendingEmail(true);
    const { error } = await resendVerificationEmail(email);
    setResendingEmail(false);

    if (error) {
      toast({
        title: 'Failed to Resend',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Verification Email Sent',
        description: 'Please check your inbox for the verification link.',
      });
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setLoading(false);
      toast({
        title: `Google ${isSignUp ? 'Sign Up' : 'Sign In'} Failed`,
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleGitHubAuth = async () => {
    setLoading(true);
    const { error } = await signInWithGitHub();
    if (error) {
      setLoading(false);
      toast({
        title: `GitHub ${isSignUp ? 'Sign Up' : 'Sign In'} Failed`,
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const switchMode = (toSignUp: boolean) => {
    navigate(toSignUp ? '/auth/signup' : '/auth/signin', { replace: true });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-full lg:w-[480px] flex flex-col bg-[#f8f6f6]">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">P.</span>
            </div>
            <span className="text-xl font-semibold text-slate-900 group-hover:text-primary transition-colors">
              Palet
            </span>
          </Link>
          <Link 
            to="/" 
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>
        
        {/* Form container */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
          <div className="w-full max-w-[340px]">
            {/* Toggle tabs */}
            <div className="flex gap-1 p-1 bg-[#f0efef] rounded-lg mb-8">
              <button
                onClick={() => switchMode(true)}
                className={`flex-1 py-2.5 text-center text-sm font-medium rounded-md transition-all duration-200 ${
                  isSignUp 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign up
              </button>
              <button
                onClick={() => switchMode(false)}
                className={`flex-1 py-2.5 text-center text-sm font-medium rounded-md transition-all duration-200 ${
                  !isSignUp 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign in
              </button>
            </div>
            
            {/* Animated content */}
            <div 
              className={`transition-all duration-200 ease-out ${
                isTransitioning ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Heading */}
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-slate-900 mb-2">
                  {isSignUp ? 'Create your account' : 'Welcome back'}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {isSignUp 
                    ? 'Create an account to save your specs' 
                    : 'Sign in to enter Spec Mode'}
                </p>
              </div>
              
              {/* Social buttons */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full h-11 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-sm font-medium text-slate-900 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  onClick={handleGitHubAuth}
                  disabled={loading}
                  className="w-full h-11 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-3 text-sm font-medium text-slate-900 hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Continue with GitHub
                </button>
              </div>
              
              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name field - only for sign up */}
                <div 
                  className={`transition-all duration-200 ease-out overflow-hidden ${
                    isSignUp ? 'max-h-16 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <Input
                    id="name"
                    type="text"
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isSignUp}
                    disabled={loading || !isSignUp}
                    tabIndex={isSignUp ? 0 : -1}
                    className="h-11 bg-white border-gray-200 focus:border-primary focus:ring-primary/10"
                  />
                </div>

                <div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="h-11 bg-white border-gray-200 focus:border-primary focus:ring-primary/10"
                  />
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="h-11 pr-11 bg-white border-gray-200 focus:border-primary focus:ring-primary/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Email not confirmed warning */}
                {emailNotConfirmed && !isSignUp && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-amber-800">
                          Email not verified
                        </p>
                        <p className="text-xs text-amber-700 mt-1">
                          Please check your inbox and click the verification link to continue.
                        </p>
                        <button
                          type="button"
                          onClick={handleResendVerification}
                          disabled={resendingEmail}
                          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-900 transition-colors disabled:opacity-50"
                        >
                          <RefreshCw className={`h-3 w-3 ${resendingEmail ? 'animate-spin' : ''}`} />
                          {resendingEmail ? 'Sending...' : 'Resend verification email'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Forgot password - only for sign in */}
                <div 
                  className={`transition-all duration-200 ease-out overflow-hidden ${
                    !isSignUp && !emailNotConfirmed ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex justify-end">
                    <Link
                      to="/auth/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                      tabIndex={!isSignUp ? 0 : -1}
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold" 
                  disabled={loading}
                >
                  {loading 
                    ? (isSignUp ? 'Creating account...' : 'Signing in...') 
                    : (isSignUp ? 'Create account' : 'Sign in')}
                </Button>
              </form>
              
              {/* Terms - only for sign up */}
              <div 
                className={`transition-all duration-200 ease-out overflow-hidden ${
                  isSignUp ? 'max-h-16 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
                }`}
              >
                <p className="text-center text-xs text-muted-foreground">
                  By creating an account, you agree to our{' '}
                  <Link to="/terms" className="underline hover:text-foreground">Terms</Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-6 text-center text-xs text-muted-foreground">
          © 2026 Palet. Precision in every pixel.
        </div>
      </div>
      
      {/* Right side - Showcase */}
      <div className="hidden lg:flex flex-1 min-h-screen">
        <StyleShowcase />
      </div>
    </div>
  );
};

export default Auth;
