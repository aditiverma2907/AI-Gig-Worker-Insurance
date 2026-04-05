import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService, policyService } from '../services/api';
import { Section, Card, Grid, Button, Label, Badge, LedIndicator } from '../components/DesignSystem';

const DashboardPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({
    user: null,
    activePolicy: null,
    earnings: null,
    recentClaims: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [userRes, policyRes] = await Promise.all([
        authService.getCurrentUser(),
        policyService.getActivePolicy().catch(() => null)
      ]);

      setDashboardData(prev => ({
        ...prev,
        user: userRes.data
      }));

      if (policyRes) {
        setDashboardData(prev => ({
          ...prev,
          activePolicy: policyRes.data
        }));
      }
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskStatus = (score) => {
    if (score < 30) return { status: 'LOW', color: '#22c55e', label: 'Low Risk' };
    if (score < 70) return { status: 'MEDIUM', color: '#f59e0b', label: 'Medium Risk' };
    return { status: 'HIGH', color: '#ff4757', label: 'High Risk' };
  };

  if (loading) {
    return (
      <div className="bg-[#e0e5ec] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono font-bold text-[#2d3436]">LOADING DASHBOARD...</p>
        </div>
      </div>
    );
  }

  const userData = dashboardData.user;
  const riskData = getRiskStatus(userData?.riskScore || 50);

  return (
    <div className="bg-[#e0e5ec] min-h-screen">
      {/* Header Section */}
      <Section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs text-[#4a5568] tracking-widest mb-2">WELCOME BACK</p>
            <h1 className="text-4xl font-bold text-[#2d3436]">
              {userData?.name || 'User'} 👋
            </h1>
          </div>
          <LedIndicator status="online" label="SYSTEM ONLINE" pulse />
        </div>

        {error && (
          <div className="bg-[#ff4757]/10 border-l-4 border-[#ff4757] p-4 rounded mb-6">
            <p className="text-[#ff4757] font-mono text-sm">{error}</p>
          </div>
        )}
      </Section>

      {/* Main Dashboard Grid */}
      <Section>
        <Grid cols={3}>
          {/* Risk Status Card */}
          <Card screws elevated>
            <div className="space-y-4">
              <Label>RISK PROFILE</Label>
              <div className="text-center space-y-3">
                <div
                  className="inline-flex h-20 w-20 items-center justify-center rounded-full text-white font-mono font-bold text-2xl"
                  style={{ backgroundColor: riskData.color }}
                >
                  {userData?.riskScore || 50}
                </div>
                <div>
                  <p className="font-bold text-[#2d3436]">{riskData.label}</p>
                  <p className="text-xs text-[#4a5568] mt-1">
                    Based on location & weather history
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Active Policy Card */}
          <Card screws elevated>
            <div className="space-y-4">
              <Label>ACTIVE POLICY</Label>
              {dashboardData.activePolicy ? (
                <div className="space-y-3">
                  <Badge variant="success">ACTIVE</Badge>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#4a5568]">Plan:</span>
                      <span className="font-mono font-bold text-[#2d3436]">
                        {dashboardData.activePolicy.planId.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4a5568]">Premium:</span>
                      <span className="font-mono font-bold text-[#ff4757]">
                        ₹{dashboardData.activePolicy.weeklyPremium}/week
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4a5568]">Claims:</span>
                      <span className="font-mono font-bold">{dashboardData.activePolicy.totalClaims}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-[#4a5568] text-sm">No active policy</p>
                  <Button variant="primary" size="md" className="w-full" onClick={() => window.location.href = '/policies'}>
                    Buy Protection
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Earnings Card */}
          <Card screws elevated>
            <div className="space-y-4">
              <Label>PROTECTED EARNINGS</Label>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="font-mono text-3xl font-bold text-[#22c55e]">
                    ₹{userData?.totalEarnings || 0}
                  </p>
                  <p className="text-xs text-[#4a5568] mt-1">Total payouts received</p>
                </div>
                <div className="h-2 bg-[#d1d9e6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#22c55e] to-[#16a34a]"
                    style={{ width: '60%' }}
                  />
                </div>
              </div>
            </div>
          </Card>
        </Grid>
      </Section>

      {/* Coverage Details Section */}
      {dashboardData.activePolicy && (
        <Section className="bg-[#f0f2f5]">
          <div className="space-y-6">
            <div>
              <Label>COVERAGE DETAILS</Label>
              <h2 className="text-heading-3xl font-bold text-[#2d3436] mt-4">
                Your Protections
              </h2>
            </div>

            <Grid cols={2}>
              {[
                { emoji: '🌧️', name: 'Rainfall Protection', condition: '>50mm', amount: dashboardData.activePolicy.coverage.rainfall.payout },
                { emoji: '🌊', name: 'Flood Alert', condition: 'Official Warning', amount: dashboardData.activePolicy.coverage.flood.payout },
                { emoji: '🌡️', name: 'Extreme Heat', condition: '>42°C', amount: dashboardData.activePolicy.coverage.heat.payout },
                { emoji: '⛔', name: 'Curfew Coverage', condition: 'Official Notice', amount: dashboardData.activePolicy.coverage.curfew.payout },
              ].map((item, idx) => (
                <Card key={idx}>
                  <div className="space-y-3">
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <h4 className="font-bold text-[#2d3436]">{item.name}</h4>
                    <p className="text-xs text-[#4a5568]">Trigger: {item.condition}</p>
                    <div className="pt-2 border-t border-[#d1d9e6]">
                      <p className="font-mono text-sm font-bold text-[#ff4757]">
                        Payout: ₹{item.amount}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </Grid>
          </div>
        </Section>
      )}

      {/* Quick Actions Section */}
      <Section>
        <div className="space-y-4">
          <Label>QUICK ACTIONS</Label>
          <Grid cols={3}>
            <Button variant="primary" size="lg" onClick={() => window.location.href = '/policies'}>
              View Plans
            </Button>
            <Button variant="secondary" size="lg" onClick={() => window.location.href = '/claims'}>
              Check Claims
            </Button>
            <Button variant="ghost" size="lg" onClick={loadDashboardData}>
              Refresh Data
            </Button>
          </Grid>
        </div>
      </Section>
    </div>
  );
};

export default DashboardPage;
