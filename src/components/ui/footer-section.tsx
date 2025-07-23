'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FacebookIcon, InstagramIcon, LinkedinIcon, YoutubeIcon, Twitter, Github, Mail, Heart, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Features', href: '/features' },
			{ title: 'Pricing', href: '/pricing' },
			{ title: 'About', href: '/about' },
			{ title: 'Dashboard', href: '/dashboard' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '/about' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' },
			{ title: 'Donate', href: '/donate' },
		],
	},
	{
		label: 'Resources',
		links: [
			{ title: 'Help Center', href: 'https://resumin.zohodesk.in/', icon: HelpCircle },
			{ title: 'Contact Support', href: 'mailto:admin@resumin.link', icon: MessageCircle },
			{ title: 'Get Invite Code', href: 'mailto:razin@resumin.link', icon: Mail },
		],
	},
	{
		label: 'Connect',
		links: [
			{ title: 'Email', href: 'mailto:admin@resumin.link', icon: Mail },
			{ title: 'Twitter', href: '#', icon: Twitter },
			{ title: 'GitHub', href: '#', icon: Github },
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/company/resuminlink', icon: LinkedinIcon },
		],
	},
];

export function FooterSection() {
	return (
		<footer className="relative w-full bg-white border-t border-gray-200 overflow-hidden">
			{/* Background decorations */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/5 to-pink-500/5 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
			</div>

			{/* Top border gradient */}
			<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>

			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
				<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-12">
					{/* Brand Section - Much Bigger Logo */}
					<AnimatedContainer className="space-y-6">
						<div className="flex justify-center xl:justify-start">
							<div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 flex items-center justify-center">
								<img 
									src="https://raw.githubusercontent.com/razinrayees/razinrayees/master/1logo.png" 
									alt="Resumin Logo" 
									className="w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 object-contain hover:scale-105 transition-transform duration-300" 
									loading="lazy"
								/>
							</div>
						</div>

						<p className="text-gray-500 text-sm text-center xl:text-left">
							© {new Date().getFullYear()} Resumin. All rights reserved.
						</p>
					</AnimatedContainer>

					{/* Links Grid */}
					<div className="grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:grid-cols-4">
						{footerLinks.map((section, index) => (
							<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
								<div className="space-y-4">
									<h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
										{section.label}
									</h3>
									<ul className="space-y-3">
										{section.links.map((link) => (
											<li key={link.title}>
												{link.href.startsWith('/') ? (
													<Link
														to={link.href}
														className="group inline-flex items-center text-gray-600 hover:text-orange-600 transition-all duration-300 text-sm"
													>
														{link.icon && (
															<link.icon className="mr-2 h-4 w-4 group-hover:text-orange-600 transition-colors" />
														)}
														<span className="group-hover:translate-x-0.5 transition-transform">
															{link.title}
														</span>
													</Link>
												) : (
													<a
														href={link.href}
														target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
														rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
														className="group inline-flex items-center text-gray-600 hover:text-orange-600 transition-all duration-300 text-sm"
													>
														{link.icon && (
															<link.icon className="mr-2 h-4 w-4 group-hover:text-orange-600 transition-colors" />
														)}
														<span className="group-hover:translate-x-0.5 transition-transform">
															{link.title}
														</span>
													</a>
												)}
											</li>
										))}
									</ul>
								</div>
							</AnimatedContainer>
						))}
					</div>
				</div>

				{/* Bottom Section */}
				<AnimatedContainer delay={0.5}>
					<div className="mt-12 pt-8 border-t border-gray-200">
						<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
							<div className="flex items-center space-x-6 text-sm text-gray-500">
								<div className="flex items-center space-x-2">
									<div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
									<span>Invite-Only Access</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
									<span>No Ads</span>
								</div>
								<div className="flex items-center space-x-2">
									<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
									<span>Free Forever</span>
								</div>
							</div>

							<div className="text-center md:text-right">
								<p className="text-gray-500 text-sm mb-2">
									Questions or feedback?
								</p>
								<a
									href="mailto:contact@example.com"
									className="inline-flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors text-sm font-medium"
								>
									<Mail size={14} />
									<span>contact@example.com</span>
								</a>
							</div>
						</div>
					</div>
				</AnimatedContainer>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: 20, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8, ease: 'easeOut' }}
			className={className}
		>
			{children}
		</motion.div>
	);
}