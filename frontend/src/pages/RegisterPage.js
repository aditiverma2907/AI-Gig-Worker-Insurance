import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Section, Card, Input, Button, Label, Badge, Grid } from '../components/DesignSystem';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const getErrorMessage = (err) => {
    if (err.response?.data?.message) {
      return err.response.data.message;
    }
    if (err.code === 'ERR_NETWORK') {
      return 'Cannot reach backend. Make sure backend and MongoDB are running.';
    }
    return 'Registration failed';
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
      await register(formData);
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
        <Card screws elevated className="w-full max-w-lg">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <Badge variant="accent">REGISTER</Badge>
              <h1 className="text-2xl font-bold text-[#2d3436]">Get Protected Today</h1>
              <p className="text-[#4a5568] text-sm">Join SmartShield and protect your income</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[#ff4757]/10 border-l-4 border-[#ff4757] p-4 rounded">
                <p className="text-[#ff4757] font-mono text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-2">
                <Label>FULL NAME</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
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

              {/* Phone */}
              <div className="space-y-2">
                <Label>PHONE NUMBER</Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                />
              </div>

              {/* City & State */}
              <Grid cols={2} gap={4} responsive>
                <div className="space-y-2">
                  <Label>CITY</Label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g., Mumbai"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>STATE</Label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="e.g., Maharashtra"
                    required
                  />
                </div>
              </Grid>

              {/* Password */}
              <div className="space-y-2">
                <Label>PASSWORD</Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
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
                {loading ? 'Creating Account...' : 'Register Now'}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm text-[#4a5568]">
              Already have an account?{' '}
              <a href="/login" className="text-[#ff4757] font-semibold hover:underline">
                Login here
              </a>
            </div>
          </div>
        </Card>
      </Section>
    </div>
  );
};

export default RegisterPage;
