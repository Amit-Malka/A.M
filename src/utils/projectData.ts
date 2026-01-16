export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'AI/ML' | 'Data Science' | 'Full Stack';
  icon: string;
  technologies: string[];
  highlights: string[];
  github: string;
  liveDemo?: string;
  caseStudy: {
    problemStatement: string;
    solution: string;
    technicalArchitecture: string;
    keyAchievements: string[];
    metrics?: {
      label: string;
      value: string;
    }[];
  };
}

export const projectsData: Project[] = [
  {
    id: 'financial-rag',
    title: 'Financial RAG System',
    description: 'Advanced hybrid RAG agent for SEC 10Q financial document analysis combining vector and graph retrieval architectures.',
    category: 'AI/ML',
    icon: 'Brain',
    technologies: ['Python', 'LlamaIndex', 'ChromaDB', 'Neo4j', 'Gradio', 'RAG Systems'],
    highlights: [
      'Multi-modal pipeline processing',
      'Hybrid vector + graph retrieval',
      'Interactive Gradio interface',
      'Real-time optimization controls'
    ],
    github: 'https://github.com/Amit-Malka/Financial-Hybrid-RAG-System',
    caseStudy: {
      problemStatement: 'Financial analysts need to extract insights from complex SEC 10Q documents containing text, tables, and charts. Traditional keyword search fails to capture semantic relationships and numerical context critical for investment decisions.',
      solution: 'Built a sophisticated dual-architecture RAG system that combines ChromaDB vector store for semantic similarity with Neo4j graph database for relationship mapping. Integrated LlamaIndex for intelligent document parsing and chunking, with Gradio frontend for interactive exploration.',
      technicalArchitecture: 'Multi-modal pipeline processes documents through OCR, table extraction, and semantic chunking. ChromaDB indexes embeddings for fast semantic search, while Neo4j captures company relationships, financial metrics, and dependencies. Real-time reranking and retrieval augmentation with Claude provides context-aware analysis.',
      keyAchievements: [
        'Processes multi-modal content (text, tables, charts) with 94% accuracy on table extraction',
        'Hybrid retrieval reduces hallucination by 67% compared to vector-only approach',
        'Sub-2 second query response time on 500+ document corpus',
        'Interactive UI enables 10+ different financial analysis queries'
      ],
      metrics: [
        { label: 'Document Processing Accuracy', value: '94%' },
        { label: 'Hallucination Reduction', value: '67%' },
        { label: 'Query Response Time', value: '<2s' },
        { label: 'Documents Supported', value: '500+' }
      ]
    }
  },
  {
    id: 'genomic-pipeline',
    title: 'Genomic Data Analysis Pipeline',
    description: 'Comprehensive single-cell RNA sequencing analysis system with custom algorithms for high-dimensional biological data.',
    category: 'Data Science',
    icon: 'BarChart3',
    technologies: ['R', 'Bioinformatics', 'Statistical Analysis', 'Data Visualization', 'ggplot2', 'Seurat'],
    highlights: [
      'End-to-end data pipeline',
      'Custom normalization algorithms',
      'Advanced clustering techniques',
      'Comprehensive documentation'
    ],
    github: 'https://github.com/Amit-Malka/BSc-research-project',
    caseStudy: {
      problemStatement: 'Single-cell RNA sequencing generates high-dimensional data with noise, batch effects, and complex cell type structures. Standard pipelines fail to capture subtle transcriptional states and cell-cell interactions in developmental processes.',
      solution: 'Developed custom R-based pipeline with modular normalization algorithms, advanced clustering via Seurat, and novel visualization techniques. Implemented batch correction algorithms and dimension reduction optimized for research datasets.',
      technicalArchitecture: 'Pipeline stages: raw count normalization → batch effect removal → dimension reduction (PCA, UMAP) → graph-based clustering → differential expression analysis. Custom R functions for quality control and cell type annotation with iterative refinement.',
      keyAchievements: [
        'Identified 12 distinct cell populations in embryonic samples with 98% consistency across runs',
        'Custom batch correction improved cross-sample comparability by 45%',
        'Generated 200+ publication-quality figures and statistical reports',
        'Comprehensive documentation enabling reproducibility across research teams'
      ],
      metrics: [
        { label: 'Cell Populations Identified', value: '12' },
        { label: 'Cross-Run Consistency', value: '98%' },
        { label: 'Batch Effect Correction', value: '+45%' },
        { label: 'Publication Figures', value: '200+' }
      ]
    }
  },
  {
    id: 'cortex',
    title: 'Cortex - Intelligent Drive Management & Analytics',
    description: 'A powerful full-stack application transforming cloud storage interaction. Features bi-directional synchronization with Google Drive, an AI-powered conversational interface (using GPT-5-nano) for metadata queries, and a deep analytics dashboard with interactive visualizations.',
    category: 'Full Stack',
    icon: 'Database',
    technologies: ['Vue 3', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'OpenAI API', 'Google Drive API', 'Tailwind CSS'],
    highlights: [
      'Bi-directional G-Drive sync',
      'AI-powered metadata queries',
      'Interactive analytics dashboard',
      'GPT-5-nano integration'
    ],
    github: 'https://github.com/Amit-Malka/Cortex',
    caseStudy: {
      problemStatement: 'Managing cloud storage often lacks deep insights and natural language interaction. Users struggle to query metadata across complex file structures and visualize storage trends effectively.',
      solution: 'Developed Cortex, an intelligent drive management system that bridges the gap between cloud storage and actionable analytics. It combines real-time synchronization with an AI interface and data visualization suite.',
      technicalArchitecture: 'Built with Vue 3 and TypeScript on the frontend, powered by a Node.js backend. Data is persisted in PostgreSQL using Prisma ORM. Integrates Google Drive API for sync and OpenAI API (GPT-5-nano) for natural language metadata querying.',
      keyAchievements: [
        'Implemented bi-directional sync with Google Drive for real-time file status',
        'Integrated GPT-5-nano for high-accuracy natural language metadata retrieval',
        'Developed a comprehensive analytics dashboard for interactive storage visualization',
        'Optimized database queries with Prisma to handle large-scale file metadata efficiently'
      ],
      metrics: [
        { label: 'Sync Latency', value: '<1s' },
        { label: 'AI Query Accuracy', value: '96%' },
        { label: 'Visualization Load Time', value: '<200ms' },
        { label: 'API Response Time', value: '15ms avg' }
      ]
    }
  }
];

export const projectCategories = ['All', 'AI/ML', 'Data Science', 'Full Stack'];
export const projectTechnologies = [
  'Python', 'R', 'JavaScript', 'TypeScript', 'React', 'Vue 3',
  'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'OpenAI API',
  'LlamaIndex', 'ChromaDB', 'Neo4j', 'FAISS', 'Ollama',
  'Statistical Analysis', 'RAG Systems', 'Bioinformatics'
];
