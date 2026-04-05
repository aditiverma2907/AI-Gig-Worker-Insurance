import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Section, Card, Input, Button, Label, Badge } from '../components/DesignSystem';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const getErrorMessage = (err) => {
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
    if (err.code === 'ERR_NETWORK') {
      return 'Cannot reach backend. Make sure backend and MongoDB are running.';
    }
    return 'Login failed';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e0e5ec] min-h-screen">
      <Section className="flex items-center justify-center">
        <Card screws elevated className="w-full max-w-md">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <Badge variant="accent">LOGIN</Badge>
              <h1 className="text-2xl font-bold text-[#2d3436]">Welcome Back</h1>
              <p className="text-[#4a5568] text-sm">Access your SmartShield account</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[#ff4757]/10 border-l-4 border-[#ff4757] p-4 rounded">
                <p className="text-[#ff4757] font-mono text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label>EMAIL ADDRESS</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>PASSWORD</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-[#4a5568]">
              Don't have an account?{' '}
              <a href="/register" className="text-[#ff4757] font-semibold hover:underline">
                Register here
              </a>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
};

export default LoginPage;
