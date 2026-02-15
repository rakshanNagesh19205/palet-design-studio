// Template-specific content for page previews

export interface TemplateContent {
  logo: string;
  navLinks: string[];
  cta: string;
  home: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    sectionTitle: string;
    features: { title: string; desc: string }[];
    closingHeadline: string;
    closingCta: string;
  };
  features: {
    headline: string;
    subtitle: string;
    items: { title: string; desc: string }[];
  };
  pricing: {
    headline: string;
    subtitle: string;
    plans: { name: string; price: string; features: string[] }[];
  };
  about: {
    headline: string;
    body: string;
    stats: { label: string; value: string }[];
  };
  contact: {
    headline: string;
    subtitle: string;
    fields: string[];
  };
}

const TEMPLATES: Record<string, TemplateContent> = {
  saas: {
    logo: 'Acme',
    navLinks: ['Features', 'Pricing', 'About'],
    cta: 'Start Free Trial',
    home: {
      headline: 'Ship faster with the right tools',
      subheadline: 'Everything you need to build, deploy, and scale your product — all in one platform.',
      primaryCta: 'Start Free Trial',
      secondaryCta: 'View Demo',
      sectionTitle: 'Everything you need',
      features: [
        { title: 'Analytics', desc: 'Real-time insights into your product performance and user behavior.' },
        { title: 'Automation', desc: 'Streamline workflows with powerful automation rules and triggers.' },
        { title: 'Integrations', desc: 'Connect with 100+ tools you already use every day.' },
      ],
      closingHeadline: 'Ready to get started?',
      closingCta: 'Start Building Free',
    },
    features: {
      headline: 'Powerful features for modern teams',
      subtitle: 'Built for speed, designed for scale.',
      items: [
        { title: 'Real-time Analytics', desc: 'Track every metric that matters with live dashboards.' },
        { title: 'Team Collaboration', desc: 'Work together seamlessly with shared workspaces.' },
        { title: 'API Access', desc: 'Full REST and GraphQL APIs for custom integrations.' },
        { title: 'Security First', desc: 'SOC 2 compliant with end-to-end encryption.' },
        { title: 'Custom Workflows', desc: 'Automate repetitive tasks with visual builders.' },
        { title: '24/7 Support', desc: 'Expert help whenever you need it.' },
      ],
    },
    pricing: {
      headline: 'Simple, transparent pricing',
      subtitle: 'No hidden fees. Cancel anytime.',
      plans: [
        { name: 'Starter', price: '$9', features: ['5 projects', '10GB storage', 'Email support'] },
        { name: 'Pro', price: '$29', features: ['Unlimited projects', '100GB storage', 'Priority support', 'API access'] },
        { name: 'Enterprise', price: 'Custom', features: ['Everything in Pro', 'Dedicated account manager', 'Custom SLA', 'SSO'] },
      ],
    },
    about: {
      headline: 'Our mission is to empower builders',
      body: 'We started in 2020 with a simple idea: make building software accessible to everyone. Today, thousands of teams rely on our platform daily.',
      stats: [{ label: 'Customers', value: '10K+' }, { label: 'Countries', value: '80+' }, { label: 'Uptime', value: '99.9%' }],
    },
    contact: {
      headline: 'Get in touch',
      subtitle: 'Have questions? We\'d love to hear from you.',
      fields: ['Name', 'Email', 'Company', 'Message'],
    },
  },
  portfolio: {
    logo: 'Studio',
    navLinks: ['Work', 'About', 'Contact'],
    cta: 'Hire Me',
    home: {
      headline: 'Design that tells stories',
      subheadline: 'Creative direction, brand identity, and digital experiences that resonate.',
      primaryCta: 'View Work',
      secondaryCta: 'About Me',
      sectionTitle: 'Selected Projects',
      features: [
        { title: 'Brand Refresh', desc: 'Complete visual identity for a growing fintech startup.' },
        { title: 'Web Experience', desc: 'Interactive portfolio site for an architecture firm.' },
        { title: 'Mobile App', desc: 'UI/UX design for a wellness tracking application.' },
      ],
      closingHeadline: 'Let\'s create something together',
      closingCta: 'Start a Project',
    },
    features: {
      headline: 'Selected work',
      subtitle: 'A curated collection of recent projects.',
      items: [
        { title: 'Nexus Rebrand', desc: 'Full brand identity system for a tech company.' },
        { title: 'Flow App', desc: 'Mobile-first productivity app design.' },
        { title: 'Artisan Website', desc: 'E-commerce experience for handcrafted goods.' },
        { title: 'Summit Conference', desc: 'Event branding and digital collateral.' },
        { title: 'Pulse Dashboard', desc: 'Data visualization and analytics interface.' },
        { title: 'Harmony Music', desc: 'Streaming platform redesign.' },
      ],
    },
    pricing: {
      headline: 'Services & Rates',
      subtitle: 'Flexible engagement models for every project.',
      plans: [
        { name: 'Consultation', price: '$150/hr', features: ['Brand audit', 'Design review', 'Strategy session'] },
        { name: 'Project', price: 'From $5K', features: ['Full design', 'Revisions', 'Source files', 'Style guide'] },
        { name: 'Retainer', price: '$4K/mo', features: ['Ongoing design', 'Priority support', 'Monthly review', 'Unlimited requests'] },
      ],
    },
    about: {
      headline: 'The story behind the work',
      body: 'With 8 years of experience in digital design, I help brands find their visual voice and create experiences people remember.',
      stats: [{ label: 'Projects', value: '120+' }, { label: 'Clients', value: '45+' }, { label: 'Awards', value: '12' }],
    },
    contact: {
      headline: 'Let\'s talk',
      subtitle: 'Tell me about your project and I\'ll get back to you within 24 hours.',
      fields: ['Name', 'Email', 'Project Type', 'Message'],
    },
  },
  ecommerce: {
    logo: 'Shop',
    navLinks: ['Products', 'Collections', 'About'],
    cta: 'Shop Now',
    home: {
      headline: 'Crafted for everyday life',
      subheadline: 'Thoughtfully designed products that blend form and function.',
      primaryCta: 'Shop Collection',
      secondaryCta: 'Our Story',
      sectionTitle: 'Best Sellers',
      features: [
        { title: 'Essential Tee', desc: 'Premium cotton, perfect fit. Available in 8 colors.' },
        { title: 'Everyday Bag', desc: 'Water-resistant canvas with leather accents.' },
        { title: 'Classic Watch', desc: 'Minimalist design with Swiss movement.' },
      ],
      closingHeadline: 'Free shipping on orders over $75',
      closingCta: 'Start Shopping',
    },
    features: {
      headline: 'Our Products',
      subtitle: 'Quality materials, timeless design.',
      items: [
        { title: 'Apparel', desc: 'Premium basics and seasonal collections.' },
        { title: 'Accessories', desc: 'Bags, wallets, and everyday essentials.' },
        { title: 'Home', desc: 'Thoughtful objects for your living space.' },
        { title: 'Limited Editions', desc: 'Exclusive collaborations and small batches.' },
        { title: 'Gift Sets', desc: 'Curated bundles for every occasion.' },
        { title: 'Sale', desc: 'Great finds at reduced prices.' },
      ],
    },
    pricing: {
      headline: 'Membership Plans',
      subtitle: 'Join for exclusive access and savings.',
      plans: [
        { name: 'Basic', price: 'Free', features: ['Early access', 'Newsletter', 'Birthday discount'] },
        { name: 'Premium', price: '$9.99/mo', features: ['15% off everything', 'Free shipping', 'Exclusive drops', 'Priority support'] },
        { name: 'VIP', price: '$24.99/mo', features: ['25% off everything', 'Free express shipping', 'Personal stylist', 'Private events'] },
      ],
    },
    about: {
      headline: 'Made with intention',
      body: 'We believe in creating products that last — using sustainable materials and ethical manufacturing practices.',
      stats: [{ label: 'Products', value: '200+' }, { label: 'Countries', value: '30+' }, { label: 'Happy Customers', value: '50K+' }],
    },
    contact: {
      headline: 'Customer Support',
      subtitle: 'We\'re here to help with orders, returns, and more.',
      fields: ['Name', 'Email', 'Order Number', 'Message'],
    },
  },
  agency: {
    logo: 'Agency',
    navLinks: ['Work', 'Services', 'About'],
    cta: 'Get a Quote',
    home: {
      headline: 'We build brands that matter',
      subheadline: 'Strategy, design, and technology to grow your business.',
      primaryCta: 'See Our Work',
      secondaryCta: 'Our Process',
      sectionTitle: 'What We Do',
      features: [
        { title: 'Brand Strategy', desc: 'Define your market position and brand architecture.' },
        { title: 'Digital Design', desc: 'Websites, apps, and digital experiences that convert.' },
        { title: 'Development', desc: 'Scalable solutions built with modern technologies.' },
      ],
      closingHeadline: 'Let\'s build something great',
      closingCta: 'Start a Project',
    },
    features: { headline: 'Our Services', subtitle: 'End-to-end solutions for ambitious brands.', items: [{ title: 'Branding', desc: 'Visual identity and brand systems.' }, { title: 'Web Design', desc: 'Conversion-focused websites.' }, { title: 'Development', desc: 'Custom web applications.' }, { title: 'Marketing', desc: 'Growth strategy and campaigns.' }, { title: 'Content', desc: 'Copywriting and content strategy.' }, { title: 'Analytics', desc: 'Data-driven optimization.' }] },
    pricing: { headline: 'Engagement Models', subtitle: 'Flexible options for every budget.', plans: [{ name: 'Sprint', price: '$15K', features: ['4-week project', 'Defined scope', 'Full delivery'] }, { name: 'Partnership', price: '$8K/mo', features: ['Ongoing work', 'Dedicated team', 'Monthly planning'] }, { name: 'Enterprise', price: 'Custom', features: ['Full-service', 'Multi-team', 'Strategic planning'] }] },
    about: { headline: 'A team that cares about craft', body: 'Founded in 2018, we\'re a team of 25 designers, developers, and strategists building digital experiences.', stats: [{ label: 'Team', value: '25' }, { label: 'Projects', value: '200+' }, { label: 'Industries', value: '15+' }] },
    contact: { headline: 'Start a conversation', subtitle: 'Tell us about your project goals.', fields: ['Name', 'Email', 'Budget Range', 'Message'] },
  },
  blog: {
    logo: 'The Edit',
    navLinks: ['Articles', 'Topics', 'About'],
    cta: 'Subscribe',
    home: {
      headline: 'Stories worth reading',
      subheadline: 'Thoughtful writing on design, technology, and culture.',
      primaryCta: 'Read Latest',
      secondaryCta: 'Subscribe',
      sectionTitle: 'Recent Articles',
      features: [
        { title: 'The Future of Design Systems', desc: 'How component-driven development is changing the way we build.' },
        { title: 'Remote Work, Two Years In', desc: 'Lessons learned from building a distributed team.' },
        { title: 'Simplicity as a Feature', desc: 'Why the best products do less, not more.' },
      ],
      closingHeadline: 'Never miss a post',
      closingCta: 'Subscribe Free',
    },
    features: { headline: 'All Articles', subtitle: 'Browse our complete archive.', items: [{ title: 'Design', desc: 'Visual thinking and creative process.' }, { title: 'Technology', desc: 'Tools, frameworks, and development.' }, { title: 'Culture', desc: 'Work, life, and everything between.' }, { title: 'Business', desc: 'Strategy and entrepreneurship.' }, { title: 'Interviews', desc: 'Conversations with makers.' }, { title: 'Tutorials', desc: 'Step-by-step guides.' }] },
    pricing: { headline: 'Support Our Work', subtitle: 'Keep independent writing alive.', plans: [{ name: 'Free', price: '$0', features: ['Weekly newsletter', 'Public articles', 'RSS feed'] }, { name: 'Member', price: '$5/mo', features: ['All articles', 'No ads', 'Community access', 'Early access'] }, { name: 'Patron', price: '$15/mo', features: ['Everything in Member', 'Behind the scenes', 'Direct access', 'Annual book'] }] },
    about: { headline: 'About The Edit', body: 'Started as a personal blog in 2019, The Edit has grown into a community of curious readers and thinkers.', stats: [{ label: 'Articles', value: '350+' }, { label: 'Readers', value: '25K' }, { label: 'Newsletter', value: '8K' }] },
    contact: { headline: 'Say hello', subtitle: 'Pitch a story, give feedback, or just say hi.', fields: ['Name', 'Email', 'Subject', 'Message'] },
  },
  restaurant: {
    logo: 'Bistro',
    navLinks: ['Menu', 'About', 'Reserve'],
    cta: 'Book a Table',
    home: {
      headline: 'Farm to table, every day',
      subheadline: 'Seasonal ingredients, honest cooking, warm hospitality.',
      primaryCta: 'View Menu',
      secondaryCta: 'Make a Reservation',
      sectionTitle: 'From Our Kitchen',
      features: [
        { title: 'Seasonal Menu', desc: 'Dishes crafted from locally sourced ingredients.' },
        { title: 'Wine Selection', desc: 'Curated wines from boutique vineyards.' },
        { title: 'Private Dining', desc: 'Intimate spaces for special occasions.' },
      ],
      closingHeadline: 'Join us for dinner',
      closingCta: 'Reserve a Table',
    },
    features: { headline: 'Our Menu', subtitle: 'Fresh, seasonal, local.', items: [{ title: 'Starters', desc: 'Light bites and appetizers.' }, { title: 'Mains', desc: 'Signature dishes and classics.' }, { title: 'Desserts', desc: 'Sweet endings to your meal.' }, { title: 'Wine', desc: 'Curated selection by the glass.' }, { title: 'Cocktails', desc: 'Handcrafted seasonal drinks.' }, { title: 'Kids', desc: 'Smaller portions, big flavors.' }] },
    pricing: { headline: 'Dining Experiences', subtitle: 'Special menus for special occasions.', plans: [{ name: 'Lunch Set', price: '$35', features: ['2 courses', 'Bread & butter', 'Coffee'] }, { name: 'Tasting Menu', price: '$85', features: ['5 courses', 'Wine pairing', 'Amuse-bouche', 'Petit fours'] }, { name: 'Private Event', price: 'Custom', features: ['Custom menu', 'Dedicated space', 'Personal chef', 'Full bar'] }] },
    about: { headline: 'Our story', body: 'Chef Maria opened Bistro in 2017 with a dream of bringing honest, seasonal cooking to the neighborhood.', stats: [{ label: 'Years', value: '7' }, { label: 'Dishes Served', value: '500K+' }, { label: 'Rating', value: '4.8★' }] },
    contact: { headline: 'Visit us', subtitle: '123 Main Street · Open Tue–Sun, 5pm–11pm', fields: ['Name', 'Email', 'Date', 'Party Size'] },
  },
  event: {
    logo: 'Summit',
    navLinks: ['Schedule', 'Speakers', 'Tickets'],
    cta: 'Get Tickets',
    home: {
      headline: 'Where ideas converge',
      subheadline: 'Three days of talks, workshops, and networking with industry leaders.',
      primaryCta: 'Get Tickets',
      secondaryCta: 'View Schedule',
      sectionTitle: 'Featured Speakers',
      features: [
        { title: 'Sarah Chen', desc: 'CEO of TechFlow — "The Future of AI in Design"' },
        { title: 'Marcus Rivera', desc: 'VP Engineering at Scale — "Building for Billions"' },
        { title: 'Aisha Patel', desc: 'Founder of Bloom — "Sustainable Tech"' },
      ],
      closingHeadline: 'Early bird pricing ends soon',
      closingCta: 'Register Now',
    },
    features: { headline: 'Schedule', subtitle: 'Three days of talks, workshops, and networking.', items: [{ title: 'Day 1: Vision', desc: 'Keynotes and big-picture talks.' }, { title: 'Day 2: Build', desc: 'Hands-on workshops and demos.' }, { title: 'Day 3: Connect', desc: 'Networking and panels.' }, { title: 'Workshops', desc: 'Deep-dive technical sessions.' }, { title: 'Panels', desc: 'Industry expert discussions.' }, { title: 'After Hours', desc: 'Evening socials and events.' }] },
    pricing: { headline: 'Tickets', subtitle: 'Secure your spot today.', plans: [{ name: 'General', price: '$299', features: ['All talks', 'Lunch included', 'Swag bag'] }, { name: 'VIP', price: '$599', features: ['Front row', 'Speaker dinner', 'Workshop access', 'Recordings'] }, { name: 'Team (5+)', price: '$249/ea', features: ['Group seating', 'Team lounge', 'All VIP perks', 'Custom badges'] }] },
    about: { headline: 'About Summit', body: 'Now in its 5th year, Summit brings together 2,000+ professionals for three days of learning and connection.', stats: [{ label: 'Attendees', value: '2K+' }, { label: 'Speakers', value: '40+' }, { label: 'Workshops', value: '20' }] },
    contact: { headline: 'Questions?', subtitle: 'Our team is ready to help with registration and logistics.', fields: ['Name', 'Email', 'Company', 'Question'] },
  },
  education: {
    logo: 'Learn',
    navLinks: ['Courses', 'Paths', 'About'],
    cta: 'Enroll Now',
    home: {
      headline: 'Master new skills, on your schedule',
      subheadline: 'Expert-led courses in design, development, and business.',
      primaryCta: 'Browse Courses',
      secondaryCta: 'Free Trial',
      sectionTitle: 'Popular Courses',
      features: [
        { title: 'Design Foundations', desc: 'Learn the principles of great visual design.' },
        { title: 'Web Development', desc: 'Build modern websites from scratch.' },
        { title: 'Data Science', desc: 'Turn data into actionable insights.' },
      ],
      closingHeadline: 'Start learning today',
      closingCta: 'Get Started Free',
    },
    features: { headline: 'Course Catalog', subtitle: 'Find the right course for your goals.', items: [{ title: 'Design', desc: 'UI/UX, branding, and visual design.' }, { title: 'Development', desc: 'Frontend, backend, and full-stack.' }, { title: 'Data', desc: 'Analytics, ML, and data engineering.' }, { title: 'Business', desc: 'Strategy, marketing, and leadership.' }, { title: 'Creative', desc: 'Writing, photography, and video.' }, { title: 'Career', desc: 'Interview prep and portfolio building.' }] },
    pricing: { headline: 'Plans', subtitle: 'Invest in your future.', plans: [{ name: 'Single Course', price: '$49', features: ['Lifetime access', 'Certificate', 'Community'] }, { name: 'All Access', price: '$19/mo', features: ['All courses', 'New releases', 'Projects', 'Mentorship'] }, { name: 'Teams', price: '$15/user/mo', features: ['Admin dashboard', 'Progress tracking', 'Custom paths', 'Invoicing'] }] },
    about: { headline: 'Learning that works', body: 'We believe in practical, project-based education that gives you real skills for real careers.', stats: [{ label: 'Students', value: '100K+' }, { label: 'Courses', value: '200+' }, { label: 'Completion Rate', value: '87%' }] },
    contact: { headline: 'Need help?', subtitle: 'Our team can help you find the right course or plan.', fields: ['Name', 'Email', 'Interest Area', 'Message'] },
  },
  personal: {
    logo: 'Alex',
    navLinks: ['Work', 'Blog', 'Contact'],
    cta: 'Say Hello',
    home: {
      headline: 'Designer, developer, maker',
      subheadline: 'I build digital products and write about the process.',
      primaryCta: 'View Work',
      secondaryCta: 'Read Blog',
      sectionTitle: 'Recent Work',
      features: [
        { title: 'Design System', desc: 'Built a component library used by 50+ developers.' },
        { title: 'Mobile App', desc: 'Designed and shipped a fitness tracking app.' },
        { title: 'Open Source', desc: 'Created a CLI tool with 2K+ GitHub stars.' },
      ],
      closingHeadline: 'Let\'s work together',
      closingCta: 'Get in Touch',
    },
    features: { headline: 'Portfolio', subtitle: 'Things I\'ve designed and built.', items: [{ title: 'Aura Design System', desc: 'Enterprise component library.' }, { title: 'FitTrack App', desc: 'Mobile fitness application.' }, { title: 'DevTools CLI', desc: 'Developer productivity tools.' }, { title: 'Brand Identity', desc: 'Visual identity for startups.' }, { title: 'Dashboard UI', desc: 'Analytics dashboard design.' }, { title: 'Marketing Site', desc: 'Landing page for a SaaS product.' }] },
    pricing: { headline: 'Services', subtitle: 'Available for freelance and consulting.', plans: [{ name: 'Consulting', price: '$175/hr', features: ['Design review', 'Technical advice', 'Strategy session'] }, { name: 'Project', price: 'From $8K', features: ['Full design & dev', 'Source code', '30-day support'] }, { name: 'Ongoing', price: '$6K/mo', features: ['Dedicated hours', 'Slack access', 'Priority scheduling', 'Weekly sync'] }] },
    about: { headline: 'Hey, I\'m Alex', body: 'I\'m a multidisciplinary designer and developer based in San Francisco. I love building things that are both beautiful and functional.', stats: [{ label: 'Experience', value: '10+ yrs' }, { label: 'Projects', value: '80+' }, { label: 'Coffee/day', value: '3 cups' }] },
    contact: { headline: 'Say hello', subtitle: 'I\'m always open to interesting conversations and projects.', fields: ['Name', 'Email', 'Project Type', 'Message'] },
  },
  nonprofit: {
    logo: 'Impact',
    navLinks: ['Programs', 'About', 'Donate'],
    cta: 'Donate Now',
    home: {
      headline: 'Together, we create change',
      subheadline: 'Empowering communities through education, health, and sustainability.',
      primaryCta: 'Donate Now',
      secondaryCta: 'Our Programs',
      sectionTitle: 'Our Impact',
      features: [
        { title: 'Education', desc: 'Provided scholarships to 5,000+ students.' },
        { title: 'Health', desc: 'Built 12 clinics in underserved communities.' },
        { title: 'Environment', desc: 'Planted 1 million trees across 3 continents.' },
      ],
      closingHeadline: 'Every dollar makes a difference',
      closingCta: 'Give Today',
    },
    features: { headline: 'Our Programs', subtitle: 'Making a measurable difference.', items: [{ title: 'Scholarships', desc: 'Education access for all.' }, { title: 'Health Clinics', desc: 'Community healthcare.' }, { title: 'Clean Water', desc: 'Safe water initiatives.' }, { title: 'Reforestation', desc: 'Environmental restoration.' }, { title: 'Microloans', desc: 'Small business support.' }, { title: 'Youth Programs', desc: 'Skills and mentorship.' }] },
    pricing: { headline: 'Ways to Give', subtitle: 'Support the cause that matters to you.', plans: [{ name: 'One-Time', price: '$25+', features: ['Tax deductible', 'Impact report', 'Thank you card'] }, { name: 'Monthly', price: '$10/mo', features: ['Sustained impact', 'Quarterly updates', 'Donor community'] }, { name: 'Corporate', price: 'Custom', features: ['Matching gifts', 'Team volunteering', 'Brand partnership', 'Annual report'] }] },
    about: { headline: 'Our mission', body: 'Founded in 2015, we work with local partners to create lasting change in communities around the world.', stats: [{ label: 'Lives Impacted', value: '100K+' }, { label: 'Countries', value: '12' }, { label: 'Donated', value: '$5M+' }] },
    contact: { headline: 'Get involved', subtitle: 'Volunteer, partner, or just say hello.', fields: ['Name', 'Email', 'Interest', 'Message'] },
  },
  realestate: {
    logo: 'Homes',
    navLinks: ['Listings', 'Agents', 'About'],
    cta: 'Find a Home',
    home: {
      headline: 'Find your perfect home',
      subheadline: 'Browse thousands of listings and connect with top agents in your area.',
      primaryCta: 'Browse Listings',
      secondaryCta: 'Talk to an Agent',
      sectionTitle: 'Featured Properties',
      features: [
        { title: 'Modern Loft', desc: '2BR/2BA · Downtown · $450,000' },
        { title: 'Family Home', desc: '4BR/3BA · Suburbs · $680,000' },
        { title: 'Beachfront Condo', desc: '1BR/1BA · Oceanview · $320,000' },
      ],
      closingHeadline: 'Your dream home is waiting',
      closingCta: 'Start Your Search',
    },
    features: { headline: 'Browse Listings', subtitle: 'Properties in your area.', items: [{ title: 'For Sale', desc: 'Homes, condos, and townhouses.' }, { title: 'For Rent', desc: 'Apartments and rental homes.' }, { title: 'New Construction', desc: 'Brand new developments.' }, { title: 'Luxury', desc: 'Premium properties.' }, { title: 'Commercial', desc: 'Office and retail spaces.' }, { title: 'Land', desc: 'Buildable lots and acreage.' }] },
    pricing: { headline: 'Agent Plans', subtitle: 'Tools for real estate professionals.', plans: [{ name: 'Basic', price: '$49/mo', features: ['10 listings', 'Lead capture', 'Basic analytics'] }, { name: 'Professional', price: '$99/mo', features: ['Unlimited listings', 'CRM', 'Market reports', 'Priority support'] }, { name: 'Brokerage', price: '$249/mo', features: ['Multi-agent', 'Custom branding', 'IDX integration', 'Training'] }] },
    about: { headline: 'Real estate, reimagined', body: 'We\'re using technology to make buying and selling homes simpler, faster, and more transparent.', stats: [{ label: 'Listings', value: '15K+' }, { label: 'Agents', value: '500+' }, { label: 'Homes Sold', value: '8K+' }] },
    contact: { headline: 'Contact us', subtitle: 'Let us help you find or sell your home.', fields: ['Name', 'Email', 'Phone', 'Message'] },
  },
};

export function getTemplateContent(templateId: string): TemplateContent {
  return TEMPLATES[templateId] || TEMPLATES.saas;
}
