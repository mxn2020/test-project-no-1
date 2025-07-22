// src/pages/Landing.tsx

import React, { useState, useEffect } from 'react';
import { Database, Zap, Code, Globe, Users, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container, Button, Card, CardContent, Badge, Header, Nav, Section, Span, H1, H2, P, Div, Footer } from '../lib/dev-container';
import { useAuth } from '../components/auth/AuthProvider';
import type { ComponentRegistryId } from '../registry/componentRegistry';

// Helper functions to ensure type safety for dynamic IDs
const getStatCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['stat-card-0', 'stat-card-1', 'stat-card-2', 'stat-card-3'];
  return ids[index] || 'noID';
};

const getFeatureCardId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['feature-card-0', 'feature-card-1', 'feature-card-2', 'feature-card-3'];
  return ids[index] || 'noID';
};

const getTechLetterId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['tech-letter-0', 'tech-letter-1', 'tech-letter-2', 'tech-letter-3', 'tech-letter-4', 'tech-letter-5'];
  return ids[index] || 'noID';
};

const getTechBadgeId = (index: number): ComponentRegistryId => {
  const ids: ComponentRegistryId[] = ['tech-badge-0', 'tech-badge-1', 'tech-badge-2', 'tech-badge-3', 'tech-badge-4', 'tech-badge-5'];
  return ids[index] || 'noID';
};

