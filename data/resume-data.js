// Single source of truth for the resume content (works over file://)
window.RESUME_DATA = {
  header: {
    name: 'Brad Lavender',
    email: 'brs713@gmail.com'
  },
  professionalSummary: "DevOps, Platform Engineering & Infra as Code IT professional with 9+ years of experience and broad skillsets utilizing a myriad IT disciplines. Skills built on full-stack background with heavy reliance on PowerShell, C#, golang & React. Leverages agentic AI tools & prompt engineering to enhance productivity and problem-solving capabilities.",
  

  // Single source of truth for Technology Summary and roles (moved here so there is only one data file)
  technologySummary: [
    {
        title: 'DevOps & Cloud',
        tags: ['Azure DevOps','Azure','Docker','Kubernetes','Jenkins','Kafka']
    },
    {
        title: 'Infrastructure as Code',
        tags: ['Pulumi','Terraform','Azure ARM / Bicep']
    },
    {
        title: 'AI & Automation',
        tags: ['GitHub Copilot','Prompt Engineering','AI-Assisted Development']
    },
    {
        title: 'Languages',
        tags: ['C#','Golang','Java','js/ts','PowerShell','HTML','CSS','React']
    },
    {
        title: 'Databases',
        tags: ['SQL','MongoDB']
    },
    {
        title: 'Monitoring & Logging',
        tags: ['Datadog','Elastic','Prometheus','Grafana']
    },
    {
        title: 'Version Control',
        tags: ['git','HG (Mercurial)']
    },
    {
        title: 'Tools & Testing',
        tags: ['Postman','Swagger','SonarQube','QwietAI']
    },
    {
        title: 'API Architecture',
        tags: ['REST','GraphQL','GRPC']
    }
  ],

  // Roles mapping for specific technologies (print renderer will use this if present)
  techRoles: {
    'Azure DevOps': 'Admin',
    'Pulumi': 'Admin',
    'Datadog': 'Admin',
    'Elastic': 'Admin',
    'Postman': 'Admin',
    'SonarQube': 'Admin',
    'QwietAI': 'Admin',
    'Azure': 'Subscription Owner'
  },
  career: [
    {
      title: 'DevOps Developer',
      company: 'Hunter Engineering Co',
      date: 'July 2021 – Now',
      description: "At Hunter, DevOps is IT for IT. Essentially, we work for the Enterprise Architect to solution anything that anyone doesn't know how to do. We hold the keys to many kingdoms and use them to solve problems. It's 60% Platform Engineering, 35% Developer Support & 5% SRE.",
      tech_stack: [
        'Azure DevOps for CI/CD pipeline management and automation',
        'Azure cloud services for infrastructure and application deployment',
        'Datadog for monitoring and observability solutions',
        'Elastic for logging and search capabilities',
        //'Pulumi for Infrastructure as Code implementation'
      ],
      achievements: [
        'Providing DevOps practices and methodologies across development teams',
        'Implementing comprehensive monitoring and alerting strategies',
        'Automating infrastructure provisioning and deployment processes',
        'Optimizing cloud resource utilization and cost management'
      ]
    },
    {
      title: 'Application Software Developer',
      company: 'Centene',
      date: 'February 2020 – July 2021',
      description: "Life at Centene was operating in your team's borders and coordinating with the other teams that produce to or consume from your domain. Lots of bureaucracy, guardrails & constraints.",
      tech_stack: [
        'Golang APIs hosted on BitBucket deployed via Jenkins CI/CD pipelines',
        'Deployed to and managed Kubernetes-orchestrated Docker containers',
        'Developed & maintained APIs to move data via Kafka between SQL dbs & mongo collections',
        'Software: VS Code, IntelliJ, SSMS, Studio3T, Postman, Rancher, kubectl, docker, CloudBees, Jenkins, Kibana, Grafana, git, BitBucket, SourceTree'
      ],
      achievements: [
        'Assimilated Golang, MongoDB, DevOps concepts & learned a variety of new software to start working tickets independently within 2 months',
        'Served as point of contact for external reporting team\'s data target migration from SQL to mongo collections',
        'Developed back-end APIs in Golang in CI/CD environment porting information via Kafka from SQL to MongoDB',
        'Navigated enormous monolithic corporate environment with many small teams',
        'Supported Prod API consumers and served as point of contact for teams publishing data sources & Kafka topics',
        'Tuned existing stored procedures for team\'s APIs',
        'Audited indexes used in mongo collections'
      ]
    },
    {
      title: 'Full Stack Web Developer',
      company: 'Motivation Technologies',
      date: 'January 2017 – February 2020',
      description: "Motech's IT department was 15-20 Developers empowered to transform the Creative department's dreams into realities sold by the Accounts department. Projects were usually short-lived, promotional efforts that leveraged a 15-year old, monolithic, home-grown codebase for some of the heavy lifting.",
      tech_stack: [
        'C# MVC version controlled with HG (Mercurial) backed by SQL data source',
        'C# Razor front ends with js/ts, HTML & CSS/SCSS',
        'React front ends with CSS/SCSS',
        'Bootstrap & flex grid layouts to display properly on desktop & mobile platforms',
        'CMS system development to provide non-technical users the ability to update content',
        'Legacy ASP.NET .aspx Web Forms',
        'Heavy use of Chrome DevTools'
      ],
      achievements: [
        'Wrote the first React project for the company',
        'Implemented & supported promotional pages – from single page, 1/2 day projects to $250K multi-month projects',
        "Data-modeling & organizational planning around Account Department driven business rules",
        'Matching Creative department mock-ups across responsive breakpoints for the front end',
        'Polishing page behavior or data submission as needed with TypeScript or vanilla JS',
        'Handled Reporting - from single-use throw-away scripts to programmatically controlled multi-page daily reports',
        'Dealt with 29 different CultureCodes in a responsive design environment',
        'Created, maintained & supported MVC systems',
        'Developed new & utilized existing APIs',
        'Created, updated, indexed SQL tables',
        'Learned some basics of DevOps - HAProxy, load balancing, what happens during a deployment',
        'Explored adapting TDD methodologies into existing development practices'
      ]
    }
  ],
  personalInterests: ['Parenting','Combat robotics','Mechanical keyboards','DIY / making','3D printing & 3D modeling','Woodworking','Rock climbing','Slacklining','Disc golf']
};
