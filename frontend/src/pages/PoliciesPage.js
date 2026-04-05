import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { policyService } from '../services/api';
import {
  Card,
  Button,
  Section,
  Grid,
  HeroText,
  Label,
  Badge,
} from '../components/DesignSystem';

const PoliciesPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const plans = [
    {
      id: 'basic',
      name: 'Basic Shield',
      premium: 100,
      badge: 'STARTER',
      features: [
        '🌧️ Rainfall Protection (>50mm)',
        '🌡️ Heat Wave Coverage',
        'Weekly Premium',
        'Email Notifications',
        'Basic Risk Score'
      ],
      payout_avg: '₹300-400'
    },
    {
      id: 'pro',
      name: 'Pro Guard',
      premium: 150,
      badge: 'POPULAR',
      featured: true,
      features: [
        '✓ All Basic Features',
        '🌊 Flood Alert Coverage',
        'SMS + Email Alerts',
        'Priority Claims Processing',
        'Advanced Risk Analytics'
      ],
      payout_avg: '₹500-600'
    },
    {
      id: 'premium',
      name: 'Premium Plus',
      premium: 200,
      badge: 'ELITE',
      features: [
        '✓ All Pro Features',
        '⛔ Curfew Coverage',
        '24/7 Priority Support',
        'Fast Payout (24 hours)',
        'Risk Discount Program',
        'VIP Concierge'
      ],
      payout_avg: '₹700-800'
    }
  ];

  const handleBuyPlan = async (planId) => {
    setSelectedPlan(planId);
    setLoading(true);
    setMessage('');

    try {
      const response = await policyService.createPolicy({ planId });
      setMessage(`✅ Policy created successfully! Premium: ₹${response.data.premium}`);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      setMessage(`❌ ${error.response?.data?.message || 'Failed to create policy'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#e0e5ec] min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <Section>
        <div className="text-center space-y-6">
          <Label>INSURANCE PLANS</Label>
          <HeroText size="xl">
            Choose Your<br />
            <span className="text-[#ff4757]">Protection Level</span>
          </HeroText>
          <p className="text-body-lg text-[#4a5568] max-w-2xl mx-auto">
            Flexible weekly plans designed for delivery partners. 
            All plans include AI fraud detection and automatic claims.
          </p>
        </div>
      </Section>

      {/* ===== MESSAGE ALERTS ===== */}
      {message && (
        <div className="max-w-prose mx-auto px-6 mb-6">
          <div
            className={`
              p-4 rounded-lg font-mono text-sm text-center
              ${message.includes('✅') 
                ? 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]' 
                : 'bg-[#ff4757]/10 text-[#ff4757] border border-[#ff4757]'
              }
            `}
          >
            {message}
          </div>
        </div>
      )}

      {/* ===== PRICING CARDS ===== */}
      <Section>
        <Grid cols={3}>
          {plans.map((plan) => (
            <div key={plan.id} className="h-full">
              <Card
                elevated={plan.featured}
                screws
                vents={plan.featured}
                className={`flex flex-col h-full transition-all duration-300 ${
                  plan.featured ? 'ring-2 ring-[#ff4757]' : ''
                }`}
              >
                {/* Header */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#2d3436]">{plan.name}</h2>
                    {plan.featured && (
                      <Badge variant="accent">🏆 POPULAR</Badge>
                    )}
                  </div>
                  {plan.badge && !plan.featured && (
                    <Badge variant="default">{plan.badge}</Badge>
                  )}
                </div>

                {/* Price */}
                <div className="space-y-2 mb-6 pb-6 border-b-2 border-[#d1d9e6]">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-[#ff4757]">₹{plan.premium}</span>
                    <span className="font-mono text-sm text-[#4a5568]">/week</span>
                  </div>
                  <div className="text-xs text-[#4a5568] font-mono">
                    Avg. Payout: {plan.payout_avg}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#2d3436]">
                      <span className="text-[#22c55e] font-bold mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.featured ? 'primary' : 'secondary'}
                  size="lg"
                  className="w-full"
                  onClick={() => handleBuyPlan(plan.id)}
                  disabled={loading && selectedPlan === plan.id}
                >
                  {loading && selectedPlan === plan.id ? 'Processing...' : 'Buy Now'}
                </Button>
              </Card>
            </div>
          ))}
        </Grid>
      </Section>

      {/* ===== COVERAGE DETAILS ===== */}
      <Section className="bg-[#f0f2f5]">
        <div className="space-y-8">
          <div>
            <Label>COVERAGE MATRIX</Label>
            <h2 className="text-heading-3xl font-bold text-[#2d3436] mt-4">
              What Triggers Your Claim?
            </h2>
          </div>

          <Card screws className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#d1d9e6]">
                    <th className="text-left px-6 py-4 font-mono font-bold text-[#2d3436]">
                      DISRUPTION
                    </th>
                    <th className="text-left px-6 py-4 font-mono font-bold text-[#2d3436]">
                      TRIGGER CONDITION
                    </th>
                    <th className="text-right px-6 py-4 font-mono font-bold text-[#ff4757]">
                      PAYOUT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { disruption: '🌧️ Heavy Rainfall', trigger: 'Rainfall > 50mm', payout: '₹300' },
                    { disruption: '🌊 Flood Alert', trigger: 'Official Warning issued', payout: '₹500' },
                    { disruption: '🌡️ Extreme Heat', trigger: 'Temperature > 42°C', payout: '₹200' },
                    { disruption: '⛔ Curfew', trigger: 'Official Notice issued', payout: '₹400' },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-[#d1d9e6] hover:bg-[#ffffff]">
                      <td className="px-6 py-4 text-[#2d3436] font-semibold">{row.disruption}</td>
                      <td className="px-6 py-4 text-[#4a5568] font-mono text-sm">{row.trigger}</td>
                      <td className="text-right px-6 py-4 font-mono font-bold text-[#ff4757]">
                        {row.payout}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </Section>

      {/* ===== HOW IT WORKS ===== */}
      <Section>
        <div className="space-y-8">
          <div>
            <Label>PROCESS</Label>
            <h2 className="text-heading-3xl font-bold text-[#2d3436] mt-4">
              Your Claim Journey
            </h2>
          </div>

          <Grid cols={4}>
            {[
              { num: '1', title: 'MONITOR', desc: 'AI checks weather 24/7' },
              { num: '2', title: 'TRIGGER', desc: 'Condition threshold met' },
              { num: '3', title: 'CLAIM', desc: 'Auto-generated instantly' },
              { num: '4', title: 'PAYOUT', desc: 'Fund transferred (24h)' },
            ].map((step, idx) => (
              <div key={idx} className="space-y-4">
                <Card screws>
                  <div className="text-center space-y-3">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#ff4757] text-white font-mono font-bold text-lg">
                      {step.num}
                    </div>
                    <h4 className="font-mono font-bold text-[#2d3436] uppercase text-sm tracking-widest">
                      {step.title}
                    </h4>
                    <p className="text-[#4a5568] text-xs">{step.desc}</p>
                  </div>
                </Card>
              </div>
            ))}
          </Grid>
        </div>
      </Section>

      {/* ===== FAQs ===== */}
      <Section dark className="bg-[#2d3436]">
        <div className="space-y-8">
          <div>
            <Label className="text-white/70">QUESTIONS</Label>
            <h2 className="text-heading-3xl font-bold text-white mt-4">
              Frequently Asked
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How are claims automatically generated?',
                a: 'Our AI continuously monitors weather data and official alerts. When conditions match your plan triggers, a claim is created instantly—no paperwork needed.'
              },
              {
                q: 'Can I switch plans later?',
                a: 'Yes! You can upgrade or downgrade your plan anytime. Changes take effect from the next billing cycle.'
              },
              {
                q: 'What if I have multiple policies?',
                a: 'Each policy covers a specific week. You can hold multiple policies for continuous protection.'
              },
              {
                q: 'Is my data secure?',
                a: 'Absolutely. We use military-grade encryption and comply with all data protection regulations.'
              },
            ].map((faq, idx) => (
              <Card key={idx} className="space-y-3">
                <h4 className="font-semibold text-white">{faq.q}</h4>
                <p className="text-[#a8b2d1] text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ===== FINAL CTA ===== */}
      <Section>
        <div className="text-center space-y-8">
          <div className="space-y-2">
            <Badge variant="accent">LIMITED TIME OFFER</Badge>
            <HeroText size="lg">Get Your First Week at 50% Off</HeroText>
          </div>
          <p className="text-body-lg text-[#4a5568] max-w-lg mx-auto">
            New members get their first week's premium at half price. 
            No hidden fees, cancel anytime.
          </p>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => navigate('/register')}
          >
            Choose Your Plan Now
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default PoliciesPage;