export const Landing: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Lightning Fast",
      description: "Built with Vite for instant hot module replacement and blazing fast builds"
    },
    {
      icon: <Database className="w-8 h-8 text-green-500" />,
      title: "MongoDB + Prisma",
      description: "Type-safe database access with MongoDB flexibility and Prisma's developer experience"
    },
    {
      icon: <Code className="w-8 h-8 text-blue-500" />,
      title: "TypeScript Ready",
      description: "Full TypeScript support with strict type checking and IntelliSense"
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-500" />,
      title: "Deploy Anywhere",
      description: "Ready for Netlify, Vercel, or any modern hosting platform"
    }
  ];

  const stats = [
    { label: "Build Time", value: "< 2s" },
    { label: "Bundle Size", value: "< 50KB" },
    { label: "TypeScript", value: "100%" },
    { label: "Performance", value: "A+" }
  ];

  return (
    <Container componentId="landing-page-root"> {/* Changed to direct ID */}
      <Div 
        devId="main-wrapper" 
        devName="Main Wrapper" 
        devDescription="Main page wrapper with gradient background"
        className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
      {/* Header */}
      <Header 
        devId="main-header" 
        devName="Main Header" 
        devDescription="Primary site header with navigation"
        className="container mx-auto px-4 py-6"
      >
        <Nav 
          devId="main-nav" 
          devName="Main Navigation" 
          devDescription="Primary navigation bar"
          className="flex items-center justify-between"
        >
          <Div 
            devId="logo-section" 
            devName="Logo Section" 
            devDescription="Company logo and brand name"
            className="flex items-center space-x-2"
          >
            <Div devId="noID" className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </Div>
            <Span 
              devId="brand-name" 
              devName="Brand Name" 
              devDescription="Geenius Template brand name"
              className="text-xl font-bold text-white"
            >
              Geenius Template
            </Span>
          </Div>
          <Div 
            devId="nav-actions" 
            devName="Navigation Actions" 
            devDescription="Navigation buttons and user menu"
            className="flex items-center space-x-4"
          >
            <Button 
              devId="docs-button" 
              devName="Docs Button" 
              devDescription="Link to documentation"
              variant="ghost" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Docs
            </Button>
            {isAuthenticated ? (
              <Div 
                devId="user-section" 
                devName="User Section" 
                devDescription="Authenticated user welcome area"
                className="flex items-center space-x-4"
              >
                <Span 
                  devId="welcome-message" 
                  devName="Welcome Message" 
                  devDescription="Welcome message for authenticated user"
                  className="text-gray-300"
                >
                  Welcome, {user?.name?.split(' ')[0]}!
                </Span>
                <Link to="/dashboard">
                  <Button 
                    devId="nav-dashboard-button"
                    devName="Navigation Dashboard Button"
                    devDescription="Dashboard button in navigation header for authenticated users"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              </Div>
            ) : (
              <Div 
                devId="auth-buttons" 
                devName="Authentication Buttons" 
                devDescription="Login and register buttons for unauthenticated users"
                className="flex items-center space-x-2"
              >
                <Link to="/login">
                  <Button 
                    devId="nav-login-button"
                    devName="Navigation Login Button"
                    devDescription="Login button in navigation header"
                    variant="ghost" 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    devId="nav-register-button"
                    devName="Navigation Register Button"
                    devDescription="Get started button in navigation header"
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Get Started
                  </Button>
                </Link>
              </Div>
            )}
          </Div>
        </Nav>
      </Header>

      {/* Hero Section */}
      <Container componentId="hero-section"> {/* Changed to direct ID */}
        <Section 
          devId="hero-content" 
          devName="Hero Content" 
          devDescription="Main hero Section with title and call-to-action"
          className="container mx-auto px-4 py-20 text-center"
        >
          <Div 
            devId="hero-content-wrapper" 
            devName="Hero Content Wrapper" 
            devDescription="Animated wrapper for hero content"
            className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <H1 
              devId="hero-title" 
              devName="Hero Title" 
              devDescription="Main hero title showcasing the tech stack"
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Vite + React + 
              <Span 
                devId="mongodb-highlight" 
                devName="MongoDB Highlight" 
                devDescription="Highlighted MongoDB text in gradient"
                className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              >
                {' '}MongoDB
              </Span>
            </H1>
            <P 
              devId="hero-description" 
              devName="Hero Description" 
              devDescription="Hero Section description explaining the template benefits"
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              Modern full-stack template with lightning-fast development, type-safe database access, 
              and production-ready deployment configuration.
            </P>
            <Div 
              devId="hero-cta-buttons" 
              devName="Hero CTA Buttons" 
              devDescription="Call-to-action buttons in hero Section"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button 
                    devId="hero-start-building"
                    devName="Start Building Button"
                    devDescription="Primary call-to-action button for starting to build with the template"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to="/register">
                  <Button 
                    devId="hero-start-building"
                    devName="Start Building Button"
                    devDescription="Primary call-to-action button for starting to build with the template"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    Start Building
                  </Button>
                </Link>
              )}
              <Button 
                devId="hero-github-button"
                devName="View on GitHub Button"
                devDescription="Secondary button to view the project on GitHub"
                variant="outline"
                className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                View on GitHub
              </Button>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Stats Section */}
      <Container componentId="stats-section"> {/* Changed to direct ID */}
        <Section 
          devId="stats-content" 
          devName="Stats Content" 
          devDescription="Statistics Section showing performance metrics"
          className="container mx-auto px-4 py-12"
        >
          <Div 
            devId="stats-grid" 
            devName="Stats Grid" 
            devDescription="Grid container for statistics cards"
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                devId={getStatCardId(index)}
                devName={`${stat.label} Stat Card`}
                devDescription={`Statistical card showing ${stat.label}: ${stat.value}`}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10"
              >
                <CardContent devId="noID"  className="p-0">
                  <Div devId="noID" className="text-2xl font-bold text-white mb-2">{stat.value}</Div>
                  <Div devId="noID" className="text-gray-400">{stat.label}</Div>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Features Section */}
      <Container componentId="features-section"> {/* Changed to direct ID */}
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-white mb-4">Why Choose This Template?</H2>
            <P devId="noID" className="text-gray-300 max-w-2xl mx-auto">
              Everything you need to build modern web applications with the latest technologies
            </P>
          </Div>
          <Div devId="noID" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                devId={getFeatureCardId(index)}
                devName={`${feature.title} Feature Card`}
                devDescription={`Feature card highlighting ${feature.title}: ${feature.description}`}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
              >
                <CardContent devId="noID" className="p-0">
                  <Div devId="noID" className="mb-4">{feature.icon}</Div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <P devId="noID" className="text-gray-400">{feature.description}</P>
                </CardContent>
              </Card>
            ))}
          </Div>
        </Section>
      </Container>

      {/* Tech Stack Section */}
      <Container componentId="tech-stack-section"> {/* Changed to direct ID */}
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="text-center mb-16">
            <H2 devId="noID" className="text-4xl font-bold text-white mb-4">Modern Tech Stack</H2>
            <P devId="noID" className="text-gray-300 max-w-2xl mx-auto">
              Built with the most popular and reliable technologies
            </P>
          </Div>
          <Div devId="noID" className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {[
              { name: "Vite", color: "from-yellow-400 to-orange-500" },
              { name: "React", color: "from-blue-400 to-cyan-400" },
              { name: "TypeScript", color: "from-blue-500 to-blue-600" },
              { name: "MongoDB", color: "from-green-400 to-green-500" },
              { name: "Prisma", color: "from-purple-400 to-purple-500" },
              { name: "Tailwind", color: "from-teal-400 to-teal-500" }
            ].map((tech, index) => (
              <Div key={index} devId="noID" className="text-center">
                <Div devId={getTechLetterId(index)} className={`w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{tech.name[0]}</span>
                </Div>
                <Badge 
                  devId={getTechBadgeId(index)}
                  devName={`${tech.name} Technology Badge`}
                  devDescription={`Technology badge for ${tech.name}`}
                  className="text-gray-300 font-medium bg-transparent border-none"
                >
                  {tech.name}
                </Badge>
              </Div>
            ))}
          </Div>
        </Section>
      </Container>

      {/* CTA Section */}
      <Container componentId="cta-section"> {/* Changed to direct ID */}
        <Section devId="noID" className="container mx-auto px-4 py-20">
          <Div devId="noID" className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-12 text-center border border-purple-500/30">
            <H2 devId="noID" className="text-4xl font-bold text-white mb-4">Ready to Build Something Amazing?</H2>
            <P devId="noID" className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get started with this template and build your next project with confidence
            </P>
            <Div devId="noID" className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                devId="cta-start-project"
                devName="Start Project Button"
                devDescription="Primary CTA button to start a new project"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Start Project
                </span>
              </Button>
              <Button 
                devId="cta-join-community"
                devName="Join Community Button"
                devDescription="Secondary CTA button to join the community"
                variant="outline"
                className="border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                <span className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Join Community
                </span>
              </Button>
            </Div>
          </Div>
        </Section>
      </Container>

      {/* Footer */}
      <Footer 
        devId="main-footer" 
        devName="Main Footer" 
        devDescription="Site footer with links and copyright"
        className="container mx-auto px-4 py-8 border-t border-white/10"
      >
        <Div devId="noID" className="flex flex-col md:flex-row justify-between items-center">
          <Div devId="noID" className="text-gray-400 mb-4 md:mb-0">
            © 2024 Geenius Template. Built with ❤️ for developers.
          </Div>
          <Div devId="noID" className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
          </Div>
        </Div>
      </Footer>
      </Div>
    </Container>
  );
};