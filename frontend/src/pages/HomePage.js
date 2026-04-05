import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Section, 
  Grid, 
  HeroText, 
  Label, 
  Badge, 
  LedIndicator 
} from '../components/DesignSystem';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#e0e5ec] min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTA */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <LedIndicator status="online" label="SYSTEM OPERATIONAL" />
            </div>
            
            <HeroText size="2xl">
              Protect Your Income,<br />
              <span className="text-[#ff4757]">Instantly</span>
            </HeroText>
            
            <p className="text-body-lg text-[#4a5568] max-w-lg leading-relaxed">
              AI-powered parametric insurance for food delivery partners. 
              Automatic claims, zero paperwork, payouts within 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => navigate('/register')}
              >
                Get Protected Today
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => navigate('/policies')}
              >
                View Plans
              </Button>
            </div>
          </div>
          
          {/* Right: Device Visualization */}
          <div className="flex justify-center">
            <Card elevated screws vents className="w-full max-w-sm">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-7xl mb-4">🛡️</div>
                  <Label>INSURANCE MODULE V1.0</Label>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-[#2d3436] rounded p-4 shadow-[var(--shadow-recessed)]">
                    <div className="text-[#22c55e] font-mono text-xs mb-2 tracking-widest">
                      STATUS DASHBOARD
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-white font-mono text-sm">
                        <span>COVERAGE</span>
                        <span>₹150/week</span>
                      </div>
                      <div className="flex justify-between text-white font-mono text-sm">
                        <span>PAYOUTS</span>
                        <span className="text-[#22c55e]">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* ===== PROBLEM SECTION ===== */}
      <Section dark className="bg-[#2d3436]">
        <div className="space-y-12">
          <div>
            <Label className="text-white/70">THE CHALLENGE</Label>
            <h2 className="text-heading-3xl font-bold text-white mt-4 mb-2">
              Disruptions Beyond Your Control
            </h2>
            <p className="text-[#a8b2d1] text-body-base">
              Every day, unexpected weather and emergencies steal your income. Traditional insurance won't help.
            </p>
          </div>

          <Grid cols={2}>
            {[
              { icon: '🌧️', title: 'Heavy Rain', desc: 'No income during monsoons' },
              { icon: '🌊', title: 'Floods', desc: 'Natural disasters stop work' },
              { icon: '🌡️', title: 'Extreme Heat', desc: 'Hazardous conditions shut you down' },
              { icon: '⛔', title: 'Curfews', desc: 'Emergency lockdowns = zero earnings' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="text-5xl">{item.icon}</div>
                <h3 className="font-bold text-white text-lg">{item.title}</h3>
                <p className="text-[#a8b2d1] text-sm">{item.desc}</p>
              </div>
            ))}
          </Grid>
        </div>
      </Section>

      {/* ===== SOLUTION SECTION ===== */}
      <Section>
        <div className="space-y-12">
          <div>
            <Label>HOW IT WORKS</Label>
            <h2 className="text-heading-3xl font-bold text-[#2d3436] mt-4">
              Automatic Protection
            </h2>
          </div>

          <Grid cols={3}>
            {[
              { num: '01', title: '📡 AI Monitoring', desc: 'Real-time weather tracking 24/7' },
              { num: '02', title: '⚡ Auto Claims', desc: 'Instant claim generation on trigger' },
              { num: '03', title: '💰 Fast Payout', desc: 'Money in your account within 24 hours' },
            ].map((item, idx) => (
              <Card key={idx} screws>
                <div className="space-y-4">
                  <Badge variant="accent">{item.num}</Badge>
                  <h3 className="font-bold text-lg text-[#2d3436]">{item.title}</h3>
                  <p className="text-[#4a5568] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </Section>

      {/* ===== FEATURES SECTION ===== */}
      <Section className="bg-[#f0f2f5]">
        <div className="space-y-12">
          <div>
            <Label>CAPABILITIES</Label>
            <h2 className="text-heading-3xl font-bold text-[#2d3436] mt-4">
              Why Choose SmartShield?
            </h2>
          </div>

          <Grid cols={3}>
            {[
              { title: 'Weekly Plans', desc: 'Starting at ₹100/week' },
              { title: 'No Paperwork', desc: 'Claims filed automatically' },
              { title: 'AI Fraud Detection', desc: '95% accuracy built-in' },
              { title: 'Transparent Pricing', desc: 'Know exactly what you pay' },
              { title: '24/7 Support', desc: 'Always here when you need us' },
              { title: 'Multi-Coverage', desc: 'Rain, heat, floods, curfews' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#22c55e] font-bold text-lg">✓</span>
                  <h4 className="font-semibold text-[#2d3436]">{item.title}</h4>
                </div>
                <p className="text-[#4a5568] text-sm ml-6">{item.desc}</p>
              </div>
            ))}
          </Grid>
        </div>
      </Section>

      {/* ===== STATS SECTION ===== */}
      <Section dark className="bg-[#2d3436]">
        <Grid cols={3}>
          {[
            { stat: '50K+', label: 'Partners Protected' },
            { stat: '100%', label: 'Auto Claim Rate' },
            { stat: '<24h', label: 'Avg Payout Time' },
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-2">
              <div className="font-mono text-5xl font-bold text-[#ff4757]">{item.stat}</div>
              <Label className="text-white/70">{item.label}</Label>
            </div>
          ))}
        </Grid>
      </Section>

      {/* ===== FINAL CTA ===== */}
      <Section>
        <div className="text-center space-y-8">
          <HeroText size="xl">Ready to Secure Your Future?</HeroText>
          <p className="text-body-lg text-[#4a5568] max-w-lg mx-auto">
            Join thousands of delivery partners already protected. 
            Set up takes less than 2 minutes.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Start Protection Now
            </Button>
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/policies')}
            >
              View All Plans
            </Button>
          </div>
        </div>
      </Section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#2d3436] text-[#a8b2d1] border-t-2 border-[#babecc]">
        <div className="max-w-prose mx-auto px-6 py-12 text-center">
          <p className="font-mono text-sm tracking-widest mb-4">
            © 2024 SMARTSHIELD INSURANCE SYSTEMS
          </p>
          <div className="flex gap-8 justify-center text-sm">
            <a href="#privacy" className="hover:text-[#ff4757] transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-[#ff4757] transition-colors">Terms</a>
            <a href="#contact" className="hover:text-[#ff4757] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
