"use client";

import React, { useState } from 'react';
import { X, CheckCircle, Clock, AlertCircle, Download, FileText, Video, MessageSquare, DollarSign, Calendar, User, ExternalLink, Send, Star } from 'lucide-react';
import ModalWrapper from '@/components/dialogs/ModalWrapper';
import Tabs, { TabItem } from '@/components/addons/Tabs';

interface Milestone {
    id: number;
    title: string;
    status: 'pending' | 'completed' | 'in-progress';
    dueDate: string;
}

interface TimelineEvent {
    id: number;
    action: string;
    timestamp: string;
    user: string;
}

interface Review {
    rating: number;
    comment: string;
    date: string;
}

interface Deliverable {
    id: number;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
}

interface OrderDetail {
    id: string;
    jobTitle: string;
    buyer: string;
    performer: string;
    orderDate: string;
    deliveryDate: string;
    amount: string;
    commission: string;
    netEarnings: string;
    status: 'Pending' | 'In Progress' | 'Under Review' | 'Completed' | 'Cancelled';
    milestones: Milestone[];
    timeline: TimelineEvent[];
    reviews: {
        buyerReview: Review;
        performerReview: Review;
    };
    deliverables: {
        files: Deliverable[];
        videos: Deliverable[];
        notes: string;
    };
}

