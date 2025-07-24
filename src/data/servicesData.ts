import { 
  Building, 
  Scale, 
  Home, 
  Users, 
  Briefcase, 
  Shield, 
  FileText, 
  Gavel 
} from 'lucide-react';

export const servicesData = [
  {
    id: 'corporate-law',
    icon: Building,
    title: 'Corporate Law',
    description: 'Comprehensive corporate legal services including company formation, mergers, acquisitions, and compliance matters.',
    detailedDescription: 'Expert corporate legal services for businesses of all sizes, from startups to multinational corporations, ensuring compliance and strategic growth.',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    overview: 'Our corporate law practice provides comprehensive legal services to businesses across Kenya and East Africa. We assist companies in navigating complex regulatory environments, structuring transactions, and ensuring compliance with local and international laws. Our team has extensive experience in corporate governance, securities law, and commercial transactions.',
    headerImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Company Formation and Registration',
      'Corporate Governance and Compliance',
      'Mergers and Acquisitions',
      'Joint Ventures and Partnerships',
      'Securities and Capital Markets',
      'Corporate Restructuring',
      'Due Diligence Services',
      'Board Advisory Services',
      'Regulatory Compliance',
      'Corporate Finance',
      'Shareholder Agreements',
      'Commercial Contracts'
    ],
    whyChooseUs: [
      {
        title: 'Deep Industry Knowledge',
        description: 'Our lawyers have extensive experience across various industries including banking, telecommunications, manufacturing, and technology.'
      },
      {
        title: 'Strategic Approach',
        description: 'We provide not just legal advice but strategic business counsel to help you achieve your commercial objectives.'
      },
      {
        title: 'Regulatory Expertise',
        description: 'Stay compliant with our up-to-date knowledge of Kenyan corporate law and regulatory requirements.'
      }
    ],
    process: [
      {
        title: 'Initial Consultation',
        description: 'We begin with a comprehensive consultation to understand your business needs and objectives.'
      },
      {
        title: 'Legal Analysis',
        description: 'Our team conducts thorough legal analysis and due diligence to identify potential issues and opportunities.'
      },
      {
        title: 'Strategy Development',
        description: 'We develop a tailored legal strategy that aligns with your business goals and risk tolerance.'
      },
      {
        title: 'Implementation',
        description: 'We execute the legal strategy with precision, handling all documentation and regulatory filings.'
      },
      {
        title: 'Ongoing Support',
        description: 'We provide continuous legal support to ensure ongoing compliance and address emerging issues.'
      }
    ]
  },
  {
    id: 'commercial-litigation',
    icon: Gavel,
    title: 'Commercial Litigation',
    description: 'Expert representation in commercial disputes, contract disputes, and complex litigation matters.',
    detailedDescription: 'Aggressive and strategic litigation representation for businesses facing commercial disputes, with a track record of successful outcomes.',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    overview: 'Our commercial litigation team represents businesses in complex disputes across various industries. We combine aggressive advocacy with strategic thinking to achieve favorable outcomes for our clients. Whether through negotiation, mediation, arbitration, or trial, we are committed to protecting your business interests.',
    headerImage: 'https://images.pexels.com/photos/5668882/pexels-photo-5668882.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Contract Disputes',
      'Business Partnership Disputes',
      'Employment Litigation',
      'Intellectual Property Disputes',
      'Construction Litigation',
      'Banking and Finance Disputes',
      'Insurance Claims',
      'Debt Recovery',
      'Arbitration and Mediation',
      'Class Action Defense',
      'Regulatory Enforcement',
      'Appeals'
    ],
    whyChooseUs: [
      {
        title: 'Proven Track Record',
        description: 'Over 500 successful cases with a 98% success rate in commercial litigation matters.'
      },
      {
        title: 'Strategic Litigation',
        description: 'We develop comprehensive litigation strategies that consider both legal and business implications.'
      },
      {
        title: 'Alternative Dispute Resolution',
        description: 'Expertise in mediation and arbitration to resolve disputes efficiently and cost-effectively.'
      }
    ],
    process: [
      {
        title: 'Case Assessment',
        description: 'Comprehensive evaluation of your case merits, potential outcomes, and litigation strategy.'
      },
      {
        title: 'Pre-litigation Strategy',
        description: 'Attempt to resolve disputes through negotiation and alternative dispute resolution methods.'
      },
      {
        title: 'Litigation Preparation',
        description: 'Thorough preparation including evidence gathering, witness preparation, and legal research.'
      },
      {
        title: 'Court Representation',
        description: 'Aggressive representation in court proceedings with experienced trial lawyers.'
      },
      {
        title: 'Post-judgment Support',
        description: 'Assistance with judgment enforcement and appeals if necessary.'
      }
    ]
  },
  {
    id: 'real-estate-law',
    icon: Home,
    title: 'Real Estate Law',
    description: 'Property transactions, land disputes, conveyancing, and real estate development legal services.',
    detailedDescription: 'Comprehensive real estate legal services covering all aspects of property law, from residential transactions to large-scale developments.',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
    overview: 'Our real estate practice covers all aspects of property law in Kenya. We assist clients with residential and commercial property transactions, land disputes, development projects, and regulatory compliance. Our team has extensive experience in Kenyan land law and the complexities of property ownership and transfer.',
    headerImage: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Property Purchase and Sale',
      'Land Title Verification',
      'Conveyancing Services',
      'Lease Agreements',
      'Property Development',
      'Land Disputes Resolution',
      'Zoning and Planning Applications',
      'Environmental Compliance',
      'Property Finance',
      'Landlord-Tenant Disputes',
      'Property Management Legal Issues',
      'Real Estate Investment Structuring'
    ],
    whyChooseUs: [
      {
        title: 'Local Expertise',
        description: 'Deep understanding of Kenyan land law, local regulations, and cultural considerations.'
      },
      {
        title: 'Due Diligence Excellence',
        description: 'Thorough property searches and due diligence to protect your investment.'
      },
      {
        title: 'Development Experience',
        description: 'Extensive experience in large-scale real estate development projects across Kenya.'
      }
    ],
    process: [
      {
        title: 'Property Search',
        description: 'Comprehensive search and verification of property titles and ownership history.'
      },
      {
        title: 'Due Diligence',
        description: 'Thorough investigation of legal, financial, and regulatory aspects of the property.'
      },
      {
        title: 'Documentation',
        description: 'Preparation and review of all necessary legal documents for the transaction.'
      },
      {
        title: 'Registration',
        description: 'Handling of all registration requirements with relevant government authorities.'
      },
      {
        title: 'Post-transaction Support',
        description: 'Ongoing legal support for property management and compliance issues.'
      }
    ]
  },
  {
    id: 'employment-law',
    icon: Users,
    title: 'Employment Law',
    description: 'Employment contracts, workplace disputes, labor relations, and human resources legal guidance.',
    detailedDescription: 'Comprehensive employment law services for both employers and employees, ensuring compliance with Kenyan labor laws.',
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600',
    overview: 'Our employment law practice serves both employers and employees in navigating the complex landscape of Kenyan labor law. We provide strategic advice on employment matters, help resolve workplace disputes, and ensure compliance with evolving employment regulations.',
    headerImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Employment Contract Drafting',
      'Workplace Policy Development',
      'Disciplinary Procedures',
      'Wrongful Termination Claims',
      'Discrimination and Harassment',
      'Wage and Hour Disputes',
      'Workers\' Compensation',
      'Union Relations',
      'Employment Compliance Audits',
      'Executive Compensation',
      'Non-compete Agreements',
      'Workplace Safety Issues'
    ],
    whyChooseUs: [
      {
        title: 'Dual Perspective',
        description: 'We represent both employers and employees, giving us unique insight into all sides of employment issues.'
      },
      {
        title: 'Regulatory Knowledge',
        description: 'Up-to-date knowledge of Kenyan employment law and regulatory changes.'
      },
      {
        title: 'Practical Solutions',
        description: 'We provide practical, business-oriented solutions to employment challenges.'
      }
    ],
    process: [
      {
        title: 'Consultation',
        description: 'Initial consultation to understand the employment issue and assess legal options.'
      },
      {
        title: 'Legal Analysis',
        description: 'Thorough analysis of employment contracts, policies, and applicable laws.'
      },
      {
        title: 'Strategy Development',
        description: 'Development of a strategic approach to resolve the employment matter.'
      },
      {
        title: 'Implementation',
        description: 'Implementation of the strategy through negotiation, mediation, or litigation.'
      },
      {
        title: 'Follow-up',
        description: 'Ongoing support to ensure compliance and prevent future issues.'
      }
    ]
  },
  {
    id: 'family-law',
    icon: Briefcase,
    title: 'Family Law',
    description: 'Divorce proceedings, child custody, adoption, matrimonial property, and family dispute resolution.',
    detailedDescription: 'Compassionate and professional family law services handling sensitive matters with discretion and expertise.',
    color: 'bg-pink-50 border-pink-200',
    iconColor: 'text-pink-600',
    overview: 'Our family law practice provides compassionate and professional legal services for families going through difficult times. We handle all aspects of family law with sensitivity and discretion, always prioritizing the best interests of children and families.',
    headerImage: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Divorce and Separation',
      'Child Custody and Support',
      'Adoption Proceedings',
      'Matrimonial Property Division',
      'Prenuptial Agreements',
      'Domestic Violence Protection',
      'Guardianship Matters',
      'Paternity Issues',
      'Family Mediation',
      'International Child Abduction',
      'Succession Planning',
      'Marriage Contracts'
    ],
    whyChooseUs: [
      {
        title: 'Compassionate Approach',
        description: 'We understand the emotional challenges of family law matters and provide supportive guidance.'
      },
      {
        title: 'Child-Focused',
        description: 'We always prioritize the best interests of children in custody and support matters.'
      },
      {
        title: 'Confidential Service',
        description: 'We maintain strict confidentiality and handle sensitive matters with discretion.'
      }
    ],
    process: [
      {
        title: 'Initial Consultation',
        description: 'Confidential consultation to understand your family situation and legal needs.'
      },
      {
        title: 'Case Preparation',
        description: 'Gathering necessary documentation and evidence to support your case.'
      },
      {
        title: 'Negotiation',
        description: 'Attempting to reach amicable agreements through negotiation and mediation.'
      },
      {
        title: 'Court Proceedings',
        description: 'Professional representation in court when agreements cannot be reached.'
      },
      {
        title: 'Post-decree Support',
        description: 'Ongoing support for enforcement and modification of court orders.'
      }
    ]
  },
  {
    id: 'criminal-defense',
    icon: Shield,
    title: 'Criminal Defense',
    description: 'Experienced criminal defense representation for all types of criminal charges and investigations.',
    detailedDescription: 'Aggressive criminal defense representation protecting your rights and freedom with experienced trial lawyers.',
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    overview: 'Our criminal defense team provides aggressive representation for individuals facing criminal charges. We protect your constitutional rights and work tirelessly to achieve the best possible outcome in your case. Our experienced trial lawyers handle cases ranging from minor offenses to serious felonies.',
    headerImage: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Felony Defense',
      'Misdemeanor Defense',
      'White Collar Crime',
      'Drug Offenses',
      'Assault and Battery',
      'Theft and Fraud',
      'DUI/DWI Defense',
      'Domestic Violence',
      'Appeals',
      'Expungement',
      'Bail Hearings',
      'Pre-trial Motions'
    ],
    whyChooseUs: [
      {
        title: 'Experienced Trial Lawyers',
        description: 'Our team includes seasoned trial lawyers with extensive courtroom experience.'
      },
      {
        title: 'Constitutional Expertise',
        description: 'Deep understanding of constitutional rights and criminal procedure.'
      },
      {
        title: '24/7 Availability',
        description: 'Available around the clock for urgent criminal matters and arrests.'
      }
    ],
    process: [
      {
        title: 'Emergency Response',
        description: 'Immediate response to arrests and urgent criminal matters.'
      },
      {
        title: 'Case Investigation',
        description: 'Thorough investigation of the charges and evidence against you.'
      },
      {
        title: 'Defense Strategy',
        description: 'Development of a comprehensive defense strategy tailored to your case.'
      },
      {
        title: 'Pre-trial Motions',
        description: 'Filing of appropriate motions to suppress evidence or dismiss charges.'
      },
      {
        title: 'Trial or Plea',
        description: 'Aggressive trial representation or negotiation of favorable plea agreements.'
      }
    ]
  },
  {
    id: 'contract-law',
    icon: FileText,
    title: 'Contract Law',
    description: 'Contract drafting, review, negotiation, and dispute resolution for all types of agreements.',
    detailedDescription: 'Expert contract services ensuring your agreements are legally sound and protect your interests.',
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600',
    overview: 'Our contract law practice helps businesses and individuals create, review, and enforce agreements that protect their interests. We draft clear, enforceable contracts and provide strategic advice on contract negotiations and disputes.',
    headerImage: 'https://images.pexels.com/photos/4427430/pexels-photo-4427430.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Contract Drafting',
      'Contract Review and Analysis',
      'Contract Negotiation',
      'Breach of Contract Claims',
      'Service Agreements',
      'Supply Agreements',
      'Distribution Agreements',
      'Licensing Agreements',
      'Non-disclosure Agreements',
      'Partnership Agreements',
      'Joint Venture Agreements',
      'International Contracts'
    ],
    whyChooseUs: [
      {
        title: 'Precision Drafting',
        description: 'We draft contracts with precision to avoid ambiguity and future disputes.'
      },
      {
        title: 'Risk Management',
        description: 'Our contracts are designed to minimize risk and protect your interests.'
      },
      {
        title: 'Industry Experience',
        description: 'Experience across various industries and types of commercial agreements.'
      }
    ],
    process: [
      {
        title: 'Needs Assessment',
        description: 'Understanding your business needs and the purpose of the contract.'
      },
      {
        title: 'Drafting/Review',
        description: 'Careful drafting of new contracts or thorough review of existing agreements.'
      },
      {
        title: 'Negotiation Support',
        description: 'Strategic support during contract negotiations to achieve favorable terms.'
      },
      {
        title: 'Finalization',
        description: 'Finalizing the contract with all necessary legal protections in place.'
      },
      {
        title: 'Ongoing Support',
        description: 'Continued support for contract interpretation and enforcement issues.'
      }
    ]
  },
  {
    id: 'constitutional-law',
    icon: Scale,
    title: 'Constitutional Law',
    description: 'Constitutional matters, judicial review, human rights cases, and public interest litigation.',
    detailedDescription: 'Expert constitutional law representation protecting fundamental rights and challenging unconstitutional actions.',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600',
    overview: 'Our constitutional law practice focuses on protecting fundamental rights and challenging unconstitutional government actions. We handle complex constitutional matters, human rights cases, and public interest litigation that shapes legal precedent in Kenya.',
    headerImage: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop',
    keyServices: [
      'Constitutional Challenges',
      'Human Rights Litigation',
      'Judicial Review',
      'Public Interest Cases',
      'Civil Rights Defense',
      'Government Accountability',
      'Electoral Law',
      'Freedom of Information',
      'Due Process Violations',
      'Equal Protection Claims',
      'Religious Freedom',
      'Freedom of Expression'
    ],
    whyChooseUs: [
      {
        title: 'Constitutional Expertise',
        description: 'Deep understanding of the Kenyan Constitution and constitutional law principles.'
      },
      {
        title: 'Precedent Setting',
        description: 'Experience in landmark cases that have shaped constitutional law in Kenya.'
      },
      {
        title: 'Public Interest Focus',
        description: 'Commitment to protecting constitutional rights and serving the public interest.'
      }
    ],
    process: [
      {
        title: 'Constitutional Analysis',
        description: 'Thorough analysis of the constitutional issues and potential violations.'
      },
      {
        title: 'Case Development',
        description: 'Development of strong constitutional arguments and legal theories.'
      },
      {
        title: 'Strategic Litigation',
        description: 'Strategic approach to constitutional litigation to maximize impact.'
      },
      {
        title: 'Court Advocacy',
        description: 'Skilled advocacy before constitutional courts and appellate courts.'
      },
      {
        title: 'Impact Assessment',
        description: 'Evaluation of the broader impact and precedential value of the case.'
      }
    ]
  }
];