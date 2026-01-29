import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Sparkles, ArrowRight } from 'lucide-react';
import DynamicBackground from './DynamicBackground';

const WorkWithMe: React.FC = () => {
    const services = [
        {
            icon: <Brain size={32} />,
            title: 'AI Development',
            description: 'Custom AI solutions including LLMs, RAG systems, and intelligent agents tailored to your business needs.',
            highlights: [
                'Large Language Model integration',
                'Retrieval-Augmented Generation (RAG)',
                'AI agent development',
                'Model fine-tuning & optimization'
            ]
        },
        {
            icon: <Sparkles size={32} />,
            title: 'GenAI Solutions',
            description: 'Cutting-edge generative AI applications that transform how you interact with data and automate workflows.',
            highlights: [
                'Conversational AI interfaces',
                'Document intelligence systems',
                'Automated content generation',
                'Multi-modal AI applications'
            ]
        },
        {
            icon: <Code size={32} />,
            title: 'Full-Stack Development',
            description: 'End-to-end web applications with modern tech stacks, from concept to deployment.',
            highlights: [
                'React/Vue.js frontend development',
                'Node.js/Python backend systems',
                'Database design & optimization',
                'Cloud deployment & DevOps'
            ]
        }
    ];

    return (
        <section id="work-with-me" className="relative min-h-screen bg-gradient-to-br from-background-dark to-primary py-20">
            <DynamicBackground />

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-block mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="px-6 py-2 bg-secondary/20 border border-secondary/30 rounded-full text-secondary font-semibold text-sm">
                            💼 Available for Freelance Work
                        </span>
                    </motion.div>

                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                        Work With Me
                    </h2>
                    <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        Transform your ideas into reality with expert AI development and full-stack solutions.
                        Let's build something exceptional together.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-3xl p-8 hover:bg-white/10 hover:border-accent/30 hover:-translate-y-2 transition-all duration-300 group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>

                            {/* Title & Description */}
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-gray-200 leading-relaxed mb-6">
                                {service.description}
                            </p>

                            {/* Highlights */}
                            <ul className="space-y-3">
                                {service.highlights.map((highlight, hIndex) => (
                                    <li key={hIndex} className="flex items-start gap-2 text-sm text-gray-300">
                                        <ArrowRight size={16} className="text-secondary flex-shrink-0 mt-1" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WorkWithMe;
