import React, { useState, useEffect } from 'react';
import { claimService } from '../services/api';
import { Section, Card, Grid, Label, Badge, LedIndicator } from '../components/DesignSystem';

const ClaimsPage = () => {
  const [claims, setClaimsData] = useState({
    claims: [],
    earnings: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadClaimsData();
  }, []);

  const loadClaimsData = async () => {
    try {
      setLoading(true);
      const [claimsRes, earningsRes] = await Promise.all([
        claimService.getUserClaims().catch(() => ({ data: [] })),
        claimService.getEarningsSummary().catch(() => null)
      ]);

      setClaimsData({
        claims: claimsRes.data || [],
        earnings: earningsRes?.data || null
      });
    } catch (err) {
      setError('Failed to load claims data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status) => {
    const variants = {
      pending: 'default',
      approved: 'success',
      rejected: 'alert',
      paid: 'success'
    };
    return variants[status] || 'default';
  };

  const getTriggerEmoji = (type) => {
    const emojis = {
      rainfall: '🌧️',
      flood: '🌊',
      heat: '🌡️',
      curfew: '⛔'
    };
    return emojis[type] || '📋';
  };

  if (loading) {
    return (
      <div className="bg-[#e0e5ec] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⏳</div>
          <p className="font-mono font-bold text-[#2d3436]">LOADING CLAIMS...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e0e5ec] min-h-screen">
      {/* Header Section */}
      <Section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs text-[#4a5568] tracking-widest mb-2">CLAIMS HISTORY</p>
            <h1 className="text-4xl font-bold text-[#2d3436]">Your Claims & Earnings</h1>
          </div>
          <LedIndicator status="online" label="SYSTEM ONLINE" pulse />
        </div>

        {error && (
          <div className="bg-[#ff4757]/10 border-l-4 border-[#ff4757] p-4 rounded mb-6">
            <p className="text-[#ff4757] font-mono text-sm">{error}</p>
          </div>
        )}
      </Section>

      {/* Earnings Summary */}
      {claims.earnings && (
        <Section>
          <div className="space-y-4 mb-8">
            <Label>FINANCIAL SUMMARY</Label>
            <Grid cols={4}>
              {[
                { label: 'Total Payouts', value: `₹${claims.earnings.totalPayouts || 0}`, show: true },
                { label: 'Total Premiums', value: `₹${claims.earnings.totalPremiums || 0}`, show: true },
                { label: 'Net Benefit', value: `₹${claims.earnings.netBenefit || 0}`, show: true, accent: true },
                { label: 'Claims Made', value: claims.earnings.claimsCount || 0, show: true },
              ]
                .filter(item => item.show)
                .map((item, idx) => (
                  <Card key={idx} screws className={item.accent ? 'ring-2 ring-[#ff4757]' : ''}>
                    <div className="text-center space-y-2">
                      <p className="text-xs text-[#4a5568] font-mono uppercase tracking-widest">{item.label}</p>
                      <p
                        className={`text-2xl font-mono font-bold ${
                          item.accent ? 'text-[#22c55e]' : 'text-[#ff4757]'
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </Card>
                ))}
            </Grid>
          </div>
        </Section>
      )}

      {/* Claims List Section */}
      <Section className="bg-[#f0f2f5]">
        <div className="space-y-6">
          <div>
            <Label>CLAIMS RECORD</Label>
            <h2 className="text-heading-3xl font-bold text-[#2d3436] mt-4">Recent Activity</h2>
          </div>

          {claims.claims.length === 0 ? (
            <Card screws className="text-center p-12">
              <div className="space-y-3">
                <div className="text-6xl">🙏</div>
                <h3 className="text-xl font-bold text-[#2d3436]">No Claims Yet</h3>
                <p className="text-[#4a5568] text-sm">
                  Your earnings are protected when disruptions occur. Stay safe out there!
                </p>
              </div>
            </Card>
          ) : (
            <div className="space-y-3">
              {claims.claims.map((claim) => (
                <Card key={claim._id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
                  {/* Left: Icon & Details */}
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{getTriggerEmoji(claim.triggerType)}</div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-[#2d3436]">
                        {claim.triggerType.toUpperCase()} Claim
                      </h4>
                      <div className="flex gap-4 text-sm text-[#4a5568]">
                        <span>
                          <span className="font-mono font-bold text-[#ff4757]">₹{claim.payoutAmount}</span> payout
                        </span>
                        <span>•</span>
                        <span>{new Date(claim.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>📍 {claim.location?.city || 'Unknown Location'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Status Badge */}
                  <Badge variant={getStatusBadgeVariant(claim.status)}>
                    {claim.status.toUpperCase()}
                  </Badge>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* How Auto Claims Work Section */}
      <Section>
        <div className="space-y-8">
          <div>
            <Label>PROCESS</Label>
            <h2 className="text-heading-3xl font-bold text-[#2d3436] mt-4">
              How Auto Claims Work
            </h2>
          </div>

          <Grid cols={4}>
            {[
              { icon: '🌦️', title: 'Monitor', desc: '24/7 weather tracking' },
              { icon: '🔔', title: 'Detect', desc: 'Trigger condition met' },
              { icon: '⚡', title: 'Create', desc: 'Auto claim generated' },
              { icon: '💳', title: 'Payout', desc: 'Fund within 24 hours' },
            ].map((step, idx) => (
              <Card key={idx} screws>
                <div className="text-center space-y-3">
                  <div className="text-4xl">{step.icon}</div>
                  <h4 className="font-bold text-[#2d3436] uppercase text-sm tracking-widest">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#4a5568]">{step.desc}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section dark className="bg-[#2d3436]">
        <div className="space-y-8">
          <div>
            <Label className="text-white/70">QUESTIONS</Label>
            <h2 className="text-heading-3xl font-bold text-white mt-4">Frequently Asked</h2>
          </div>

          <Grid cols={2}>
            {[
              {
                q: 'How long does processing take?',
                a: 'Claims are auto-generated instantly when conditions match. Payouts are processed within 24 hours.'
              },
              {
                q: 'Can I claim multiple times?',
                a: 'Yes! Each trigger event creates a new claim. You can claim multiple times per week if conditions are met.'
              },
              {
                q: 'What if I disagree with a claim status?',
                a: 'Contact support with your claim ID and details. Our team reviews all disputes within 48 hours.'
              },
              {
                q: 'Are claims taxable income?',
                a: 'Please consult your tax advisor. Insurance payouts have specific tax treatment in India.'
              },
            ].map((item, idx) => (
              <Card key={idx} className="space-y-3">
                <h4 className="text-white font-semibold">{item.q}</h4>
                <p className="text-[#a8b2d1] text-sm leading-relaxed">{item.a}</p>
              </Card>
            ))}
          </Grid>
        </div>
      </Section>
    </div>
  );
};

export default ClaimsPage;