interface OrderDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: OrderDetail | null;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({ isOpen, onClose, order }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'deliverables' | 'timeline' | 'reviews'>('overview');

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Under Review': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Cancelled': return 'bg-rose-100 text-rose-800 border-rose-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending': return <Clock className="w-4 h-4" />;
            case 'In Progress': return <Clock className="w-4 h-4" />;
            case 'Under Review': return <AlertCircle className="w-4 h-4" />;
            case 'Completed': return <CheckCircle className="w-4 h-4" />;
            case 'Cancelled': return <X className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getMilestoneStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-emerald-100 text-emerald-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-amber-100 text-amber-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!order) return null;

    const tabItems: TabItem[] = [
        {
            id: 'overview',
            label: 'OVERVIEW',
        },
        {
            id: 'deliverables',
            label: 'DELIVERABLES',
            badge: order.deliverables.files.length + order.deliverables.videos.length,
        },
        {
            id: 'timeline',
            label: 'TIMELINE',
            badge: order.timeline.length,
        },
        {
            id: 'reviews',
            label: 'REVIEWS',
            badge: 2, // Always 2 reviews
        }
    ];

    return (
        <ModalWrapper
            isOpen={isOpen}
            onClose={onClose}
            title={order.jobTitle}
            description={`Order ID: ${order.id}`}
            size="xl"
        >
            {/* Admin Status Badge */}
            <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary-dark/10 text-primary-dark border border-primary-dark/20">
                    <CheckCircle className="w-4 h-4 mr-1.5" />
                    ADMIN VIEW
                </span>
            </div>

            {/* Tabs */}
            <Tabs
                activeTab={activeTab}
                onTabChange={(tabId) => setActiveTab(tabId as any)}
                tabs={tabItems}
                variant="underline"
                size="md"
                fullWidth={true}
                showIcon={false}
                showBadge={true}
                className="mb-8"
            />

            {/* Overview Tab */}
            {activeTab === 'overview' && (
                <div className="space-y-8">
                    {/* Order Info */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">ORDER DATE</p>
                            <p className="text-base font-medium text-foreground">
                                {new Date(order.orderDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">DELIVERY DATE</p>
                            <p className="text-base font-medium text-foreground">
                                {new Date(order.deliveryDate).toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>

                    {/* Buyer & Performer Info */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <User className="w-4 h-4 text-gray-500" />
                                <p className="text-xs text-gray-500">BUYER</p>
                            </div>
                            <p className="text-lg font-semibold text-foreground">{order.buyer}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center gap-2 mb-3">
                                <User className="w-4 h-4 text-gray-500" />
                                <p className="text-xs text-gray-500">PERFORMER</p>
                            </div>
                            <p className="text-lg font-semibold text-foreground">{order.performer}</p>
                        </div>
                    </div>

                    {/* Financial Breakdown */}
                    <div className="mb-8">
                        <p className="text-xs text-gray-500 mb-3">FINANCIAL BREAKDOWN</p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm text-gray-600">Order Amount</span>
                                    <span className="text-lg font-bold text-emerald-600">{order.amount}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="text-sm text-gray-600">Platform Commission (10%)</span>
                                    <span className="text-sm font-medium text-amber-600">{order.commission}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-gray-600">Net Earnings to Performer</span>
                                    <span className="text-lg font-bold text-green-600">{order.netEarnings}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Milestones */}
                    <div className="mb-8">
                        <p className="text-xs text-gray-500 mb-3">MILESTONES</p>
                        <div className="space-y-3">
                            {order.milestones.map((milestone) => (
                                <div key={milestone.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                                    <div>
                                        <h4 className="font-medium text-foreground">{milestone.title}</h4>
                                        <p className="text-xs text-gray-500">Due: {milestone.dueDate}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMilestoneStatusColor(milestone.status)}`}>
                                        {milestone.status === 'completed' ? '✓ Completed' :
                                            milestone.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="pt-6 border-t border-gray-100">
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                className="py-3 border border-gray-300 text-foreground rounded hover:bg-gray-50 transition-colors text-base font-medium"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle edit order logic
                                }}
                            >
                                UPDATE STATUS
                            </button>
                            <button
                                className="py-3 bg-primary-dark text-white rounded hover:bg-primary-dark/80 transition-colors text-base font-medium"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle manage order logic
                                }}
                            >
                                DOWNLOAD ALL FILES
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Deliverables Tab */}
            {activeTab === 'deliverables' && (
                <div className="space-y-6">
                    {/* Files Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <FileText className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-semibold text-foreground">FILES ({order.deliverables.files.length})</h3>
                        </div>
                        <div className="space-y-3">
                            {order.deliverables.files.map(file => (
                                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium text-foreground">{file.name}</p>
                                            <p className="text-xs text-gray-500">{file.size} • Uploaded: {file.uploadedAt}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-primary-dark hover:bg-primary-dark/10 rounded">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Videos Section */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Video className="w-5 h-5 text-gray-500" />
                            <h3 className="text-lg font-semibold text-foreground">VIDEOS ({order.deliverables.videos.length})</h3>
                        </div>
                        <div className="space-y-3">
                            {order.deliverables.videos.map(video => (
                                <div key={video.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Video className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium text-foreground">{video.name}</p>
                                            <p className="text-xs text-gray-500">{video.size} • Uploaded: {video.uploadedAt}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 text-primary-dark hover:bg-primary-dark/10 rounded">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notes Section */}
                    {order.deliverables.notes && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <MessageSquare className="w-5 h-5 text-gray-500" />
                                <h3 className="text-lg font-semibold text-foreground">PERFORMER NOTES</h3>
                            </div>
                            <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                                <p className="text-sm text-gray-700">{order.deliverables.notes}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-6">ORDER TIMELINE</h3>
                        <div className="space-y-6">
                            {order.timeline.map((event, index) => (
                                <div key={event.id} className="relative pl-8">
                                    {index < order.timeline.length - 1 && (
                                        <div className="absolute left-[15px] top-[20px] bottom-[-28px] w-0.5 bg-gray-200" />
                                    )}
                                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary-dark/10 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-primary-dark" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground">{event.action}</p>
                                        <p className="text-sm text-gray-500">{event.timestamp}</p>
                                        <p className="text-xs text-gray-400 mt-1">By: {event.user}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
                <div className="space-y-6">
                    {/* Buyer Review */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">BUYER REVIEW</h3>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(order.reviews.buyerReview.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-bold">{order.reviews.buyerReview.rating}/5</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{order.reviews.buyerReview.comment}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">Posted on {order.reviews.buyerReview.date}</p>
                    </div>

                    {/* Performer Review */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">PERFORMER REVIEW</h3>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.floor(order.reviews.performerReview.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-bold">{order.reviews.performerReview.rating}/5</span>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-700">{order.reviews.performerReview.comment}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">Posted on {order.reviews.performerReview.date}</p>
                    </div>
                </div>
            )}

            {/* Status Update Section (Always visible) */}
            <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Current Status:</span>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status}
                        </span>
                    </div>
                    <button className="px-4 py-2 bg-primary-dark text-white rounded hover:bg-primary-dark/80 transition-colors text-sm font-medium">
                        Send Status Update
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default OrderDetailModal;