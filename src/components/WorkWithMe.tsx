import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code, Sparkles, ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const WorkWithMe: React.FC = () => {
    const prefersReducedMotion = usePrefersReducedMotion();

    const services = [
        {
            icon: <Brain size={22} />,
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
            icon: <Sparkles size={22} />,
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
            icon: <Code size={22} />,
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

    const riseIn = {
        initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: prefersReducedMotion ? 0 : 0.6 },
    };

    return (
        <section id="work-with-me" className="relative scroll-mt-24 bg-bg py-20">
            <div className="mx-auto max-w-4xl px-6">
                <motion.div className="mb-12" {...riseIn}>
                    <span className="text-xs uppercase tracking-wider text-accent">
                        Available for Freelance Work
                    </span>
                    <h2 className="font-display text-4xl lg:text-5xl text-ink mt-3 mb-4">
                        Work With Me
                    </h2>
                    <p className="text-lg text-muted max-w-2xl leading-relaxed">
                        Transform your ideas into reality with expert AI development and full-stack solutions.
                        Let's build something exceptional together.
                    </p>
                </motion.div>

                <div className="border-t border-line">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            className="border-b border-line py-10"
                            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : index * 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-accent" aria-hidden="true">{service.icon}</span>
                                <h3 className="font-display text-2xl text-ink">{service.title}</h3>
                            </div>

                            <p className="text-muted leading-relaxed mb-5 max-w-2xl">
                                {service.description}
                            </p>

                            <ul className="grid sm:grid-cols-2 gap-2.5">
                                {service.highlights.map((highlight) => (
                                    <li key={highlight} className="flex items-start gap-2 text-sm text-ink">
                                        <ArrowRight size={14} className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
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
