"use client";

import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import ModalWrapper from './ModalWrapper';
import Tabs, { TabItem } from '../addons/Tabs';

interface Proposal {
    id: number;
    performerName: string;
    performerRating: number;
    verified: boolean;
    askingRate: string;
    availability: string;
    description: string;
    submittedDate: string;
}

interface JobDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    job: any;
}

const JobDetailModal: React.FC<JobDetailModalProps> = ({ isOpen, onClose, job }) => {
    const [activeTab, setActiveTab] = useState<'details' | 'proposals'>('details');
    const [proposals, setProposals] = useState<Proposal[]>([
        {
            id: 1,
            performerName: 'Alex Chen',
            performerRating: 4.8,
            verified: true,
            askingRate: '$1,800',
            availability: 'Aug 3-7',
            description: '10+ years parkour experience, worked on major films',
            submittedDate: '2024-03-14'
        },
        {
            id: 2,
            performerName: 'Marcus Johnson',
            performerRating: 4.5,
            verified: false,
            askingRate: '$1,500',
            availability: 'Aug 4-8',
            description: 'Former gymnast, specializes in rooftop sequences',
            submittedDate: '2024-03-13'
        }
    ]);

    // Define tabs for the Tabs component
    const tabItems: TabItem[] = [
        {
            id: 'details',
            label: 'JOB DETAILS',
        },
        {
            id: 'proposals',
            label: `PROPOSALS`,
            badge: proposals.length,
        }
    ];

    if (!job) return null;

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={job.title}
            description=""
            size="xl"
        >
            {/* Admin Status Badge */}
            <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-dark/10 text-primary-dark border border-primary/20">
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    ADMIN VIEW
                </span>
            </div>

            {/* Use the Tabs component */}
            <Tabs
                activeTab={activeTab}
                onTabChange={(tabId) => setActiveTab(tabId as 'details' | 'proposals')}
                tabs={tabItems}
                variant="default"
                fullWidth={false}
                showIcon={false}
                showBadge={true}
                className="mb-8"
            />

            {/* Details Tab */}
            {activeTab === 'details' && (
                <div className="space-y-8">
                    {/* Job Header Info */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">CREATOR</p>
                                <p className="text-base font-medium text-foreground">
                                    {job.creator}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 mb-1">STATUS</p>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${job.status === 'Open'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                    : job.status === 'Hired'
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : job.status === 'Completed'
                                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                            : job.status === 'Expired'
                                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                : 'bg-rose-50 text-rose-700 border border-rose-200'
                                    }`}>
                                    {job.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        {/* Location */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1">LOCATION</p>
                            <p className="text-base font-medium text-foreground">
                                {job.location.toUpperCase()}
                            </p>
                        </div>

                        {/* Gender */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1">GENDER</p>
                            <p className="text-base font-medium text-foreground">
                                {job.gender.toUpperCase()}
                            </p>
                        </div>

                        {/* Applicants */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1">APPLICANTS</p>
                            <p className="text-base font-medium text-foreground">
                                {job.applicants}
                            </p>
                        </div>

                        {/* Rate/Budget - Show rate for gigs, applicants for casting calls */}
                        <div>
                            <p className="text-xs text-gray-500 mb-1">
                                {job.type === 'Gig' ? 'RATE' : 'BUDGET'}
                            </p>
                            <p className="text-base font-medium text-foreground">
                                {job.type === 'Gig' ? job.rate : '$850/day'}
                            </p>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="mb-8">
                        <p className="text-xs text-gray-500 mb-3">DESCRIPTION</p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-foreground leading-relaxed">
                                Looking for experienced stunt professionals for an action film.
                                {job.title.toLowerCase().includes('driver')
                                    ? ' Must be proficient in high-speed driving, precision maneuvers, and vehicle stunts. Experience with chase sequences required.'
                                    : job.title.toLowerCase().includes('parkour')
                                        ? ' Requires advanced parkour skills, rooftop experience, and athletic ability. Background in gymnastics or free-running preferred.'
                                        : ' Experience with fight choreography, wire work, and safety protocols required. Must have previous film/tv experience.'
                                }
                            </p>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="mb-8">
                        <p className="text-xs text-gray-500 mb-3">REQUIRED SKILLS</p>
                        <div className="flex flex-wrap gap-2">
                            {job.title.toLowerCase().includes('driver') ? (
                                <>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        High-speed driving
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Precision maneuvers
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Vehicle stunts
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Chase sequences
                                    </span>
                                </>
                            ) : job.title.toLowerCase().includes('parkour') ? (
                                <>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Parkour
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Rooftop experience
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Gymnastics
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Free-running
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Fight choreography
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Wire work
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Safety protocols
                                    </span>
                                    <span className="px-3 py-1.5 bg-gray-100 text-foreground rounded text-sm font-medium">
                                        Film experience
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="pt-6 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="flex-1 py-2 border border-foreground/10 text-foreground rounded hover:bg-foreground/5 transition-colors text-sm font-medium"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                EDIT JOB
                            </button>
                            <button
                                className="flex-1 py-2 bg-primary text-foreground rounded hover:bg-primary/80 transition-colors text-sm font-medium"
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                            >
                                MANAGE APPLICANTS
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Proposals Tab - Updated to show applicants */}
            {activeTab === 'proposals' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-foreground">APPLICANTS ({job.applicants})</h3>
                        <button className="px-4 py-2 border border-gray-300 text-foreground rounded hover:bg-gray-50 transition-colors text-sm font-medium">
                            EXPORT ALL
                        </button>
                    </div>

                    <div className="space-y-4">
                        {proposals.map((proposal) => (
                            <div key={proposal.id} className="bg-white border border-gray-200 rounded-lg p-6">
                                {/* Proposal Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-foreground">{proposal.performerName}</h4>
                                            {proposal.verified && (
                                                <span className="text-xs text-green-600 font-medium">✓ VERIFIED</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="text-foreground/70">Rating: {proposal.performerRating}/5.0</span>
                                            <span className="text-gray-500">
                                                Applied {new Date(proposal.submittedDate).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-bold text-foreground">{proposal.askingRate}</p>
                                        <p className="text-xs text-gray-500">Proposed Rate</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <p className="text-foreground/70">{proposal.description}</p>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">AVAILABILITY</p>
                                        <p className="text-sm font-medium text-foreground">{proposal.availability}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">EXPERIENCE</p>
                                        <p className="text-sm font-medium text-foreground">10+ years</p>
                                    </div>
                                </div>

                                {/* Admin Action Buttons */}
                                <div className="flex gap-3">
                                    <button className="flex-1 py-2 border border-foreground/10 text-foreground rounded hover:bg-foreground/5 transition-colors text-sm font-medium">
                                        VIEW PROFILE
                                    </button>
                                    <button className="flex-1 py-2 border border-foreground/10 text-foreground rounded hover:bg-foreground/5 transition-colors text-sm font-medium">
                                        SEND MESSAGE
                                    </button>
                                    <button className="flex-1 py-2 bg-primary text-foreground rounded hover:bg-primary/80 transition-colors text-sm font-medium">
                                        SELECT
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State for No Proposals */}
                    {proposals.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-foreground/60 mb-2">No applicants yet</p>
                            <p className="text-sm text-gray-500">Applicants will appear here when performers apply</p>
                        </div>
                    )}
                </div>
            )}
        </ModalWrapper>
    );
};

export default JobDetailModal;